import test from 'node:test';
import assert from 'node:assert/strict';
import vectorsJson from './trialVectors.json';
import { TRIAL_VERSION, climb, elementMult, enemies, fight, fighters, legalCompany, modTop, power, runTrial, seedOf, trialRules as rules } from './trial';

// `trialVectors.json` é escrito pelo app (`-- --trial-export`): companhias montadas com as funções do jogo,
// cada uma com o save como o app envia, os números que o jogo dá aos heróis (`game_stats`, `game_power`) e o
// resultado da Prova calculado lá (`stats`, `power`, `first`, `trial`). Aqui o servidor precisa chegar ao mesmo.
interface Company {
  name: string; save: Record<string, any>; stats: Record<string, any>[]; game_stats: Record<string, any>[];
  power: number; game_power: number; first: { won: boolean; time: number; blows: number; standing: number; digest: number };
  trial: { floor: number; fights: number; digest: number };
}
const vectors = vectorsJson as unknown as { version: number; companies: Company[]; tops: { kind: string; stat: string; level: number; rarity: number; top: number }[] };
// O arquivo guarda 15 dígitos; os números calculados aqui têm 17.
const close = (a: number, b: number) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
const company = (name: string): Company => structuredClone(vectors.companies.find(c => c.name === name)!);
const late = () => company('fim');
const firstHero = (c: Company) => c.save.members.find((m: any) => m.kind === 'hero' && m.in_field);

test('regras e vetores vêm do app no formato que o servidor lê', () => {
  assert.equal(rules.version, TRIAL_VERSION);
  assert.equal(vectors.version, TRIAL_VERSION);
  assert.deepEqual(vectors.companies.map(c => c.name), ['novo', 'meio', 'fim', 'topo']);
  assert(rules.trial.enemies.length > 1 && rules.trial.enemies.every(key => key in rules.creatures));
});

test('os números de cada herói são os que o jogo dá (Game.stats_of)', () => {
  for (const c of vectors.companies) {
    const mine = fighters(c.save, rules);
    assert.equal(mine.length, c.stats.length, c.name);
    mine.forEach((f, i) => {
      assert.equal(f.key, c.stats[i].key); assert.equal(f.key, c.game_stats[i].key);
      assert.equal(f.aspect, c.game_stats[i].aspect);
      for (const s of rules.stats) {
        assert(close(f[s], c.stats[i][s]), `${c.name} ${f.key} ${s}: aqui ${f[s]}, Prova do app ${c.stats[i][s]}`);
        assert(close(f[s], c.game_stats[i][s]), `${c.name} ${f.key} ${s}: aqui ${f[s]}, jogo ${c.game_stats[i][s]}`);
      }
    });
  }
});

test('o poder somado aqui é o do jogo (Game.company_power)', () => {
  for (const c of vectors.companies) {
    const mine = power(fighters(c.save, rules), rules);
    assert.equal(mine, c.power, c.name); assert.equal(mine, c.game_power, c.name);
  }
});

test('a luta do primeiro andar é a do app, golpe a golpe', () => {
  for (const c of vectors.companies) {
    const result = fight(fighters(c.save, rules), 1, rules);
    assert.equal(result.won, c.first.won, c.name); assert.equal(result.blows, c.first.blows, c.name);
    assert.equal(result.standing, c.first.standing, c.name); assert.equal(result.digest, c.first.digest, c.name);
    assert(close(result.time, c.first.time), c.name);
  }
});

test('a subida chega ao mesmo andar pelo mesmo caminho', () => {
  for (const c of vectors.companies) assert.deepEqual(climb(fighters(c.save, rules), rules), c.trial, c.name);
  assert.equal(company('novo').trial.floor, 0);
  assert(company('fim').trial.floor >= 1, 'a companhia do fim da campanha vence o primeiro andar');
  assert(company('topo').trial.floor <= rules.trial.max_floor);
});

test('a conferência não tira nada de uma companhia feita pelo jogo', () => {
  for (const c of vectors.companies) {
    const result = runTrial(c.save);
    assert.equal(result.rejected, 0, c.name);
    assert.equal(result.power, c.power, c.name);
    assert.deepEqual({ floor: result.floor, fights: result.fights, digest: result.digest }, c.trial, c.name);
  }
});

test('a melhor rolagem de cada linha é a do jogo', () => {
  assert(vectors.tops.length > 100);
  for (const t of vectors.tops) assert(close(modTop(t.kind, t.stat, t.level, t.rarity, rules), t.top), `${t.kind} ${t.stat} nível ${t.level} raridade ${t.rarity}`);
});

