import { Prisma } from '@prisma/client';
import { prisma, transaction, lockAccount } from '../core/db';
import { GameError } from '../core/engine';
import { pageOf, paged } from '../core/http';
import { once } from '../core/operations';
import { loadSettings } from '../core/settings';
import { fetchPayment, createPreference, searchPaymentsByReference, mpConfigured, mpMissing, mpTestMode, ORDER_TTL_MS } from './mercadopago';
import { grantPeriod, revokePeriod, premiumStatus } from './premium';
import { addGems } from './gems';
import { publicUrl } from '../core/mailer';
import { gemPacks, isGemPackKey } from '../../../shared/gems';

const PENDING_REUSE_MS = 30 * 60_000;

export async function premiumOverview(accountId: number) {
  const now = new Date();
  const [settings, status, account, ended, pending] = await Promise.all([
    loadSettings(prisma), premiumStatus(prisma, accountId),
    prisma.account.findUniqueOrThrow({ where: { id: accountId }, select: { emailVerifiedAt: true, gems: true } }),
    prisma.premiumPeriod.findFirst({ where: { accountId, revokedAt: null, endsAt: { lte: now } }, orderBy: { endsAt: 'desc' }, select: { endsAt: true } }),
    prisma.premiumOrder.findFirst({ where: { accountId, status: 'PENDING', gems: { gt: 0 }, checkoutUrl: { not: null }, createdAt: { gt: new Date(now.getTime() - PENDING_REUSE_MS) } }, orderBy: { id: 'desc' }, select: { packKey: true } }),
  ]);
  const packs = gemPacks(settings), missing = mpMissing();
  return {
    // Compra de gemas: só com o Mercado Pago configurado e algum pacote com preço.
    enabled: !missing && packs.length > 0,
    disabledReason: missing ?? (packs.length ? null : 'Nenhum pacote de gemas está à venda no momento.'),
    testMode: mpConfigured() && mpTestMode(),
    gems: account.gems, gemPrice: settings['premium.gemPrice'], days: settings['premium.days'], packs,
    active: status.active, until: status.until, upcoming: status.upcoming, lastEndedAt: ended?.endsAt ?? null,
    pendingPack: pending?.packKey ?? null, emailVerified: !!account.emailVerifiedAt,
    perks: { presetLimit: settings['premium.presetLimit'], charactersFree: settings['characters.free'], charactersPremium: settings['characters.premium'] } };
}

// Escolher um pacote: cria o pedido com gemas e preço do momento e abre o Checkout Pro (Pix ou cartão).
// Clicar de novo no mesmo pacote em até 30 minutos reaproveita o pagamento aberto em vez de criar outro.
export async function startGemCheckout(accountId: number, packKey: unknown) {
  if (!isGemPackKey(packKey)) throw new GameError(400, 'Pacote de gemas inválido.');
  const missing = mpMissing();
  if (missing) throw new GameError(503, missing);
  const settings = await loadSettings(prisma);
  const pack = gemPacks(settings).find(p => p.key === packKey);
  if (!pack) throw new GameError(409, 'Este pacote não está à venda no momento.');
  const account = await prisma.account.findUniqueOrThrow({ where: { id: accountId }, select: { emailVerifiedAt: true } });
  if (!account.emailVerifiedAt) throw new GameError(409, 'Confirme seu e-mail antes de comprar gemas.');
  // Reserva do pedido sob a trava da conta: dois cliques ao mesmo tempo no mesmo pacote não criam dois pagamentos.
  const reserved = await transaction(async tx => {
    await lockAccount(tx, accountId);
    const recent = await tx.premiumOrder.findFirst({ where: { accountId, status: 'PENDING', packKey, gems: pack.gems, amountCents: pack.cents, createdAt: { gt: new Date(Date.now() - PENDING_REUSE_MS) } }, orderBy: { id: 'desc' } });
    if (recent?.checkoutUrl) return { reuse: { url: recent.checkoutUrl, orderId: recent.id } };
    if (recent) throw new GameError(409, 'Seu pagamento está sendo preparado. Aguarde alguns segundos e tente de novo.');
    return { order: await tx.premiumOrder.create({ data: { accountId, amountCents: pack.cents, days: 0, gems: pack.gems, packKey } }) };
  });
  if (reserved.reuse) return reserved.reuse;
  const order = reserved.order!;
  try {
    const preference = await createPreference(order, publicUrl());
    await prisma.premiumOrder.update({ where: { id: order.id }, data: { providerPreferenceId: preference.id, checkoutUrl: preference.init_point } });
    return { url: preference.init_point, orderId: order.id };
  } catch (error) {
    console.error('[gemas] falha ao criar checkout:', error instanceof Error ? error.message : error);
    await prisma.premiumOrder.update({ where: { id: order.id }, data: { status: 'FAILED' } });
    throw new GameError(502, 'Não foi possível abrir o pagamento agora. Tente novamente em instantes.');
  }
}

