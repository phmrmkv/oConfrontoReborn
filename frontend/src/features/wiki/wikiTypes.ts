// O que GET /wiki devolve (backend/src/game/wikiService.ts). Números de regra já vêm calculados pelo servidor.
import type {StatusKind} from '../../../../shared/statusEffects';

export type MonsterRef={id:number;name:string;spriteUrl:string;level:number;isBoss:boolean;regionKey:string};
export type Item={id:number;name:string;slot:string;spriteUrl:string;attack:number;defense:number;armor:number;magicAttack:number;minLevel:number;vocations:string;
  criticalChance:number;fireResistance:number;speed:number;critDamage:number;lifeSteal:number;healPower:number;statusResistance:number;setKey:string|null;setName:string|null;npcPrice:number;
  gives:{attack:number;defense:number};buyPrice:string|null;sellPrice:string;upgrade:{first:string;toMax:string}|null;rewardOf:string[];
  drops:{chance:number;maxAmount:number;monster:MonsterRef}[]};
export type Monster={id:number;name:string;level:number;hp:number;attack:number;defense:number;spriteUrl:string;regionKey:string;isBoss:boolean;element:string;status:StatusKind|null;
  experience:number;goldMin:number;goldMax:number;loots:{chance:number;maxAmount:number;item:{id:number;name:string;slot:string;spriteUrl:string}}[]};
export type Region={key:string;name:string;icon:string;minLevel:number;description:string;monsterLevels:readonly [number,number]|null;monsters:number[]};
export type Task={id:number;monsterId:number;kills:number;minLevel:number;experience:number;gold:number;rewardItemId:number|null};
export type Quest={id:number;name:string;description:string;minLevel:number;isDungeon:boolean;bossMonsterId:number;experience:number;gold:number;rewardItemId:number};
export type Rules={
  settings:Record<string,number>;caps:{critical:number;dodge:number;fireResistance:number;baseCritical:number};statBonus:number;
  classes:{tier:number;level:number;cost:string}[];
  upgrade:{from:number;success:number;breaks:number;successAtCap:number}[];upgradeFailCap:number;
  rarity:{rarity:number;per10k:number;bossPer10k:number;awaken:number}[];
  statsReset:{level:number;cost:string}[];group:{key:string;experience:number;goldMin:number;goldMax:number}[];
};
export type Wiki={items:Item[];monsters:Monster[];regions:Region[];tasks:Task[];quests:Quest[];rules:Rules};

export const n=(v:number|string|bigint)=>BigInt(v).toLocaleString('pt-BR');
export const pct=(chance:number)=>`${(chance*100).toLocaleString('pt-BR',{maximumFractionDigits:chance<.01?2:1})}%`;
export const has=(text:string,q:string)=>text.toLocaleLowerCase('pt-BR').includes(q.trim().toLocaleLowerCase('pt-BR'));
/** Ligações entre as fichas: abrir a ficha de uma criatura ou de um item pelo nome. */
export interface Open{monster:(name:string)=>void;item:(name:string)=>void}
