// Lista de amigos (aba Amigos): quem é amigo, se está online, quando visitou o jogo pela última vez e a guilda. Só leitura; pedir,
// aceitar, recusar e desfazer amizade continuam em communityService.ts (rotas /community/friends).
import { prisma } from '../core/db';
import { GameError, integer } from '../core/engine';
import { pageOf, paged } from '../core/http';
import { ONLINE_MINUTES, isOnline } from '../../../shared/guild';

const card = { id: true, name: true, level: true, vocation: true, classTier: true, profileAvatar: true, profileEmblem: true, lastSeenAt: true, guild: { select: { id: true, name: true, tag: true } } } as const;
export async function friendList(accountId: number, characterId: number, query: Record<string, unknown>) {
  const me = await prisma.character.findFirst({ where: { id: integer(characterId), accountId }, select: { id: true } });
  if (!me) throw new GameError(404, 'Personagem não encontrado.');
  const links = await prisma.friendship.findMany({ where: { status: 'ACCEPTED', OR: [{ requesterId: me.id }, { addresseeId: me.id }] }, select: { id: true, requesterId: true, addresseeId: true }, take: 2000 });
  const byFriend = new Map(links.map(l => [l.requesterId === me.id ? l.addresseeId : l.requesterId, l.id])), ids = [...byFriend.keys()];
  const q = typeof query.q === 'string' ? query.q.trim().slice(0, 24) : '', { page, skip, take } = pageOf(query);
  const where = { id: { in: ids }, ...(q ? { name: { startsWith: q } } : {}) };
  // Quem visitou o jogo há pouco primeiro (no MySQL, quem nunca visitou fica por último na ordem decrescente), depois por nome.
  const [rows, total, online] = await Promise.all([
    prisma.character.findMany({ where, orderBy: [{ lastSeenAt: 'desc' }, { name: 'asc' }], skip, take, select: card }),
    prisma.character.count({ where }),
    prisma.character.count({ where: { id: { in: ids }, lastSeenAt: { gte: new Date(Date.now() - ONLINE_MINUTES * 60_000) } } })]);
  return { ...paged(rows.map(r => ({ ...r, friendshipId: byFriend.get(r.id) ?? 0, online: isOnline(r.lastSeenAt) })), total, page), totalFriends: ids.length, onlineCount: online };
}
