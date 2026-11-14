// Guildas: criar, pedir entrada ou ser convidado, cargos (Líder, Vice-líder, Membro), expulsar, passar a liderança, dissolver e o
// quadro interno da guilda (tópicos e respostas, só para membros). Estilo de fórum antigo, sem nenhum efeito em combate, XP,
// ouro ou drops. Toda mudança trava o personagem de quem age (lockCharacter, que também confere a conta) e depois a linha da
// guilda, sempre nessa ordem; entrar numa guilda usa um UPDATE condicional (guildId nulo) para ninguém ficar em duas.
import { Prisma } from '@prisma/client';
import { prisma, transaction, lockCharacter } from '../core/db';
import { GameError, integer } from '../core/engine';
import { pageOf, paged } from '../core/http';
import { cleanText } from '../../../shared/community';
import { canGuild, canKick, cleanGuildName, cleanGuildTag, guildLimits, guildRanks, isGuildRank, isOnline, type GuildRank } from '../../../shared/guild';
type Tx = Prisma.TransactionClient;
const card = { id: true, name: true, level: true, vocation: true, classTier: true, profileAvatar: true, profileEmblem: true } as const;
const memberSelect = { ...card, guildRank: true, guildJoinedAt: true, lastSeenAt: true } as const;
const guildCard = { id: true, name: true, tag: true } as const;
const rankOf = (c: { guildRank: string }): GuildRank => isGuildRank(c.guildRank) ? c.guildRank : 'MEMBER';

async function lockGuild(tx: Tx, id: number) {
  integer(id);
  const rows = await tx.$queryRaw<{ id: number }[]>`SELECT id FROM \`Guild\` WHERE id = ${id} FOR UPDATE`;
  if (rows.length !== 1) throw new GameError(404, 'Guilda não encontrada.');
  return tx.guild.findUniqueOrThrow({ where: { id } });
}
// Quem age: personagem travado + a guilda dele travada. Sem guilda, erro.
async function actor(tx: Tx, accountId: number, characterId: number) {
  const me = await lockCharacter(tx, accountId, characterId);
  if (!me.guildId) throw new GameError(409, 'Você não está em uma guilda.');
  const guild = await lockGuild(tx, me.guildId);
  return { me, guild, rank: rankOf(me) };
}
async function ownCharacter(accountId: number, characterId: number) {
  const c = await prisma.character.findFirst({ where: { id: characterId, accountId }, select: { id: true, name: true, level: true, guildId: true, guildRank: true } });
  if (!c) throw new GameError(404, 'Personagem não encontrado.');
  return c;
}
const memberDto = (c: { id: number; name: string; level: number; vocation: string; classTier: number; profileAvatar: string | null; profileEmblem: string | null; guildRank: string; guildJoinedAt: Date | null; lastSeenAt: Date | null }) =>
  ({ id: c.id, name: c.name, level: c.level, vocation: c.vocation, classTier: c.classTier, profileAvatar: c.profileAvatar, profileEmblem: c.profileEmblem,
    rank: rankOf(c), joinedAt: c.guildJoinedAt, lastSeenAt: c.lastSeenAt, online: isOnline(c.lastSeenAt) });
const text = (value: unknown, min: number, max: number, what: string) => {
  const t = cleanText(value);
  if (t.length < min) throw new GameError(400, `Escreva ${what}.`);
  if (t.length > max) throw new GameError(400, `${what[0].toUpperCase()}${what.slice(1)} pode ter até ${max} caracteres.`);
  return t;
};
const optionalText = (value: unknown, max: number, what: string) => {
  const t = cleanText(value);
  if (t.length > max) throw new GameError(400, `${what[0].toUpperCase()}${what.slice(1)} pode ter até ${max} caracteres.`);
  return t;
};
const isUnique = (e: unknown) => e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002';

// ---------- Leituras ----------

