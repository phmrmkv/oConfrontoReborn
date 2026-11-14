import { Prisma } from '@prisma/client';
import { GameError } from '../core/engine';
import type { GemReason } from '../../../shared/gems';

export interface GemRef { type: 'order' | 'period' | 'admin'; id: number }
// Único jeito de mudar o saldo de gemas. Chamar dentro da transação que já travou a conta (lockAccount).
// Saldo negativo desfaz a transação, exceto no reembolso/estorno de gemas já gastas (`allowNegative`): aí a conta fica devendo
// e não ativa nada com gemas até comprar de novo.
export async function addGems(tx: Prisma.TransactionClient, accountId: number, delta: number, reason: GemReason, ref?: GemRef, opts: { allowNegative?: boolean; note?: string } = {}) {
  if (!Number.isSafeInteger(delta) || delta === 0) throw new GameError(400, 'Quantidade de gemas inválida.');
  const updated = await tx.account.update({ where: { id: accountId }, data: { gems: { increment: delta } }, select: { gems: true } });
  if (updated.gems < 0 && !opts.allowNegative) throw new GameError(409, 'Gemas insuficientes.');
  await tx.gemLedger.create({ data: { accountId, delta, balanceAfter: updated.gems, reason, refType: ref?.type ?? null, refId: ref?.id ?? null, note: opts.note?.slice(0, 500) ?? null } });
  return updated.gems;
}
