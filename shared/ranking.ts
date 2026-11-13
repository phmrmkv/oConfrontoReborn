// Ranking geral (aba Ranking): quadros e filtros. O servidor filtra e ordena (community/rankingService.ts); a tela só mostra.
// Nunca há ranking por ouro. Quem esconde a fama no perfil, contas apagadas e a equipe não aparecem.
import { classNames, promotedOf, vocations, type BaseVocation } from './adventure';

export const rankingBoards = {
  LEVEL: { name: 'Nível', help: 'Os aventureiros de nível mais alto; no empate, quem tem mais experiência.' },
  HONOR: { name: 'Honra', help: 'Pontos de honra do Duelo (vencer quem tem mais honra vale mais). Só entra quem já venceu um duelo.' },
} as const;
export type RankingBoard = keyof typeof rankingBoards;
export const isRankingBoard = (v: unknown): v is RankingBoard => typeof v === 'string' && Object.prototype.hasOwnProperty.call(rankingBoards, v);

/** As vocações do filtro (a promovida entra junto com a de base). */
export const rankingVocations = Object.keys(vocations) as BaseVocation[];
export const isRankingVocation = (v: unknown): v is BaseVocation => typeof v === 'string' && (rankingVocations as string[]).includes(v);
/** Os valores gravados em Character.vocation que contam como uma vocação de base. */
export const storedVocations = (v: BaseVocation) => [v, promotedOf[v]];

/** Classe: 0 = ainda sem classe (antes da promoção do nível 20), 1 a 8 = 1ª a 8ª classe (shared/adventure.ts). */
export const RANKING_MAX_CLASS = 8;
export const isRankingClass = (v: number) => Number.isInteger(v) && v >= 0 && v <= RANKING_MAX_CLASS;
/** Nome da classe no filtro: o nome próprio quando a vocação está escolhida, senão "Nª classe". */
export function rankingClassName(tier: number, vocation?: BaseVocation) {
  if (tier === 0) return vocation ? `${vocations[vocation].name} (sem classe)` : 'Sem classe';
  return vocation ? `${tier}ª classe · ${classNames[vocation][tier - 1]}` : `${tier}ª classe`;
}