// Lista de guildas (fórum antigo: tabela com sigla, nome, líder, membros e data), com busca por nome ou sigla.
export async function guildDirectory(query: Record<string, unknown>) {
  const { page, skip, take } = pageOf(query), q = typeof query.q === 'string' ? query.q.trim().slice(0, guildLimits.nameMax) : '';
  const where: Prisma.GuildWhereInput = q ? { OR: [{ name: { contains: q } }, { tag: { startsWith: q } }] } : {};
  const [rows, total] = await Promise.all([
    prisma.guild.findMany({ where, orderBy: [{ members: { _count: 'desc' } }, { name: 'asc' }], skip, take,
      select: { id: true, name: true, tag: true, description: true, leaderId: true, createdAt: true, _count: { select: { members: true } } } }),
    prisma.guild.count({ where })]);
  const leaders = new Map((await prisma.character.findMany({ where: { id: { in: rows.map(r => r.leaderId) } }, select: { id: true, name: true } })).map(l => [l.id, l.name]));
  return paged(rows.map(g => ({ id: g.id, name: g.name, tag: g.tag, description: g.description.slice(0, 140), leader: leaders.get(g.leaderId) ?? '—', members: g._count.members, createdAt: g.createdAt })), total, page);
}

// A situação do personagem: em que guilda está, convites e pedidos dele e se pode criar uma.
export async function myGuild(accountId: number, characterId: number) {
  const c = await ownCharacter(accountId, characterId);
  const apps = await prisma.guildApplication.findMany({ where: { characterId }, orderBy: { id: 'desc' }, include: { guild: { select: guildCard } } });
  const guild = c.guildId ? await prisma.guild.findUnique({ where: { id: c.guildId }, select: guildCard }) : null;
  return { guild, rank: guild ? rankOf(c) : null, level: c.level, canCreate: !guild && c.level >= guildLimits.minLevelToCreate, minLevel: guildLimits.minLevelToCreate,
    invites: apps.filter(a => a.kind === 'INVITE').map(a => ({ id: a.id, guild: a.guild, createdAt: a.createdAt })),
    requests: apps.filter(a => a.kind === 'REQUEST').map(a => ({ id: a.id, guild: a.guild, createdAt: a.createdAt })) };
}

// Página de uma guilda: qualquer um vê descrição e membros; aviso do líder e pedidos só para quem é da guilda (pedidos: vice+).
export async function guildPage(accountId: number, characterId: number, guildId: number) {
  const viewer = await ownCharacter(accountId, characterId);
  const g = await prisma.guild.findUnique({ where: { id: integer(guildId) }, include: { members: { select: memberSelect } } });
  if (!g) throw new GameError(404, 'Guilda não encontrada.');
  const members = g.members.map(memberDto).sort((a, b) => guildRanks[b.rank].order - guildRanks[a.rank].order || b.level - a.level || a.name.localeCompare(b.name));
  const rank = viewer.guildId === g.id ? rankOf(viewer) : null;
  const [applications, mine] = await Promise.all([
    canGuild(rank, 'accept') ? prisma.guildApplication.findMany({ where: { guildId: g.id }, orderBy: { id: 'asc' }, include: { character: { select: card } } }) : [],
    prisma.guildApplication.findUnique({ where: { guildId_characterId: { guildId: g.id, characterId } } })]);
  return { id: g.id, name: g.name, tag: g.tag, description: g.description, announcement: rank ? g.announcement : null, createdAt: g.createdAt, leaderId: g.leaderId,
    memberLimit: guildLimits.members, members, viewerRank: rank, viewerInGuild: !!viewer.guildId, viewerApplication: mine ? { id: mine.id, kind: mine.kind } : null,
    applications: applications.map(a => ({ id: a.id, kind: a.kind, createdAt: a.createdAt, character: a.character })) };
}

