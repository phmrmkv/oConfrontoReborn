import {useMemo,useState,type ReactNode} from 'react';
import Icon from '../../ui/GameIcon';
import CreatureIcon from '../../ui/CreatureIcon';
import {Limited} from '../../ui/ShowMore';
import {achievementDefinitions,classBonus,classNames,journey,promotedOf,promotedNames,promotion,skillCosts,skillLabels,vocations,type BaseVocation} from '../../../../shared/adventure';
import {powers,vocationPower} from '../../../../shared/powers';
import {missionFor} from '../../../../shared/missions';
import {forgeMaterials} from '../../../../shared/forge';
import {rarities} from '../../../../shared/rarity';
import {bindingHelp,BIND_ON_EQUIP,BOUND} from '../../../../shared/binding';
import {PROTECTION_STONE} from '../../../../shared/economy';
import {describeBonus,itemSets} from '../../../../shared/itemSets';
import {secondaryStats} from '../../../../shared/itemStats';
import {BATTLE_MAX_TURNS,bossRage,SLOW_ATTACK_PERCENT,STATUS_BOSS_CHANCE,STATUS_CHANCE,statusEffects} from '../../../../shared/statusEffects';
import {describePotion,potions} from '../../../../shared/potions';
import {expForLevel,levelGains,MAX_LEVEL,typicalSplit} from '../../../../shared/progression';
import {GROUP_MIN_LEVEL,groupActions,groupHunts,PARTY_MAX,PARTY_MIN} from '../../../../shared/groupHunt';
import {DUEL_MAX_ROUNDS,DUEL_MISSED_LIMIT,duelActionHelp,modeHelp,modeLabels,duelModes} from '../../../../shared/pvp';
import {has,n,type Open,type Wiki} from './wikiTypes';

// As partes de regra da Wiki. Textos e tabelas vêm de shared/ (as mesmas regras que o jogo usa) e os números que dependem de
// configuração vêm de GET /wiki já calculados; aqui nada é recalculado.
const voc=Object.keys(vocations) as BaseVocation[];
const x=(v:number)=>`×${v.toLocaleString('pt-BR')}`;
const Section=({title,children,note}:{title:string;children?:ReactNode;note?:ReactNode})=><section className="wiki-section"><h3>{title}</h3>{note&&<p className="muted">{note}</p>}{children}</section>;
// `stack`: tabela de texto longo, que no celular vira um cartão por linha (as de números continuam tabela).
function Table({head,rows,stack=false}:{head:string[];rows:ReactNode[][];stack?:boolean}){
  return <div className="wiki-table-wrap"><table className={`wiki-table${stack?' stack':''}`}><thead><tr>{head.map(h=><th key={h}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} data-label={head[j]}>{c}</td>)}</tr>)}</tbody></table></div>;
}
const skillHelp:Record<string,string>={...duelActionHelp,FLEE:'Foge da batalha: sem recompensa e sem derrota.'};

// ---------- Vocações e classes ----------
export function VocationsView({data}:{data:Wiki}){
  const r=data.rules;
  return <>{voc.map(v=>{const p=vocations[v],pw=powers[vocationPower(v)],labels=skillLabels(v),costs=skillCosts(v),split=typicalSplit[v];
    const group=(Object.keys(groupActions) as (keyof typeof groupActions)[]).filter(a=>groupActions[a].only===v);
    return <article key={v} className="wiki-card wiki-wide"><div className="wiki-head"><Icon name={p.icon} size={56}/><div><h3>{p.name}</h3><p>{p.role}</p></div></div>
      <p className="wiki-stats">{p.description}</p>
      <div className="monster-facts wiki-facts"><span><b>{x(p.attackScale)}</b>Ataque</span><span><b>{x(p.defenseScale)}</b>Defesa</span><span><b>+{p.critical}</b>Crítico</span><span><b>{p.dodge}%</b>Esquiva</span><span><b>{x(p.healing)}</b>Cura</span></div>
      <p className="muted">Começa com <Icon name={p.starter} size={20}/> {p.starter}. Distribuição típica dos pontos: Força {split[0]*100}%, Vitalidade {split[1]*100}%, Agilidade {split[2]*100}%, Resistência {split[3]*100}%.</p>
      <Section title="Golpes da caçada"><Table stack head={['Golpe','Mana','O que faz']} rows={(Object.keys(labels) as (keyof typeof labels)[]).map(k=>[labels[k],costs[k]||'—',skillHelp[k]??''])
        .concat([[`${pw.name} (poder)`,pw.mana,`${pw.help} Espera ${pw.cooldown} turno(s).`],[powers.MEDITATE.name,powers.MEDITATE.mana||'—',`${powers.MEDITATE.help} Espera ${powers.MEDITATE.cooldown} turno(s).`]])}/></Section>
      <Section title="Classes" note={`A 1ª é a promoção (vira ${promotedNames[promotedOf[v]]}): ataque e defesa ${x(promotion.attackScale)}, crítico +${promotion.critical}. Cada classe seguinte soma +${classBonus.attack*100}% de ataque, +${classBonus.defense*100}% de defesa e +${classBonus.critical} de crítico.`}>
        <Table head={['Classe','Nome','Nível','Custo']} rows={r.classes.map(c=>[`${c.tier}ª`,classNames[v][c.tier-1],c.level,`${n(c.cost)} ouro`])}/></Section>
      {group.length>0&&<p className="muted">Na Caçada em grupo: {group.map(a=>`${groupActions[a].label} (${groupActions[a].mana} de mana): ${groupActions[a].help}`).join(' ')}</p>}
    </article>;})}</>;
}

