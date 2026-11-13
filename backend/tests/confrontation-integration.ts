import 'dotenv/config';
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import { prisma } from '../src/core/db';
import { createApp } from '../src/server';
import { hashPassword } from '../src/core/password';
import { putSave } from '../src/confrontation/cloudService';
import { isoWeek } from '../src/confrontation/syncRules';
import vectorsJson from '../src/confrontation/trialVectors.json';

// Companhias montadas pelo próprio jogo (`trialVectors.json`), com o poder e o andar da Prova que o jogo dá a cada uma:
// 'novo' (um herói no nível 1), 'meio' (três heróis no nível 12) e 'fim' (seis heróis no fim da campanha).
type CompanyName = 'novo' | 'meio' | 'fim';
const vectors = vectorsJson as unknown as { companies: { name: string; save: Record<string, any>; power: number; trial: { floor: number } }[] };
const companyOf = (name: CompanyName) => vectors.companies.find(c => c.name === name)!;

// Save mínimo do Confrontation (Game.save_data(), versão 1) com o progresso pedido e, se pedida, a companhia de um vetor.
const saveOf = (p: { gold?: number; goldTotal?: number; xp?: number; items?: number; furthest?: number; vigil?: number; pad?: number; company?: CompanyName }) => {
  const from = p.company ? structuredClone(companyOf(p.company).save) : null;
  return {
    v: 1, members: from ? from.members : [{ id: 'knight', level: 5 }], ...(from ? { licenses: from.licenses, pet: from.pet, pets: from.pets } : {}),
    inventory: [], gold: p.gold ?? 0, stage: p.furthest ?? 1, furthest: p.furthest ?? 1, vigil: p.vigil ?? 0,
    counters: { gold: p.goldTotal ?? p.gold ?? 0, xp: p.xp ?? 0, items: p.items ?? 0, kills: 1, vigil_best: p.vigil ?? 0 }, last_seen: Date.now() / 1000,
    ...(p.pad ? { flags: { note: 'x'.repeat(p.pad) } } : {}),
  };
};