test('a mesma companhia dá sempre o mesmo resultado; a ordem de marcha conta', () => {
  const c = late();
  assert.deepEqual(runTrial(c.save), runTrial(c.save));
  const turned = late();
  turned.save.members.reverse();
  assert.notEqual(runTrial(turned.save).digest, runTrial(c.save).digest);
});

test('inimigos do andar: a batalha do chefe, mais forte a cada andar', () => {
  const first = enemies(1, rules), second = enemies(2, rules);
  assert.equal(first.length, rules.trial.enemies.length);
  const boss = first[first.length - 1];
  assert.equal(boss.max_hp, Math.max(...first.map(e => e.max_hp)), 'o chefe é o último e o de mais vida');
  first.forEach((e, i) => {
    const creature = rules.creatures[rules.trial.enemies[i]];
    assert(close(e.max_hp, creature.max_hp * rules.trial.hp_mult * rules.trial.base));
    assert(close(second[i].max_hp, e.max_hp * (rules.trial.base + rules.trial.step) / rules.trial.base));
    assert(close(second[i].attack_damage, e.attack_damage * (rules.trial.base + rules.trial.step) / rules.trial.base));
  });
});

test('gerador e elementos', () => {
  for (const level of [1, 2, rules.trial.max_floor]) assert(seedOf(level) >= 1 && seedOf(level) <= 2147483646);
  assert.notEqual(seedOf(1), seedOf(2));
  const [a, b] = Object.entries(rules.elements).find(([, beats]) => beats !== '')!;
  assert.equal(elementMult(a, b, false, rules), 1 + rules.element_edge);
  assert.equal(elementMult(b, a, false, rules), 1 - rules.element_edge);
  assert.equal(elementMult(rules.undead_bane, a, true, rules), 1 + rules.element_edge);
  assert.equal(elementMult(rules.undead_bane, a, false, rules), 1);
  assert.equal(elementMult('', a, true, rules), 1); assert.equal(elementMult(a, '', false, rules), 1);
  assert.equal(elementMult('constructor', a, false, rules), 1);
});

test('peça com linha acima da melhor rolagem não conta', () => {
  const c = late(), fair = runTrial(c.save);
  const weapon = firstHero(c).gear.weapon;
  weapon.mods[0].value *= 100;
  const result = runTrial(c.save);
  assert.equal(result.rejected, 1);
  assert(result.power < fair.power, 'sem a arma o poder desce, não sobe');
  assert(result.floor <= fair.floor);
  // Na melhor rolagem exata (e com o arredondamento de uma runa) a peça continua valendo.
  const edge = late(), piece = firstHero(edge).gear.weapon;
  piece.mods[0].value = modTop(piece.kind, piece.mods[0].stat, piece.level, piece.rarity, rules) * (1 + 1e-12);
  assert.equal(runTrial(edge.save).rejected, 0);
});

test('peça fora do lugar, de outra classe, de nível acima do herói ou malformada não conta', () => {
  const broken: [string, (hero: any) => void][] = [
    ['no lugar errado', h => { h.gear.helm = h.gear.weapon; }],
    ['lugar que não existe', h => { h.gear.asa = h.gear.weapon; }],
    ['de outra classe', h => { h.gear.weapon.class = 'Classe de Ninguém'; }],
    ['nível acima do herói', h => { h.gear.weapon.level = h.level + 1; }],
    ['nível quebrado', h => { h.gear.weapon.level = 3.5; }],
    ['raridade que não existe', h => { h.gear.weapon.rarity = rules.rarities.length; }],
    ['linha de outro tipo de peça', h => { h.gear.weapon.mods[0].stat = 'max_hp'; }],
    ['a mesma linha duas vezes', h => { h.gear.weapon.mods = [h.gear.weapon.mods[0], h.gear.weapon.mods[0]]; }],
    ['valor negativo', h => { h.gear.weapon.mods[0].value = -1; }],
    ['valor que não é número', h => { h.gear.weapon.mods[0].value = '9'; }],
    ['sem linhas em lista', h => { h.gear.weapon.mods = { stat: 'attack_damage', value: 1 }; }],
    ['peça que não é objeto', h => { h.gear.weapon = 'espada'; }],
  ];
  for (const [what, breakIt] of broken) {
    const c = late();
    const before = Object.keys(firstHero(c).gear).length;
    breakIt(firstHero(c));
    const legal = legalCompany(c.save);
    const added = Object.keys(firstHero(c).gear).length - before;
    assert.equal(legal.rejected, 1, what);
    assert.equal(Object.keys(legal.save.members[0].gear).length, before + added - 1, what);
  }
  // Linhas a mais do que a raridade dá: uma peça comum com todas as linhas do tipo.
  const c = late(), weapon = firstHero(c).gear.weapon;
  weapon.rarity = 0; weapon.level = 1;
  weapon.mods = Object.keys(rules.item_stats.weapon).map(stat => ({ stat, value: 0.0001 }));
  assert(weapon.mods.length > 2 + rules.rarities[0].lines);
  assert.equal(legalCompany(c.save).rejected, 1);
});