// ---------- Missões, expedições, Jornada e conquistas ----------
export function MissionsView({data,open}:{data:Wiki;open:Open}){
  const [q,setQ]=useState('');
  const mon=useMemo(()=>new Map(data.monsters.map(m=>[m.id,m])),[data]),item=useMemo(()=>new Map(data.items.map(i=>[i.id,i])),[data]);
  const tasks=data.tasks.map(t=>({t,m:mon.get(t.monsterId),mission:missionFor(mon.get(t.monsterId)?.name??'')})).filter(x=>!q||has(x.mission.title,q)||has(x.m?.name??'',q)||has(x.mission.giver,q));
  const reward=(id:number|null)=>{const i=id?item.get(id):null;return i?<> · <button type="button" className="link-button" onClick={()=>open.item(i.name)}>{i.name}</button></>:null;};
  return <>
    <Section title="Jornada" note="As primeiras etapas guiam o começo da aventura; as 5 primeiras abrem as regiões.">
      <Table stack head={['Etapa','O que fazer','Recompensa']} rows={journey.map((j,i)=>[<><Icon name={j.icon} size={20}/> {i+1}. {j.title}</>,j.description,`${n(j.gold)} ouro${j.xp?` · ${n(j.xp)} XP`:''}`])}/></Section>
    <Section title="Conquistas"><Table stack head={['Conquista','Como ganhar']} rows={achievementDefinitions.map(a=>[<><Icon name={a.icon} size={20}/> {a.name}</>,a.description])}/></Section>
    {data.quests.length>0&&<Section title={`Expedições (${data.quests.length})`} note="Missões com chefe no fim; a recompensa é dada uma vez.">
      <div className="wiki-grid"><Limited items={data.quests} label="Ver mais expedições" render={x=>{const b=mon.get(x.bossMonsterId);return <article key={x.id} className="wiki-card">
        <h3>{x.name}{x.isDungeon&&<span className="tag"> MASMORRA</span>}</h3><p className="muted">{x.description}</p>
        <p className="wiki-stats">Nível {x.minLevel} · chefe: {b?<button type="button" className="link-button" onClick={()=>open.monster(b.name)}>{b.name}</button>:'—'}</p>
        <p className="muted">{n(x.experience)} XP · {n(x.gold)} ouro{reward(x.rewardItemId)}</p></article>;}}/></div></Section>}
    <Section title={`Missões do quadro (${data.tasks.length})`} note="Cada criatura tem uma missão: derrote a quantidade pedida e volte para receber.">
      <div className="wiki-filters"><input aria-label="Buscar missão" placeholder="Buscar missão, criatura ou quem pede…" value={q} onChange={e=>setQ(e.target.value)}/></div>
      <div className="wiki-grid"><Limited key={q} items={tasks} label="Ver mais missões" render={({t,m,mission})=><article key={t.id} className="wiki-card">
        <div className="wiki-head">{m&&<CreatureIcon name={m.name} src={m.spriteUrl} size={40}/>}<div><h3>{mission.title}</h3><p>{mission.giver}</p></div></div>
        <p className="muted">{mission.story}</p>
        <p className="wiki-stats">Derrotar {t.kills}× {m?<button type="button" className="link-button" onClick={()=>open.monster(m.name)}>{m.name}</button>:'?'} · nível {t.minLevel}</p>
        <p className="muted">{n(t.experience)} XP · {n(t.gold)} ouro{reward(t.rewardItemId)}</p></article>}/></div>
      {!tasks.length&&<p className="empty">Nenhuma missão com esse nome.</p>}</Section>
  </>;
}

