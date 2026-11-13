// Arte própria das criaturas e dos heróis. `npm run art` grava a folha da arena (assets/sprites/<arquivo>.webp), o retrato
// de 128 px usado fora dela (assets/sprites/retratos/<arquivo>.webp) e a lista do que existe (spriteSheets.json).
import sheets from './spriteSheets.json';
import manifest from '../../public/assets/tibia/manifest.json';

const heroes: Record<string, string> = sheets.heroes, monsters: Record<string, string> = sheets.monsters, shots: Record<string, string> = sheets.shots;
const nameOfPath = new Map(manifest.entries.map(e => [e.path, e.name]));

/**
 * O arquivo (sem extensão) da arte própria de uma criatura, ou `undefined` se ela ainda usa o sprite do TibiaWiki.
 * As criaturas das Eras e do Vale da Perdição usam o sprite da original; por isso a busca é pelo sprite e só depois pelo nome.
 */
export const creatureFile = (name: string, spritePath?: string): string | undefined => monsters[nameOfPath.get(spritePath ?? '') ?? ''] ?? monsters[name];
/** O arquivo da arte própria do herói de uma vocação-base (KNIGHT, PALADIN, SORCERER, DRUID). */
export const heroFile = (baseVocation: string): string | undefined => heroes[baseVocation];
/** O que voa quando a criatura ataca de longe (nome de ícone do GameIcon), ou `undefined` se ela bate de perto. */
export const creatureShot = (name: string, spritePath?: string): string | undefined => shots[creatureFile(name, spritePath) ?? ''];
export const sheetUrl = (file?: string) => file ? `/assets/sprites/${file}.webp` : undefined;

// O que voa quando o herói ataca de longe (o Cavaleiro bate de perto): o nome do ícone do TibiaWiki, que a folha de efeitos substitui.
const heroShots: Record<string, string> = { PALADIN: 'Arrow', SORCERER: 'Great Fireball Rune', DRUID: 'Heavy Magic Missile Rune' };
/** O projétil do herói de uma vocação-base (KNIGHT, PALADIN, SORCERER, DRUID), ou `undefined` para quem bate de perto. */
export const heroShot = (baseVocation: string): string | undefined => heroShots[baseVocation];

// Folha de efeitos da arena (efeitos.webp; comando no ART.md, seção "Efeitos"): projéteis parados nas linhas 1 a 3, apontando
// para a direita, e guarda, cura e impacto, com 4 quadros cada, nas linhas 4 a 6. `npm run art` grava em spriteSheets.json o
// quadro de cada projétil (pelo ícone do TibiaWiki que ele substitui) e, quando o PNG já existe, o nome da folha.
const fx = sheets as { effects?: string | null; effectCells?: Record<string, number>; effectRows?: Record<string, number> };
/** A folha de efeitos da arena, ou `undefined` enquanto ela não existe (a arena continua com os ícones do TibiaWiki). */
export const effectsSheet = (): string | undefined => sheetUrl(fx.effects ?? undefined);
/** O quadro (0 a 11, da esquerda para a direita e de cima para baixo) do projétil que substitui um ícone do TibiaWiki. */
export const effectCell = (shot: string): number | undefined => fx.effectCells?.[shot];
/** A linha (0 a 5) de uma animação de efeito da arena. */
export const effectRow = (kind: 'guard' | 'heal' | 'impact'): number | undefined => fx.effectRows?.[kind];
export const portraitUrl = (file?: string) => file ? `/assets/sprites/retratos/${file}.webp` : undefined;
