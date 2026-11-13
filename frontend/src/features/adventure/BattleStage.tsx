import Stage,{heroSheetOf,heroSpecialsOf,heroSpriteOf,specialOf,monsterSheetOf,shotOf,spriteOf,stageNumber as n,type Step} from '../../ui/BattleStage';
import type {Battle,TurnRecord} from '../../lib/types';
import {creatureShot} from '../../lib/creatureArt';

// Caçada solo: herói à esquerda, criatura à direita. Os passos saem do último turno resolvido pelo servidor (TurnRecord).
// `foeShot`: o que voa quando a criatura ataca de longe; com ele, ela dispara do lugar em vez de correr até o herói.
function script(t:TurnRecord,vocation:string,foeShot?:string):Step[]{
  const s:Step[]=[],guard=t.action==='DEFEND_SHIELD',melee=vocation==='KNIGHT';
  // Poderes (shared/powers.ts): golpe com efeito (Flecha envenenada, Raio congelante) entra como ataque; o resto tem cena própria.
  const power=t.power;
  if(power==='WAR_CRY')s.push({cues:[{who:'hero',cls:'charge',float:{text:'Grito de guerra!',kind:'fx'}}],ms:620});
  else if(power==='MEDITATE')s.push({cues:[{who:'hero',cls:'heal',float:{text:'Meditando',kind:'fx'}}],ms:620});
  else if(power==='ROOTS')s.push({cues:[{who:'hero',cls:'cast'},{who:'foe',cls:'stagger late',float:{text:'Presa!',kind:'miss'}}],ms:620});
  else if(power==='POISON_ARROW'||power==='FROST_BOLT'){const kill=t.monsterHp<=0;
    s.push({cues:[{who:'hero',cls:'cast',shot:power==='POISON_ARROW'?'Arrow':'Heavy Magic Missile Rune'},
      {who:'foe',cls:`hit late${kill?' dying':''}`,float:{text:`−${n(t.dealt)}`,kind:t.crit?'crit':'dmg'}}],ms:kill?900:620});}
  else if(['ATTACK','TRIPLE_HIT','FIFTH_HIT','INTERRUPT'].includes(t.action)){
    const kill=t.monsterHp<=0;
    s.push({cues:[{who:'hero',cls:melee?'lunge':'cast',shot:melee?undefined:shotOf(vocation),special:specialOf(t.action),...(t.stolen?{float:{text:`+${n(t.stolen)}`,kind:'heal' as const}}:{})},
      {who:'foe',cls:`hit late${kill?' dying':''}`,float:{text:`−${n(t.dealt)}`,kind:t.crit?'crit':'dmg'}}],shake:t.crit||t.action==='FIFTH_HIT',ms:kill?900:620});
  } else if(t.action==='HEAL')s.push({cues:[{who:'hero',cls:'heal',float:{text:`+${n(t.healed)}`,kind:'heal'}}],ms:620});
  else if(guard)s.push({cues:[{who:'hero',cls:'guard'}],ms:320});
  else if(t.action==='FLEE'){s.push({cues:[{who:'hero',cls:'flee'}],ms:560});return s;}
  if(t.foe==='ATTACK'||t.foe==='HEAVY'){
    const heavy=t.foe==='HEAVY';
    s.push({cues:[{who:'foe',cls:`${foeShot?'cast':'lunge'}${heavy?' heavy':''}`,shot:foeShot},
      t.dodged?{who:'hero',cls:'dodge late',float:{text:'Esquiva!',kind:'miss'}}
        :{who:'hero',cls:guard?'hit late guard':'hit late',float:{text:`−${n(t.received)}`,kind:heavy?'crit':'dmg'}}],shake:heavy&&!t.dodged,ms:640});
  } else if(t.foe==='CHARGE')s.push({cues:[{who:'foe',cls:'charge',float:{text:'Concentrando…',kind:'fx'}}],ms:620});
  else if(t.foe==='INTERRUPTED'&&power!=='ROOTS')s.push({cues:[{who:'foe',cls:'stagger',float:{text:'Interrompido!',kind:'miss'}}],ms:560});
  if(t.foeEffectDamage)s.push({cues:[{who:'foe',cls:'hit',float:{text:`−${n(t.foeEffectDamage)}`,kind:'fx'}}],ms:460});
  if(t.effectDamage)s.push({cues:[{who:'hero',cls:'hit',float:{text:`−${n(t.effectDamage)}`,kind:'fx'}}],ms:460});
  return s;
}

export default function BattleStage({battle,heroName,vocation}:{battle:Battle;heroName:string;vocation:string}){
  const last=battle.turns?.length?battle.turns[battle.turns.length-1]:null;
  const fx=(battle.effects??[]).map(e=>`fx-${e.kind.toLowerCase()}`).join(' ');
  return <Stage scene={battle.battleId} turn={last?.turn??0} steps={last?script(last,vocation,creatureShot(battle.monsterName,battle.monsterSprite)):[]}
    left={[{id:'hero',name:heroName,src:heroSpriteOf(vocation),sheet:heroSheetOf(vocation),specials:heroSpecialsOf(vocation),down:battle.status==='DEFEAT',gone:battle.status==='FLED',fx}]}
    right={[{id:'foe',name:battle.monsterName,src:spriteOf(battle.monsterName,battle.monsterSprite),sheet:monsterSheetOf(battle.monsterName,battle.monsterSprite),size:battle.isBoss?160:128,boss:battle.isBoss,rage:battle.phase===2,down:battle.monsterHp<=0}]}/>;
}
