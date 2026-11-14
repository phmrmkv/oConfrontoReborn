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

import { chestAfterHours, GUILD_MAX_LEVEL, guildDayKey, guildLevelCost, guildLevelFor, guildNextDay, guildNextWeek, guildPeriodStart, guildWeekKey, memberLimitFor, pinnedLimitFor } from './guild';
test('nível da guilda: custo cumulativo (N−1)², teto 10 e vantagens por nível', () => {
  assert.deepEqual([1, 2, 3, 4, 10].map(l => guildLevelCost(l, 5000)), [0, 5000, 20000, 45000, 405000]);
  assert.deepEqual([0, 4999, 5000, 19999, 20000, 404999, 405000, 99_999_999].map(t => guildLevelFor(t, 5000)), [1, 1, 2, 2, 3, 9, 10, GUILD_MAX_LEVEL]);
  assert.deepEqual([1, 2, 10].map(memberLimitFor), [50, 55, 95]);
  assert.deepEqual([1, 3, 4, 7, 10].map(pinnedLimitFor), [3, 3, 4, 5, 6]);
  assert.equal(memberLimitFor(0), 50); assert.equal(memberLimitFor(99), 95);
  assert.deepEqual([chestAfterHours.daily, chestAfterHours.weekly], [24, 72]);
});
test('dia e semana de Brasília: o dia vira 03:00 UTC e a semana começa na segunda', () => {
  // Sábado 2026-11-14, 12:00 UTC = 09:00 em Brasília.
  const noon = Date.parse('2026-11-14T12:00:00Z');
  assert.equal(guildDayKey(noon), '2026-11-14');
  assert.equal(guildDayKey(Date.parse('2026-11-14T02:59:59Z')), '2026-11-13'); // ainda é sexta à noite em Brasília
  assert.equal(guildDayKey(Date.parse('2026-11-14T03:00:00Z')), '2026-11-14');
  assert.equal(guildWeekKey(noon), '2026-11-09'); // segunda-feira
  assert.equal(guildWeekKey(Date.parse('2026-11-16T02:59:00Z')), '2026-11-09'); // domingo à noite ainda é a mesma semana
  assert.equal(guildWeekKey(Date.parse('2026-11-16T03:00:00Z')), '2026-11-16');
  assert.equal(guildPeriodStart('2026-11-14').toISOString(), '2026-11-14T03:00:00.000Z');
  assert.equal(guildNextDay(noon).toISOString(), '2026-11-15T03:00:00.000Z');
  assert.equal(guildNextWeek(noon).toISOString(), '2026-11-16T03:00:00.000Z');
});