// ---------- Ferreiro, raridade e comércio limitado ----------
export function ForgeView({data}:{data:Wiki}){
  const r=data.rules,s=r.settings;
  return <>
    <Section title="Melhoria +1 a +10" note={<>Cada +N soma 10% aos atributos do item (+10 dobra). Preço de cada degrau: preço-base do item × (N+1){s['economy.upgradePricePercent']!==100?` × ${s['economy.upgradePricePercent']}%`:''}; a ficha de cada item mostra o valor.
      Até +{s['upgrade.safeUntilTier']} nunca falha. A partir da tentativa de sair de +{s['upgrade.breakFromTier']}, uma falha tem {s['upgrade.breakOnFailPercent']}% de chance de quebrar o item, a não ser que você tenha uma {PROTECTION_STONE}.
      {s['upgrade.failBonusPercent']>0&&` Cada falha seguida do mesmo item soma +${s['upgrade.failBonusPercent']} pontos de chance, até +${s['upgrade.failBonusMax']} (${r.upgradeFailCap} falhas); zera no acerto.`} Chegar a +10 transforma o exemplar em item raro numerado.</>}>
      <Table head={['Tentativa','Chance','Chance com falhas','Quebra']} rows={r.upgrade.map(u=>[`+${u.from} → +${u.from+1}`,`${u.success}%`,`${u.successAtCap}%`,u.breaks?`${u.breaks.toLocaleString('pt-BR')}%`:'nunca'])}/></Section>
    <Section title="Raridade" note={`Só equipamento tem raridade, sorteada pelo servidor quando cai. Chefes multiplicam as chances acima de Comum por ${s['rarity.bossBoostPercent']/100}. Fragmentos de chefe (${s['boss.fragmentsPerWin']} por vitória contra chefe) despertam o item um degrau no Ferreiro.`}>
      <Table head={['Raridade','Atributos-base','Criatura','Chefe','Despertar']} rows={r.rarity.map(x=>[rarities[x.rarity].name,`${rarities[x.rarity].budget}%`,`${(x.per10k/100).toLocaleString('pt-BR')}%`,`${(x.bossPer10k/100).toLocaleString('pt-BR')}%`,x.awaken?`${x.awaken} fragmentos`:'—'])}/></Section>
    <Section title="Fabricar, reforjar e desmontar" note={`Fabricar: ${s['forge.craftMaterials']} materiais da faixa + ${s['forge.craftPricePercent']}% do preço de loja. Reforjar para um item de nível maior: ${s['forge.craftMaterials']} materiais + ${s['forge.reforgePricePercent']}% do preço do item novo, guardando metade da melhoria. Desmontar devolve ${s['forge.salvageMaterials']} materiais, +1 a cada 3 melhorias. Itens raros (+10) não são reforjados nem desmontados.`}>
      <Table head={['Material','Itens a partir do nível']} rows={forgeMaterials.map(m=>[<><Icon name={m.sprite} size={20}/> {m.name}</>,m.minLevel])}/></Section>
    <Section title="Comércio limitado">
      <Table stack head={['Estado','Quem chega assim','Regra']} rows={[['Livre','Comum e Incomum, loja, Ferreiro e o +10 numerado','Vai ao Mercado e pode cair no Espólio do duelo.'],
        ['Vincula ao equipar','Raro e Épico; Lendário e Mítico que não vieram de chefe',bindingHelp(BIND_ON_EQUIP)],
        ['Vinculado','Lendário e Mítico de chefe, recompensa da Jornada e item despertado',bindingHelp(BOUND)]]}/></Section>
  </>;
}

