import test from 'node:test';
import assert from 'node:assert/strict';
import { canGuild, canKick, cleanGuildName, cleanGuildTag, guildLimits, isOnline, seenLabel } from './guild';

test('nome da guilda: limpa espaços e recusa o que não pode', () => {
  assert.equal(cleanGuildName('  Guardiões   do Norte ').value, 'Guardiões do Norte');
  assert.equal(cleanGuildName("D'Artagnan-3").value, "D'Artagnan-3");
  for (const bad of ['ab', 'x'.repeat(guildLimits.nameMax + 1), '-Norte', 'Norte-', 'Norte <b>', 'Norte!', '', 42, null]) assert.ok(cleanGuildName(bad).error, String(bad));
});
test('sigla: maiúsculas, 2 a 5 letras ou números', () => {
  assert.equal(cleanGuildTag(' gdn ').value, 'GDN');
  for (const bad of ['a', 'abcdef', 'ab c', 'çã', '[GD]', '']) assert.ok(cleanGuildTag(bad).error, bad);
});
test('cargos: o vice cuida do dia a dia e o líder do resto', () => {
  for (const a of ['accept', 'invite', 'announce', 'moderate', 'kick'] as const) { assert.ok(canGuild('VICE', a), a); assert.ok(canGuild('LEADER', a), a); assert.ok(!canGuild('MEMBER', a), a); }
  for (const a of ['promote', 'describe', 'transfer', 'disband'] as const) { assert.ok(canGuild('LEADER', a), a); assert.ok(!canGuild('VICE', a), a); }
  assert.ok(!canGuild(null, 'accept'));
});
test('expulsar: líder expulsa vice e membro, vice só membro, ninguém expulsa igual ou acima', () => {
  assert.ok(canKick('LEADER', 'VICE') && canKick('LEADER', 'MEMBER') && canKick('VICE', 'MEMBER'));
  assert.ok(!canKick('VICE', 'VICE') && !canKick('VICE', 'LEADER') && !canKick('MEMBER', 'MEMBER') && !canKick('LEADER', 'LEADER') && !canKick(null, 'MEMBER'));
});
test('última visita: online nos últimos minutos e depois em minutos, horas e dias', () => {
  const now = Date.parse('2026-11-14T12:00:00Z'), ago = (min: number) => new Date(now - min * 60_000);
  assert.ok(isOnline(ago(0), now) && isOnline(ago(5), now) && !isOnline(ago(6), now) && !isOnline(null, now));
  assert.deepEqual([null, ago(0), ago(4), ago(12), ago(180), ago(1440), ago(3 * 1440), ago(90 * 1440)].map(d => seenLabel(d, now)),
    ['nunca', 'agora', 'agora', 'há 12 min', 'há 3 h', 'há 1 dia', 'há 3 dias', 'há muito tempo']);
});
