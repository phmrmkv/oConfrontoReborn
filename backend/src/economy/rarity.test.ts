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

test('Ferreiro: cada falha soma chance à próxima tentativa do mesmo item, com teto', async () => {
  const { upgradeSuccessPercent, upgradeBreakPercent, upgradeFailBonus, upgradeFailCap, resolveUpgrade, defaultSettings: d } = await import('../../../shared/economy');
  const { analyzeForge, monteCarloForge } = await import('../../../shared/forgeSim');
  const rules = { safeUntilTier: 3, breakFromTier: 6, breakOnFailPercent: 50, failBonusPercent: 5, failBonusMax: 15 };
  assert.deepEqual([0, 1, 2, 3, 4, 9].map(f => upgradeFailBonus(f, rules)), [0, 5, 10, 15, 15, 15]);
  assert.equal(upgradeFailCap(rules), 3); assert.equal(upgradeFailCap({ failBonusPercent: 0, failBonusMax: 15 }), 0);
  assert.equal(upgradeFailBonus(5, {}), 0, 'sem a regra, nenhuma ajuda');
  // +9→+10: 25%, com 3 falhas seguidas 40%; a quebra cai junto (falha × 50%).
  assert.equal(upgradeSuccessPercent(9, 3, upgradeFailBonus(3, rules)), 40);
  assert.equal(upgradeBreakPercent(9, rules, 0), 37.5); assert.equal(upgradeBreakPercent(9, rules, 3), 30);
  assert.equal(upgradeSuccessPercent(3, 3, 50), 100, 'nunca passa de 100%');
  assert.equal(upgradeSuccessPercent(1, 3, 50), 100);
  // O mesmo sorteio que falhava passa com a ajuda.
  assert.equal(resolveUpgrade(9, rules, 40, 100, 0), 'FAILED');
  assert.equal(resolveUpgrade(9, rules, 40, 100, 3), 'SUCCESS');
  // Sem falhas, a regra é idêntica à antiga.
  for (let t = 0; t < 10; t++) for (const roll of [1, 25, 50, 85, 100]) assert.equal(resolveUpgrade(t, rules, roll, roll, 0), resolveUpgrade(t, { safeUntilTier: 3, breakFromTier: 6, breakOnFailPercent: 50 }, roll, roll));
  // Simulador exato com a ajuda bate com o sorteio e sai mais barato que sem ela.
  const cost = (t: number) => 100 * (t + 1), ex = analyzeForge(rules, 10, cost, 1000);
  let x = 11; const rng = () => (x = (x * 1664525 + 1013904223) % 4294967296) / 4294967296;
  const mc = monteCarloForge(rules, 10, cost, 1000, 30000, rng);
  assert.ok(Math.abs(mc.expectedItemsUsed - ex.expectedItemsUsed) / ex.expectedItemsUsed < 0.05, `${mc.expectedItemsUsed} vs ${ex.expectedItemsUsed}`);
  assert.ok(Math.abs(mc.expectedGold - ex.expectedGold) / ex.expectedGold < 0.05);
  const plain = analyzeForge({ safeUntilTier: 3, breakFromTier: 6, breakOnFailPercent: 50 }, 10, cost, 1000);
  assert.ok(ex.expectedItemsUsed < plain.expectedItemsUsed && ex.survivalChance > plain.survivalChance);
  assert.deepEqual([d()['upgrade.failBonusPercent'], d()['upgrade.failBonusMax']], [5, 15]);
});

test('fragmentos de chefe: despertar custa o dobro a cada degrau', async () => {
  const { awakenCost } = await import('../../../shared/rarity');
  const { itemReasons } = await import('../../../shared/economy');
  assert.deepEqual([1, 2, 3, 4, 5].map(t => awakenCost(t, 5)), [5, 10, 20, 40, 80]);
  assert.equal([1, 2, 3, 4, 5].reduce((s, t) => s + awakenCost(t, 5), 0), 155);
  assert.deepEqual([0, 6].map(t => awakenCost(t, 5)), [0, 0], 'Comum não é destino e não há nada acima de Mítico');
  assert.deepEqual([1, 5].map(t => awakenCost(t, 0)), [1, 16], 'base nunca abaixo de 1');
  assert.equal(itemReasons.FORGE_AWAKEN_OUT, 'sink'); assert.equal(itemReasons.FORGE_AWAKEN_IN, 'source');
  assert.equal(defaultSettings()['boss.fragmentsPerWin'], 1); assert.equal(defaultSettings()['boss.awakenBaseFragments'], 5);
});

test('comércio limitado: como chega o que cai e o que fica fora do Espólio', async () => {
  const { bindingOnDrop, bindingLabel, FREE, BOUND, BIND_ON_EQUIP } = await import('../../../shared/binding');
  const { lootEligible } = await import('../../../shared/pvp');
  assert.deepEqual([0, 1].map(r => bindingOnDrop(r, true)), [FREE, FREE], 'Comum e Incomum são livres, até de chefe');
  assert.deepEqual([2, 3].map(r => bindingOnDrop(r, false)), [BIND_ON_EQUIP, BIND_ON_EQUIP]);
  assert.deepEqual([4, 5].map(r => bindingOnDrop(r, false)), [BIND_ON_EQUIP, BIND_ON_EQUIP], 'Lendário e Mítico fora de chefe só vinculam ao equipar');
  assert.deepEqual([4, 5].map(r => bindingOnDrop(r, true)), [BOUND, BOUND]);
  assert.deepEqual([bindingLabel(FREE), bindingLabel(BOUND), bindingLabel(BIND_ON_EQUIP)], [null, 'Vinculado', 'Vincula ao equipar']);
  const base = { isEquipped: false, favorite: false, rareItemId: null, upgradeTier: 0, quantity: 1, slot: 'WEAPON' };
  assert.equal(lootEligible(base, 7), true); assert.equal(lootEligible({ ...base, bound: true }, 7), false); assert.equal(lootEligible({ ...base, bound: false }, 7), true);
  assert.equal(defaultSettings()['market.rareSaleFeePercent'], 10);
});
