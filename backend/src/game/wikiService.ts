// Wiki do jogo (aba Wiki): o catálogo e as regras inteiras, só leitura. Itens com o que caem de quais criaturas, criaturas com
// o que derrubam, regiões, missões e expedições, e os números de regra que dependem de configuração (custo das classes, chances
// do Ferreiro, raridade, comércio, duelo). Tudo o que muda por configuração sai de loadSettings aqui, e as contas saem das
// funções de sempre (combatStats.ts, upgradePrice, classCost, rollRarity…): a tela só mostra, sem refazer conta nenhuma.
// O catálogo é fixo (cerca de 200 itens e 150 criaturas), então vem inteiro; a tela mostra 10 por vez.
import { prisma } from '../core/db';
import { loadSettings } from '../core/settings';
import { maxUpgradeTier, npcBuyPrice, npcSellPrice, percentOf, scaleInt, statsResetCost, upgradeBreakPercent, upgradeFailCap, upgradeSuccessPercent, type SettingKey } from '../../../shared/economy';
import { forgeableSlots, isForgeable } from '../../../shared/forge';
import { classCost, classLevels, regions } from '../../../shared/adventure';
import { setOf } from '../../../shared/itemSets';
import { monsterStatus } from '../../../shared/statusEffects';
import { awakenCost, MAX_RARITY, rarityOddsOf, rollRarity } from '../../../shared/rarity';
import { combatCaps, combatStats } from './combatStats';
import { upgradePrice } from './gameRules';
import { STAT_BONUS } from './gameService';
import { groupHunts } from '../../../shared/groupHunt';

// Herói "vazio" de vocação neutra (Arqueiro: ataque e defesa ×1) para medir só o que o item soma, sem vocação, nível nem classe.
const bare = { strength: 0, agility: 0, resistance: 0, level: 0, vocation: 'PALADIN', classTier: 0 };
const zero = combatStats(bare, []);

// As configurações que o jogador pode conhecer (o resto, como tetos do app e pacotes de gemas, fica na tela de cada coisa).
const publicSettings = ['market.saleFeePercent', 'market.listingFeeGold', 'market.rareSaleFeePercent', 'market.durationHours', 'market.minLevel',
  'economy.npcBuyPercent', 'economy.npcSellPercent', 'economy.xpRewardPercent', 'economy.goldRewardPercent', 'economy.upgradePricePercent',
  'upgrade.safeUntilTier', 'upgrade.breakFromTier', 'upgrade.breakOnFailPercent', 'upgrade.failBonusPercent', 'upgrade.failBonusMax',
  'forge.craftPricePercent', 'forge.reforgePricePercent', 'forge.craftMaterials', 'forge.salvageMaterials', 'shop.maxEquipmentLevel',
  'stats.resetBaseGold', 'stats.resetGoldPerLevelSquared', 'class.promotionGold', 'loot.ownVocationPercent',
  'boss.fragmentsPerWin', 'boss.awakenBaseFragments', 'rarity.bossBoostPercent',
  'group.energyCost', 'group.roundSeconds', 'group.rewardPercent', 'group.freedBonusPercent', 'group.materials', 'group.weeklyRewards',
  'pvp.minLevel', 'pvp.levelBandPercent', 'pvp.dailyLimit', 'pvp.roundHours', 'pvp.inviteHours', 'pvp.wagerMaxPercent', 'pvp.wagerFeePercent',
  'pvp.lootChancePercent', 'pvp.lootProtectTier', 'pvp.ransomHours', 'pvp.ransomPercent', 'pvp.pairDailyLimit', 'pvp.honorMarksWin', 'pvp.honorMarksLoss',
  'pvp.upgradePercent', 'pvp.rarityPercent', 'pvp.setPercent', 'pvp.lifeStealPercent',
  'characters.free', 'characters.premium', 'premium.days', 'premium.presetLimit'] as const satisfies readonly SettingKey[];