// ---------- Conjuntos das Eras ----------
export function SetsView({data,open}:{data:Wiki;open:Open}){
  return <div className="wiki-grid">{itemSets.map(set=>{const pieces=data.items.filter(i=>i.setKey===set.key);
    return <article key={set.key} className="wiki-card"><h3>{set.name}</h3>
      <ul className="wiki-creatures">{set.tiers.map(t=><li key={t.pieces}><span>{t.pieces} peças</span><b>{describeBonus(t.bonus)}</b></li>)}</ul>
      <p className="muted">No duelo valem {data.rules.settings['pvp.setPercent']}% destes bônus.</p>
      <ul className="wiki-creatures"><Limited items={pieces} label="Ver mais peças" render={i=><li key={i.id}><button type="button" className="link-button" onClick={()=>open.item(i.name)}><Icon name={i.name} src={i.spriteUrl} size={24}/> {i.name}</button><small className="muted">Nv. {i.minLevel}</small></li>}/></ul>
    </article>;})}</div>;
}

// ---------- Combate, atributos, níveis, efeitos e poções ----------
const levelMarks=[2,10,20,50,100,250,400,550,850,MAX_LEVEL];
export function CombatView({data}:{data:Wiki}){
  const r=data.rules;
  return <>
    <Section title="Níveis" note={`Nível máximo ${MAX_LEVEL}. Cada nível dá +${levelGains.hp} de vida, +${levelGains.mana} de mana e ${levelGains.statPoints} pontos de atributo.`}>
      <Table head={['Nível','XP total']} rows={levelMarks.map(l=>[l,n(expForLevel(l))])}/></Section>
    <Section title="Atributos" note={`Redistribuir os pontos custa ${n(r.settings['stats.resetBaseGold'])} ouro + ${n(r.settings['stats.resetGoldPerLevelSquared'])} × nível².`}>
      <Table stack head={['Atributo','O que faz']} rows={[['Força','Aumenta o ataque (principal do Cavaleiro e do Arqueiro).'],['Vitalidade',`+${r.statBonus} de vida máxima por ponto.`],
        ['Agilidade',`Aumenta o crítico (1 a cada 4 pontos), até ${r.caps.critical}%.`],['Resistência',`Defesa e +${r.statBonus} de mana máxima por ponto; é a base do ataque mágico.`]]}/>
      <Table head={['Nível','Redistribuir custa']} rows={r.statsReset.map(x=>[x.level,`${n(x.cost)} ouro`])}/></Section>
    <Section title="Tetos" note={`Crítico começa em ${r.caps.baseCritical}% e vai até ${r.caps.critical}%. Esquiva até ${r.caps.dodge}%. Resistência a fogo até ${r.caps.fireResistance}%.`}>
      <Table stack head={['Atributo secundário','Teto','O que faz']} rows={secondaryStats.map(x=>[x.label,`${x.cap}%`,x.help])}/></Section>
    <Section title="Efeitos" note={`Golpe que acerta aplica o efeito da criatura com ${STATUS_CHANCE}% de chance (chefe: ${STATUS_BOSS_CHANCE}%). Defender no turno impede. Lento: golpes com ${SLOW_ATTACK_PERCENT}% da força.`}>
      <Table stack head={['Efeito','Turnos','O que faz']} rows={Object.values(statusEffects).map(e=>[e.name,e.turns,e.help])}/></Section>
    <Section title="Chefes e batalhas" note={`Chefes anunciam o golpe pesado: defenda ou interrompa. Com ${bossRage.atPercent}% da vida ou menos, entram em fúria e batem ${bossRage.attackPercent-100}% mais forte. Uma batalha dura no máximo ${BATTLE_MAX_TURNS} turnos; no último, os dois recuam sem recompensa. Cada caçada gasta 5 de energia; o Templo de Capriel recupera vida, mana e energia de graça.`}/>
    <Section title={`Poções (${Object.keys(potions).length})`}>
      <Table stack head={['Poção','Nível','Efeito']} rows={Object.entries(potions).map(([name,p])=>[<><Icon name={name} size={20}/> {name}</>,p.minLevel,describePotion(name)??''])}/></Section>
  </>;
}

