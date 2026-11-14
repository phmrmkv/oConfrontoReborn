// Gemas: moeda da conta, comprada com dinheiro real (Mercado Pago) e gasta para ativar ou renovar o Premium.
// Gemas nunca viram ouro, XP, item nem vantagem de combate. Preços e quantidades vêm de loadSettings (chaves gems.* e premium.gemPrice).
import type { Settings } from './economy';

export const gemPackKeys = ['pack1', 'pack2', 'pack3', 'pack4'] as const;
export type GemPackKey = typeof gemPackKeys[number];
export interface GemPack { key: GemPackKey; gems: number; cents: number; bonusPercent: number }

// Pacotes à venda (preço > 0), com o bônus de cada um em relação ao pacote mais barato por gema.
export function gemPacks(settings: Pick<Settings, `gems.${GemPackKey}.gems` | `gems.${GemPackKey}.cents`>): GemPack[] {
  const packs = gemPackKeys.map(key => ({ key, gems: settings[`gems.${key}.gems`], cents: settings[`gems.${key}.cents`] })).filter(p => p.cents > 0 && p.gems > 0);
  const worst = Math.min(...packs.map(p => p.gems / p.cents));
  return packs.map(p => ({ ...p, bonusPercent: Math.max(0, Math.round((p.gems / p.cents / worst - 1) * 100)) }));
}
export const isGemPackKey = (value: unknown): value is GemPackKey => typeof value === 'string' && (gemPackKeys as readonly string[]).includes(value);

// Motivos do extrato de gemas. Compra entra; Premium e reembolso saem; ajuste da equipe pode ir para os dois lados.
export const gemReasons = {
  PURCHASE: 'Compra de gemas',
  PREMIUM: 'Premium ativado',
  REFUND: 'Compra reembolsada',
  CHARGEBACK: 'Compra estornada',
  ADMIN: 'Ajuste da equipe',
} as const;
export type GemReason = keyof typeof gemReasons;
