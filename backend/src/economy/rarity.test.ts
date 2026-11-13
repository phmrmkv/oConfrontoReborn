import test from 'node:test';
import assert from 'node:assert/strict';
import { MAX_RARITY, hasRarity, rarities, rarityMultiplier, rarityName, rarityOddsOf, raritySuffix, rollRarity, type RarityOdds } from '../../../shared/rarity';
import { defaultSettings } from '../../../shared/economy';
import { combatStats } from '../game/combatStats';
import { vocations } from '../../../shared/adventure';

const odds: RarityOdds = [2500, 800, 250, 60, 10];
const blade = (attack: number, extra: object = {}) => ({ upgradeTier: 0, rarity: 0, blueprint: { attack, defense: 0, armor: 0, magicAttack: 0, criticalChance: 0, fireResistance: 0, speed: 0 }, ...extra });
const hero = { strength: 10, agility: 10, resistance: 10, level: 1, vocation: 'KNIGHT' };

test('raridade: seis degraus, orçamento só cresce e Comum não muda nada', () => {
  assert.equal(rarities.length, 6); assert.equal(MAX_RARITY, 5);
  for (let r = 1; r <= MAX_RARITY; r++) assert(rarities[r].budget > rarities[r - 1].budget, rarities[r].name);
  assert.equal(rarityMultiplier(0), 1); assert.equal(rarityMultiplier(0, 50), 1);
  assert.equal(rarityName(5), 'Mítico'); assert.equal(raritySuffix(0), ''); assert.equal(raritySuffix(2), ' · Raro');
  // Valor fora da faixa nunca vira multiplicador absurdo.
  assert.equal(rarityName(99), 'Mítico'); assert.equal(rarityName(-3), 'Comum'); assert.equal(rarityName(Number.NaN), 'Comum');
});

test('raridade: só equipamento tem; poção e material são sempre Comuns', () => {
  for (const slot of ['WEAPON', 'ARMOR', 'HELMET', 'LEGS', 'BOOTS', 'SHIELD', 'AMULET', 'RING', 'AMMO']) assert(hasRarity(slot), slot);
  for (const slot of ['LOOT', 'CONSUMABLE', 'BACKPACK']) assert(!hasRarity(slot), slot);
});

test('sorteio de raridade: faixas exatas, da mais rara para a mais comum', () => {
  assert.equal(rollRarity(odds, 1), 5); assert.equal(rollRarity(odds, 10), 5);
  assert.equal(rollRarity(odds, 11), 4); assert.equal(rollRarity(odds, 70), 4);
  assert.equal(rollRarity(odds, 71), 3); assert.equal(rollRarity(odds, 320), 3);
  assert.equal(rollRarity(odds, 321), 2); assert.equal(rollRarity(odds, 1120), 2);
  assert.equal(rollRarity(odds, 1121), 1); assert.equal(rollRarity(odds, 3620), 1);
  assert.equal(rollRarity(odds, 3621), 0); assert.equal(rollRarity(odds, 10000), 0);
  // Somando todos os sorteios possíveis, cada raridade sai exatamente o que a configuração diz.
  const count = [0, 0, 0, 0, 0, 0]; for (let roll = 1; roll <= 10000; roll++) count[rollRarity(odds, roll)]++;
  assert.deepEqual(count, [6380, 2500, 800, 250, 60, 10]);
});

test('sorteio de raridade: chefe multiplica as chances e o total nunca passa de 100%', () => {
  const count = [0, 0, 0, 0, 0, 0]; for (let roll = 1; roll <= 10000; roll++) count[rollRarity(odds, roll, 300)]++;
  // Com 300%: 30 Míticos, 180 Lendários, 750 Épicos, 2400 Raros; o Incomum fica com o que sobra até 10 mil e não resta Comum.
  assert.deepEqual(count, [0, 6640, 2400, 750, 180, 30]);
  // Chances zeradas: tudo Comum. Sorteio fora de 1..10000 é erro de quem chama.
  assert.equal(rollRarity([0, 0, 0, 0, 0], 1), 0);
  assert.throws(() => rollRarity(odds, 0)); assert.throws(() => rollRarity(odds, 10001)); assert.throws(() => rollRarity(odds, 1.5));
});