// Quadro da guilda: só para membros. Fixados primeiro, depois o mais recente.
export async function guildBoard(accountId: number, characterId: number, query: Record<string, unknown>) {
  const c = await ownCharacter(accountId, characterId);
  if (!c.guildId) throw new GameError(403, 'O quadro é só para membros da guilda.');
  const { page, skip, take } = pageOf(query), where = { guildId: c.guildId };
  const [rows, total] = await Promise.all([
    prisma.guildPost.findMany({ where, orderBy: [{ pinned: 'desc' }, { lastReplyAt: 'desc' }], skip, take, select: { id: true, title: true, pinned: true, replyCount: true, createdAt: true, lastReplyAt: true, author: { select: card } } }),
    prisma.guildPost.count({ where })]);
  return paged(rows, total, page);
}
export async function guildTopic(accountId: number, characterId: number, postId: number, query: Record<string, unknown>) {
  const c = await ownCharacter(accountId, characterId);
  const post = await prisma.guildPost.findUnique({ where: { id: integer(postId) }, include: { author: { select: card } } });
  if (!post || post.guildId !== c.guildId) throw new GameError(404, 'Tópico não encontrado.');
  const { page, skip, take } = pageOf(query);
  const replies = await prisma.guildReply.findMany({ where: { postId: post.id }, orderBy: { id: 'asc' }, skip, take, include: { author: { select: card } } });
  return { post: { id: post.id, title: post.title, body: post.body, pinned: post.pinned, createdAt: post.createdAt, author: post.author, replyCount: post.replyCount },
    ...paged(replies.map(r => ({ id: r.id, body: r.body, createdAt: r.createdAt, author: r.author })), post.replyCount, page), viewerRank: rankOf(c) };
}

// ---------- Mudanças ----------

export async function createGuild(accountId: number, characterId: number, body: { name?: unknown; tag?: unknown; description?: unknown }) {
  const name = cleanGuildName(body.name), tag = cleanGuildTag(body.tag);
  if (name.error) throw new GameError(400, name.error);
  if (tag.error) throw new GameError(400, tag.error);
  const description = optionalText(body.description, guildLimits.description, 'a descrição');
  return transaction(async tx => {
    const me = await lockCharacter(tx, accountId, characterId);
    if (me.guildId) throw new GameError(409, 'Saia da sua guilda atual antes de criar outra.');
    if (me.level < guildLimits.minLevelToCreate) throw new GameError(403, `Criar uma guilda exige o nível ${guildLimits.minLevelToCreate}.`);
    try {
      const guild = await tx.guild.create({ data: { name: name.value as string, tag: tag.value as string, description: description || 'Uma nova guilda de Capriel.', leaderId: me.id } });
      await tx.character.update({ where: { id: me.id }, data: { guildId: guild.id, guildRank: 'LEADER', guildJoinedAt: new Date() } });
      await tx.guildApplication.deleteMany({ where: { characterId: me.id } });
      return { message: `Guilda [${guild.tag}] ${guild.name} criada. Você é o líder.`, guildId: guild.id };
    } catch (e) {
      if (isUnique(e)) throw new GameError(409, 'Já existe uma guilda com esse nome ou essa sigla.');
      throw e;
    }
  });
}

export async function requestJoin(accountId: number, characterId: number, guildId: number) {
  return transaction(async tx => {
    const me = await lockCharacter(tx, accountId, characterId);
    if (me.guildId) throw new GameError(409, 'Você já está em uma guilda.');
    const guild = await lockGuild(tx, guildId);
    if (await tx.guildApplication.findUnique({ where: { guildId_characterId: { guildId, characterId } } })) return { message: 'Você já tem um pedido ou convite desta guilda.' };
    if (await tx.guildApplication.count({ where: { characterId, kind: 'REQUEST' } }) >= guildLimits.requestsPerCharacter) throw new GameError(429, `Você pode ter até ${guildLimits.requestsPerCharacter} pedidos de entrada ao mesmo tempo.`);
    if (await tx.guildApplication.count({ where: { guildId } }) >= guildLimits.applicationsPerGuild) throw new GameError(429, 'Esta guilda já tem pedidos demais esperando.');
    if (await tx.character.count({ where: { guildId } }) >= guildLimits.members) throw new GameError(409, 'Esta guilda está cheia.');
    await tx.guildApplication.create({ data: { guildId, characterId, kind: 'REQUEST' } });
    return { message: `Pedido enviado para [${guild.tag}] ${guild.name}. Os líderes vão avaliar.` };
  });
}

