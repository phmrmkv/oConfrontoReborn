// Folha de efeitos da arena: todo projétil que a arena faz voar precisa de um quadro nela; senão, com a folha pronta, ele
// voltaria ao ícone do TibiaWiki sem ninguém perceber. A lista dos quadros vem de scripts/art.mjs, gravada em spriteSheets.json.
import test from 'node:test';
import assert from 'node:assert/strict';
import sheets from './spriteSheets.json';
import { effectCell, effectRow, heroShot } from './creatureArt';

test('efeitos: o projétil de cada herói de longe e de cada criatura que atira tem um quadro (0 a 11)', () => {
  assert.equal(heroShot('KNIGHT'), undefined);
  const used = [...['PALADIN', 'SORCERER', 'DRUID'].map(v => heroShot(v)), ...Object.values(sheets.shots as Record<string, string>)];
  for (const shot of used) {
    assert.ok(shot, 'herói que ataca de longe sem projétil');
    const cell = effectCell(shot!);
    assert.ok(cell !== undefined && Number.isInteger(cell) && cell >= 0 && cell < 12, `${shot} sem quadro na folha de efeitos`);
  }
});

test('efeitos: guarda, cura e impacto nas linhas 4 a 6; cada projétil num quadro só', () => {
  assert.deepEqual([effectRow('guard'), effectRow('heal'), effectRow('impact')], [3, 4, 5]);
  const cells = Object.values((sheets as unknown as { effectCells: Record<string, number> }).effectCells);
  assert.equal(cells.length, 12);
  assert.equal(new Set(cells).size, cells.length);
});
