import 'dotenv/config';
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { prisma } from '../src/core/db';
import { hashPassword } from '../src/core/password';
import { GameError } from '../src/core/engine';
import { createGuild, createTopic, decideApplication, deletePost, disbandGuild, guildBoard, guildDirectory, guildPage, guildTopic, invite, kickMember, leaveGuild, leaveGuildOnDelete, myGuild, pinTopic, replyTopic, requestJoin, setRank, updateGuild } from '../src/community/guildService';
import { friendList } from '../src/community/friendsService';
import { transaction } from '../src/core/db';

// Guildas e lista de amigos: criar, entrar por pedido ou convite, cargos, expulsar, sair, quadro interno, dissolver, apagar conta e a corrida
// de dois pedidos para o mesmo jogador. Tudo em contas descartáveis da base de testes.
const fails = async (p: Promise<unknown>, status: number, match?: RegExp) => {
  await assert.rejects(p, (e: unknown) => e instanceof GameError && e.status === status && (!match || match.test(e.message)), `esperava erro ${status}${match ? ` ${match}` : ''}`);
};
test('MySQL: guildas, cargos, quadro e lista de amigos', async t => {
  assert.match(process.env.DATABASE_URL ?? '', /\/[^/?]*_test(?:\?|$)/, 'Use uma base dedicada terminada em _test.');
  const run = randomUUID().replace(/[^a-f0-9]/g, '').slice(0, 6), password = await hashPassword('Guild-test-2026!');
  const made: number[] = [];
  const mk = async (n: string, level = 30) => {
    const a = await prisma.account.create({ data: { email: `guild-${run}-${n}@example.invalid`, password, characters: { create: { name: `Gd ${n} ${run}`, vocationChosen: true, level } } }, include: { characters: true } });
    made.push(a.id); return { acc: a.id, id: a.characters[0].id, name: a.characters[0].name };
  };
  const [L, V, M, N, X, Low] = await Promise.all([mk('l'), mk('v'), mk('m'), mk('n'), mk('x'), mk('low', 5)]);
  const unlock = () => prisma.guildPost.updateMany({ data: { createdAt: new Date(Date.now() - 60_000) } }).then(() => prisma.guildReply.updateMany({ data: { createdAt: new Date(Date.now() - 60_000) } }));
  t.after(async () => {
    await prisma.guild.deleteMany({ where: { OR: [{ name: { startsWith: `Gdn ${run}` } }, { tag: { startsWith: run.slice(0, 3).toUpperCase() } }] } });
    await prisma.friendship.deleteMany({ where: { OR: [{ requesterId: { in: [L.id, V.id, M.id] } }, { addresseeId: { in: [L.id, V.id, M.id] } }] } });
    // Limpeza de cortesia: se alguma outra tabela prender o personagem, a conta de teste fica (como nos outros testes).
    await prisma.character.deleteMany({ where: { accountId: { in: made } } }).then(() => prisma.account.deleteMany({ where: { id: { in: made } } })).catch(() => {});
  });
  const tag = run.slice(0, 3).toUpperCase(), name = `Gdn ${run} Norte`;
  let guildId = 0;

  await t.test('criar: nível mínimo, nome e sigla válidos e únicos; quem cria é o líder', async () => {
    await fails(createGuild(Low.acc, Low.id, { name, tag: `${tag}A` }), 403, /nível/);
    await fails(createGuild(L.acc, L.id, { name: 'a', tag: `${tag}A` }), 400);
    await fails(createGuild(L.acc, L.id, { name, tag: 'a b' }), 400);
    await fails(createGuild(X.acc, L.id, { name, tag: `${tag}A` }), 404); // personagem de outra conta
    const made1 = await createGuild(L.acc, L.id, { name, tag: `${tag}A`, description: 'Os primeiros a chegar.' });
    guildId = made1.guildId;
    const me = await prisma.character.findUniqueOrThrow({ where: { id: L.id } });
    assert.deepEqual([me.guildId, me.guildRank, !!me.guildJoinedAt], [guildId, 'LEADER', true]);
    await fails(createGuild(L.acc, L.id, { name: `${name} 2`, tag: `${tag}B` }), 409, /Saia/);
    await fails(createGuild(V.acc, V.id, { name: name.toUpperCase(), tag: `${tag}C` }), 409, /Já existe/); // nome repetido, mesmo em maiúsculas
    await fails(createGuild(V.acc, V.id, { name: `${name} 3`, tag: `${tag.toLowerCase()}A` }), 409, /Já existe/); // sigla repetida
  });

  await t.test('pedido de entrada: vice+ aceita; membro comum não decide; já estar em guilda impede', async () => {
    await fails(requestJoin(L.acc, L.id, guildId), 409, /já está/);
    assert.match((await requestJoin(V.acc, V.id, guildId)).message, /Pedido enviado/);
    assert.match((await requestJoin(V.acc, V.id, guildId)).message, /já tem/);
    const page = await guildPage(L.acc, L.id, guildId);
    assert.equal(page.applications.length, 1);
    await fails(decideApplication(M.acc, M.id, page.applications[0].id, 'accept'), 403); // quem não é da guilda
    assert.match((await decideApplication(L.acc, L.id, page.applications[0].id, 'accept')).message, /entrou/);
    const v = await prisma.character.findUniqueOrThrow({ where: { id: V.id } });
    assert.deepEqual([v.guildId, v.guildRank], [guildId, 'MEMBER']);
    assert.equal(await prisma.guildApplication.count({ where: { characterId: V.id } }), 0);
  });

  await t.test('convite: só vice+ convida; o convidado aceita; não convida quem já tem guilda', async () => {
    await fails(invite(V.acc, V.id, M.name), 403); // V ainda é membro comum
    await setRank(L.acc, L.id, V.id, 'promote');
    await fails(invite(V.acc, V.id, V.name), 400);
    await fails(invite(V.acc, V.id, L.name), 409, /já está/);
    assert.match((await invite(V.acc, V.id, M.name)).message, /Convite enviado/);
    const mine = await myGuild(M.acc, M.id);
    assert.equal(mine.invites.length, 1);
    await fails(decideApplication(N.acc, N.id, mine.invites[0].id, 'accept'), 403); // convite de outro
    assert.match((await decideApplication(M.acc, M.id, mine.invites[0].id, 'accept')).message, /entrou/);
    assert.equal((await myGuild(M.acc, M.id)).rank, 'MEMBER');
  });

  await t.test('cargos e expulsão: vice não mexe em cargos nem expulsa vice ou líder; líder passa o cargo', async () => {
    await fails(setRank(V.acc, V.id, M.id, 'promote'), 403);
    await fails(kickMember(V.acc, V.id, L.id), 403);
    await fails(kickMember(M.acc, M.id, V.id), 403);
    await fails(kickMember(L.acc, L.id, L.id), 400);
    await fails(kickMember(L.acc, L.id, X.id), 404); // não é da guilda
    await setRank(L.acc, L.id, M.id, 'promote');
    await fails(kickMember(V.acc, V.id, M.id), 403); // agora M também é vice
    await setRank(L.acc, L.id, M.id, 'demote');
    assert.match((await kickMember(V.acc, V.id, M.id)).message, /expulso/); // vice expulsa membro comum
    const m = await prisma.character.findUniqueOrThrow({ where: { id: M.id } });
    assert.deepEqual([m.guildId, m.guildRank, m.guildJoinedAt], [null, 'MEMBER', null]);
    await setRank(L.acc, L.id, V.id, 'leader');
    const g = await prisma.guild.findUniqueOrThrow({ where: { id: guildId } });
    assert.equal(g.leaderId, V.id);
    const rankOfId = async (id: number) => (await prisma.character.findUniqueOrThrow({ where: { id } })).guildRank;
    assert.deepEqual([await rankOfId(L.id), await rankOfId(V.id)], ['VICE', 'LEADER']);
    await setRank(V.acc, V.id, L.id, 'leader'); // devolve a liderança
  });

  await t.test('descrição é do líder; aviso é de vice+ e só os membros veem', async () => {
    await updateGuild(L.acc, L.id, { announcement: 'Reunião sábado.' });
    await fails(updateGuild(V.acc, V.id, { description: 'Nova.' }), 403);
    await updateGuild(L.acc, L.id, { description: 'Descrição nova da guilda.' });
    assert.equal((await guildPage(L.acc, L.id, guildId)).announcement, 'Reunião sábado.');
    assert.equal((await guildPage(N.acc, N.id, guildId)).announcement, null); // quem é de fora não vê
    await fails(updateGuild(L.acc, L.id, {}), 400);
  });

  await t.test('quadro: só membros; tópico, resposta, intervalo, fixar e apagar', async () => {
    await fails(guildBoard(N.acc, N.id, {}), 403);
    const { postId } = await createTopic(L.acc, L.id, { title: 'Regras da guilda', body: 'Respeito acima de tudo.' });
    await fails(createTopic(L.acc, L.id, { title: 'Outro', body: 'Muito rápido.' }), 429);
    await fails(createTopic(L.acc, L.id, { title: 'x', body: 'curto' }), 400);
    await unlock();
    await replyTopic(V.acc, V.id, postId, 'Combinado!');
    await fails(replyTopic(V.acc, V.id, postId, 'Sem esperar.'), 429);
    await unlock();
    await fails(replyTopic(N.acc, N.id, postId, 'Sou de fora.'), 409); // sem guilda
    const topic = await guildTopic(L.acc, L.id, postId, {});
    assert.deepEqual([topic.post.replyCount, topic.items.length, topic.items[0].body], [1, 1, 'Combinado!']);
    await fails(guildTopic(N.acc, N.id, postId, {}), 404);
    await pinTopic(L.acc, L.id, postId, true);
    assert.equal((await guildBoard(V.acc, V.id, {})).items[0].pinned, true);
    // O membro comum não fixa nem apaga o que não é dele. O vice apaga a resposta de qualquer um.
    await fails(pinTopic(M.acc, M.id, postId, false), 409);
    const reply = topic.items[0].id;
    await fails(deletePost(N.acc, N.id, 'reply', reply), 409);
    await deletePost(L.acc, L.id, 'reply', reply);
    assert.equal((await prisma.guildPost.findUniqueOrThrow({ where: { id: postId } })).replyCount, 0);
    await deletePost(L.acc, L.id, 'topic', postId);
    assert.equal(await prisma.guildPost.count({ where: { guildId } }), 0);
  });

  await t.test('sair: líder com gente precisa passar o cargo; membro sai; diretório lista a guilda', async () => {
    await fails(leaveGuild(L.acc, L.id), 409, /liderança/);
    await leaveGuild(V.acc, V.id);
    const dir = await guildDirectory({ q: tag });
    assert.equal(dir.items.find(g => g.id === guildId)?.members, 1);
    assert.equal((await guildDirectory({ q: `zz${run}` })).total, 0);
  });

  await t.test('corrida: o mesmo jogador aceito por duas guildas ao mesmo tempo entra em uma só', async () => {
    const g2 = await createGuild(N.acc, N.id, { name: `Gdn ${run} Sul`, tag: `${tag}D` });
    await requestJoin(X.acc, X.id, guildId); await requestJoin(X.acc, X.id, g2.guildId);
    const apps = await prisma.guildApplication.findMany({ where: { characterId: X.id }, orderBy: { id: 'asc' } });
    assert.equal(apps.length, 2);
    const results = await Promise.allSettled([decideApplication(L.acc, L.id, apps[0].id, 'accept'), decideApplication(N.acc, N.id, apps[1].id, 'accept')]);
    assert.ok(results.some(r => r.status === 'fulfilled'));
    const x = await prisma.character.findUniqueOrThrow({ where: { id: X.id } });
    assert.ok([guildId, g2.guildId].includes(x.guildId ?? -1));
    assert.equal(await prisma.character.count({ where: { id: X.id, guildId: { not: null } } }), 1);
    assert.equal(await prisma.guildApplication.count({ where: { characterId: X.id } }), 0);
  });

  await t.test('apagar conta: o líder passa a guilda para o mais antigo; o último apaga a guilda', async () => {
    const before = await prisma.character.findUniqueOrThrow({ where: { id: L.id } });
    assert.equal(before.guildRank, 'LEADER');
    const members = await prisma.character.findMany({ where: { guildId: guildId, id: { not: L.id } }, select: { id: true } });
    await transaction(tx => leaveGuildOnDelete(tx, L.id));
    const g = await prisma.guild.findUnique({ where: { id: guildId } });
    if (members.length) { assert.equal(g?.leaderId, members[0].id); assert.equal((await prisma.character.findUniqueOrThrow({ where: { id: members[0].id } })).guildRank, 'LEADER'); }
    else assert.equal(g, null);
    assert.deepEqual([(await prisma.character.findUniqueOrThrow({ where: { id: L.id } })).guildId], [null]);
  });

  await t.test('dissolver: confirma pelo nome; todos os membros saem', async () => {
    const g3 = await createGuild(M.acc, M.id, { name: `Gdn ${run} Leste`, tag: `${tag}E` });
    await requestJoin(V.acc, V.id, g3.guildId);
    const app = (await guildPage(M.acc, M.id, g3.guildId)).applications[0];
    await decideApplication(M.acc, M.id, app.id, 'accept');
    await fails(disbandGuild(V.acc, V.id, `Gdn ${run} Leste`), 403);
    await fails(disbandGuild(M.acc, M.id, 'outro nome'), 400);
    await disbandGuild(M.acc, M.id, `gdn ${run} leste`);
    assert.equal(await prisma.guild.count({ where: { id: g3.guildId } }), 0);
    assert.equal(await prisma.character.count({ where: { id: { in: [M.id, V.id] }, guildId: { not: null } } }), 0);
  });

  await t.test('amigos: só aceitos, online primeiro, com guilda e busca por nome', async () => {
    const now = new Date();
    await prisma.character.update({ where: { id: V.id }, data: { lastSeenAt: new Date(now.getTime() - 3_600_000) } });
    await prisma.character.update({ where: { id: M.id }, data: { lastSeenAt: now } });
    await prisma.friendship.createMany({ data: [{ requesterId: L.id, addresseeId: V.id, status: 'ACCEPTED' }, { requesterId: M.id, addresseeId: L.id, status: 'ACCEPTED' }, { requesterId: L.id, addresseeId: N.id, status: 'PENDING' }] });
    const list = await friendList(L.acc, L.id, {});
    assert.deepEqual(list.items.map(f => f.name), [M.name, V.name]); // N é só pedido; M visitou agora
    assert.deepEqual(list.items.map(f => f.online), [true, false]);
    assert.deepEqual([list.totalFriends, list.onlineCount], [2, 1]);
    assert.deepEqual((await friendList(L.acc, L.id, { q: 'Gd v' })).items.map(f => f.name), [V.name]);
    await assert.rejects(friendList(X.acc, L.id, {}), (e: unknown) => e instanceof GameError && e.status === 404);
  });
});