// De cada 10 mil drops de equipamento, quantos saem em cada raridade: conta feita pelo próprio sorteio (rollRarity).
function rarityTable(odds: ReturnType<typeof rarityOddsOf>, boost: number) {
  const count = Array.from({ length: MAX_RARITY + 1 }, () => 0);
  for (let roll = 1; roll <= 10000; roll++) count[rollRarity(odds, roll, boost)]++;
  return count;
}

export async function wikiCatalog() {
  const settings = await loadSettings(prisma);
  const [items, monsters, tasks, quests] = await Promise.all([
    prisma.itemBlueprint.findMany({ orderBy: [{ minLevel: 'asc' }, { name: 'asc' }], take: 2000,
      include: { monsterLoots: { select: { dropChance: true, maxAmount: true, monster: { select: { id: true, name: true, spriteUrl: true, level: true, isBoss: true, regionKey: true } } }, orderBy: { dropChance: 'desc' } } } }),
    prisma.monster.findMany({ orderBy: [{ level: 'asc' }, { name: 'asc' }], take: 2000,
      include: { loots: { select: { dropChance: true, maxAmount: true, blueprint: { select: { id: true, name: true, slot: true, spriteUrl: true } } }, orderBy: { dropChance: 'desc' } } } }),
    prisma.taskBlueprint.findMany({ orderBy: [{ minLevel: 'asc' }, { id: 'asc' }], take: 2000 }),
    prisma.questBlueprint.findMany({ orderBy: [{ minLevel: 'asc' }, { id: 'asc' }], take: 500 }),
  ]);
  const xp = (v: number) => scaleInt(v, settings['economy.xpRewardPercent']), gold = (v: number) => scaleInt(v, settings['economy.goldRewardPercent']);
  const upgradeRules = { safeUntilTier: settings['upgrade.safeUntilTier'], breakFromTier: settings['upgrade.breakFromTier'], breakOnFailPercent: settings['upgrade.breakOnFailPercent'],
    failBonusPercent: settings['upgrade.failBonusPercent'], failBonusMax: settings['upgrade.failBonusMax'] };
  // Preço do Ferreiro para subir de +N a +N+1 (mesma conta de gameService.upgrade).
  const upgradeCost = (npcPrice: number, tier: number) => percentOf(upgradePrice(npcPrice, tier), settings['economy.upgradePricePercent']) || 1n;
  const odds = rarityOddsOf(settings), common = rarityTable(odds, 100), boss = rarityTable(odds, settings['rarity.bossBoostPercent']);
  return {
    items: items.map(({ monsterLoots, tibiaWikiId: _wiki, ...i }) => {
      const gear = combatStats(bare, [{ upgradeTier: 0, rarity: 0, blueprint: i }]);
      // Mesma regra de GET /shop: equipamento acima de shop.maxEquipmentLevel só sai do Ferreiro ou do loot.
      const sold = i.npcPrice > 0 && (!(forgeableSlots as readonly string[]).includes(i.slot) || i.minLevel <= settings['shop.maxEquipmentLevel']);
      const forge = isForgeable(i.slot) && i.npcPrice > 0;
      return { ...i, setName: setOf(i.setKey)?.name ?? null,
        // O que este item soma ao herói (combatStats): a defesa já conta a armadura em dobro.
        gives: { attack: gear.attack - zero.attack, defense: gear.defense - zero.defense },
        buyPrice: sold ? npcBuyPrice(i.npcPrice, settings['economy.npcBuyPercent']).toString() : null,
        sellPrice: npcSellPrice(i.npcPrice, settings['economy.npcSellPercent']).toString(),
        // Ouro do Ferreiro: de +0 para +1 e de +0 até +10 (somando cada degrau, sem contar as falhas).
        upgrade: forge ? { first: upgradeCost(i.npcPrice, 0).toString(), toMax: Array.from({ length: maxUpgradeTier }, (_, t) => upgradeCost(i.npcPrice, t)).reduce((a, b) => a + b, 0n).toString() } : null,
        rewardOf: [...quests.filter(q => q.rewardItemId === i.id).map(q => q.name), ...tasks.filter(t => t.rewardItemId === i.id).map(t => t.title)],
        drops: monsterLoots.map(l => ({ chance: l.dropChance, maxAmount: l.maxAmount, monster: l.monster })) };
    }),
    monsters: monsters.map(m => ({ id: m.id, name: m.name, level: m.level, hp: m.hp, attack: m.attack, defense: m.defense, spriteUrl: m.spriteUrl,
      regionKey: m.regionKey, isBoss: m.isBoss, element: m.element, status: monsterStatus(m),
      experience: xp(m.experience), goldMin: gold(m.goldMin), goldMax: gold(m.goldMax),
      loots: m.loots.map(l => ({ chance: l.dropChance, maxAmount: l.maxAmount, item: l.blueprint })) })),
    regions: regions.map(r => {
      const here = monsters.filter(m => m.regionKey === r.key), levels = here.map(m => m.level);
      return { key: r.key, name: r.name, icon: r.icon, minLevel: r.minLevel, description: r.description,
        monsterLevels: levels.length ? [Math.min(...levels), Math.max(...levels)] as const : null, monsters: here.map(m => m.id) };
    }),
    // Missões do quadro (uma por criatura) e expedições com chefe; o nome e a história de cada missão vêm de shared/missions.ts.
    tasks: tasks.map(t => ({ id: t.id, monsterId: t.monsterId, kills: t.requiredKills, minLevel: t.minLevel, experience: xp(t.rewardExp), gold: gold(t.rewardGold), rewardItemId: t.rewardItemId })),
    quests: quests.map(q => ({ id: q.id, name: q.name, description: q.description, minLevel: q.minLevel, isDungeon: q.isDungeon, bossMonsterId: q.bossMonsterId,
      experience: xp(q.rewardExp), gold: gold(q.rewardGold), rewardItemId: q.rewardItemId })),
    rules: {
      settings: Object.fromEntries(publicSettings.map(k => [k, settings[k]])) as Record<typeof publicSettings[number], number>,
      caps: combatCaps, statBonus: STAT_BONUS,
      classes: classLevels.map((level, i) => ({ tier: i + 1, level, cost: classCost(i + 1, settings['class.promotionGold']).toString() })),
      upgrade: Array.from({ length: maxUpgradeTier }, (_, t) => ({ from: t, success: upgradeSuccessPercent(t, upgradeRules.safeUntilTier), breaks: upgradeBreakPercent(t, upgradeRules),
        successAtCap: upgradeSuccessPercent(t, upgradeRules.safeUntilTier, upgradeRules.failBonusMax) })),
      upgradeFailCap: upgradeFailCap(upgradeRules),
      rarity: common.map((per10k, r) => ({ rarity: r, per10k, bossPer10k: boss[r], awaken: awakenCost(r, settings['boss.awakenBaseFragments']) })),
      // Caçada em grupo: XP e ouro por participante, como groupHuntService (sem o bônus do objetivo, que a tela mostra à parte).
      group: groupHunts.map(h => { const g = (v: number, k: 'economy.xpRewardPercent' | 'economy.goldRewardPercent') => scaleInt(scaleInt(v, settings[k]), settings['group.rewardPercent']);
        return { key: h.key, experience: g(h.experience, 'economy.xpRewardPercent'), goldMin: g(h.goldMin, 'economy.goldRewardPercent'), goldMax: g(h.goldMax, 'economy.goldRewardPercent') }; }),
      statsReset: [50, 100, 250, 500, 1000].map(level => ({ level, cost: statsResetCost(level, settings['stats.resetBaseGold'], settings['stats.resetGoldPerLevelSquared']).toString() })),
    },
  };
}