// Ativar ou renovar o Premium com gemas. Idempotente pela chave do clique: repetir não cobra nem concede de novo.
// A renovação encadeia: o período novo começa quando o atual termina (layoutPeriods).
export async function activatePremiumWithGems(accountId: number, key: string) {
  return transaction(async tx => {
    await lockAccount(tx, accountId);
    const settings = await loadSettings(tx);
    const price = settings['premium.gemPrice'], days = settings['premium.days'];
    return once(tx, -accountId, key, ['premium-gems', price, days], async () => {
      if (price <= 0) throw new GameError(503, 'A ativação do Premium com gemas está desligada no momento.');
      const period = await grantPeriod(tx, { accountId, days, source: 'GEMS', gemsSpent: price });
      const balance = await addGems(tx, accountId, -price, 'PREMIUM', { type: 'period', id: period.id });
      return { periodId: period.id, startsAt: period.startsAt, endsAt: period.endsAt, gems: balance, spent: price, days };
    });
  });
}

const ORDER_SELECT = { id: true, status: true, amountCents: true, days: true, gems: true, packKey: true, createdAt: true, paidAt: true, refundedAt: true, providerPaymentId: true } as const;
export async function gemOrders(accountId: number, query: Record<string, unknown>) {
  const { page, skip, take } = pageOf(query);
  const [items, total] = await Promise.all([
    prisma.premiumOrder.findMany({ where: { accountId }, orderBy: { id: 'desc' }, skip, take, select: ORDER_SELECT }),
    prisma.premiumOrder.count({ where: { accountId } })]);
  return paged(items, total, page);
}
export async function gemHistory(accountId: number, query: Record<string, unknown>) {
  const { page, skip, take } = pageOf(query);
  const [items, total] = await Promise.all([
    prisma.gemLedger.findMany({ where: { accountId }, orderBy: { id: 'desc' }, skip, take, select: { id: true, delta: true, balanceAfter: true, reason: true, refType: true, refId: true, createdAt: true } }),
    prisma.gemLedger.count({ where: { accountId } })]);
  return paged(items, total, page);
}

// Pedido pendente há mais de um dia: antes de encerrar, pergunta ao Mercado Pago se algum pagamento aprovado escapou do webhook.
// Aprovação que chegar depois (Pix pago com o link vencido) ainda credita: o dinheiro foi recebido.
export async function expireStaleOrders(limit = 20) {
  if (!mpConfigured()) return 0;
  const stale = await prisma.premiumOrder.findMany({ where: { status: 'PENDING', createdAt: { lt: new Date(Date.now() - ORDER_TTL_MS) } }, orderBy: { id: 'asc' }, take: limit, select: { id: true } });
  for (const { id } of stale) {
    await reconcileOrder(id).catch(e => console.error(`[pagamentos] reconsulta do pedido ${id} falhou:`, e instanceof Error ? e.message : e));
    await prisma.premiumOrder.updateMany({ where: { id, status: 'PENDING' }, data: { status: 'EXPIRED' } });
  }
  return stale.length;
}
// Reconsulta no Mercado Pago os pagamentos do pedido e aplica cada um (idempotente). Usada pelo admin e pela varredura.
export async function reconcileOrder(orderId: number): Promise<{ found: number; outcomes: WebhookOutcome[] }> {
  if (!mpConfigured()) throw new GameError(503, 'Pagamentos ainda não foram configurados.');
  const payments = await searchPaymentsByReference(String(orderId));
  const outcomes: WebhookOutcome[] = [];
  for (const payment of [...payments].reverse()) outcomes.push(await processMercadoPagoPayment(String(payment.id)));
  return { found: payments.length, outcomes };
}

