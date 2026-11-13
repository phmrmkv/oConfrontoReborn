import test from 'node:test';
import assert from 'node:assert/strict';
import { healRoll, resolveTurn, strike, type Dice, type Fighter } from '../core/engine';
import { combatStats } from './combatStats';
import { resolveDuelRound, type DuelFighter } from './duelEngine';
import { describeSecondary, secondaryCap, secondaryStats } from '../../../shared/itemStats';
import { items } from '../../prisma/catalog';

const max: Dice = (_a, b) => b, min: Dice = a => a;
// Conta quantos dados foram rolados, para provar que atributo zerado não rola nada a mais.
const counting = (dice: Dice) => { let calls = 0; const d: Dice = (a, b) => { calls++; return dice(a, b); }; return { d, calls: () => calls }; };
const hero = { strength: 10, agility: 10, resistance: 10, level: 1, vocation: 'KNIGHT' };
const gear = (extra: object) => ({ upgradeTier: 0, blueprint: { attack: 0, defense: 0, armor: 0, magicAttack: 0, criticalChance: 0, fireResistance: 0, speed: 0, ...extra } });

test('atributos secundários: somam dos itens e param no teto', () => {
  const none = combatStats(hero, []);
  assert.deepEqual([none.critDamage, none.lifeSteal, none.healPower, none.statusResistance], [0, 0, 0, 0]);
  const some = combatStats(hero, [gear({ critDamage: 10, lifeSteal: 2 }), gear({ critDamage: 5, healPower: 7, statusResistance: 12 })]);
  assert.deepEqual([some.critDamage, some.lifeSteal, some.healPower, some.statusResistance], [15, 2, 7, 12]);
  const lots = combatStats(hero, [gear({ critDamage: 500, lifeSteal: 500, healPower: 500, statusResistance: 500 })]);
  assert.deepEqual([lots.critDamage, lots.lifeSteal, lots.healPower, lots.statusResistance], [secondaryCap.critDamage, secondaryCap.lifeSteal, secondaryCap.healPower, secondaryCap.statusResistance]);
  // Raridade e +N não mexem nos secundários.
  const rare = combatStats(hero, [{ ...gear({ lifeSteal: 3 }), upgradeTier: 10, rarity: 5 }]);
  assert.equal(rare.lifeSteal, 3);
  assert.deepEqual(describeSecondary({ critDamage: 15, lifeSteal: 0, statusResistance: 10 }), ['Dano crítico +15%', 'Resistência a efeitos 10%']);
  assert.equal(secondaryStats.length, 4);
});

test('catálogo: todo atributo secundário respeita o teto num item só e só aparece em equipamento', () => {
  for (const i of items) for (const s of secondaryStats) {
    const v = (i as unknown as Record<string, number | undefined>)[s.key] ?? 0;
    assert(v >= 0 && v <= s.cap, `${i.name}: ${s.key} ${v}`);
    if (v) assert(!['LOOT', 'CONSUMABLE', 'BACKPACK'].includes(i.slot), `${i.name} não é equipamento`);
  }
  assert(items.some(i => (i.lifeSteal ?? 0) > 0) && items.some(i => (i.critDamage ?? 0) > 0) && items.some(i => (i.healPower ?? 0) > 0) && items.some(i => (i.statusResistance ?? 0) > 0));
});

test('dano crítico: soma ao 1,5 do crítico', () => {
  const base: Fighter = { hp: 100, maxHp: 100, mana: 0, attack: 100, defense: 0, criticalChance: 100 };
  const plain = strike(base, 0, 'ATTACK', max), strong = strike({ ...base, critDamage: 50 }, 0, 'ATTACK', max);
  assert(plain.crit && strong.crit);
  assert.equal(plain.dealt, Math.floor(120 * 1.5)); assert.equal(strong.dealt, 120 * 2);
  assert.equal(strike({ ...base, critDamage: 900 }, 0, 'ATTACK', max).dealt, 120 * 2.5, 'teto de +100%');
});

