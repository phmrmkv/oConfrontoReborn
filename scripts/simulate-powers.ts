// Uso: npm run powers:simulate -- [lutas=300]
// Mede o efeito dos poderes novos (shared/powers.ts) na caçada solo: para cada chefe e para a criatura comum mais forte de cada
// região, compara o jogador atento de hoje (levelSim: cura, defende, especiais) com o mesmo jogador usando também o poder da
// vocação e Meditar. Mesmo herói, mesma semente de dados. Não toca no banco.
import { items, monsters } from '../backend/prisma/catalog';
import { resolveTurn, monsterIntent, type Action } from '../backend/src/core/engine';
import { hero, allVocations, resetRng, type Hero, type Foe } from './levelSim';
import { skillCosts, vocations } from '../shared/adventure';
import { monsterStatus, type ActiveEffect } from '../shared/statusEffects';
import { powers, vocationPower, type Buff, type FoeEffect, type PowerKey } from '../shared/powers';

const [fights = 300] = process.argv.slice(2).map(Number);
let seed = 12345; const rng = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
const dice = (min: number, max: number) => min + Math.floor(rng() * (max - min + 1));

function fight(h: Hero, m: Foe, usePowers: boolean) {
  const costs = skillCosts(h.c.vocation), own = vocationPower(h.c.vocation);
  let hp = h.maxHp, mana = h.maxMana, monsterHp = m.hp, turn = 0, effects: ActiveEffect[] = [];
  let foeEffects: FoeEffect[] = [], buffs: Buff[] = [], cooldowns: Partial<Record<PowerKey, number>> = {};
  const status = monsterStatus(m);
  while (turn < 60) {
    const intent = monsterIntent({ ...m, turn }, turn), ready = (k: PowerKey) => !(cooldowns[k] ?? 0);
    let action: Action;
    if (hp < h.maxHp * .35 && mana >= costs.HEAL) action = 'HEAL';
    else if (intent.warning && mana >= costs.DEFEND_SHIELD) action = 'DEFEND_SHIELD';
    else if (usePowers && mana < costs.HEAL && ready('MEDITATE')) action = 'MEDITATE';
    else if (usePowers && ready(own) && mana >= powers[own].mana + costs.HEAL && !(own === 'POISON_ARROW' && foeEffects.some(e => e.kind === 'POISON'))
      && !(own === 'FROST_BOLT' && foeEffects.some(e => e.kind === 'SLOW'))) action = 'POWER';
    else if (mana >= costs.FIFTH_HIT + costs.HEAL) action = 'FIFTH_HIT';
    else if (mana >= costs.TRIPLE_HIT + costs.HEAL) action = 'TRIPLE_HIT';
    else action = 'ATTACK';
    const r = resolveTurn({ hp, maxHp: h.maxHp, mana, maxMana: h.maxMana, ...h.stats, agility: h.c.agility, vocation: h.c.vocation, effects, buffs, cooldowns },
      { hp: monsterHp, attack: m.attack, defense: m.defense, isBoss: m.isBoss, turn, element: m.element, status, maxHp: m.hp, foeEffects }, action, dice);
    hp = r.hp; mana = r.mana; monsterHp = r.monsterHp; effects = r.effects; foeEffects = r.foeEffects; buffs = r.buffs; cooldowns = r.cooldowns; turn++;
    if (r.status !== 'ONGOING') return { won: r.status === 'VICTORY', turns: turn, lost: 1 - hp / h.maxHp };
  }
  return { won: false, turns: turn, lost: 1 - hp / h.maxHp };
}
const pick = [...monsters].filter(m => m.isBoss || !monsters.some(o => !o.isBoss && o.regionKey === m.regionKey && o.level > m.level)).sort((a, b) => a.level - b.level);
const pct = (x: number) => `${Math.round(x * 100)}%`.padStart(4), sgn = (x: number, f = pct) => (x >= 0 ? '+' : '') + f(x).trim();
console.log(`\nPoderes — ${fights} lutas por linha. Hoje → com poderes (vitória, turnos, vida perdida).\n`);
const total: Record<string, { w: number; t: number; n: number }> = {};
for (const m of pick) {
  const line = allVocations.map(voc => {
    const h = hero(voc, m.level, items);
    const run = (use: boolean) => { seed = 12345; resetRng(); let w = 0, t = 0, l = 0; for (let i = 0; i < fights; i++) { const r = fight(h, m, use); if (r.won) w++; t += r.turns; l += r.lost; } return { w: w / fights, t: t / fights, l: l / fights }; };
    const a = run(false), b = run(true);
    (total[voc] ??= { w: 0, t: 0, n: 0 }).w += b.w - a.w; total[voc].t += b.t - a.t; total[voc].n++;
    return `${vocations[voc].name.slice(0, 4)} ${pct(a.w)}→${pct(b.w)} ${a.t.toFixed(1)}→${b.t.toFixed(1)}t`;
  });
  console.log(`${String(m.level).padStart(4)} ${(m.name + (m.isBoss ? ' (chefe)' : '')).padEnd(30)} ${line.join('  ')}`);
}
console.log('\nMédia da mudança por vocação:');
for (const [voc, t] of Object.entries(total)) console.log(`  ${vocations[voc as keyof typeof vocations].name.padEnd(11)} vitória ${sgn(t.w / t.n)}  turnos ${(t.t / t.n >= 0 ? '+' : '') + (t.t / t.n).toFixed(1)}`);
