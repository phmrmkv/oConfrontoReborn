// Comunidade: galeria de imagens de perfil (retratos próprios das criaturas), limites de texto e limpeza de mensagens.
// Grátis para todos; o Premium libera os "lendários" e uma descrição maior. Nada aqui altera combate.
export const freeAvatars = [
  'Hero', 'Amazon', 'Valkyrie', 'Monk', 'Elf Scout', 'Elf Arcanist', 'Dwarf', 'Dwarf Guard', 'Assassin', 'Necromancer', 'Warlock', 'Witch',
  'Black Knight', 'Orc Warrior', 'Orc Shaman', 'Minotaur', 'Minotaur Mage', 'Cyclops', 'Dragon', 'Wolf', 'Winter Wolf', 'Polar Bear', 'Rat', 'Snake',
  'Mummy', 'Skeleton', 'Bonelord', 'Stone Golem', 'Fire Elemental', 'Water Elemental', 'Mammoth', 'Bug', 'Rotworm', 'Ghoul', 'Orc', 'Orc Leader',
  'Dwarf Soldier', 'Orc Spearman', 'Orc Berserker', 'Minotaur Archer', 'Minotaur Guard', 'Frost Troll', 'Swamp Troll', 'Killer Caiman', 'Slime',
] as const;
export const premiumAvatars = ['Demon', 'Dragon Lord', 'Infernatil', 'Verminor', 'Apocalypse', 'Fire Devil', 'Demon Skeleton', 'Giant Spider', 'Young Sea Serpent', 'Wailing Widow'] as const;
export const isAvatar = (name: string, premium: boolean) => (freeAvatars as readonly string[]).includes(name) || (premium && (premiumAvatars as readonly string[]).includes(name));

// `openReports`: quantas denúncias de uma conta podem estar em análise ao mesmo tempo (textos do fórum e do perfil,
// jogadores e duelos). Protege a fila da equipe; os pedidos de ajuda têm o teto deles, à parte (admin/supportRoutes.ts).
export const limits = { aboutFree: 500, aboutPremium: 2000, scrap: 500, testimonial: 1000, scrapCooldownSeconds: 15, pendingFriendRequests: 50, openReports: 10 } as const;
export const tooManyReports = `Você já tem ${limits.openReports} denúncias em análise. Aguarde a equipe responder antes de enviar outra.`;
// Texto puro: tira caracteres de controle (menos a quebra de linha), espaços nas pontas e linhas vazias em excesso.
export function cleanText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}
