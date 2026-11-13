// Ranking geral (aba Ranking): quadro de Nível ou de Honra, com filtro de vocação e de classe, em páginas de 10, e a posição
// do personagem que está olhando. Só leitura. Nunca por ouro; quem esconde a fama, contas apagadas e a equipe ficam de fora.
import { Prisma } from '@prisma/client';
import { prisma } from '../core/db';
import { GameError, integer } from '../core/engine';
import { pageOf, paged, PAGE_SIZE } from '../core/http';
import { promotedOf, vocations, type BaseVocation } from '../../../shared/adventure';
import { isRankingBoard, isRankingClass, isRankingVocation, storedVocations, type RankingBoard } from '../../../shared/ranking';

const card = { id: true, name: true, level: true, experience: true, vocation: true, classTier: true, profileAvatar: true, profileEmblem: true, honorPoints: true, pvpWins: true, pvpLosses: true } as const;
const promoted = Object.values(promotedOf), base = Object.keys(vocations);
type Row = Prisma.CharacterGetPayload<{ select: typeof card }>;

function classWhere(tier: number): Prisma.CharacterWhereInput {
  // A 1ª classe é a promoção do nível 20 (a vocação promovida); da 2ª em diante fica em Character.classTier.
  if (tier === 0) return { classTier: 0, vocation: { in: base as never[] } };
  if (tier === 1) return { OR: [{ classTier: 1 }, { classTier: 0, vocation: { in: promoted as never[] } }] };
  return { classTier: tier };
}
const orderOf = (board: RankingBoard): Prisma.CharacterOrderByWithRelationInput[] => board === 'LEVEL'
  ? [{ level: 'desc' }, { experience: 'desc' }, { id: 'asc' }]
  : [{ honorPoints: 'desc' }, { pvpWins: 'desc' }, { pvpLosses: 'asc' }, { id: 'asc' }];
// Quem fica à frente de `c` na mesma ordem de orderOf (para a posição dele).
function aheadOf(board: RankingBoard, c: Row): Prisma.CharacterWhereInput {
  if (board === 'LEVEL') return { OR: [{ level: { gt: c.level } }, { level: c.level, experience: { gt: c.experience } }, { level: c.level, experience: c.experience, id: { lt: c.id } }] };
  const same = { honorPoints: c.honorPoints };
  return { OR: [{ honorPoints: { gt: c.honorPoints } }, { ...same, pvpWins: { gt: c.pvpWins } }, { ...same, pvpWins: c.pvpWins, pvpLosses: { lt: c.pvpLosses } }, { ...same, pvpWins: c.pvpWins, pvpLosses: c.pvpLosses, id: { lt: c.id } }] };
}
const shown = (c: Row) => ({ ...c, experience: c.experience.toString() });

export async function ranking(accountId: number, query: Record<string, unknown>) {
  const board: RankingBoard = query.board === undefined || query.board === '' ? 'LEVEL' : isRankingBoard(query.board) ? query.board : (() => { throw new GameError(400, 'Ranking inválido.'); })();
  const vocation: BaseVocation | null = query.vocation === undefined || query.vocation === '' ? null : isRankingVocation(query.vocation) ? query.vocation : (() => { throw new GameError(400, 'Vocação inválida.'); })();
  const tier = query.tier === undefined || query.tier === '' ? null : Number(query.tier);
  if (tier !== null && !isRankingClass(tier)) throw new GameError(400, 'Classe inválida.');
  const where: Prisma.CharacterWhereInput = { AND: [
    { fameHidden: false, account: { deletedAt: null, role: 'PLAYER' } },
    ...(board === 'HONOR' ? [{ pvpWins: { gt: 0 } }] : []),
    ...(vocation ? [{ vocation: { in: storedVocations(vocation) as never[] } }] : [{ vocation: { not: 'NONE' as never } }]),
    ...(tier === null ? [] : [classWhere(tier)]),
  ] };
  const { page, skip, take } = pageOf(query);
  const [rows, total] = await Promise.all([prisma.character.findMany({ where, orderBy: orderOf(board), skip, take, select: card }), prisma.character.count({ where })]);
  // A posição de quem está olhando (?as=<personagem da conta>), se ele entra neste ranking.
  let me: { rank: number; page: number; character: ReturnType<typeof shown> } | null = null;
  if (query.as !== undefined && query.as !== '') {
    const id = integer(Number(query.as));
    const mine = await prisma.character.findFirst({ where: { AND: [{ id, accountId }, where] }, select: card });
    if (mine) {
      const rank = await prisma.character.count({ where: { AND: [where, aheadOf(board, mine)] } }) + 1;
      me = { rank, page: Math.ceil(rank / PAGE_SIZE), character: shown(mine) };
    }
  }
  return { ...paged(rows.map(shown), total, page), board, vocation, tier, first: skip + 1, me };
}