// ---------- Caçada em grupo e Duelo ----------
export function GroupDuelView({data}:{data:Wiki}){
  const s=data.rules.settings,reward=new Map(data.rules.group.map(g=>[g.key,g]));
  return <>
    <Section title="Caçada em grupo" note={`De ${PARTY_MIN} a ${PARTY_MAX} amigos, a partir do nível ${GROUP_MIN_LEVEL}. Cada um gasta ${s['group.energyCost']} de energia; cada rodada tem ${s['group.roundSeconds']} s (quem não escolhe, defende). Cumprir o objetivo dá +${s['group.freedBonusPercent']}% de XP e ouro. Recompensa em até ${s['group.weeklyRewards']} vitórias por caçada a cada 7 dias, mais ${s['group.materials']} materiais do Ferreiro.`}>
      <div className="wiki-grid">{groupHunts.map(h=>{const g=reward.get(h.key);return <article key={h.key} className="wiki-card">
        <div className="wiki-head"><CreatureIcon name={h.sprite} size={48}/><div><h3>{h.name}</h3><p>Nível {h.level} · golpe pesado: {h.heavy}</p></div></div>
        <p className="muted">{h.story}</p>
        <div className="monster-facts wiki-facts"><span><b>{n(h.hpPerHero)}</b>Vida/herói</span><span><b>{n(h.attack)}</b>Ataque</span><span><b>{n(h.defense)}</b>Defesa</span>
          <span><b>{g?n(g.experience):'—'}</b>XP</span><span><b>{g?`${n(g.goldMin)}–${n(g.goldMax)}`:'—'}</b>Ouro</span></div>
        <ul className="wiki-creatures">{voc.map(v=>h.roles[v]&&<li key={v}><b>{vocations[v].name}</b><span className="muted">{h.roles[v]}</span></li>)}</ul>
        {h.bonusText&&<p className="muted">Objetivo: {h.bonusText}.</p>}</article>;})}</div></Section>
    <Section title="Duelo" note={`Entre amigos, a partir do nível ${s['pvp.minLevel']} e com diferença de até ${s['pvp.levelBandPercent']}% de nível. ${s['pvp.dailyLimit']} duelos por dia, rodadas de ${s['pvp.roundHours']} h (quem não escolhe, defende; ${DUEL_MISSED_LIMIT} seguidas = derrota), no máximo ${DUEL_MAX_ROUNDS} rodadas. O duelo nunca tira vida, mana nem XP de verdade. Melhoria vale ${s['pvp.upgradePercent']}%, raridade ${s['pvp.rarityPercent']}%, conjuntos ${s['pvp.setPercent']}% e roubo de vida ${s['pvp.lifeStealPercent']}% do que valem na caçada. Vitória dá ${s['pvp.honorMarksWin']} marcas de honra, derrota ou empate ${s['pvp.honorMarksLoss']} (só compram aparência).`}>
      <Table stack head={['Modo','Regra']} rows={duelModes.map(m=>[modeLabels[m],modeHelp[m]+(m==='GOLD'?` Aposta de até ${s['pvp.wagerMaxPercent']}% do ouro do mais pobre; taxa de ${s['pvp.wagerFeePercent']}%.`:m==='LOOT'?` Chance de ${s['pvp.lootChancePercent']}%; itens +${s['pvp.lootProtectTier']} ou mais nunca caem; resgate em ${s['pvp.ransomHours']} h por ${s['pvp.ransomPercent']}% do preço de loja.`:'')])}/>
      <p className="muted">Ouro ou espólio: até {s['pvp.pairDailyLimit']} duelos por dia entre o mesmo par.</p></Section>
  </>;
}

// ---------- Comércio, Mercador e conta ----------
export function TradeView({data}:{data:Wiki}){
  const s=data.rules.settings;
  return <Section title="Mercador, Mercado e conta"><Table stack head={['Regra','Valor']} rows={[
    ['Mercador vende por',`${s['economy.npcBuyPercent']}% do preço-base`],['Mercador compra de você por',`${s['economy.npcSellPercent']}% do preço-base`],
    ['Mercador vende equipamento até o nível',s['shop.maxEquipmentLevel']],['Mercado: nível mínimo',s['market.minLevel']],
    ['Mercado: taxa para anunciar',`${n(s['market.listingFeeGold'])} ouro`],['Mercado: taxa sobre a venda',`${s['market.saleFeePercent']}% (item raro +10: ${s['market.rareSaleFeePercent']}%)`],
    ['Mercado: duração do anúncio',`${s['market.durationHours']} h`],['Loot inteligente',`${s['loot.ownVocationPercent']}% de um equipamento de outra vocação virar o da sua`],
    ['XP e ouro das criaturas e missões',`${s['economy.xpRewardPercent']}% e ${s['economy.goldRewardPercent']}%`],
    ['Personagens por conta',`${s['characters.free']} (Premium: ${s['characters.premium']})`],['Premium',`${s['premium.days']} dias; ${s['premium.presetLimit']} conjuntos de equipamento salvos. Não muda combate, XP, ouro nem drops.`],
  ]}/></Section>;
}
