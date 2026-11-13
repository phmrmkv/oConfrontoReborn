import test from 'node:test';
import assert from 'node:assert/strict';
import { items } from '../../prisma/catalog';
import { EQUIVALENT_LEVEL_FLOOR, needsAdapting, vocationEquivalent, type LootBlueprint } from '../../../shared/loot';
import { vocationAllowed } from '../../../shared/adventure';

// O catálogo de verdade, com ids de mentira na ordem do seed.
const catalog: LootBlueprint[] = items.map((i, n) => ({ id: n + 1, name: i.name, slot: i.slot, vocations: i.vocations ?? 'ALL', minLevel: i.minLevel, npcPrice: i.npcPrice }));
const named = (name: string) => { const b = catalog.find(c => c.name === name); assert(b, name); return b; };

test('loot inteligente: só troca o que a vocação não usa', () => {
  assert(!needsAdapting(named('Sword'), 'PALADIN'), 'item de todos nunca é trocado');
  assert(needsAdapting(named('Crossbow da 1ª Era'), 'KNIGHT'));
  assert(!needsAdapting(named('Crossbow da 1ª Era'), 'ROYAL_PALADIN'), 'vocação promovida usa o item da base');
});

test('loot inteligente: o equivalente é do mesmo espaço, serve à vocação e fica entre 75% e 100% do nível', () => {
  for (const dropped of catalog.filter(c => !['LOOT', 'CONSUMABLE', 'BACKPACK'].includes(c.slot) && c.vocations !== 'ALL')) {
    for (const vocation of ['KNIGHT', 'PALADIN', 'SORCERER', 'DRUID', 'ELITE_KNIGHT', 'ELDER_DRUID']) {
      if (!needsAdapting(dropped, vocation)) continue;
      const own = vocationEquivalent(dropped, vocation, catalog);
      if (!own) continue;
      assert.equal(own.slot, dropped.slot, `${dropped.name} → ${own.name}`);
      assert(vocationAllowed(own.vocations, vocation), `${own.name} serve a ${vocation}`);
      assert(own.minLevel <= dropped.minLevel && own.minLevel >= Math.floor(dropped.minLevel * EQUIVALENT_LEVEL_FLOOR), `${dropped.name} (${dropped.minLevel}) → ${own.name} (${own.minLevel})`);
      assert(own.npcPrice > 0);
    }
  }
});

test('loot inteligente: casos do catálogo das Eras', () => {
  // Arma de Arqueiro para Cavaleiro vira a arma de Cavaleiro da mesma Era.
  const knightWeapon = vocationEquivalent(named('Crossbow da 1ª Era'), 'KNIGHT', catalog);
  assert(knightWeapon && knightWeapon.minLevel === 250 && /da 1ª Era$/.test(knightWeapon.name) && knightWeapon.vocations === 'KNIGHT', knightWeapon?.name);
  // Munição de Arqueiro para Feiticeiro vira a runa de foco da mesma Era.
  const rune = vocationEquivalent(named('Power Bolt da 1ª Era'), 'SORCERER', catalog);
  assert(rune && rune.slot === 'AMMO' && rune.minLevel === 250 && rune.vocations === 'SORCERER,DRUID', rune?.name);
  // Cavaleiro não usa munição: não há equivalente, o item cai como era.
  assert.equal(vocationEquivalent(named('Power Bolt da 1ª Era'), 'KNIGHT', catalog), null);
  // Túnica de mago para Cavaleiro vira uma armadura que serve a todos, do mesmo nível.
  const armor = vocationEquivalent(named(catalog.find(c => c.slot === 'ARMOR' && c.vocations === 'SORCERER,DRUID' && c.minLevel === 250)!.name), 'KNIGHT', catalog);
  assert(armor && armor.slot === 'ARMOR' && armor.vocations === 'ALL' && armor.minLevel === 250, armor?.name);
});

test('loot inteligente: própria da vocação vem antes da que serve a todos, e a escolha é sempre a mesma', () => {
  const dropped: LootBlueprint = { id: 900, name: 'Cajado de teste', slot: 'WEAPON', vocations: 'SORCERER,DRUID', minLevel: 100, npcPrice: 10 };
  const pool: LootBlueprint[] = [
    { id: 1, name: 'Espada de todos', slot: 'WEAPON', vocations: 'ALL', minLevel: 100, npcPrice: 50 },
    { id: 2, name: 'Espada do Cavaleiro', slot: 'WEAPON', vocations: 'KNIGHT', minLevel: 100, npcPrice: 40 },
    { id: 3, name: 'Espada antiga', slot: 'WEAPON', vocations: 'KNIGHT', minLevel: 74, npcPrice: 99 },
    { id: 4, name: 'Espada de missão', slot: 'WEAPON', vocations: 'KNIGHT', minLevel: 100, npcPrice: 0 },
    { id: 5, name: 'Escudo', slot: 'SHIELD', vocations: 'KNIGHT', minLevel: 100, npcPrice: 40 },
  ];
  assert.equal(vocationEquivalent(dropped, 'KNIGHT', pool)?.name, 'Espada do Cavaleiro');
  assert.equal(vocationEquivalent(dropped, 'KNIGHT', [...pool].reverse())?.name, 'Espada do Cavaleiro');
  assert.equal(vocationEquivalent(dropped, 'KNIGHT', pool.filter(p => p.id !== 2))?.name, 'Espada de todos');
  assert.equal(vocationEquivalent(dropped, 'KNIGHT', pool.filter(p => p.id === 3 || p.id === 4)), null, 'abaixo de 75% do nível e sem preço não valem');
});