export type WebhookOutcome = 'granted' | 'credited' | 'refunded' | 'failed' | 'noop' | 'duplicate' | 'ignored' | 'amount_mismatch';
// Reembolso/estorno local: usado pelo webhook e pelo painel. Pedido de gemas tira as gemas, mesmo que já gastas (a conta fica
// devendo e não ativa nada com gemas até cobrir o saldo). Pedido antigo de Premium direto revoga o período e reposiciona os seguintes.
export async function applyRefund(tx: Prisma.TransactionClient, orderId: number, actorId: number | null, reason: string, chargeback = false) {
  const order = await tx.premiumOrder.findUniqueOrThrow({ where: { id: orderId }, include: { period: true } });
  if (order.status === 'REFUNDED') return false;
  await lockAccount(tx, order.accountId);
  const wasPaid = order.status === 'PAID';
  await tx.premiumOrder.update({ where: { id: orderId }, data: { status: 'REFUNDED', refundedAt: new Date() } });
  if (order.gems > 0 && wasPaid) await addGems(tx, order.accountId, -order.gems, chargeback ? 'CHARGEBACK' : 'REFUND', { type: 'order', id: order.id }, { allowNegative: true, note: reason });
  if (order.period) await revokePeriod(tx, order.period.id, actorId, reason);
  return true;
}

// Chamado depois que a assinatura do webhook foi validada. Nunca confia no corpo: consulta o pagamento na API.
export async function processMercadoPagoPayment(paymentId: string): Promise<WebhookOutcome> {
  const payment = await fetchPayment(paymentId);
  const orderId = Number(payment.external_reference);
  if (!Number.isSafeInteger(orderId) || orderId < 1) return 'ignored';
  const eventKey = `mercadopago:${payment.id}:${payment.status}`;
  return transaction(async tx => {
    const rows = await tx.$queryRaw<{ id: number }[]>`SELECT id FROM \`PremiumOrder\` WHERE id = ${orderId} FOR UPDATE`;
    if (rows.length !== 1) return 'ignored' as const;
    if (await tx.paymentEvent.findUnique({ where: { eventKey } })) return 'duplicate' as const;
    await tx.paymentEvent.create({ data: { provider: 'MERCADOPAGO', eventKey, payload: JSON.parse(JSON.stringify(payment)) as Prisma.InputJsonValue } });
    const order = await tx.premiumOrder.findUniqueOrThrow({ where: { id: orderId } });
    switch (payment.status) {
      case 'approved': {
        if (order.status === 'PAID' || order.status === 'REFUNDED') return 'noop' as const;
        const cents = Math.round((payment.transaction_amount ?? 0) * 100);
        if (cents !== order.amountCents || (payment.currency_id ?? 'BRL') !== order.currency) {
          console.error(`[pagamentos] valor divergente no pedido ${order.id}: recebido ${cents} ${payment.currency_id}, esperado ${order.amountCents} ${order.currency}`);
          return 'amount_mismatch' as const;
        }
        // Um pagamento credita um pedido só (providerPaymentId é único).
        if (await tx.premiumOrder.findFirst({ where: { providerPaymentId: String(payment.id), id: { not: order.id } }, select: { id: true } })) return 'duplicate' as const;
        await lockAccount(tx, order.accountId);
        await tx.premiumOrder.update({ where: { id: order.id }, data: { status: 'PAID', paidAt: new Date(), providerPaymentId: String(payment.id) } });
        if (order.gems > 0) {
          await addGems(tx, order.accountId, order.gems, 'PURCHASE', { type: 'order', id: order.id });
          return 'credited' as const;
        }
        // Pedido antigo, da venda direta do Premium em reais.
        await grantPeriod(tx, { accountId: order.accountId, days: order.days, source: 'PURCHASE', orderId: order.id });
        return 'granted' as const;
      }
      case 'refunded': case 'charged_back':
        return (await applyRefund(tx, order.id, null, payment.status === 'refunded' ? 'Reembolso no Mercado Pago' : 'Estorno (chargeback)', payment.status === 'charged_back')) ? 'refunded' as const : 'noop' as const;
      case 'rejected': case 'cancelled':
        if (order.status !== 'PENDING') return 'noop' as const;
        await tx.premiumOrder.update({ where: { id: order.id }, data: { status: 'FAILED' } });
        return 'failed' as const;
      default: return 'noop' as const; // pending, in_process, authorized...
    }
  });
}