test('configurações padrão de raridade são coerentes', () => {
  const o = rarityOddsOf(defaultSettings());
  assert.deepEqual([...o], [2500, 800, 250, 60, 10]);
  assert(o.reduce((t, v) => t + v, 0) < 10000, 'sobra espaço para o Comum');
  for (let i = 1; i < o.length; i++) assert(o[i] < o[i - 1], 'cada raridade é mais difícil que a anterior');
});

test('contas de combate: exemplar Comum dá exatamente o resultado de antes', () => {
  for (const attack of [7, 12, 55, 100, 333, 860]) for (let tier = 0; tier <= 10; tier++) {
    const before = Math.floor(attack * (1 + tier * .1));
    const now = combatStats(hero, [blade(attack, { upgradeTier: tier })]).attack - combatStats(hero, []).attack;
    assert.equal(now, before, `ataque ${attack} +${tier}`);
    // Exemplar antigo, sem o campo, vale como Comum.
    const legacy = { upgradeTier: tier, blueprint: blade(attack).blueprint };
    assert.equal(combatStats(hero, [legacy]).attack, combatStats(hero, [blade(attack, { upgradeTier: tier })]).attack);
  }
});

test('contas de combate: raridade multiplica ataque, magia, defesa e armadura, sem perder ponto por arredondamento', () => {
  const base = combatStats(hero, []).attack;
  // 100 de ataque: 106, 113, 121, 130 e 140 exatos.
  assert.deepEqual([1, 2, 3, 4, 5].map(r => combatStats(hero, [blade(100, { rarity: r })]).attack - base), [106, 113, 121, 130, 140]);
  // Com +10 (dobro) e Mítico: 100 × 2 × 1,4 = 280.
  assert.equal(combatStats(hero, [blade(100, { rarity: 5, upgradeTier: 10 })]).attack - base, 280);
  const armor = { upgradeTier: 0, rarity: 5, blueprint: { attack: 0, defense: 10, armor: 20, magicAttack: 30, criticalChance: 4, fireResistance: 15, speed: 3 } };
  const common = combatStats(hero, [{ ...armor, rarity: 0 }]), mythic = combatStats(hero, [armor]);
  assert.equal(mythic.armor, 28); assert.equal(mythic.magic, 42);
  const scale = vocations.KNIGHT.defenseScale, own = hero.resistance; // defesa = (resistência + defesa do item + 2 × armadura) × escala da vocação
  assert.equal(common.defense, Math.floor((own + 10 + 20 * 2) * scale)); assert.equal(mythic.defense, Math.floor((own + 14 + 28 * 2) * scale));
  // Crítico, resistência a fogo e esquiva não mudam com a raridade.
  assert.equal(mythic.criticalChance, common.criticalChance); assert.equal(mythic.fireResistance, common.fireResistance); assert.equal(mythic.dodgeChance, common.dodgeChance);
});

test('duelo: só parte da vantagem da melhoria +N vale; na caçada, +10 continua dobrando', () => {
  const base = combatStats(hero, []).attack, plus10 = [blade(100, { upgradeTier: 10 })];
  assert.equal(combatStats(hero, plus10).attack - base, 200);
  assert.equal(combatStats(hero, plus10, { upgradePercent: 100 }).attack - base, 200);
  assert.equal(combatStats(hero, plus10, { upgradePercent: 50 }).attack - base, 150);
  assert.equal(combatStats(hero, plus10, { upgradePercent: 0 }).attack - base, 100);
  // Os dois juntos: +10 Mítico no duelo padrão = 100 × 1,5 × 1,2 = 180.
  assert.equal(combatStats(hero, [blade(100, { upgradeTier: 10, rarity: 5 })], { upgradePercent: 50, rarityPercent: 50 }).attack - base, 180);
  // Valores fora da faixa ficam presos entre 0 e 100.
  assert.equal(combatStats(hero, plus10, { upgradePercent: 300 }).attack - base, 200);
  assert.equal(defaultSettings()['pvp.upgradePercent'], 50);
});

test('duelo: só parte da vantagem da raridade vale', () => {
  const base = combatStats(hero, []).attack, mythic = [blade(100, { rarity: 5 })];
  assert.equal(combatStats(hero, mythic, { rarityPercent: 100 }).attack - base, 140);
  assert.equal(combatStats(hero, mythic, { rarityPercent: 50 }).attack - base, 120);
  assert.equal(combatStats(hero, mythic, { rarityPercent: 0 }).attack - base, 100);
  assert.equal(defaultSettings()['pvp.rarityPercent'], 50);
});
