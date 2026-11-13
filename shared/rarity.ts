// Raridade do exemplar: a mesma espada pode cair Comum, Incomum, Rara, Épica, Lendária ou Mítica.
// É uma qualidade de cada exemplar (coluna `rarity`, de 0 a 5, em InventoryItem), não um item a mais no catálogo.
// Só equipamento tem raridade (os mesmos espaços que o Ferreiro trabalha); poções e materiais são sempre Comuns.
// Não confundir com o "item raro numerado" (RareItem): aquele é o exemplar que chegou ao +10.
import { isForgeable } from './forge';

/**
 * `budget`: quanto dos atributos-base (ataque, ataque mágico, defesa e armadura) o exemplar entrega, em %.
 * Crítico, resistência e velocidade não mudam com a raridade, para os tetos do combate continuarem valendo.
 */
export const rarities = [
  { key: 'COMMON', name: 'Comum', budget: 100 },
  { key: 'UNCOMMON', name: 'Incomum', budget: 106 },
  { key: 'RARE', name: 'Raro', budget: 113 },
  { key: 'EPIC', name: 'Épico', budget: 121 },
  { key: 'LEGENDARY', name: 'Lendário', budget: 130 },
  { key: 'MYTHIC', name: 'Mítico', budget: 140 },
] as const;
export const MAX_RARITY = rarities.length - 1;
export const rarityOf = (rarity: number) => rarities[Math.max(0, Math.min(MAX_RARITY, Math.trunc(rarity) || 0))];
export const rarityName = (rarity: number) => rarityOf(rarity).name;
export const hasRarity = (slot: string) => isForgeable(slot);
/** " · Raro" para colar depois do nome do item; vazio para Comum. */
export const raritySuffix = (rarity: number) => rarity > 0 ? ` · ${rarityName(rarity)}` : '';
/**
 * Multiplicador dos atributos-base de um exemplar. `advantagePercent` diz quanto da vantagem da raridade vale:
 * 100 na caçada; no duelo vem de `pvp.rarityPercent` (com 50, um Mítico vale +20% em vez de +40%).
 */
export const rarityMultiplier = (rarity: number, advantagePercent = 100) =>
  1 + (rarityOf(rarity).budget - 100) * Math.max(0, Math.min(100, advantagePercent)) / 10000;

/**
 * Fragmentos de chefe para despertar um exemplar até `target` (um degrau acima do atual): dobra a cada degrau.
 * Com a base padrão de 5: Incomum 5, Raro 10, Épico 20, Lendário 40, Mítico 80 (155 do Comum ao Mítico).
 */
export const awakenCost = (target: number, base: number) => target < 1 || target > MAX_RARITY ? 0 : Math.max(1, Math.trunc(base)) * 2 ** (target - 1);

/** Chances, por 10 mil drops de equipamento, de cada raridade acima de Comum: da Incomum à Mítica. */
export type RarityOdds = readonly [number, number, number, number, number];
export const rarityOddsOf = (s: Record<string, number>): RarityOdds =>
  [s['rarity.uncommonPer10k'], s['rarity.rarePer10k'], s['rarity.epicPer10k'], s['rarity.legendaryPer10k'], s['rarity.mythicPer10k']];
/**
 * Sorteia a raridade de um drop. `roll` é um inteiro de 1 a 10000 e vem de fora, para a regra ser testável.
 * `boostPercent` multiplica as chances de tudo o que não é Comum (drop de chefe); o total nunca passa de 100%.
 * A conta vai da mais rara para a mais comum, e o que sobra é Comum.
 */
export function rollRarity(odds: RarityOdds, roll: number, boostPercent = 100): number {
  if (!Number.isInteger(roll) || roll < 1 || roll > 10000) throw new RangeError('Sorteio de raridade inválido.');
  let edge = 0;
  for (let rarity = MAX_RARITY; rarity >= 1; rarity--) {
    edge += Math.floor(Math.max(0, odds[rarity - 1] || 0) * Math.max(0, boostPercent) / 100);
    if (roll <= Math.min(10000, edge)) return rarity;
  }
  return 0;
}
