import 'dotenv/config';
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac, randomUUID } from 'node:crypto';
import { once as eventOnce } from 'node:events';
import { prisma } from '../src/core/db';
import { createApp } from '../src/server';
import { hashPassword } from '../src/core/password';
import { premiumStatus } from '../src/premium/premium';
import { processMercadoPagoPayment } from '../src/premium/premiumService';

// Gemas de ponta a ponta, com o Mercado Pago simulado (fetch trocado só para api.mercadopago.com).
// Pressupõe os padrões de configuração: pacote 1 = 100 gemas por R$ 5,00, pacote 2 = 220 por R$ 10,00, Premium = 300 gemas por 30 dias.
test('MySQL: compra de gemas pelo Mercado Pago e Premium ativado com gemas', async t => {
  assert.match(process.env.DATABASE_URL ?? '', /\/[^/?]*_test(?:\?|$)/, 'Use uma base dedicada terminada em _test.');
  const tag = randomUUID().slice(0, 8), password = 'Gems-test-2026!', hash = await hashPassword(password);
  const mk = (n: string, extra: object = {}) => prisma.account.create({ data: { email: `gems-${tag}-${n}@example.invalid`, password: hash, ...extra,
    characters: { create: { name: `Gemas ${n} ${tag}`, level: 5, hp: 100, maxHp: 100 } } } });
  const [buyer, admin] = await Promise.all([mk('b'), mk('adm', { role: 'ADMIN', emailVerifiedAt: new Date() })]);
  const server = createApp().listen(0, '127.0.0.1'); await eventOnce(server, 'listening');
  const address = server.address(); assert(address && typeof address !== 'string');
  const base = `http://127.0.0.1:${address.port}/api`, origin = process.env.APP_ORIGIN ?? 'http://localhost:5173';
  const realFetch = globalThis.fetch;
  const call = async (cookie: string, path: string, body?: unknown, key?: string) => realFetch(base + path, { method: body === undefined ? 'GET' : 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Game-Client': 'oconfronto', Origin: origin, Cookie: cookie, ...(key ? { 'Idempotency-Key': key } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  const login = async (email: string) => (await call('', '/auth/login', { email, password })).headers.get('set-cookie')?.split(';')[0] ?? '';
  const gems = async () => (await prisma.account.findUniqueOrThrow({ where: { id: buyer.id } })).gems;
  const ledgerSum = async () => (await prisma.gemLedger.aggregate({ where: { accountId: buyer.id }, _sum: { delta: true } }))._sum.delta ?? 0;
  // Mercado Pago de mentira: preferências criadas e pagamentos consultados.
  const payments = new Map<string, object>(), preferences: { body: any; key: string | null }[] = [];
  const fakeMp = (async (input: any, init?: any) => {
    const url = String(input?.url ?? input);
    if (url === 'https://api.mercadopago.com/checkout/preferences') {
      preferences.push({ body: JSON.parse(init.body), key: init.headers['X-Idempotency-Key'] ?? null });
      return Response.json({ id: `pref-${preferences.length}`, init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=pref-${preferences.length}` });
    }
    if (url.startsWith('https://api.mercadopago.com/v1/payments/')) {
      const p = payments.get(url.split('/').pop()!);
      return p ? Response.json(p) : new Response('{}', { status: 404 });
    }
    return realFetch(input, init);
  }) as typeof fetch;
  const secret = 'segredo-de-teste-gemas';
  const webhook = (paymentId: string, sig?: string) => {
    const ts = String(Date.now()), v1 = createHmac('sha256', secret).update(`id:${paymentId};request-id:req-${paymentId};ts:${ts};`).digest('hex');
    return realFetch(`${base}/webhooks/mercadopago?data.id=${paymentId}&type=payment`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-signature': sig ?? `ts=${ts},v1=${v1}`, 'x-request-id': `req-${paymentId}` }, body: JSON.stringify({ type: 'payment', data: { id: paymentId } }) });
  };
  const pid = () => String(Math.floor(Math.random() * 1e9) + 1e9);
  const cookie = await login(buyer.email), adminCookie = await login(admin.email);
  try {
    await t.test('sem chave do Mercado Pago a compra fica desligada, com mensagem clara', async () => {
      delete process.env.MP_ACCESS_TOKEN; delete process.env.MP_WEBHOOK_SECRET;
      const o = await (await call(cookie, '/premium')).json();
      assert.equal(o.enabled, false); assert.match(o.disabledReason, /Mercado Pago/); assert.equal(o.gems, 0); assert.equal(o.gemPrice, 300);
      assert.ok(o.packs.length >= 1);
      const r = await call(cookie, '/gems/checkout', { pack: 'pack1' });
      assert.equal(r.status, 503); assert.match((await r.json()).error, /não foi ligada/);
      assert.equal((await webhook('123')).status, 503);
    });

    process.env.MP_ACCESS_TOKEN = 'TEST-token-de-teste'; process.env.MP_WEBHOOK_SECRET = secret;
    globalThis.fetch = fakeMp;
    let order2 = 0, order1 = 0;
    await t.test('escolher pacote: exige e-mail confirmado, cria o pedido e reaproveita o pagamento aberto', async () => {
      const o = await (await call(cookie, '/premium')).json();
      assert.equal(o.enabled, true); assert.equal(o.testMode, true);
      assert.equal((await call(cookie, '/gems/checkout', { pack: 'pack2' })).status, 409); // e-mail não confirmado
      await prisma.account.update({ where: { id: buyer.id }, data: { emailVerifiedAt: new Date() } });
      assert.equal((await call(cookie, '/gems/checkout', { pack: 'nada' })).status, 400);
      const first = await (await call(cookie, '/gems/checkout', { pack: 'pack2' })).json();
      const again = await (await call(cookie, '/gems/checkout', { pack: 'pack2' })).json();
      assert.equal(again.orderId, first.orderId); assert.equal(again.url, first.url);
      order2 = first.orderId;
      const order = await prisma.premiumOrder.findUniqueOrThrow({ where: { id: order2 } });
      assert.equal(order.gems, 220); assert.equal(order.amountCents, 1000); assert.equal(order.days, 0); assert.equal(order.status, 'PENDING');
      assert.equal(preferences.length, 1); assert.equal(preferences[0].key, `gems-order-${order2}`);
      assert.equal(preferences[0].body.external_reference, String(order2)); assert.equal(preferences[0].body.items[0].unit_price, 10);
      assert.equal((await (await call(cookie, '/premium')).json()).pendingPack, 'pack2');
      order1 = (await (await call(cookie, '/gems/checkout', { pack: 'pack1' })).json()).orderId;
      assert.notEqual(order1, order2);
    });

    const pay2 = pid(), pay1 = pid();
    await t.test('webhook: assinatura inválida é recusada; aprovado credita uma vez só, mesmo repetido ao mesmo tempo', async () => {
      payments.set(pay2, { id: Number(pay2), status: 'pending', external_reference: String(order2), transaction_amount: 10, currency_id: 'BRL' });
      assert.equal((await webhook(pay2, 'ts=1,v1=' + '0'.repeat(64))).status, 401);
      assert.equal((await (await webhook(pay2)).json()).outcome, 'noop'); // pendente (Pix aguardando)
      assert.equal(await gems(), 0);
      payments.set(pay2, { id: Number(pay2), status: 'approved', external_reference: String(order2), transaction_amount: 10, currency_id: 'BRL' });
      const outcomes = await Promise.all([webhook(pay2), webhook(pay2), webhook(pay2), webhook(pay2)].map(async r => (await (await r).json()).outcome));
      assert.equal(outcomes.filter(o => o === 'credited').length, 1, outcomes.join(','));
      assert.equal(await gems(), 220); assert.equal(await ledgerSum(), 220);
      assert.equal(await processMercadoPagoPayment(pay2), 'duplicate');
      const order = await prisma.premiumOrder.findUniqueOrThrow({ where: { id: order2 } });
      assert.equal(order.status, 'PAID'); assert.equal(order.providerPaymentId, pay2);
      const entry = await prisma.gemLedger.findFirstOrThrow({ where: { accountId: buyer.id, reason: 'PURCHASE' } });
      assert.equal(entry.refType, 'order'); assert.equal(entry.refId, order2); assert.equal(entry.balanceAfter, 220);
    });

    await t.test('valor divergente não credita; o valor certo depois credita', async () => {
      const wrong = pid();
      payments.set(wrong, { id: Number(wrong), status: 'approved', external_reference: String(order1), transaction_amount: 1, currency_id: 'BRL' });
      assert.equal(await processMercadoPagoPayment(wrong), 'amount_mismatch');
      assert.equal(await gems(), 220);
      payments.set(pay1, { id: Number(pay1), status: 'approved', external_reference: String(order1), transaction_amount: 5, currency_id: 'BRL' });
      assert.equal(await processMercadoPagoPayment(pay1), 'credited');
      assert.equal(await gems(), 320);
    });

    let firstEnd = new Date(0);
    await t.test('ativar o Premium gasta as gemas uma vez por clique e libera os benefícios', async () => {
      assert.equal((await premiumStatus(prisma, buyer.id)).active, false);
      assert.equal((await call(cookie, '/premium/activate', {})).status, 400); // sem chave de operação
      const key = randomUUID();
      const results = await Promise.all([1, 2, 3].map(() => call(cookie, '/premium/activate', {}, key)));
      assert.deepEqual(results.map(r => r.status), [200, 200, 200]);
      const bodies = await Promise.all(results.map(r => r.json()));
      assert.equal(new Set(bodies.map(b => b.periodId)).size, 1);
      assert.equal(await gems(), 20); assert.equal(await ledgerSum(), 20);
      const status = await premiumStatus(prisma, buyer.id);
      assert.equal(status.active, true);
      const period = await prisma.premiumPeriod.findFirstOrThrow({ where: { accountId: buyer.id } });
      assert.equal(period.source, 'GEMS'); assert.equal(period.gemsSpent, 300); assert.equal(period.days, 30);
      firstEnd = period.endsAt;
      const premiumEntry = await prisma.gemLedger.findFirstOrThrow({ where: { accountId: buyer.id, reason: 'PREMIUM' } });
      assert.equal(premiumEntry.delta, -300); assert.equal(premiumEntry.refType, 'period'); assert.equal(premiumEntry.refId, period.id);
      // Benefício prometido na tela: conjuntos de equipamento só para Premium.
      const hero = await prisma.character.findFirstOrThrow({ where: { accountId: buyer.id } });
      assert.equal((await call(cookie, `/characters/${hero.id}/hunt-stats?days=7`)).status, 200);
      const short = await call(cookie, '/premium/activate', {}, randomUUID());
      assert.equal(short.status, 409); assert.match((await short.json()).error, /Gemas insuficientes/);
      assert.equal(await gems(), 20);
      assert.equal(await prisma.premiumPeriod.count({ where: { accountId: buyer.id } }), 1);
    });

    await t.test('ajuste da equipe exige motivo e chave, é auditado; renovar encadeia o novo período', async () => {
      assert.equal((await call(adminCookie, `/admin/accounts/${buyer.id}/gems`, { delta: 300, reason: 'x' }, randomUUID())).status, 400);
      assert.equal((await call(adminCookie, `/admin/accounts/${buyer.id}/gems`, { delta: 300, reason: 'Compra que não chegou' })).status, 400);
      const key = randomUUID();
      const [a, b] = await Promise.all([1, 2].map(() => call(adminCookie, `/admin/accounts/${buyer.id}/gems`, { delta: 300, reason: 'Compra que não chegou' }, key)));
      assert.equal(a.status, 201); assert.equal(b.status, 201);
      assert.equal(await gems(), 320);
      assert.equal(await prisma.adminAuditLog.count({ where: { action: 'GEMS_ADJUST', targetId: buyer.id } }), 1);
      assert.equal((await call(cookie, `/admin/accounts/${buyer.id}/gems`, { delta: 999, reason: 'Tentativa do jogador' }, randomUUID())).status, 403);
      const renewed = await (await call(cookie, '/premium/activate', {}, randomUUID())).json();
      assert.equal(new Date(renewed.startsAt).getTime(), firstEnd.getTime());
      assert.equal(await gems(), 20);
      const status = await premiumStatus(prisma, buyer.id);
      assert.equal(new Date(status.until!).getTime(), firstEnd.getTime() + 30 * 86_400_000);
    });

    await t.test('reembolso tira as gemas uma vez (saldo pode ficar devendo) e bloqueia nova ativação', async () => {
      payments.set(pay2, { id: Number(pay2), status: 'refunded', external_reference: String(order2), transaction_amount: 10, currency_id: 'BRL' });
      assert.equal((await (await webhook(pay2)).json()).outcome, 'refunded');
      assert.equal(await processMercadoPagoPayment(pay2), 'duplicate');
      payments.set(pay2, { id: Number(pay2), status: 'charged_back', external_reference: String(order2), transaction_amount: 10, currency_id: 'BRL' });
      assert.equal(await processMercadoPagoPayment(pay2), 'noop');
      assert.equal(await gems(), -200); assert.equal(await ledgerSum(), -200);
      assert.equal((await prisma.premiumOrder.findUniqueOrThrow({ where: { id: order2 } })).status, 'REFUNDED');
      assert.equal(await prisma.gemLedger.count({ where: { accountId: buyer.id, reason: 'REFUND' } }), 1);
      assert.equal((await call(cookie, '/premium/activate', {}, randomUUID())).status, 409);
      // Pedido recusado não credita nada.
      const order3 = (await (await call(cookie, '/gems/checkout', { pack: 'pack3' })).json()).orderId, pay3 = pid();
      payments.set(pay3, { id: Number(pay3), status: 'rejected', external_reference: String(order3), transaction_amount: 25, currency_id: 'BRL' });
      assert.equal(await processMercadoPagoPayment(pay3), 'failed');
      assert.equal(await gems(), -200);
    });

    await t.test('histórico: jogador vê compras e extrato em páginas; admin vê as compras de todos', async () => {
      const orders = await (await call(cookie, '/gems/orders')).json();
      assert.equal(orders.total, 3); assert.equal(orders.items[0].gems, 600); assert.equal(orders.items[0].status, 'FAILED');
      const history = await (await call(cookie, '/gems/history')).json();
      assert.deepEqual(history.items.map((e: { reason: string }) => e.reason), ['REFUND', 'PREMIUM', 'ADMIN', 'PREMIUM', 'PURCHASE', 'PURCHASE']);
      assert.equal(history.items[0].balanceAfter, -200);
      assert.equal((await call(cookie, '/admin/orders')).status, 403);
      const adminOrders = await (await call(adminCookie, '/admin/orders?status=REFUNDED')).json();
      assert.ok(adminOrders.items.some((o: { id: number }) => o.id === order2)); assert.ok(adminOrders.pages >= 1);
      const detail = await (await call(adminCookie, `/admin/accounts/${buyer.id}`)).json();
      assert.equal(detail.gems, -200); assert.equal(detail.gemLedger.length, 6);
    });
  } finally {
    globalThis.fetch = realFetch; delete process.env.MP_ACCESS_TOKEN; delete process.env.MP_WEBHOOK_SECRET;
    server.close(); await prisma.$disconnect();
  }
});
