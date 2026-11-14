import { baseVocation, vocations, isPromoted, promotion, classTierOf, classBonus } from '../../../shared/adventure';
import { rarityMultiplier } from '../../../shared/rarity';
import { secondaryCap } from '../../../shared/itemStats';
import { setBonuses } from '../../../shared/itemSets';
interface CombatCharacter { strength:number; agility:number; resistance:number; level:number; vocation:string; classTier?:number }
interface Gear { upgradeTier:number; rarity?:number; blueprint:{attack:number;defense:number;armor:number;magicAttack:number;criticalChance:number;fireResistance:number;speed:number;
  critDamage?:number;lifeSteal?:number;healPower?:number;statusResistance?:number;setKey?:string|null} }
// Tetos do herói (a aba Wiki mostra estes mesmos números): crítico, esquiva e resistência a fogo, em %; crítico-base 10.
export const combatCaps={critical:45,dodge:20,fireResistance:75,baseCritical:10} as const;
// `rarityPercent` e `upgradePercent`: quanto da vantagem da raridade e da melhoria +N vale nesta conta.
// 100 na caçada (e na Caçada em grupo); o duelo passa `pvp.rarityPercent` e `pvp.upgradePercent`, para o equipamento não decidir sozinho.
export function combatStats(c:CombatCharacter, equipment:Gear[], opts:{rarityPercent?:number;upgradePercent?:number;setPercent?:number}={}) {
  const upgrade=Math.max(0,Math.min(100,opts.upgradePercent??100));
  let weapon=0,defense=c.resistance,armor=0,magic=0,critical=0,fireResistance=0,speed=0;
  // Atributos secundários (shared/itemStats.ts): somados como vêm do item (raridade e +N não mexem), com teto no fim.
  let critDamage=0,lifeSteal=0,healPower=0,statusResistance=0;
  // Peças vestidas de cada conjunto das Eras (shared/itemSets.ts).
  const pieces:Record<string,number>={};
  for(const i of equipment) {
    // +N soma 10% por nível aos atributos do item (+10 dobra); com 100% a conta é exatamente a de sempre.
    const b=i.blueprint,m=upgrade===100?1+i.upgradeTier*.1:1+i.upgradeTier*upgrade/1000,r=rarityMultiplier(i.rarity??0,opts.rarityPercent??100);
    // Exemplar Comum na caçada (r = 1, m de sempre) faz exatamente a conta de sempre; nos outros, a folga mínima evita perder 1 ponto por arredondamento do computador.
    const scaled=(base:number)=>r===1&&upgrade===100?Math.floor(base*m):Math.floor(base*m*r+1e-9);
    weapon+=scaled(b.attack);magic+=scaled(b.magicAttack);
    armor+=scaled(b.armor);defense+=scaled(b.defense)+scaled(b.armor)*2;
    critical+=b.criticalChance;fireResistance+=b.fireResistance;speed+=b.speed;
    critDamage+=b.critDamage??0;lifeSteal+=b.lifeSteal??0;healPower+=b.healPower??0;statusResistance+=b.statusResistance??0;
    if(b.setKey)pieces[b.setKey]=(pieces[b.setKey]??0)+1;
  }
  const v=baseVocation(c.vocation),profile=vocations[v],up=isPromoted(c.vocation);
  // Classes depois da promoção (2ª a 8ª) somam um bônus pequeno por classe.
  const extra=Math.max(0,classTierOf(c.vocation,c.classTier??0)-1),atkClass=1+extra*classBonus.attack,defClass=1+extra*classBonus.defense;
  const base=v==='PALADIN'?c.strength*1.3+c.agility*.8:v==='SORCERER'||v==='DRUID'?c.strength*.5+c.resistance*1.5+magic:c.strength*2;
  const set=setBonuses(pieces,opts.setPercent??100);
  // Bônus de conjunto: % sobre o ataque e a defesa finais; secundários somados aos dos itens, com os mesmos tetos.
  return { attack:Math.floor(Math.floor((base+weapon+Math.floor(c.level*1.5))*profile.attackScale*(up?promotion.attackScale:1)*atkClass)*(1+set.attackPercent/100)), defense:Math.floor(Math.floor(defense*profile.defenseScale*(up?promotion.defenseScale:1)*defClass)*(1+set.defensePercent/100)),armor,magic,
    criticalChance:Math.min(combatCaps.critical,combatCaps.baseCritical+Math.floor(c.agility/4)+critical+profile.critical+(up?promotion.critical:0)+extra*classBonus.critical), fireResistance:Math.min(combatCaps.fireResistance,fireResistance),dodgeChance:Math.min(combatCaps.dodge,speed+profile.dodge),
    critDamage:Math.min(secondaryCap.critDamage,Math.floor(critDamage+set.critDamage)),lifeSteal:Math.min(secondaryCap.lifeSteal,Math.floor(lifeSteal+set.lifeSteal)),healPower:Math.min(secondaryCap.healPower,Math.floor(healPower+set.healPower)),statusResistance:Math.min(secondaryCap.statusResistance,Math.floor(statusResistance+set.statusResistance)), sets:set.active };
}
