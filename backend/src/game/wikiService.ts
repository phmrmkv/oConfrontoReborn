// Wiki do jogo (aba Wiki): o catálogo inteiro, só leitura. Itens com o que caem de quais criaturas, criaturas com o que
// derrubam, e as regiões. Os números que mudam por configuração (preço no Mercador, XP e ouro da vitória) saem de
// loadSettings aqui, e o que um item soma ao herói sai de combatStats.ts: a tela só mostra, sem refazer conta nenhuma.
// O catálogo é fixo (cerca de 200 itens e 150 criaturas), então vem inteiro; a tela mostra 10 por vez.
import { prisma } from '../core/db';
import { loadSettings } from '../core/settings';
import { npcBuyPrice, npcSellPrice, scaleInt } from '../../../shared/economy';
import { forgeableSlots } from '../../../shared/forge';
import { regions } from '../../../shared/adventure';
import { setOf } from '../../../shared/itemSets';
import { monsterStatus } from '../../../shared/statusEffects';
import { combatStats } from './combatStats';

// Herói "vazio" de vocação neutra (Arqueiro: ataque e defesa ×1) para medir só o que o item soma, sem vocação, nível nem classe.
const bare = { strength: 0, agility: 0, resistance: 0, level: 0, vocation: 'PALADIN', classTier: 0 };
const zero = combatStats(bare, []);

export async function wikiCatalog() {
  const settings = await loadSettings(prisma);
  const [items, monsters] = await Promise.all([
    prisma.itemBlueprint.findMany({ orderBy: [{ minLevel: 'asc' }, { name: 'asc' }], take: 2000,
      include: { monsterLoots: { select: { dropChance: true, maxAmount: true, monster: { select: { id: true, name: true, spriteUrl: true, level: true, isBoss: true, regionKey: true } } }, orderBy: { dropChance: 'desc' } } } }),
    prisma.monster.findMany({ orderBy: [{ level: 'asc' }, { name: 'asc' }], take: 2000,
      include: { loots: { select: { dropChance: true, maxAmount: true, blueprint: { select: { id: true, name: true, slot: true, spriteUrl: true } } }, orderBy: { dropChance: 'desc' } } } }),
  ]);
  return {
    items: items.map(({ monsterLoots, tibiaWikiId: _wiki, ...i }) => {
      const gear = combatStats(bare, [{ upgradeTier: 0, rarity: 0, blueprint: i }]);
      // Mesma regra de GET /shop: equipamento acima de shop.maxEquipmentLevel só sai do Ferreiro ou do loot.
      const sold = i.npcPrice > 0 && (!(forgeableSlots as readonly string[]).includes(i.slot) || i.minLevel <= settings['shop.maxEquipmentLevel']);
      return { ...i, setName: setOf(i.setKey)?.name ?? null,
        // O que este item soma ao herói (combatStats): a defesa já conta a armadura em dobro.
        gives: { attack: gear.attack - zero.attack, defense: gear.defense - zero.defense },
        buyPrice: sold ? npcBuyPrice(i.npcPrice, settings['economy.npcBuyPercent']).toString() : null,
        sellPrice: npcSellPrice(i.npcPrice, settings['economy.npcSellPercent']).toString(),
        drops: monsterLoots.map(l => ({ chance: l.dropChance, maxAmount: l.maxAmount, monster: l.monster })) };
    }),
    monsters: monsters.map(m => ({ id: m.id, name: m.name, level: m.level, hp: m.hp, attack: m.attack, defense: m.defense, spriteUrl: m.spriteUrl,
      regionKey: m.regionKey, isBoss: m.isBoss, element: m.element, status: monsterStatus(m),
      experience: scaleInt(m.experience, settings['economy.xpRewardPercent']),
      goldMin: scaleInt(m.goldMin, settings['economy.goldRewardPercent']), goldMax: scaleInt(m.goldMax, settings['economy.goldRewardPercent']),
      loots: m.loots.map(l => ({ chance: l.dropChance, maxAmount: l.maxAmount, item: l.blueprint })) })),
    regions: regions.map(r => {
      const here = monsters.filter(m => m.regionKey === r.key), levels = here.map(m => m.level);
      return { key: r.key, name: r.name, icon: r.icon, minLevel: r.minLevel, description: r.description,
        monsterLevels: levels.length ? [Math.min(...levels), Math.max(...levels)] as const : null, monsters: here.map(m => m.id) };
    }),
  };
}
