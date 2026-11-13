// Uso: npm run rarity:simulate -- [duelos=1000]
// Mede o peso da raridade do exemplar (shared/rarity.ts) com os heróis típicos de levels:simulate. Não toca no banco.
//  1. Caçada: quanto o ataque e a defesa sobem com o conjunto todo em cada raridade.
//  2. Duelo: taxa de vitória de quem veste o conjunto todo Mítico contra o MESMO herói todo Comum, conforme
//     pvp.rarityPercent (quanto da vantagem da raridade vale no duelo). Espelhado, para isolar o equipamento da vocação.
//  3. Duelo: o mesmo, com o conjunto todo +10 contra todo +0, conforme pvp.upgradePercent.
import { items } from '../backend/prisma/catalog';
import { hero, allVocations } from './levelSim';
import { resolveDuelRound, duelTuningOf, type DuelFighter } from '../backend/src/game/duelEngine';
import { duelActionCosts, type DuelAction } from '../shared/pvp';
import { MAX_RARITY, rarities } from '../shared/rarity';
import { defaultSettings } from '../shared/economy';
import type { BaseVocation } from '../shared/adventure';

const duels = Number(process.argv[2] ?? 1000), levels = [20, 100, 300, 600, 1000], percents = [100, 75, 50, 25, 0];
let seed = 4242; const rng = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
const dice = (min: number, max: number) => min + Math.floor(rng() * (max - min + 1));
const pct = (v: number) => `${Math.round(v * 100)}%`.padStart(5);

console.log('1. Caçada: ganho com o conjunto todo na raridade (ataque / defesa), sobre o conjunto Comum');
console.log('nível'.padEnd(7) + 'vocação'.padEnd(10) + rarities.slice(1).map(r => r.name.padStart(13)).join(''));
for (const level of levels) for (const v of allVocations) {
  const base = hero(v, level, items).stats;
  const cells = Array.from({ length: MAX_RARITY }, (_, n) => { const s = hero(v, level, items, 0, n + 1).stats;
    return `+${Math.round((s.attack / base.attack - 1) * 100)}% / +${Math.round((s.defense / base.defense - 1) * 100)}%`.padStart(13); });
  console.log(String(level).padEnd(7) + v.padEnd(10) + cells.join(''));
}

function fighter(id: number, v: BaseVocation, level: number, rarity: number, rarityPercent: number, tier = 0, upgradePercent = 100): DuelFighter {
  const h = hero(v, level, items, tier, rarity, rarityPercent, upgradePercent);
  return { characterId: id, name: v, vocation: h.c.vocation, hp: h.maxHp, maxHp: h.maxHp, mana: h.maxMana, maxMana: h.maxMana,
    attack: h.stats.attack, defense: h.stats.defense, agility: h.c.agility, criticalChance: h.stats.criticalChance, dodgeChance: h.stats.dodgeChance, critDamage: h.stats.critDamage, lifeSteal: h.stats.lifeSteal, healPower: h.stats.healPower, action: null, missed: 0 };
}
// Mesma política de duel:simulate.
function choose(f: DuelFighter): DuelAction {
  const c = duelActionCosts(f.vocation), r = rng();
  if (f.hp < f.maxHp * .35 && f.mana >= c.HEAL) return 'HEAL';
  if (r < .15 && f.mana >= c.INTERRUPT) return 'INTERRUPT';
  if (r < .25 && f.mana >= c.DEFEND_SHIELD) return 'DEFEND_SHIELD';
  if (f.mana >= c.FIFTH_HIT + c.HEAL) return 'FIFTH_HIT';
  if (f.mana >= c.TRIPLE_HIT + c.HEAL) return 'TRIPLE_HIT';
  return 'ATTACK';
}
// `strong` e `weak`: como montar o herói melhor equipado (id 1) e o outro (id 2).
function mirror(v: BaseVocation, level: number, rarityPercent: number, strong = (id: number) => fighter(id, v, level, MAX_RARITY, rarityPercent), weak = (id: number) => fighter(id, v, level, 0, rarityPercent)) {
  let wins = 0, losses = 0;
  for (let n = 0; n < duels; n++) {
    let pair: [DuelFighter, DuelFighter] = n % 2 ? [strong(1), weak(2)] : [weak(2), strong(1)];
    for (let round = 1; ; round++) {
      pair = pair.map(f => ({ ...f, action: choose(f) })) as typeof pair;
      const r = resolveDuelRound(round, pair, dice, duelTuningOf(defaultSettings()));
      pair = r.fighters;
      if (r.outcome !== 'ONGOING') { if (r.winnerId === 1) wins++; else if (r.winnerId === 2) losses++; break; }
    }
  }
  // Empates ficam de fora: a pergunta é quem ganha quando alguém ganha.
  return wins + losses ? wins / (wins + losses) : .5;
}
console.log(`\n2. Duelo espelhado: vitória do conjunto todo Mítico contra o mesmo herói todo Comum (${duels} duelos por célula)`);
console.log('nível'.padEnd(7) + 'vocação'.padEnd(10) + percents.map(p => `vale ${p}%`.padStart(11)).join(''));
const worst: Record<number, number> = {};
for (const level of levels) for (const v of allVocations) {
  const cells = percents.map(p => { const w = mirror(v, level, p); worst[p] = Math.max(worst[p] ?? 0, w); return pct(w).padStart(11); });
  console.log(String(level).padEnd(7) + v.padEnd(10) + cells.join(''));
}
console.log('pior caso'.padEnd(17) + percents.map(p => pct(worst[p]).padStart(11)).join(''));
console.log(`\nPadrão de pvp.rarityPercent: ${defaultSettings()['pvp.rarityPercent']}%. Com 0% a raridade não conta no duelo (referência: perto de 50%).`);

console.log(`\n3. Duelo espelhado: vitória do conjunto todo +10 contra o mesmo herói todo +0, ambos Comuns (${duels} duelos por célula)`);
console.log('nível'.padEnd(7) + 'vocação'.padEnd(10) + percents.map(p => `vale ${p}%`.padStart(11)).join(''));
const worstUp: Record<number, number> = {};
for (const level of levels) for (const v of allVocations) {
  const cells = percents.map(p => { const w = mirror(v, level, 100, id => fighter(id, v, level, 0, 100, 10, p), id => fighter(id, v, level, 0, 100, 0, p)); worstUp[p] = Math.max(worstUp[p] ?? 0, w); return pct(w).padStart(11); });
  console.log(String(level).padEnd(7) + v.padEnd(10) + cells.join(''));
}
console.log('pior caso'.padEnd(17) + percents.map(p => pct(worstUp[p]).padStart(11)).join(''));
console.log(`\nPadrão de pvp.upgradePercent: ${defaultSettings()['pvp.upgradePercent']}%.`);
