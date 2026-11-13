import 'dotenv/config';
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { prisma } from '../src/core/db';
import { hashPassword } from '../src/core/password';
import { ranking } from '../src/community/rankingService';

// Ranking geral: ordem, filtros de vocação e classe, quem fica de fora e a posição de quem olha.
// Os personagens do teste ficam acima de qualquer outro da base (nível alto), então os primeiros do filtro Druida são eles.
test('MySQL: ranking por nível e honra, com filtro de vocação e classe', async t => {
  assert.match(process.env.DATABASE_URL ?? '', /\/[^/?]*_test(?:\?|$)/, 'Use uma base dedicada terminada em _test.');
  const tag = randomUUID().slice(0, 8), password = await hashPassword('Ranking-test-2026!'), top = 9_000_000;
  const mk = (n: string, character: Record<string, unknown>, role: 'PLAYER' | 'ADMIN' = 'PLAYER') => prisma.account.create({ data: { email: `ranking-${tag}-${n}@example.invalid`, password, role,
    characters: { create: { name: `Rk ${n} ${tag}`, vocationChosen: true, ...character } } }, include: { characters: true } });
  const A = await mk('a', { vocation: 'ELDER_DRUID', level: top + 3, experience: 10n });
  const B = await mk('b', { vocation: 'DRUID', level: top + 2, experience: 50n, pvpWins: 3, honorPoints: 999_999 });
  const C = await mk('c', { vocation: 'ELDER_DRUID', classTier: 3, level: top + 2, experience: 40n });
  const H = await mk('h', { vocation: 'DRUID', level: top + 9, fameHidden: true });
  const S = await mk('s', { vocation: 'DRUID', level: top + 9 }, 'ADMIN');
  const a = A.characters[0], b = B.characters[0], c = C.characters[0];
  const names = (r: { items: { name: string }[] }) => r.items.map(i => i.name);

  await t.test('nível: maior nível e, no empate, mais experiência; sem fama escondida nem equipe', async () => {
    const r = await ranking(B.id, { vocation: 'DRUID', as: String(b.id) });
    assert.deepEqual(names(r).slice(0, 3), [a.name, b.name, c.name]);
    assert.ok(!names(r).includes(H.characters[0].name) && !names(r).includes(S.characters[0].name));
    assert.equal(r.me?.rank, 2); assert.equal(r.me?.page, 1);
    assert.equal(typeof r.items[0].experience, 'string');
  });
  await t.test('classe: 0 sem classe, 1 promovido, 2+ pela classe gravada', async () => {
    assert.deepEqual(names(await ranking(A.id, { vocation: 'DRUID', tier: '0' })).slice(0, 1), [b.name]);
    assert.deepEqual(names(await ranking(A.id, { vocation: 'DRUID', tier: '1' })).slice(0, 1), [a.name]);
    assert.deepEqual(names(await ranking(A.id, { vocation: 'DRUID', tier: '3' })).slice(0, 1), [c.name]);
    assert.equal((await ranking(A.id, { vocation: 'DRUID', tier: '1', as: String(c.id) })).me, null, 'personagem de outra conta não mostra posição');
    assert.equal((await ranking(B.id, { vocation: 'KNIGHT', as: String(b.id) })).me, null, 'fora do filtro não tem posição');
  });
  await t.test('honra: só quem venceu duelo', async () => {
    const r = await ranking(B.id, { board: 'HONOR', vocation: 'DRUID', as: String(b.id) });
    assert.equal(r.items[0].name, b.name); assert.ok(!names(r).includes(a.name)); assert.equal(r.me?.rank, 1);
  });
  await t.test('filtros inválidos são recusados', async () => {
    await assert.rejects(() => ranking(A.id, { board: 'GOLD' }), /Ranking inválido/);
    await assert.rejects(() => ranking(A.id, { vocation: 'ELDER_DRUID' }), /Vocação inválida/);
    await assert.rejects(() => ranking(A.id, { tier: '9' }), /Classe inválida/);
  });
  await prisma.character.deleteMany({ where: { name: { endsWith: ` ${tag}` } } });
  await prisma.account.deleteMany({ where: { email: { startsWith: `ranking-${tag}-` } } });
});
