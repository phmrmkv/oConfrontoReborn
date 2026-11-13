import { baseVocation, vocations, isPromoted, promotion, classTierOf, classBonus } from '../../../shared/adventure';
import { rarityMultiplier } from '../../../shared/rarity';
interface CombatCharacter { strength:number; agility:number; resistance:number; level:number; vocation:string; classTier?:number }
interface Gear { upgradeTier:number; rarity?:number; blueprint:{attack:number;defense:number;armor:number;magicAttack:number;criticalChance:number;fireResistance:number;speed:number} }
// `rarityPercent` e `upgradePercent`: quanto da vantagem da raridade e da melhoria +N vale nesta conta.
// 100 na caçada (e na Caçada em grupo); o duelo passa `pvp.rarityPercent` e `pvp.upgradePercent`, para o equipamento não decidir sozinho.
export function combatStats(c:CombatCharacter, equipment:Gear[], opts:{rarityPercent?:number;upgradePercent?:number}={}) {
  const upgrade=Math.max(0,Math.min(100,opts.upgradePercent??100));
  let weapon=0,defense=c.resistance,armor=0,magic=0,critical=0,fireResistance=0,speed=0;
  for(const i of equipment) {
    // +N soma 10% por nível aos atributos do item (+10 dobra); com 100% a conta é exatamente a de sempre.
    const b=i.blueprint,m=upgrade===100?1+i.upgradeTier*.1:1+i.upgradeTier*upgrade/1000,r=rarityMultiplier(i.rarity??0,opts.rarityPercent??100);
    // Exemplar Comum na caçada (r = 1, m de sempre) faz exatamente a conta de sempre; nos outros, a folga mínima evita perder 1 ponto por arredondamento do computador.
    const scaled=(base:number)=>r===1&&upgrade===100?Math.floor(base*m):Math.floor(base*m*r+1e-9);
    weapon+=scaled(b.attack);magic+=scaled(b.magicAttack);
    armor+=scaled(b.armor);defense+=scaled(b.defense)+scaled(b.armor)*2;
    critical+=b.criticalChance;fireResistance+=b.fireResistance;speed+=b.speed;
  }
  const v=baseVocation(c.vocation),profile=vocations[v],up=isPromoted(c.vocation);
  // Classes depois da promoção (2ª a 8ª) somam um bônus pequeno por classe.
  const extra=Math.max(0,classTierOf(c.vocation,c.classTier??0)-1),atkClass=1+extra*classBonus.attack,defClass=1+extra*classBonus.defense;
  const base=v==='PALADIN'?c.strength*1.3+c.agility*.8:v==='SORCERER'||v==='DRUID'?c.strength*.5+c.resistance*1.5+magic:c.strength*2;
  return { attack:Math.floor((base+weapon+Math.floor(c.level*1.5))*profile.attackScale*(up?promotion.attackScale:1)*atkClass), defense:Math.floor(defense*profile.defenseScale*(up?promotion.defenseScale:1)*defClass),armor,magic,
    criticalChance:Math.min(45,10+Math.floor(c.agility/4)+critical+profile.critical+(up?promotion.critical:0)+extra*classBonus.critical), fireResistance:Math.min(75,fireResistance),dodgeChance:Math.min(20,speed+profile.dodge) };
}
