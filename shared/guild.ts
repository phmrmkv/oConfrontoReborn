// Guildas e lista de amigos (abas Guildas e Amigos): limites, cargos, quem pode o quê, validação de nome e tag e o texto de
// "última visita". Regra única do servidor e da tela. Nada aqui mexe em combate, XP, ouro nem drops; a guilda é social.
export type GuildRank = 'LEADER' | 'VICE' | 'MEMBER';
export const guildRanks: Record<GuildRank, { name: string; order: number }> = {
  LEADER: { name: 'Líder', order: 3 }, VICE: { name: 'Vice-líder', order: 2 }, MEMBER: { name: 'Membro', order: 1 },
};
export const isGuildRank = (v: unknown): v is GuildRank => typeof v === 'string' && v in guildRanks;
export const guildLimits = {
  minLevelToCreate: 20, members: 50, nameMin: 3, nameMax: 24, tagMin: 2, tagMax: 5, description: 500, announcement: 1000,
  postTitle: 80, postBody: 4000, replyBody: 2000, applicationsPerGuild: 50, requestsPerCharacter: 5, postCooldownSeconds: 10,
} as const;
// Quem aparece como online: viu o jogo (qualquer tela do herói) nos últimos minutos.
export const ONLINE_MINUTES = 5;
export const isOnline = (lastSeenAt: string | Date | null | undefined, now = Date.now()) =>
  !!lastSeenAt && now - new Date(lastSeenAt).getTime() <= ONLINE_MINUTES * 60_000;

export type GuildAction = 'accept' | 'invite' | 'announce' | 'moderate' | 'kick' | 'promote' | 'describe' | 'transfer' | 'disband';
// Vice-líder cuida do dia a dia (pedidos, convites, aviso, quadro, expulsar membros); o resto é do líder.
const needs: Record<GuildAction, GuildRank> = {
  accept: 'VICE', invite: 'VICE', announce: 'VICE', moderate: 'VICE', kick: 'VICE', promote: 'LEADER', describe: 'LEADER', transfer: 'LEADER', disband: 'LEADER',
};
export const canGuild = (rank: GuildRank | null | undefined, action: GuildAction) => !!rank && guildRanks[rank].order >= guildRanks[needs[action]].order;
// Expulsar: o líder expulsa qualquer um (menos a si); o vice só expulsa membros comuns.
export const canKick = (actor: GuildRank | null | undefined, target: GuildRank) =>
  !!actor && canGuild(actor, 'kick') && guildRanks[actor].order > guildRanks[target].order;

type Cleaned = { value: string; error?: undefined } | { value?: undefined; error: string };
// Nome: letras, números, espaço, apóstrofo e hífen; começa e termina com letra ou número; espaços repetidos viram um só.
export function cleanGuildName(input: unknown): Cleaned {
  if (typeof input !== 'string') return { error: 'Escolha o nome da guilda.' };
  const name = input.replace(/\s+/g, ' ').trim();
  if (name.length < guildLimits.nameMin || name.length > guildLimits.nameMax) return { error: `O nome da guilda precisa ter de ${guildLimits.nameMin} a ${guildLimits.nameMax} caracteres.` };
  if (!/^[\p{L}\p{N}](?:[\p{L}\p{N} '’-]*[\p{L}\p{N}])?$/u.test(name)) return { error: 'O nome só pode ter letras, números, espaço, apóstrofo e hífen, e deve começar e terminar com letra ou número.' };
  return { value: name };
}
// Sigla de 2 a 5 letras ou números, sempre em maiúsculas (aparece entre colchetes ao lado do nome do jogador).
export function cleanGuildTag(input: unknown): Cleaned {
  if (typeof input !== 'string') return { error: 'Escolha a sigla da guilda.' };
  const tag = input.trim().toUpperCase();
  if (!new RegExp(`^[A-Z0-9]{${guildLimits.tagMin},${guildLimits.tagMax}}$`).test(tag)) return { error: `A sigla precisa ter de ${guildLimits.tagMin} a ${guildLimits.tagMax} letras ou números, sem acento nem espaço.` };
  return { value: tag };
}
// "agora", "há 12 min", "há 3 h", "há 2 dias", "nunca": a coluna "Última visita" das listas.
export function seenLabel(lastSeenAt: string | Date | null | undefined, now = Date.now()) {
  if (!lastSeenAt) return 'nunca';
  const minutes = Math.floor((now - new Date(lastSeenAt).getTime()) / 60_000);
  if (isOnline(lastSeenAt, now)) return 'agora';
  if (minutes < 60) return `há ${minutes} min`;
  if (minutes < 1440) return `há ${Math.floor(minutes / 60)} h`;
  const days = Math.floor(minutes / 1440);
  return days === 1 ? 'há 1 dia' : days < 60 ? `há ${days} dias` : 'há muito tempo';
}