export async function invite(accountId: number, characterId: number, targetName: unknown) {
  if (typeof targetName !== 'string' || targetName.trim().length < 3) throw new GameError(400, 'Escreva o nome do aventureiro.');
  return transaction(async tx => {
    const { me, guild, rank } = await actor(tx, accountId, characterId);
    if (!canGuild(rank, 'invite')) throw new GameError(403, 'Só o líder e os vice-líderes convidam.');
    const target = await tx.character.findUnique({ where: { name: targetName.trim() }, select: { id: true, name: true, guildId: true } });
    if (!target) throw new GameError(404, 'Personagem não encontrado.');
    if (target.id === me.id) throw new GameError(400, 'Você já é da guilda.');
    if (target.guildId) throw new GameError(409, `${target.name} já está em uma guilda.`);
    if (await tx.characterBlock.findFirst({ where: { OR: [{ blockerId: me.id, blockedId: target.id }, { blockerId: target.id, blockedId: me.id }] } })) throw new GameError(403, 'Você não pode convidar este jogador.');
    if (await tx.guildApplication.findUnique({ where: { guildId_characterId: { guildId: guild.id, characterId: target.id } } })) return { message: `${target.name} já tem um pedido ou convite desta guilda.` };
    if (await tx.guildApplication.count({ where: { guildId: guild.id } }) >= guildLimits.applicationsPerGuild) throw new GameError(429, 'Há pedidos e convites demais esperando. Resolva alguns antes.');
    if (await tx.character.count({ where: { guildId: guild.id } }) >= guildLimits.members) throw new GameError(409, 'A guilda está cheia.');
    await tx.guildApplication.create({ data: { guildId: guild.id, characterId: target.id, kind: 'INVITE' } });
    return { message: `Convite enviado para ${target.name}.` };
  });
}

// Entrada de um personagem sem guilda. Devolve a mensagem; quem chama apaga o pedido. UPDATE condicional: se ele entrou em outro lugar, não entra.
async function join(tx: Tx, guild: { id: number; tag: string; name: string }, targetId: number, targetName: string) {
  if (await tx.character.count({ where: { guildId: guild.id } }) >= guildLimits.members) throw new GameError(409, 'A guilda está cheia.');
  const done = await tx.character.updateMany({ where: { id: targetId, guildId: null }, data: { guildId: guild.id, guildRank: 'MEMBER', guildJoinedAt: new Date() } });
  await tx.guildApplication.deleteMany({ where: { characterId: targetId } });
  return done.count === 1 ? `${targetName} entrou em [${guild.tag}] ${guild.name}.` : `${targetName} já entrou em outra guilda; o pedido foi encerrado.`;
}

// Aceitar ou recusar um pedido (vice+) ou um convite (quem recebeu); cancelar o próprio pedido ou um convite da guilda (vice+).
export async function decideApplication(accountId: number, characterId: number, appId: number, action: string) {
  if (!['accept', 'decline', 'cancel'].includes(action)) throw new GameError(400, 'Ação inválida.');
  integer(appId);
  return transaction(async tx => {
    const me = await lockCharacter(tx, accountId, characterId);
    const first = await tx.guildApplication.findUnique({ where: { id: appId }, select: { guildId: true } });
    if (!first) throw new GameError(404, 'Pedido não encontrado.');
    const guild = await lockGuild(tx, first.guildId);
    const app = await tx.guildApplication.findUnique({ where: { id: appId }, include: { character: { select: { id: true, name: true } } } });
    if (!app) throw new GameError(404, 'Pedido não encontrado.');
    const rank = me.guildId === guild.id ? rankOf(me) : null, mine = app.characterId === me.id;
    if (app.kind === 'REQUEST') {
      if (mine && action === 'cancel') { await tx.guildApplication.delete({ where: { id: appId } }); return { message: 'Pedido cancelado.' }; }
      if (!canGuild(rank, 'accept') || action === 'cancel') throw new GameError(403, 'Só o líder e os vice-líderes decidem pedidos de entrada.');
      if (action === 'decline') { await tx.guildApplication.delete({ where: { id: appId } }); return { message: `Pedido de ${app.character.name} recusado.` }; }
      return { message: await join(tx, guild, app.character.id, app.character.name) };
    }
    if (mine) {
      if (action === 'accept') {
        if (me.guildId) { await tx.guildApplication.delete({ where: { id: appId } }); throw new GameError(409, 'Você já está em uma guilda.'); }
        return { message: await join(tx, guild, me.id, me.name) };
      }
      await tx.guildApplication.delete({ where: { id: appId } }); return { message: action === 'decline' ? 'Convite recusado.' : 'Convite cancelado.' };
    }
    if (canGuild(rank, 'invite') && action === 'cancel') { await tx.guildApplication.delete({ where: { id: appId } }); return { message: 'Convite cancelado.' }; }
    throw new GameError(403, 'Você não pode decidir este pedido.');
  });
}