test('poder de cura: aumenta a cura da vocação', () => {
  const f = { maxHp: 1000, vocation: 'KNIGHT' };
  assert.equal(healRoll({ ...f, healPower: 20 }, max), Math.floor(healRoll(f, max) * 1.2));
  assert.equal(healRoll({ ...f, healPower: 0 }, max), healRoll(f, max));
});

test('roubo de vida: cura parte do dano, com teto na vida máxima por golpe', () => {
  const monster = { hp: 1_000_000, attack: 1, defense: 0 };
  const p: Fighter = { hp: 500, maxHp: 1000, mana: 100, attack: 400, defense: 1000, criticalChance: 0, lifeSteal: 5 };
  const r = resolveTurn(p, monster, 'ATTACK', max);
  // 400 × 1,2 = 480 de dano; 5% = 24; teto de 5% de 1000 = 50; vale 24.
  assert.equal(r.dealt, 480); assert.equal(r.stolen, 24); assert.match(r.log.join(' '), /Roubo de vida: você recupera 24/);
  // Golpe enorme: o teto da vida máxima manda (5% de 1000 = 50).
  const big = resolveTurn({ ...p, attack: 40_000 }, monster, 'ATTACK', max);
  assert.equal(big.stolen, 50);
  // Vida cheia não rouba; sem o atributo, nada muda.
  assert.equal(resolveTurn({ ...p, hp: 1000 }, monster, 'ATTACK', max).stolen, 0);
  assert.equal(resolveTurn({ ...p, lifeSteal: 0 }, monster, 'ATTACK', max).stolen, 0);
});

test('resistência a efeitos: pode evitar o efeito; zerada, não rola dado a mais', () => {
  const monster = { hp: 1_000_000, attack: 50, defense: 0, status: 'POISON' as const };
  const p: Fighter = { hp: 1000, maxHp: 1000, mana: 100, attack: 10, defense: 0, criticalChance: 0 };
  // Com o dado no mínimo, o veneno sempre pega; com resistência, o mesmo dado mínimo também resiste.
  const poisoned = resolveTurn(p, monster, 'ATTACK', min);
  assert.equal(poisoned.inflicted, 'POISON');
  const resisted = resolveTurn({ ...p, statusResistance: 30 }, monster, 'ATTACK', min);
  assert.equal(resisted.inflicted, null); assert.match(resisted.log.join(' '), /Você resiste: veneno não pega/);
  // Mesmo número de dados com o atributo zerado ou ausente.
  const a = counting(min), b = counting(min);
  resolveTurn(p, monster, 'ATTACK', a.d); resolveTurn({ ...p, statusResistance: 0, lifeSteal: 0, critDamage: 0, healPower: 0 }, monster, 'ATTACK', b.d);
  assert.equal(a.calls(), b.calls());
});

test('duelo: roubo de vida vale só a parte configurada', () => {
  const fighter = (id: number, extra: Partial<DuelFighter> = {}): DuelFighter => ({ characterId: id, name: `F${id}`, vocation: 'KNIGHT', hp: 1000, maxHp: 1000, mana: 100, maxMana: 100,
    attack: 3000, defense: 0, agility: id === 1 ? 50 : 10, criticalChance: 0, dodgeChance: 0, action: 'ATTACK', missed: 0, ...extra });
  const tuning = (lifeStealPercent: number) => ({ damagePercent: 10, healPercent: 100, defensePercent: 100, lifeStealPercent });
  // O 1 age primeiro (mais agilidade), está ferido e rouba 10% (teto). O golpe dele causa 360 (3000 × 1,2 × 10%).
  const full = resolveDuelRound(1, [fighter(1, { hp: 500, lifeSteal: 10 }), fighter(2)], max, tuning(100));
  const half = resolveDuelRound(1, [fighter(1, { hp: 500, lifeSteal: 10 }), fighter(2)], max, tuning(50));
  const first = (r: typeof full) => r.record.moves.find(m => m.characterId === 1)!;
  assert.equal(first(full).dealt, 360); assert.equal(first(full).stolen, 36); assert.equal(first(half).stolen, 18);
  assert.equal(resolveDuelRound(1, [fighter(1, { hp: 500, lifeSteal: 10 }), fighter(2)], max, tuning(0)).record.moves.find(m => m.characterId === 1)!.stolen, undefined);
});