test('pontos, encantamento, refino e promoção só até onde o jogo deixa', () => {
  const fair = legalCompany(late().save);
  // Pontos gastos acima do que o nível deu contam como nenhum.
  const greedy = late(); firstHero(greedy).alloc.attack_damage += 1;
  assert.deepEqual(legalCompany(greedy.save).save.members[0].alloc, {});
  const odd = late(); firstHero(odd).alloc.vontade = 1;
  assert.deepEqual(legalCompany(odd.save).save.members[0].alloc, {});
  const negative = late(); firstHero(negative).alloc.armor = -5;
  assert.deepEqual(legalCompany(negative.save).save.members[0].alloc, {});
  assert.notDeepEqual(fair.save.members[0].alloc, {});
  // Encantamento acima do nível do herói vale o nível; refino acima do máximo vale o máximo.
  const charmed = late(), hero = firstHero(charmed);
  hero.enchant.weapon = 999; hero.gear.weapon.plus = 999;
  const legal = legalCompany(charmed.save).save.members[0];
  assert.equal(legal.enchant.weapon, hero.level); assert.equal(legal.gear.weapon.plus, rules.refine_max);
  // Nível acima do máximo vale o máximo; promoção só do nível certo.
  const tall = late(); firstHero(tall).level = 999;
  assert.equal(legalCompany(tall.save).save.members[0].level, rules.max_level);
  const early = late(), young = firstHero(early);
  young.promoted = true; young.level = rules.promote_level - 1; young.alloc = {}; young.gear = {};
  assert.equal(legalCompany(early.save).save.members[0].promoted, false);
});

test('herói repetido, desconhecido ou fora de campo fica de fora; licença só em ordem; mascote só comprado', () => {
  const c = late(), fair = legalCompany(c.save);
  const crowd = late();
  crowd.save.members.push(structuredClone(firstHero(crowd)), { kind: 'hero', key: 'imperador', in_field: true, level: 30 }, { kind: 'ally', key: 'mudling', in_field: true }, null, 7);
  assert.equal(legalCompany(crowd.save).save.members.length, fair.save.members.length);
  const benched = late(); firstHero(benched).in_field = false;
  assert.equal(legalCompany(benched.save).save.members.length, fair.save.members.length - 1);
  // Licenças: só as compradas em ordem dentro do ramo, e só as que existem.
  const skipped = late();
  skipped.save.licenses = { b0_0: true, b0_2: true, b1_1: true, b9_0: true, constructor: true, b2_0: 'sim' };
  assert.deepEqual(legalCompany(skipped.save).save.licenses, { b0_0: true });
  // Mascote: precisa existir e estar entre os comprados.
  assert.equal(fair.save.pet, c.save.pet);
  const stray = late(); stray.save.pets = [];
  assert.equal(legalCompany(stray.save).save.pet, '');
  const unknown = late(); unknown.save.pet = 'fenix'; unknown.save.pets = ['fenix'];
  assert.equal(legalCompany(unknown.save).save.pet, '');
});

test('save estranho nunca derruba a conta: dá andar 0', () => {
  const nothing = { floor: 0, fights: 0, digest: 0, power: 0, rejected: 0 };
  for (const save of [null, undefined, 7, 'save', [], {}, { members: 'x' }, { members: [null, 5, [], { kind: 'hero', key: '__proto__', in_field: true }, { kind: 'hero', key: 'constructor', in_field: true }] }])
    assert.deepEqual(runTrial(save), nothing);
  const bare = runTrial({ members: [{ kind: 'hero', key: 'knight', in_field: true, level: 'trinta', gear: 5, alloc: [], enchant: null }], licenses: [], pet: 5, pets: 'x' });
  assert.equal(bare.rejected, 0); assert.equal(bare.floor, 0); assert.equal(bare.power, company('novo').power);
});

test('um save com tudo acima do máximo não passa a companhia do topo feita pelo jogo', () => {
  const top = company('topo'), fair = runTrial(top.save);
  const cheat = company('topo');
  for (const m of cheat.save.members) {
    m.level = 9999;
    for (const slot of Object.keys(m.gear)) for (const mod of m.gear[slot].mods) mod.value *= 1000;
  }
  const result = runTrial(cheat.save);
  assert(result.rejected >= cheat.save.members.length, 'as peças infladas ficam de fora');
  assert(result.power < fair.power);
  assert(result.floor <= fair.floor);
});
