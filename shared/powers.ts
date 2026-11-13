// Poderes da caçada solo (PODERES.md, 2026-11-13): um poder próprio por vocação (ação POWER) e Meditar (ação MEDITATE), para todos.
// Regras compartilhadas entre o motor (backend/src/core/engine.ts) e a tela. O duelo e a Caçada em grupo não usam estes poderes.
// Os efeitos que o herói põe na criatura e o reforço do Grito de guerra valem só dentro da batalha.
import { baseVocation } from './adventure';

export type PowerKey = 'WAR_CRY' | 'POISON_ARROW' | 'FROST_BOLT' | 'ROOTS' | 'MEDITATE';
// Efeito na criatura: veneno tira vida no fim do turno; lentidão enfraquece o golpe dela; raízes a prendem no turno.
export type FoeEffectKind = 'POISON' | 'SLOW' | 'ROOT';
export interface FoeEffect { kind: FoeEffectKind; turns: number }
export interface Buff { kind: 'WAR_CRY'; turns: number }

// `mana` = custo; `cooldown` = turnos de espera depois de usar (0 = pode repetir no turno seguinte).
export const powers: Record<PowerKey, { name: string; vocation: string | null; mana: number; cooldown: number; help: string }> = {
  WAR_CRY: { name: 'Grito de guerra', vocation: 'KNIGHT', mana: 15, cooldown: 4, help: 'Neste turno e nos 2 seguintes: dano ×1,3 e defesa ×1,2. Não ataca no turno do grito.' },
  POISON_ARROW: { name: 'Flecha envenenada', vocation: 'PALADIN', mana: 12, cooldown: 2, help: 'Golpe ×0,8 que envenena a criatura: 3% da vida dela por turno, 3 turnos (chefe: 2).' },
  FROST_BOLT: { name: 'Raio congelante', vocation: 'SORCERER', mana: 18, cooldown: 2, help: 'Golpe ×1,2 que deixa a criatura lenta: 20% menos dano por 2 turnos (chefe: 1).' },
  ROOTS: { name: 'Raízes', vocation: 'DRUID', mana: 22, cooldown: 4, help: 'A criatura não ataca neste turno. Não segura o golpe pesado anunciado do chefe (para ele, Interromper).' },
  MEDITATE: { name: 'Meditar', vocation: null, mana: 0, cooldown: 3, help: 'Recupera 25% da mana máxima e defende com ×1,5 neste turno. Não ataca.' },
};
// Números de cada poder (os de `powers` acima descrevem o mesmo para o jogador).
export const powerTuning = {
  warCry: { turns: 3, damagePercent: 130, defensePercent: 120 },
  poisonArrow: { strikePercent: 80, turns: 3, bossTurns: 2, damagePercent: 3 },
  frostBolt: { strikePercent: 120, turns: 2, bossTurns: 1, attackPercent: 80 },
  meditate: { manaPercent: 25, defensePercent: 150 },
};
const byVocation: Record<string, PowerKey> = { KNIGHT: 'WAR_CRY', PALADIN: 'POISON_ARROW', SORCERER: 'FROST_BOLT', DRUID: 'ROOTS' };
/** O poder próprio da vocação (vocação promovida usa o da base). */
export const vocationPower = (vocation: string): PowerKey => byVocation[baseVocation(vocation)] ?? 'WAR_CRY';
/** O poder que uma ação nova representa para a vocação: POWER = o da vocação, MEDITATE = Meditar. */
export const powerOf = (action: string, vocation: string): PowerKey | null => action === 'POWER' ? vocationPower(vocation) : action === 'MEDITATE' ? 'MEDITATE' : null;
export const foeEffectNames: Record<FoeEffectKind, string> = { POISON: 'Envenenada', SLOW: 'Lenta', ROOT: 'Presa' };
