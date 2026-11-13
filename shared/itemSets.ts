// Conjuntos das Eras (plano de itens, Fase 4): o equipamento de cada Era forma um conjunto (ItemBlueprint.setKey).
// Vestir 2 e 4 peças do mesmo conjunto dá bônus; dá para misturar dois conjuntos (2 + 2, 4 + 4). A conta é só em
// backend/src/game/combatStats.ts: % de ataque e defesa sobre o total, e atributos secundários somados aos dos itens
// (com os mesmos tetos de shared/itemStats.ts).
import { secondaryStats, type SecondaryStat } from './itemStats';

export interface SetBonus { attackPercent?: number; defensePercent?: number; critDamage?: number; lifeSteal?: number; healPower?: number; statusResistance?: number }
export interface ItemSet { key: string; name: string; tiers: readonly { pieces: number; bonus: SetBonus }[] }
export const itemSets: readonly ItemSet[] = [
  { key: 'era1', name: 'Guardião da 1ª Era', tiers: [{ pieces: 2, bonus: { defensePercent: 4 } }, { pieces: 4, bonus: { statusResistance: 10 } }] },
  { key: 'era2', name: 'Caçador da 2ª Era', tiers: [{ pieces: 2, bonus: { attackPercent: 4 } }, { pieces: 4, bonus: { critDamage: 10 } }] },
  { key: 'era3', name: 'Sábio da 3ª Era', tiers: [{ pieces: 2, bonus: { defensePercent: 4 } }, { pieces: 4, bonus: { healPower: 15 } }] },
  { key: 'era4', name: 'Vigia da 4ª Era', tiers: [{ pieces: 2, bonus: { attackPercent: 4 } }, { pieces: 4, bonus: { lifeSteal: 2 } }] },
  { key: 'capriel', name: 'Herdeiro de Capriel', tiers: [{ pieces: 2, bonus: { attackPercent: 5, defensePercent: 5 } }, { pieces: 4, bonus: { critDamage: 10, statusResistance: 10 } }] },
];
/** Chave do conjunto de cada Era do catálogo, na ordem das Eras (backend/prisma/catalog.ts, eraGear). */
export const eraSetKeys = ['era1', 'era2', 'era3', 'era4', 'capriel'] as const;
export const setOf = (key?: string | null) => itemSets.find(s => s.key === key) ?? null;

/** Texto de um bônus para a tela ("ataque +4%", "dano crítico +10%"). */
export function describeBonus(b: SetBonus): string {
  const parts: string[] = [];
  if (b.attackPercent) parts.push(`ataque +${b.attackPercent}%`);
  if (b.defensePercent) parts.push(`defesa +${b.defensePercent}%`);
  for (const s of secondaryStats) { const v = b[s.key as SecondaryStat]; if (v) parts.push(`${s.label.toLowerCase()} ${s.key === 'critDamage' || s.key === 'healPower' ? '+' : ''}${v}%`); }
  return parts.join(', ');
}

/** Bônus somados de todos os conjuntos, a partir de quantas peças de cada um estão vestidas.
 * `percent`: quanto deles vale (100 na caçada; o duelo passa pvp.setPercent). */
export function setBonuses(pieces: Record<string, number>, percent = 100) {
  const scale = Math.max(0, Math.min(100, percent)) / 100;
  const total: Required<SetBonus> = { attackPercent: 0, defensePercent: 0, critDamage: 0, lifeSteal: 0, healPower: 0, statusResistance: 0 };
  const active: { key: string; name: string; pieces: number; bonus: string }[] = [];
  for (const set of itemSets) {
    const worn = pieces[set.key] ?? 0, reached = set.tiers.filter(t => worn >= t.pieces);
    if (!reached.length) continue;
    for (const t of reached) for (const k of Object.keys(total) as (keyof SetBonus)[]) total[k] += (t.bonus[k] ?? 0) * scale;
    active.push({ key: set.key, name: set.name, pieces: worn, bonus: reached.map(t => `${t.pieces} peças: ${describeBonus(t.bonus)}`).join(' · ') });
  }
  return { ...total, active };
}