test('MySQL: app Confrontation — token, save na nuvem, tetos e rankings', async t => {
  assert.match(process.env.DATABASE_URL ?? '', /\/[^/?]*_test(?:\?|$)/, 'Use uma base dedicada terminada em _test.');
  const tag = randomUUID().slice(0, 8), password = 'Confront-test-2026!', hash = await hashPassword(password);
  const existing = await prisma.account.create({ data: { email: `app-${tag}-a@example.invalid`, password: hash, characters: { create: { name: `App A ${tag}` } } }, include: { characters: true } });
  const server = createApp().listen(0, '127.0.0.1'); await once(server, 'listening');
  const address = server.address(); assert(address && typeof address !== 'string');
  const base = `http://127.0.0.1:${address.port}/api/app`;
  // Como o app Godot: sem Origin, sem cookie, sem X-Game-Client.
  const call = (method: string, path: string, body?: unknown, token = '') => fetch(base + path, { method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  let tokenA = '', tokenB = '';
  try {
    await t.test('entra com conta e senha do site e recebe token; senha errada não', async () => {
      assert.equal((await call('POST', '/auth/login', { email: existing.email, password: 'senha-errada-123' })).status, 401);
      const r = await call('POST', '/auth/login', { email: existing.email.toUpperCase(), password });
      assert.equal(r.status, 200);
      const body = await r.json() as { token: string; name: string; expiresAt: string };
      assert.match(body.token, /^[a-f0-9]{64}$/); assert.equal(body.name, `App A ${tag}`); assert(new Date(body.expiresAt) > new Date());
      assert.equal(r.headers.get('set-cookie'), null, 'o app não recebe cookie');
      tokenA = body.token;
    });
    await t.test('sem token ou com token falso não entra', async () => {
      assert.equal((await call('GET', '/me')).status, 401);
      assert.equal((await call('GET', '/me', undefined, 'f'.repeat(64))).status, 401);
      const me = await (await call('GET', '/me', undefined, tokenA)).json() as { name: string; save: unknown };
      assert.equal(me.name, `App A ${tag}`); assert.equal(me.save, null);
    });
    await t.test('cadastro pelo app cria conta e personagem; e-mail repetido não revela a conta', async () => {
      const email = `app-${tag}-b@example.invalid`;
      const r = await call('POST', '/auth/register', { email, password, name: `App B ${tag}` });
      assert.equal(r.status, 201);
      tokenB = (await r.json() as { token: string }).token;
      const account = await prisma.account.findUniqueOrThrow({ where: { email }, include: { characters: true } });
      assert.equal(account.characters[0].name, `App B ${tag}`);
      const again = await call('POST', '/auth/register', { email, password, name: `App C ${tag}` });
      assert.equal(again.status, 202); assert.equal((await again.json() as { token?: string }).token, undefined);
      assert.equal((await call('POST', '/auth/register', { email: `app-${tag}-d@example.invalid`, password, name: `App B ${tag}` })).status, 409);
      assert.equal((await call('POST', '/auth/register', { email: 'nao-e-email', password, name: 'Fulano' })).status, 400);
    });
    await t.test('primeiro envio guarda o save e devolve a versão; o poder é o que o servidor somou, não o que o app diz', async () => {
      const r = await call('PUT', '/save', { baseVersion: 0, data: saveOf({ gold: 5_000, xp: 2_000, items: 30, furthest: 3, company: 'meio' }), summary: { power: 4_000_000 } }, tokenA);
      assert.equal(r.status, 200);
      const body = await r.json() as { version: number; adjusted: string[]; verified: { goldTotal: string; furthest: number; power: string }; trial: unknown; data?: unknown };
      assert.equal(body.version, 1); assert.deepEqual(body.adjusted, []); assert.equal(body.data, undefined);
      assert.equal(body.verified.goldTotal, '5000'); assert.equal(body.verified.furthest, 3); assert.equal(body.verified.power, String(companyOf('meio').power));
      assert.deepEqual(body.trial, { floor: companyOf('meio').trial.floor, power: companyOf('meio').power, rejected: 0 });
      const back = await (await call('GET', '/save', undefined, tokenA)).json() as { save: { version: number; data: { gold: number; counters: { items: number } } } };
      assert.equal(back.save.version, 1); assert.equal(back.save.data.gold, 5_000); assert.equal(back.save.data.counters.items, 30);
    });
    await t.test('outro aparelho com versão velha recebe conflito; forçar envia', async () => {
      const r = await call('PUT', '/save', { baseVersion: 0, data: saveOf({ gold: 5_000 }) }, tokenA);
      assert.equal(r.status, 409); assert.equal((await r.json() as { version: number }).version, 1);
      const forced = await call('PUT', '/save', { baseVersion: 0, force: true, data: saveOf({ gold: 5_000, xp: 2_000, items: 30, furthest: 3, company: 'meio' }) }, tokenA);
      assert.equal(forced.status, 200); assert.equal((await forced.json() as { version: number }).version, 2);
    });
    await t.test('ouro acima do teto por hora é cortado, gravado no extrato do app e devolvido ao app', async () => {
      // Segundos depois do envio anterior: quase nenhuma franquia. 10 milhões de ouro não entram.
      const r = await call('PUT', '/save', { baseVersion: 2, data: saveOf({ gold: 10_000_000, goldTotal: 10_005_000, xp: 2_000, items: 30, furthest: 3, company: 'meio' }) }, tokenA);
      assert.equal(r.status, 200);
      const body = await r.json() as { adjusted: string[]; verified: { goldTotal: string }; data: { gold: number; counters: { gold: number } } };
      assert.deepEqual(body.adjusted, ['goldTotal']);
      assert(BigInt(body.verified.goldTotal) < 6_000n, `aceito ${body.verified.goldTotal}`);
      assert.equal(body.data.counters.gold, Number(body.verified.goldTotal));
      assert(body.data.gold <= body.data.counters.gold);
      const stored = await prisma.confrontationSave.findUniqueOrThrow({ where: { accountId: existing.id } });
      assert.equal(stored.adjustments, 1); assert.equal(stored.goldTotal, BigInt(body.verified.goldTotal));
      assert.equal(JSON.parse(stored.data).gold, body.data.gold);
      const log = await prisma.confrontationSync.findFirstOrThrow({ where: { accountId: existing.id }, orderBy: { id: 'desc' } });
      assert.equal(log.adjusted, 'goldTotal'); assert.equal((log.claimed as { goldTotal: string }).goldTotal, '10005000');
    });
    await t.test('ouro em mãos acima do total ganho na vida (save editado) desce ao total', async () => {
      const before = await prisma.confrontationSave.findUniqueOrThrow({ where: { accountId: existing.id } });
      const total = Number(before.goldTotal);
      const r = await call('PUT', '/save', { baseVersion: before.version, data: saveOf({ gold: 77_000_000, goldTotal: total, xp: 2_000, items: 30, furthest: 3, company: 'meio' }) }, tokenA);
      const body = await r.json() as { adjusted: string[]; data: { gold: number; counters: { gold: number } } };
      assert.deepEqual(body.adjusted, ['gold']); assert.equal(body.data.gold, total); assert.equal(body.data.counters.gold, total);
    });
    await t.test('Vigília antes da última fase não conta; poder que salta em segundos é cortado; save inválido e grande demais são recusados', async () => {
      // A companhia do fim da campanha venceria andares da Prova, mas este save ainda está na fase 3: a Vigília fica em 0, sem aviso.
      // O que o save diz da Vigília (vigil: 40) nem é lido. Já o poder salta do 'meio' para o 'fim' em segundos: entra só até o teto.
      const r = await call('PUT', '/save', { baseVersion: 4, data: saveOf({ gold: 5_000, xp: 2_000, items: 30, furthest: 3, vigil: 40, company: 'fim' }) }, tokenA);
      const body = await r.json() as { adjusted: string[]; verified: { vigilBest: number; power: string }; trial: { floor: number; power: number } };
      assert.deepEqual(body.adjusted, ['power']); assert.equal(body.verified.vigilBest, 0);
      assert.equal(body.trial.floor, companyOf('fim').trial.floor); assert.equal(body.trial.power, companyOf('fim').power);
      assert(BigInt(body.verified.power) < BigInt(companyOf('meio').power) + 100n, `poder aceito ${body.verified.power}`);
      assert.equal((await call('PUT', '/save', { baseVersion: 5, data: { v: 2 } }, tokenA)).status, 400);
      assert.equal((await call('PUT', '/save', { baseVersion: 5, data: saveOf({ pad: 600_000 }) }, tokenA)).status, 413);
    });
    await t.test('dois envios ao mesmo tempo: um entra, o outro vê conflito (conta travada)', async () => {
      const send = () => putSave(existing.id, { baseVersion: 5, data: saveOf({ gold: 5_000, xp: 2_000, items: 30, furthest: 3, company: 'meio' }) });
      const results = await Promise.all([send(), send()]);
      assert.equal(results.filter(x => x.conflict).length, 1);
      assert.equal((await prisma.confrontationSave.findUniqueOrThrow({ where: { accountId: existing.id } })).version, 6);
    });
    await t.test('com horas passadas (relógio do servidor) o progresso entra até o teto', async () => {
      const B = await prisma.account.findUniqueOrThrow({ where: { email: `app-${tag}-b@example.invalid` } });
      const r = await call('PUT', '/save', { baseVersion: 0, data: saveOf({ gold: 900, xp: 500, items: 4, furthest: 2, company: 'novo' }) }, tokenB);
      assert.equal(r.status, 200);
      // Simula 12 horas desde o último envio verificado: dá para a companhia crescer do 'novo' ao 'fim'.
      await prisma.confrontationSave.update({ where: { accountId: B.id }, data: { verifiedAt: new Date(Date.now() - 12 * 3_600_000) } });
      const later = await putSave(B.id, { baseVersion: 1, data: saveOf({ gold: 50_000, xp: 40_000, items: 200, furthest: 5, company: 'fim' }) });
      assert(!later.conflict);
      if (!later.conflict) { assert.deepEqual(later.adjusted, []); assert.equal(later.verified.furthest, 5); assert.equal(later.verified.power, String(companyOf('fim').power)); }
    });
    await t.test('rankings: geral e da semana, ordem, posição de quem pede e métrica inválida', async () => {
      const r = await call('GET', '/rankings?metric=power&period=all', undefined, tokenA);
      assert.equal(r.status, 200);
      const all = await r.json() as { key: string; items: { name: string; value: string; mine: boolean }[]; me: { rank: number; value: string } };
      assert.equal(all.key, 'all');
      const mine = all.items.find(i => i.name === `App A ${tag}`), other = all.items.find(i => i.name === `App B ${tag}`);
      // O melhor poder aceito da conta A: o do 'meio', mais o pouco que o teto deixou entrar quando o 'fim' foi cortado.
      assert(BigInt(all.me.value) >= BigInt(companyOf('meio').power) && BigInt(all.me.value) < BigInt(companyOf('meio').power) + 100n, 'poder no ranking ' + all.me.value);
      if (mine && other) { assert(all.items.indexOf(other) < all.items.indexOf(mine), 'mais poder na frente'); assert(mine.mine); assert(!other.mine); }
      const week = await (await call('GET', '/rankings?metric=stage&period=week')).json() as { key: string; me: unknown; items: unknown[] };
      assert.equal(week.key, isoWeek(new Date())); assert.equal(week.me, null, 'sem token, sem posição'); assert(week.items.length >= 1 && week.items.length <= 10);
      assert.equal((await call('GET', '/rankings?metric=gold')).status, 400);
      const vigil = await prisma.confrontationRank.count({ where: { accountId: existing.id, metric: 'VIGIL' } });
      assert.equal(vigil, 0, 'Vigília cortada não entra no ranking');
    });
    await t.test('Prova da Vigília: na última fase vale o andar que o servidor calculou; peça que o jogo não faria não entra; voltar ao que era não é cortado', async () => {
      const fim = companyOf('fim');
      const made = await call('POST', '/auth/register', { email: `app-${tag}-c@example.invalid`, password, name: `App C ${tag}` });
      assert.equal(made.status, 201);
      const tokenC = (await made.json() as { token: string }).token;
      const C = await prisma.account.findUniqueOrThrow({ where: { email: `app-${tag}-c@example.invalid` } });
      type Answer = { version: number; adjusted: string[]; verified: { vigilBest: number; power: string }; trial: { floor: number; power: number; rejected: number } };
      // O app diz Vigília 999 e poder de trilhões: nada disso é lido. Conta o que a companhia do save alcança.
      const fair = saveOf({ gold: 1_000, xp: 1_000, items: 10, furthest: 20, vigil: 999, company: 'fim' });
      const first = await (await call('PUT', '/save', { baseVersion: 0, data: fair, summary: { power: 9e12 } }, tokenC)).json() as Answer;
      assert.deepEqual(first.adjusted, []);
      assert.deepEqual(first.trial, { floor: fim.trial.floor, power: fim.power, rejected: 0 });
      assert.equal(first.verified.vigilBest, fim.trial.floor); assert.equal(first.verified.power, String(fim.power));
      assert(fim.trial.floor >= 1, 'a companhia do fim da campanha vence o primeiro andar');
      const board = await (await call('GET', '/rankings?metric=vigil&period=all', undefined, tokenC)).json() as { me: { value: string } };
      assert.equal(board.me.value, String(fim.trial.floor));
      // Save editado: a arma do primeiro herói com uma linha 100 vezes maior. A peça fica de fora e o envio fica marcado.
      const edited = structuredClone(fair);
      edited.members[0].gear.weapon.mods[0].value *= 100;
      const second = await (await call('PUT', '/save', { baseVersion: first.version, data: edited }, tokenC)).json() as Answer;
      assert.equal(second.trial.rejected, 1);
      assert(second.trial.power < fim.power, 'sem a arma o poder desce'); assert(second.trial.floor <= fim.trial.floor);
      const log = await prisma.confrontationSync.findFirstOrThrow({ where: { accountId: C.id }, orderBy: { id: 'desc' } });
      assert.equal((log.claimed as { rejected: number }).rejected, 1);
      // A companhia volta ao que era segundos depois: não é crescimento novo, entra inteira.
      const third = await (await call('PUT', '/save', { baseVersion: second.version, data: fair }, tokenC)).json() as Answer;
      assert.deepEqual(third.adjusted, []);
      assert.equal(third.verified.vigilBest, fim.trial.floor); assert.equal(third.verified.power, String(fim.power));
    });
    await t.test('banido não usa o app; sair apaga o token', async () => {
      const B = await prisma.account.findUniqueOrThrow({ where: { email: `app-${tag}-b@example.invalid` } });
      const ban = await prisma.punishment.create({ data: { accountId: B.id, kind: 'BAN', reason: 'teste', createdById: existing.id } });
      assert.equal((await call('GET', '/me', undefined, tokenB)).status, 403);
      await prisma.punishment.update({ where: { id: ban.id }, data: { revokedAt: new Date() } });
      assert.equal((await call('POST', '/auth/logout', {}, tokenA)).status, 200);
      assert.equal((await call('GET', '/me', undefined, tokenA)).status, 401);
    });
    await t.test('esqueci a senha pelo app: mesma resposta com ou sem conta, e o link é criado só para quem tem', async () => {
      const known = await call('POST', '/auth/forgot-password', { email: `app-${tag}-b@example.invalid` });
      const unknown = await call('POST', '/auth/forgot-password', { email: `app-${tag}-ninguem@example.invalid` });
      assert.equal(known.status, 200); assert.equal(unknown.status, 200);
      assert.deepEqual(await known.json(), await unknown.json());
      const B = await prisma.account.findUniqueOrThrow({ where: { email: `app-${tag}-b@example.invalid` } });
      // O envio não segura a resposta: o link aparece logo depois.
      let links = 0;
      for (let i = 0; i < 40 && links === 0; i++) { links = await prisma.accountToken.count({ where: { accountId: B.id, kind: 'RESET', usedAt: null } }); if (!links) await new Promise(r => setTimeout(r, 50)); }
      assert.equal(links, 1);
      assert.equal((await call('POST', '/auth/forgot-password', { email: 'sem-arroba' })).status, 400);
    });
    await t.test('apagar a conta: pede a senha, tira os dados pessoais e do app, guarda o extrato sem nome', async () => {
      const email = `app-${tag}-del@example.invalid`;
      const made = await call('POST', '/auth/register', { email, password, name: `App Del ${tag}` });
      assert.equal(made.status, 201);
      const token = (await made.json() as { token: string }).token;
      const account = await prisma.account.findUniqueOrThrow({ where: { email }, include: { characters: true } });
      const hero = account.characters[0];
      assert.equal((await call('PUT', '/save', { baseVersion: 0, data: saveOf({ gold: 900, xp: 500, items: 4, furthest: 2, company: 'novo' }) }, token)).status, 200);
      await prisma.friendship.create({ data: { requesterId: hero.id, addresseeId: existing.characters[0].id, status: 'ACCEPTED', respondedAt: new Date() } });
      await prisma.character.update({ where: { id: hero.id }, data: { profileBio: 'meu nome de verdade', profileAbout: 'texto pessoal' } });
      const ledgerBefore = await prisma.goldLedger.count({ where: { characterId: hero.id } });
      assert(ledgerBefore >= 1, 'o ouro inicial está no extrato');

      // Sem token, com senha errada ou conta da equipe: nada é apagado.
      assert.equal((await call('POST', '/account/delete', { password })).status, 401);
      assert.equal((await call('POST', '/account/delete', { password: 'senha-errada-123' }, token)).status, 403);
      assert.equal((await call('GET', '/me', undefined, token)).status, 200);
      const staff = await prisma.account.create({ data: { email: `app-${tag}-staff@example.invalid`, password: hash, role: 'ADMIN', characters: { create: { name: `App Staff ${tag}` } } } });
      const staffToken = (await (await call('POST', '/auth/login', { email: staff.email, password })).json() as { token: string }).token;
      assert.equal((await call('POST', '/account/delete', { password }, staffToken)).status, 403);
      assert.equal((await prisma.account.findUniqueOrThrow({ where: { id: staff.id } })).deletedAt, null);

      const gone = await call('POST', '/account/delete', { password }, token);
      assert.equal(gone.status, 200);
      // A conta não abre mais: nem com o token, nem com e-mail e senha.
      assert.equal((await call('GET', '/me', undefined, token)).status, 401);
      assert.equal((await call('POST', '/auth/login', { email, password })).status, 401);
      const after = await prisma.account.findUniqueOrThrow({ where: { id: account.id } });
      assert.equal(after.email, `apagada-${account.id}@conta-apagada.invalid`); assert(after.deletedAt); assert.equal(after.emailVerifiedAt, null);
      assert.notEqual(after.password, account.password);
      const heroAfter = await prisma.character.findUniqueOrThrow({ where: { id: hero.id } });
      assert.equal(heroAfter.name, `Apagado #${hero.id}`); assert.equal(heroAfter.profileBio, null); assert.equal(heroAfter.profileAbout, null);
      // Dados do app e vínculos pessoais saíram.
      assert.equal(await prisma.confrontationSave.findUnique({ where: { accountId: account.id } }), null);
      assert.equal(await prisma.confrontationRank.count({ where: { accountId: account.id } }), 0);
      assert.equal(await prisma.confrontationSync.count({ where: { accountId: account.id } }), 0);
      assert.equal(await prisma.session.count({ where: { accountId: account.id } }), 0);
      assert.equal(await prisma.friendship.count({ where: { OR: [{ requesterId: hero.id }, { addresseeId: hero.id }] } }), 0);
      // O extrato fica: apagar essas linhas quebraria a conciliação do ouro.
      assert.equal(await prisma.goldLedger.count({ where: { characterId: hero.id } }), ledgerBefore);
      // Apagar de novo não encontra a conta; o e-mail e o nome ficam livres para uma conta nova.
      assert.equal((await call('POST', '/account/delete', { password }, token)).status, 401);
      const again = await call('POST', '/auth/register', { email, password, name: `App Del ${tag}` });
      assert.equal(again.status, 201);
    });
    await t.test('rotas do site continuam exigindo Origin (o app não abre brecha nelas)', async () => {
      const r = await fetch(`http://127.0.0.1:${address.port}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: existing.email, password }) });
      assert.equal(r.status, 403);
      assert.equal((await call('GET', '/nada')).status, 404);
    });
  } finally {
    // Tira do ranking e da nuvem o que este teste criou, para a base de testes não acumular colocados falsos.
    const mine = (await prisma.account.findMany({ where: { email: { startsWith: `app-${tag}-` } }, select: { id: true } })).map(a => a.id);
    await prisma.confrontationRank.deleteMany({ where: { accountId: { in: mine } } });
    await prisma.confrontationSync.deleteMany({ where: { accountId: { in: mine } } });
    await prisma.confrontationSave.deleteMany({ where: { accountId: { in: mine } } });
    await new Promise<void>(resolve => server.close(() => resolve()));
    await prisma.$disconnect();
  }
});
