import 'dotenv/config';
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { prisma, transaction } from '../src/core/db';
import { hashPassword } from '../src/core/password';
import { loadSettings } from '../src/core/settings';
import { addItem } from '../src/economy/economy';
import { itemDrift } from '../src/economy/reconcile';
import { listItem, buyListing, cancelListing } from '../src/economy/marketService';
import { BattleService } from '../src/game/battleService';
import { equip } from '../src/game/inventoryService';
import { makeRare } from '../src/economy/rare';
import { bindingOnDrop } from '../../shared/binding';
import { sellNpc, unequip, upgrade } from '../src/game/gameService';
import { awaken, reforge, salvage } from '../src/game/forgeService';
import { MAX_RARITY } from '../../shared/rarity';

// Raridade do exemplar (shared/rarity.ts): pressupõe o seed atual e os padrões de configuração de raridade
// (com eles, o multiplicador de chefe de 300% não deixa sobrar exemplar Comum num drop de chefe).
test('MySQL: raridade do exemplar no drop, no Mercado, no Mercador, no Ferreiro e no extrato', async t => {
  assert.match(process.env.DATABASE_URL ?? '', /\/[^/?]*_test(?:\?|$)/, 'Use uma base dedicada terminada em _test.');
  const tag = randomUUID().slice(0, 8), password = await hashPassword('Rarity-test-2026!');
  const account = (n: string) => prisma.account.create({ data: { email: `rarity-${tag}-${n}@example.invalid`, password,
    characters: { create: { name: `Raro ${tag} ${n}`, vocation: 'KNIGHT', vocationChosen: true, level: 120, goldInHand: 50_000_000n, hp: 5000, maxHp: 5000, strength: 500 } } }, include: { characters: true } });
  const [seller, buyer] = [await account('a'), await account('b')], a = seller.id, c = seller.characters[0].id, b = buyer.id, d = buyer.characters[0].id;
  const bp = (name: string) => prisma.itemBlueprint.findUniqueOrThrow({ where: { name } });
  const [sword, potion, emerald, halberd, naginata] = await Promise.all(['Sword', 'Health Potion', 'Esmeralda Bruta', 'Guardian Halberd', 'Naginata'].map(bp));
  const settings = await loadSettings(prisma);
  const grant = (characterId: number, blueprintId: number, rarity: number, quantity = 1) => transaction(tx => addItem(tx, characterId, blueprintId, quantity, 'ADMIN_GRANT', undefined, 0, null, rarity));
  const lastLedger = (characterId: number, reason: string) => prisma.itemLedger.findFirstOrThrow({ where: { characterId, reason }, orderBy: { id: 'desc' } });

  await t.test('só equipamento aceita raridade; poção e material são sempre Comuns', async () => {
    const item = await grant(c, sword.id, 3);
    assert.equal(item.rarity, 3); assert.equal((await lastLedger(c, 'ADMIN_GRANT')).rarity, 3);
    await assert.rejects(() => grant(c, potion.id, 1), /Raridade inválida/);
    await assert.rejects(() => grant(c, emerald.id, 2), /Raridade inválida/);
    for (const bad of [-1, MAX_RARITY + 1, 1.5]) await assert.rejects(() => grant(c, sword.id, bad), /Raridade inválida/);
    assert.equal((await grant(c, potion.id, 0, 3)).rarity, 0);
  });

  await t.test('drop de chefe sorteia a raridade no servidor, mostra na resposta e grava no extrato', async () => {
    const boss = await prisma.monster.create({ data: { name: `Chefe Raro ${tag}`, hp: 1, attack: 1, defense: 0, experience: 1, goldMin: 1, goldMax: 1, spriteUrl: '', isBoss: true,
      loots: { create: [{ blueprintId: sword.id, dropChance: 1, maxAmount: 1 }, { blueprintId: potion.id, dropChance: 1, maxAmount: 1 }] } } });
    assert.equal(settings['rarity.bossBoostPercent'], 300, 'o teste conta com o multiplicador padrão de chefe');
    for (let n = 0; n < 3; n++) {
      const battle = await BattleService.start(a, c, boss.id);
      let result = await BattleService.turn(a, c, battle.id, 0, 'ATTACK');
      for (let v = 1; v < 10 && result.status === 'ONGOING'; v++) result = await BattleService.turn(a, c, battle.id, v, 'ATTACK');
      assert.equal(result.status, 'VICTORY');
      const dropped = (result as unknown as { rewards: { droppedItems: { blueprintId: number; rarity: number }[] } }).rewards.droppedItems;
      const gear = dropped.find(x => x.blueprintId === sword.id), flask = dropped.find(x => x.blueprintId === potion.id);
      assert(gear && flask, 'os dois itens da tabela caem');
      assert(gear.rarity >= 1 && gear.rarity <= MAX_RARITY, `chefe nunca derruba Comum com os padrões (veio ${gear.rarity})`);
      assert.equal(flask.rarity, 0);
      const row = await prisma.inventoryItem.findFirstOrThrow({ where: { characterId: c, blueprintId: sword.id }, orderBy: { id: 'desc' } });
      assert.equal(row.rarity, gear.rarity);
      assert.deepEqual({ bound: row.bound, bindOnEquip: row.bindOnEquip }, bindingOnDrop(gear.rarity, true), 'o vínculo segue a raridade e o chefe');
      const ledger = await prisma.itemLedger.findFirstOrThrow({ where: { characterId: c, reason: 'LOOT', blueprintId: sword.id }, orderBy: { id: 'desc' } });
      assert.equal(ledger.rarity, gear.rarity); assert.equal(ledger.refId, battle.id);
      assert.equal((result as unknown as { rewards: { fragments?: number } }).rewards.fragments, 1, 'vitória contra chefe dá 1 fragmento');
    }
  });

  await t.test('fragmentos de chefe: cada vitória contra chefe dá 1; Despertar sobe a raridade um degrau por vez', async () => {
    const fragments = async () => (await prisma.character.findUniqueOrThrow({ where: { id: c } })).bossFragments;
    assert.equal(await fragments(), 3, 'as três vitórias contra o chefe do teste do drop deram 1 fragmento cada');
    await prisma.character.update({ where: { id: c }, data: { bossFragments: 200 } });
    const blade = await grant(c, sword.id, 0);
    const key = randomUUID(), first = await awaken(a, c, blade.id, key), again = await awaken(a, c, blade.id, key);
    assert.equal(first.rarity, 1); assert.deepEqual(again, first, 'repetir a mesma chave não cobra de novo');
    assert.equal(await fragments(), 195);
    for (let r = 2; r <= MAX_RARITY; r++) assert.equal((await awaken(a, c, blade.id, randomUUID())).rarity, r);
    assert.equal(await fragments(), 200 - 155);
    assert.equal((await prisma.inventoryItem.findUniqueOrThrow({ where: { id: blade.id } })).rarity, MAX_RARITY);
    await assert.rejects(() => awaken(a, c, blade.id, randomUUID()), /raridade mais alta/);
    const out = await prisma.itemLedger.findMany({ where: { characterId: c, refType: 'item', refId: blade.id, reason: { in: ['FORGE_AWAKEN_OUT', 'FORGE_AWAKEN_IN'] } }, orderBy: { id: 'asc' } });
    assert.equal(out.length, 10); assert.deepEqual(out.slice(0, 2).map(l => [l.reason, l.delta, l.rarity]), [['FORGE_AWAKEN_OUT', -1, 0], ['FORGE_AWAKEN_IN', 1, 1]]);
    // Sem fragmentos suficientes nada muda.
    await prisma.character.update({ where: { id: c }, data: { bossFragments: 3 } });
    const other = await grant(c, sword.id, 0);
    await assert.rejects(() => awaken(a, c, other.id, randomUUID()), /Faltam fragmentos/);
    assert.equal((await prisma.inventoryItem.findUniqueOrThrow({ where: { id: other.id } })).rarity, 0); assert.equal(await fragments(), 3);
    // Poção não tem raridade.
    const flask = await grant(c, potion.id, 0, 1);
    await assert.rejects(() => awaken(a, c, flask.id, randomUUID()), /Só equipamento/);
  });

  await t.test('Mercado leva a raridade do anúncio para o comprador e de volta ao cancelar', async () => {
    const epic = await grant(c, sword.id, 3), listed = await listItem(a, c, epic.id, '5000', randomUUID());
    assert.equal((await prisma.marketListing.findUniqueOrThrow({ where: { id: listed.listingId } })).rarity, 3);
    assert.equal((await lastLedger(c, 'MARKET_LIST')).rarity, 3);
    await buyListing(b, d, listed.listingId);
    const bought = await prisma.inventoryItem.findFirstOrThrow({ where: { characterId: d, blueprintId: sword.id }, orderBy: { id: 'desc' } });
    assert.equal(bought.rarity, 3); assert.equal((await lastLedger(d, 'MARKET_BUY')).rarity, 3);
    const mythic = await grant(c, sword.id, 5), again = await listItem(a, c, mythic.id, '9000', randomUUID());
    await cancelListing(a, c, again.listingId);
    const back = await prisma.inventoryItem.findFirstOrThrow({ where: { characterId: c, blueprintId: sword.id }, orderBy: { id: 'desc' } });
    assert.equal(back.rarity, 5); assert.equal((await lastLedger(c, 'MARKET_RETURN')).rarity, 5);
  });

  await t.test('Mercador e Ferreiro pedem confirmação antes de sumir com exemplar acima de Comum', async () => {
    const rare = await grant(c, sword.id, 2);
    await assert.rejects(() => sellNpc(a, c, rare.id), /exemplar é Raro/);
    assert(await prisma.inventoryItem.findUnique({ where: { id: rare.id } }), 'sem confirmar, o item continua na mochila');
    await sellNpc(a, c, rare.id, true);
    assert.equal((await lastLedger(c, 'NPC_SELL')).rarity, 2);
    const legendary = await grant(c, sword.id, 4);
    await assert.rejects(() => salvage(a, c, legendary.id, false, randomUUID()), /exemplar é Lendário/);
    await salvage(a, c, legendary.id, true, randomUUID());
    assert.equal((await lastLedger(c, 'FORGE_SALVAGE')).rarity, 4);
    // Comum continua sem pergunta nenhuma.
    const common = await grant(c, sword.id, 0);
    await sellNpc(a, c, common.id);
  });

  await t.test('reforjar mantém a raridade do exemplar', async () => {
    await transaction(tx => addItem(tx, c, emerald.id, settings['forge.craftMaterials'], 'ADMIN_GRANT'));
    const item = await grant(c, halberd.id, 4);
    await reforge(a, c, item.id, naginata.id, randomUUID());
    const after = await prisma.inventoryItem.findUniqueOrThrow({ where: { id: item.id } });
    assert.equal(after.blueprintId, naginata.id); assert.equal(after.rarity, 4);
    assert.equal((await lastLedger(c, 'FORGE_REFORGE_OUT')).rarity, 4); assert.equal((await lastLedger(c, 'FORGE_REFORGE_IN')).rarity, 4);
  });

  await t.test('loot inteligente: arma de Arqueiro que cai para um Cavaleiro vira a arma de Cavaleiro da mesma Era', async () => {
    const crossbow = await bp('Crossbow da 1ª Era'), key = 'loot.ownVocationPercent';
    const before = await prisma.gameSetting.findUnique({ where: { key } });
    const setPercent = (value: number) => prisma.gameSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
    const monster = await prisma.monster.create({ data: { name: `Arqueiro Caído ${tag}`, hp: 1, attack: 1, defense: 0, experience: 1, goldMin: 1, goldMax: 1, spriteUrl: '',
      loots: { create: [{ blueprintId: crossbow.id, dropChance: 1, maxAmount: 1 }] } } });
    const hunt = async () => {
      const battle = await BattleService.start(a, c, monster.id);
      let result = await BattleService.turn(a, c, battle.id, 0, 'ATTACK');
      for (let v = 1; v < 10 && result.status === 'ONGOING'; v++) result = await BattleService.turn(a, c, battle.id, v, 'ATTACK');
      assert.equal(result.status, 'VICTORY');
      const drops = (result as unknown as { rewards: { droppedItems: { blueprintId: number; name: string; adapted?: boolean }[] } }).rewards.droppedItems;
      assert.equal(drops.length, 1); return drops[0];
    };
    try {
      await setPercent(100);
      const adapted = await hunt(), own = await prisma.itemBlueprint.findUniqueOrThrow({ where: { id: adapted.blueprintId } });
      assert.equal(adapted.adapted, true); assert.equal(own.vocations, 'KNIGHT'); assert.equal(own.slot, 'WEAPON'); assert.equal(own.minLevel, 250);
      assert.equal(adapted.name, own.name);
      const row = await prisma.inventoryItem.findFirstOrThrow({ where: { characterId: c }, orderBy: { id: 'desc' } });
      assert.equal(row.blueprintId, own.id, 'a mochila recebe o item trocado');
      assert.equal((await prisma.itemLedger.findFirstOrThrow({ where: { characterId: c, reason: 'LOOT' }, orderBy: { id: 'desc' } })).blueprintId, own.id, 'o extrato registra o item que entrou');
      await setPercent(0);
      const kept = await hunt();
      assert.equal(kept.blueprintId, crossbow.id); assert.equal(kept.adapted, undefined);
    } finally {
      if (before) await prisma.gameSetting.update({ where: { key }, data: { value: before.value } }); else await prisma.gameSetting.delete({ where: { key } });
    }
  });
  await t.test('Ferreiro: falha soma chance à próxima tentativa do mesmo item e o acerto zera', async () => {
    const item = await grant(c, sword.id, 0);
    await prisma.inventoryItem.update({ where: { id: item.id }, data: { upgradeTier: 5 } });
    const fails = async () => (await prisma.inventoryItem.findUniqueOrThrow({ where: { id: item.id } })).upgradeFails;
    let seenFail = false, seenStreak = false, seenReset = false;
    // De +5 para +6 a chance é 65% e nada quebra; ao acertar, o item volta a +5 para tentar de novo.
    for (let n = 0; n < 400 && !(seenStreak && seenReset); n++) {
      const before = await fails();
      const r = await upgrade(a, c, item.id, 5, randomUUID());
      assert.equal(r.chance, Math.min(100, 65 + Math.min(15, before * 5)), `chance com ${before} falha(s)`);
      if (r.outcome === 'FAILED') {
        assert.equal(await fails(), before + 1); seenFail = true; if (before >= 1) seenStreak = true;
        assert.equal(r.nextBonus, Math.min(15, (before + 1) * 5));
      } else {
        assert.equal(r.outcome, 'SUCCESS'); assert.equal(await fails(), 0); if (before > 0) seenReset = true;
        await prisma.inventoryItem.update({ where: { id: item.id }, data: { upgradeTier: 5 } });
      }
    }
    assert(seenFail && seenStreak && seenReset, 'viu falha, falhas seguidas e o acerto zerando');
    // Reforjar zera a ajuda.
    await prisma.inventoryItem.update({ where: { id: item.id }, data: { upgradeFails: 2 } });
    await transaction(tx => addItem(tx, c, emerald.id, settings['forge.craftMaterials'], 'ADMIN_GRANT'));
    const blade = await grant(c, halberd.id, 0);
    await prisma.inventoryItem.update({ where: { id: blade.id }, data: { upgradeFails: 3 } });
    await reforge(a, c, blade.id, naginata.id, randomUUID());
    assert.equal((await prisma.inventoryItem.findUniqueOrThrow({ where: { id: blade.id } })).upgradeFails, 0);
  });

  await t.test('comércio limitado: vestir vincula, vinculado não vai ao Mercado, a compra mantém o estado e o +10 numerado fica livre', async () => {
    const give = (characterId: number, rarity: number, binding: { bound: boolean; bindOnEquip: boolean }) =>
      transaction(tx => addItem(tx, characterId, sword.id, 1, 'ADMIN_GRANT', undefined, 0, null, rarity, binding));
    const row = (id: number) => prisma.inventoryItem.findUniqueOrThrow({ where: { id } });
    // Vincula ao equipar: livre até ser vestido.
    const epic = await give(c, 3, { bound: false, bindOnEquip: true });
    assert.equal(epic.bindOnEquip, true); assert.equal(epic.bound, false);
    await equip(a, c, epic.id);
    assert.deepEqual([(await row(epic.id)).bound, (await row(epic.id)).bindOnEquip], [true, false]);
    // Vinculado não pode ser anunciado.
    await unequip(a, c, epic.id);
    await assert.rejects(() => listItem(a, c, epic.id, '500', randomUUID()), /vinculado/);
    // Anúncio de item que vincula ao equipar: quem compra recebe no mesmo estado.
    const rare = await give(c, 2, { bound: false, bindOnEquip: true });
    const listed = await listItem(a, c, rare.id, '700', randomUUID());
    assert.equal((await prisma.marketListing.findUniqueOrThrow({ where: { id: listed.listingId } })).bindOnEquip, true);
    await buyListing(b, d, listed.listingId);
    const bought = await prisma.inventoryItem.findFirstOrThrow({ where: { characterId: d, blueprintId: sword.id, rarity: 2 }, orderBy: { id: 'desc' } });
    assert.deepEqual([bought.bound, bought.bindOnEquip], [false, true]);
    // Despertar vincula.
    await prisma.character.update({ where: { id: c }, data: { bossFragments: 50 } });
    const plain = await give(c, 0, { bound: false, bindOnEquip: false });
    await awaken(a, c, plain.id, randomUUID());
    assert.equal((await row(plain.id)).bound, true);
    // O +10 numerado é sempre livre e paga a taxa de raro (10%).
    await transaction(tx => makeRare(tx, { id: plain.id, blueprintId: sword.id, rareItemId: null }, c, 'Teste'));
    assert.deepEqual([(await row(plain.id)).bound, (await row(plain.id)).bindOnEquip], [false, false]);
    const sale = await listItem(a, c, plain.id, '1000', randomUUID());
    const paid = await buyListing(b, d, sale.listingId);
    assert.equal(paid.fee, '100');
  });

  await t.test('extrato de itens bate com a mochila dos dois', async () => {
    assert.deepEqual((await itemDrift(prisma, 5000)).filter(x => x.characterId === c || x.characterId === d), []);
  });
  await prisma.$disconnect();
});