// Remove o personagem da guilda. Líder com mais gente precisa passar a liderança antes; sozinho, sair dissolve a guilda.
async function removeFromGuild(tx: Tx, guildId: number, characterId: number) {
  await tx.character.updateMany({ where: { id: characterId, guildId }, data: { guildId: null, guildRank: 'MEMBER', guildJoinedAt: null } });
}
async function dissolve(tx: Tx, guildId: number) {
  await tx.character.updateMany({ where: { guildId }, data: { guildId: null, guildRank: 'MEMBER', guildJoinedAt: null } });
  await tx.guild.delete({ where: { id: guildId } });
}
export async function leaveGuild(accountId: number, characterId: number) {
  return transaction(async tx => {
    const { me, guild, rank } = await actor(tx, accountId, characterId);
    if (rank === 'LEADER') {
      if (await tx.character.count({ where: { guildId: guild.id } }) > 1) throw new GameError(409, 'Passe a liderança para outro membro antes de sair, ou dissolva a guilda.');
      await dissolve(tx, guild.id);
      return { message: `Você era o último membro: a guilda [${guild.tag}] ${guild.name} foi dissolvida.` };
    }
    await removeFromGuild(tx, guild.id, me.id);
    return { message: `Você saiu de [${guild.tag}] ${guild.name}.` };
  });
}

export async function kickMember(accountId: number, characterId: number, targetId: number) {
  integer(targetId);
  return transaction(async tx => {
    const { me, guild, rank } = await actor(tx, accountId, characterId);
    if (targetId === me.id) throw new GameError(400, 'Para sair, use "Sair da guilda".');
    const target = await tx.character.findFirst({ where: { id: targetId, guildId: guild.id }, select: { id: true, name: true, guildRank: true } });
    if (!target) throw new GameError(404, 'Esse jogador não é da guilda.');
    if (!canKick(rank, rankOf(target))) throw new GameError(403, 'Você não pode expulsar este membro.');
    await removeFromGuild(tx, guild.id, target.id);
    return { message: `${target.name} foi expulso da guilda.` };
  });
}

// Promover a vice ou voltar a membro (só o líder); o líder passa o cargo a outro membro (e vira vice).
export async function setRank(accountId: number, characterId: number, targetId: number, action: string) {
  integer(targetId);
  if (!['promote', 'demote', 'leader'].includes(action)) throw new GameError(400, 'Ação inválida.');
  return transaction(async tx => {
    const { me, guild, rank } = await actor(tx, accountId, characterId);
    if (!canGuild(rank, action === 'leader' ? 'transfer' : 'promote')) throw new GameError(403, 'Só o líder muda cargos.');
    if (targetId === me.id) throw new GameError(400, 'Escolha outro membro.');
    const target = await tx.character.findFirst({ where: { id: targetId, guildId: guild.id }, select: { id: true, name: true } });
    if (!target) throw new GameError(404, 'Esse jogador não é da guilda.');
    if (action === 'leader') {
      await tx.character.update({ where: { id: target.id }, data: { guildRank: 'LEADER' } });
      await tx.character.update({ where: { id: me.id }, data: { guildRank: 'VICE' } });
      await tx.guild.update({ where: { id: guild.id }, data: { leaderId: target.id } });
      return { message: `${target.name} é o novo líder. Você agora é vice-líder.` };
    }
    await tx.character.update({ where: { id: target.id }, data: { guildRank: action === 'promote' ? 'VICE' : 'MEMBER' } });
    return { message: action === 'promote' ? `${target.name} agora é vice-líder.` : `${target.name} voltou a ser membro.` };
  });
}

// Descrição (líder) e aviso do líder, mostrado só aos membros (vice+).
export async function updateGuild(accountId: number, characterId: number, body: { description?: unknown; announcement?: unknown }) {
  return transaction(async tx => {
    const { guild, rank } = await actor(tx, accountId, characterId);
    const data: Prisma.GuildUpdateInput = {};
    if (body.description !== undefined) {
      if (!canGuild(rank, 'describe')) throw new GameError(403, 'Só o líder muda a descrição.');
      data.description = text(body.description, 2, guildLimits.description, 'a descrição');
    }
    if (body.announcement !== undefined) {
      if (!canGuild(rank, 'announce')) throw new GameError(403, 'Só o líder e os vice-líderes mudam o aviso.');
      data.announcement = optionalText(body.announcement, guildLimits.announcement, 'o aviso') || null;
    }
    if (!Object.keys(data).length) throw new GameError(400, 'Nada para mudar.');
    await tx.guild.update({ where: { id: guild.id }, data });
    return { message: 'Guilda atualizada.' };
  });
}

export async function disbandGuild(accountId: number, characterId: number, confirmName: unknown) {
  return transaction(async tx => {
    const { guild, rank } = await actor(tx, accountId, characterId);
    if (!canGuild(rank, 'disband')) throw new GameError(403, 'Só o líder dissolve a guilda.');
    if (typeof confirmName !== 'string' || confirmName.trim().toLowerCase() !== guild.name.toLowerCase()) throw new GameError(400, 'Para dissolver, escreva o nome da guilda igualzinho.');
    await dissolve(tx, guild.id);
    return { message: `A guilda [${guild.tag}] ${guild.name} foi dissolvida.` };
  });
}

// Chamado ao apagar a conta: o personagem sai da guilda; se era líder, o cargo passa a um vice (ou ao mais antigo); se era o último, a guilda some.
export async function leaveGuildOnDelete(tx: Tx, characterId: number) {
  await tx.guildApplication.deleteMany({ where: { characterId } });
  const c = await tx.character.findUnique({ where: { id: characterId }, select: { guildId: true, guildRank: true } });
  if (!c?.guildId) return;
  const guild = await lockGuild(tx, c.guildId);
  if (rankOf(c) === 'LEADER') {
    const next = (await tx.character.findMany({ where: { guildId: guild.id, id: { not: characterId } }, select: { id: true, guildRank: true, guildJoinedAt: true } }))
      .sort((a, b) => guildRanks[rankOf(b)].order - guildRanks[rankOf(a)].order || (a.guildJoinedAt?.getTime() ?? 0) - (b.guildJoinedAt?.getTime() ?? 0))[0];
    if (!next) { await dissolve(tx, guild.id); return; }
    await tx.character.update({ where: { id: next.id }, data: { guildRank: 'LEADER' } });
    await tx.guild.update({ where: { id: guild.id }, data: { leaderId: next.id } });
  }
  await removeFromGuild(tx, guild.id, characterId);
}

// ---------- Quadro da guilda ----------

async function cooldown(tx: Tx, authorId: number) {
  const since = new Date(Date.now() - guildLimits.postCooldownSeconds * 1000);
  const [p, r] = await Promise.all([tx.guildPost.findFirst({ where: { authorId, createdAt: { gt: since } }, select: { id: true } }), tx.guildReply.findFirst({ where: { authorId, createdAt: { gt: since } }, select: { id: true } })]);
  if (p || r) throw new GameError(429, 'Espere alguns segundos antes de escrever de novo.');
}
export async function createTopic(accountId: number, characterId: number, body: { title?: unknown; body?: unknown }) {
  const title = text(body.title, 3, guildLimits.postTitle, 'o título'), content = text(body.body, 2, guildLimits.postBody, 'a mensagem');
  return transaction(async tx => {
    const { me, guild } = await actor(tx, accountId, characterId);
    await cooldown(tx, me.id);
    const post = await tx.guildPost.create({ data: { guildId: guild.id, authorId: me.id, title, body: content } });
    return { message: 'Tópico publicado.', postId: post.id };
  });
}
export async function replyTopic(accountId: number, characterId: number, postId: number, body: unknown) {
  integer(postId);
  const content = text(body, 2, guildLimits.replyBody, 'a resposta');
  return transaction(async tx => {
    const { me, guild } = await actor(tx, accountId, characterId);
    const post = await tx.guildPost.findUnique({ where: { id: postId }, select: { id: true, guildId: true } });
    if (!post || post.guildId !== guild.id) throw new GameError(404, 'Tópico não encontrado.');
    await cooldown(tx, me.id);
    await tx.guildReply.create({ data: { postId, authorId: me.id, body: content } });
    await tx.guildPost.update({ where: { id: postId }, data: { replyCount: { increment: 1 }, lastReplyAt: new Date() } });
    return { message: 'Resposta publicada.' };
  });
}
const MAX_PINNED = 3;
export async function pinTopic(accountId: number, characterId: number, postId: number, pinned: unknown) {
  integer(postId);
  return transaction(async tx => {
    const { guild, rank } = await actor(tx, accountId, characterId);
    if (!canGuild(rank, 'moderate')) throw new GameError(403, 'Só o líder e os vice-líderes fixam tópicos.');
    const post = await tx.guildPost.findUnique({ where: { id: postId }, select: { id: true, guildId: true, pinned: true } });
    if (!post || post.guildId !== guild.id) throw new GameError(404, 'Tópico não encontrado.');
    const want = pinned === true;
    if (want && !post.pinned && await tx.guildPost.count({ where: { guildId: guild.id, pinned: true } }) >= MAX_PINNED) throw new GameError(409, `A guilda pode ter até ${MAX_PINNED} tópicos fixados.`);
    await tx.guildPost.update({ where: { id: postId }, data: { pinned: want } });
    return { message: want ? 'Tópico fixado no topo.' : 'Tópico desafixado.' };
  });
}
// Apagar: o autor apaga o que escreveu; o líder e os vices apagam qualquer um (um tópico leva as respostas junto).
export async function deletePost(accountId: number, characterId: number, kind: 'topic' | 'reply', id: number) {
  integer(id);
  return transaction(async tx => {
    const { me, guild, rank } = await actor(tx, accountId, characterId);
    if (kind === 'topic') {
      const post = await tx.guildPost.findUnique({ where: { id }, select: { id: true, guildId: true, authorId: true } });
      if (!post || post.guildId !== guild.id) throw new GameError(404, 'Tópico não encontrado.');
      if (post.authorId !== me.id && !canGuild(rank, 'moderate')) throw new GameError(403, 'Você só apaga o que escreveu.');
      await tx.guildPost.delete({ where: { id } });
      return { message: 'Tópico apagado.' };
    }
    const reply = await tx.guildReply.findUnique({ where: { id }, include: { post: { select: { guildId: true } } } });
    if (!reply || reply.post.guildId !== guild.id) throw new GameError(404, 'Resposta não encontrada.');
    if (reply.authorId !== me.id && !canGuild(rank, 'moderate')) throw new GameError(403, 'Você só apaga o que escreveu.');
    await tx.guildReply.delete({ where: { id } });
    await tx.guildPost.update({ where: { id: reply.postId }, data: { replyCount: { decrement: 1 } } });
    return { message: 'Resposta apagada.' };
  });
}
