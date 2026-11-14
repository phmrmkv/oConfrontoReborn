import {useEffect,useMemo,useRef,useState} from 'react';
import Icon from '../../ui/GameIcon';
import CreatureIcon from '../../ui/CreatureIcon';
import RegionIcon from '../../ui/RegionIcon';
import {Limited} from '../../ui/ShowMore';
import {itemCategories,inCategory,slotLabels} from '../../ui/ItemTabs';
import {api} from '../../lib/api';
import {msg} from '../../lib/format';
import {vocationAllowed,vocations,type BaseVocation} from '../../../../shared/adventure';
import {describeSecondary} from '../../../../shared/itemStats';
import {hasRarity} from '../../../../shared/rarity';
import {statusWarning} from '../../../../shared/statusEffects';
import {itemSets} from '../../../../shared/itemSets';
import {describePotion} from '../../../../shared/potions';
import {missionFor} from '../../../../shared/missions';
import {bossLines} from '../../../../shared/bosses';
import {has,n,pct,type Item,type Monster,type Open,type Task,type Wiki} from './wikiTypes';
import {CombatView,ForgeView,GroupDuelView,MissionsView,SetsView,TradeView,VocationsView} from './WikiRules';

// Tudo vem pronto de GET /wiki (game/wikiService.ts): preços, recompensas e regras já com as configurações do jogo, e o que o
// item soma ao herói já calculado por combatStats.ts. A tela só filtra e mostra, 10 por vez.
type View='items'|'monsters'|'regions'|'vocations'|'missions'|'forge'|'sets'|'combat'|'group'|'trade';
// Regra do site: até 10 opções.
const views:{key:View;label:string;icon:string}[]=[
  {key:'items',label:'Itens',icon:'Magic Longsword|Sword'},{key:'monsters',label:'Criaturas',icon:'Dragon Lord|Dragon'},{key:'regions',label:'Regiões',icon:'Backpack'},
  {key:'vocations',label:'Vocações e classes',icon:'Hero|Mastermind Shield'},{key:'missions',label:'Missões e Jornada',icon:'Hunting Spear|Rotworm'},
  {key:'forge',label:'Ferreiro e raridade',icon:'War Hammer|Sword'},{key:'sets',label:'Conjuntos',icon:'Crown Armor'},{key:'combat',label:'Combate e níveis',icon:'Fire Sword|Sword'},
  {key:'group',label:'Grupo e Duelo',icon:'Warlord Sword|Fire Sword'},{key:'trade',label:'Comércio e conta',icon:'Gold Coin'}];
const vocationText=(v:string)=>v.split(',').map(x=>x.trim()).includes('ALL')?'Todas as vocações':v.split(',').map(x=>vocations[x.trim() as BaseVocation]?.name??x).join(', ');
const elementText=(m:Monster)=>`${m.element==='FIRE'?'Dano de fogo':'Dano físico'}${m.status?` · ${statusWarning[m.status]}`:''}`;

// No computador, as 10 partes como botões. No celular, só as MOBILE_CHIPS primeiras viram botões e o resto fica no menu "Mais"
// (sem faixa rolando para o lado). Quem escolhe uma parte do menu vê o nome dela no próprio botão do menu.
const MOBILE_CHIPS=2;
function ViewMenu({view,onChange}:{view:View;onChange:(v:View)=>void}){
  const [open,setOpen]=useState(false),box=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(!open)return;
    const out=(e:MouseEvent)=>{if(!box.current?.contains(e.target as Node))setOpen(false);},esc=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);};
    document.addEventListener('mousedown',out);document.addEventListener('keydown',esc);
    return ()=>{document.removeEventListener('mousedown',out);document.removeEventListener('keydown',esc);};},[open]);
  const rest=views.slice(MOBILE_CHIPS),current=rest.find(v=>v.key===view);
  const pick=(v:View)=>{onChange(v);setOpen(false);};
  return <div className="wiki-views" role="tablist" aria-label="Assunto">
    {views.map((v,i)=><button key={v.key} type="button" role="tab" aria-selected={view===v.key} className={[view===v.key?'active-chip':'',i>=MOBILE_CHIPS?'wiki-extra':''].filter(Boolean).join(' ')} onClick={()=>pick(v.key)}>
      <Icon name={v.icon} size={20}/> <span>{v.label}</span></button>)}
    <div className="wiki-more" ref={box}>
      <button type="button" className={current?'active-chip':''} aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(o=>!o)}>
        <span>{current?.label??'Mais'}</span> <b aria-hidden="true">▾</b></button>
      {open&&<div className="wiki-more-menu" role="menu">{rest.map(v=><button key={v.key} type="button" role="menuitem" className={view===v.key?'active-chip':''} onClick={()=>pick(v.key)}>
        <Icon name={v.icon} size={20}/> {v.label}</button>)}</div>}
    </div></div>;
}

function Stat({label,value}:{label:string;value:string|number}){return <span><b>{value}</b>{label}</span>;}

function ItemCard({i,regionName,open}:{i:Item;regionName:(k:string)=>string;open:Open}){
  const base=[i.attack&&`Ataque ${i.attack}`,i.magicAttack&&`Magia ${i.magicAttack}`,i.defense&&`Defesa ${i.defense}`,i.armor&&`Armadura ${i.armor}`,
    i.criticalChance&&`Crítico +${i.criticalChance}`,i.fireResistance&&`Resist. a fogo ${i.fireResistance}%`,i.speed&&`Esquiva +${i.speed}%`].filter(Boolean) as string[];
  const extra=describeSecondary(i),potion=describePotion(i.name);
  return <article className="wiki-card"><div className="wiki-head"><Icon name={i.name} src={i.spriteUrl} size={48}/><div><h3>{i.name}</h3>
    <p>{slotLabels[i.slot]??i.slot} · Nv. {i.minLevel} · {vocationText(i.vocations)}</p></div></div>
    {base.length>0&&<p className="wiki-stats">{base.join(' · ')}</p>}
    {potion&&<p className="wiki-stats">{potion}.</p>}
    {(i.gives.attack>0||i.gives.defense>0)&&<p className="muted">Soma ao herói: {i.gives.attack>0&&`+${i.gives.attack} de ataque`}{i.gives.attack>0&&i.gives.defense>0&&' e '}{i.gives.defense>0&&`+${i.gives.defense} de defesa`} (antes da vocação, da raridade e da melhoria).</p>}
    {extra.length>0&&<p className="wiki-stats secondary">{extra.join(' · ')}</p>}
    {i.setName&&<p className="wiki-set">Conjunto: <b>{i.setName}</b></p>}
    <p className="muted">{i.buyPrice?`Mercador vende por ${n(i.buyPrice)} ouro · `:''}{Number(i.sellPrice)>0?`compra de você por ${n(i.sellPrice)} ouro`:'o Mercador não compra'}{hasRarity(i.slot)?' · raridade sorteada no drop':''}</p>
    {i.upgrade&&<p className="muted">Ferreiro: +0 → +1 por {n(i.upgrade.first)} ouro; até +10, {n(i.upgrade.toMax)} ouro sem contar falhas.</p>}
    {i.rewardOf.length>0&&<p className="muted">Recompensa de: {i.rewardOf.join(', ')}.</p>}
    {i.drops.length>0?<details className="wiki-drops"><summary>Cai de {i.drops.length} criatura(s)</summary><ul>
      <Limited items={i.drops} label="Ver mais criaturas" render={d=><li key={d.monster.id}><CreatureIcon name={d.monster.name} src={d.monster.spriteUrl} size={24}/>
        <span><button type="button" className="link-button" onClick={()=>open.monster(d.monster.name)}>{d.monster.name}</button>
          <small className="muted"> · Nv. {d.monster.level} · {regionName(d.monster.regionKey)}{d.monster.isBoss?' · chefe':''}{d.maxAmount>1?` · 1–${d.maxAmount}×`:''}</small></span><b>{pct(d.chance)}</b></li>}/></ul></details>
      :!i.rewardOf.length&&<p className="muted">Não cai de criatura: sai do Mercador ou do Ferreiro.</p>}
  </article>;
}

function MonsterCard({m,regionName,task,open}:{m:Monster;regionName:(k:string)=>string;task?:Task;open:Open}){
  const mission=task?missionFor(m.name):null,line=m.isBoss?bossLines[m.name]?.intro:null;
  return <article className={`wiki-card${m.isBoss?' boss-card':''}`}><div className="wiki-head"><CreatureIcon name={m.name} src={m.spriteUrl} size={56}/><div>
    <h3>{m.name} {m.isBoss&&<span className="tag danger">CHEFE</span>}</h3><p>{regionName(m.regionKey)} · Nv. {m.level} · {elementText(m)}</p></div></div>
    {line&&<p className="muted"><i>{line}</i></p>}
    <div className="monster-facts wiki-facts"><Stat label="Vida" value={n(m.hp)}/><Stat label="Ataque" value={n(m.attack)}/><Stat label="Defesa" value={n(m.defense)}/>
      <Stat label="XP" value={n(m.experience)}/><Stat label="Ouro" value={`${n(m.goldMin)}–${n(m.goldMax)}`}/></div>
    {mission&&task&&<p className="muted">Missão "{mission.title}" ({mission.giver}): derrotar {task.kills}× a partir do nível {task.minLevel}, por {n(task.experience)} XP e {n(task.gold)} ouro.</p>}
    {m.loots.length>0||m.isBoss?<details className="wiki-drops"><summary>O que derruba ({m.loots.length+(m.isBoss?1:0)})</summary><ul>
      <Limited items={m.loots} label="Ver mais itens" render={l=><li key={l.item.id}><Icon name={l.item.name} src={l.item.spriteUrl} size={24}/>
        <span>{l.maxAmount>1?`1–${l.maxAmount}× `:''}<button type="button" className="link-button" onClick={()=>open.item(l.item.name)}>{l.item.name}</button>
          <small className="muted"> · {slotLabels[l.item.slot]??l.item.slot}</small></span><b>{pct(l.chance)}</b></li>}/>
      {m.isBoss&&<li className="boss-fragment"><span>Fragmento de chefe, a cada vitória</span><b>100%</b></li>}</ul></details>
      :<p className="muted">Não derruba itens, só ouro.</p>}
  </article>;
}

// Wiki do jogo: o catálogo e as regras inteiras, com busca e filtros. Clicar numa criatura ou num item leva à ficha dele.
export default function WikiPanel(){
  const [data,setData]=useState<Wiki|null>(null),[error,setError]=useState(''),[view,setView]=useState<View>('items');
  const [itemQ,setItemQ]=useState(''),[category,setCategory]=useState(''),[vocation,setVocation]=useState<BaseVocation|''>(''),[set,setSet]=useState('');
  const [monsterQ,setMonsterQ]=useState(''),[region,setRegion]=useState(''),[boss,setBoss]=useState<''|'yes'|'no'>('');
  const [regionQ,setRegionQ]=useState('');
  useEffect(()=>{api<Wiki>('/wiki').then(setData).catch(e=>setError(msg(e)));},[]);
  const regionName=useMemo(()=>{const map=new Map(data?.regions.map(r=>[r.key,r.name]));return (k:string)=>map.get(k)??k;},[data]);
  const items=useMemo(()=>(data?.items??[]).filter(i=>(!itemQ||has(i.name,itemQ))&&inCategory(i.slot,category)&&(!vocation||vocationAllowed(i.vocations,vocation))&&(!set||i.setKey===set)),[data,itemQ,category,vocation,set]);
  const monsters=useMemo(()=>(data?.monsters??[]).filter(m=>(!monsterQ||has(m.name,monsterQ))&&(!region||m.regionKey===region)&&(!boss||m.isBoss===(boss==='yes'))),[data,monsterQ,region,boss]);
  const byId=useMemo(()=>new Map(data?.monsters.map(m=>[m.id,m])),[data]);
  const taskOf=useMemo(()=>new Map(data?.tasks.map(t=>[t.monsterId,t])),[data]);
  const regions=useMemo(()=>(data?.regions??[]).filter(r=>!regionQ||has(r.name,regionQ)||r.monsters.some(id=>has(byId.get(id)?.name??'',regionQ))),[data,regionQ,byId]);
  const open:Open={monster:name=>{setMonsterQ(name);setRegion('');setBoss('');setView('monsters');},item:name=>{setItemQ(name);setCategory('');setVocation('');setSet('');setView('items');}};
  const openRegion=(key:string)=>{setMonsterQ('');setRegion(key);setBoss('');setView('monsters');};
  if(error&&!data)return <section className="panel"><h2>Wiki</h2><p className="error" role="alert">{error}</p></section>;
  if(!data)return <section className="panel">Abrindo a wiki…</section>;
  return <section className="panel wiki-panel">
    <ViewMenu view={view} onChange={setView}/>
    <p className="muted">Tudo o que existe no jogo, com os números de agora: itens, criaturas, regiões, vocações e classes, missões, Ferreiro, combate, grupo, duelo e comércio.</p>

    {view==='items'&&<>
      <div className="wiki-filters">
        <input aria-label="Buscar item" placeholder="Buscar item…" value={itemQ} onChange={e=>setItemQ(e.target.value)}/>
        <label>Tipo <select value={category} onChange={e=>setCategory(e.target.value)}>{itemCategories.map(c=><option key={c.key} value={c.key}>{c.label}</option>)}</select></label>
        <label>Vocação <select value={vocation} onChange={e=>setVocation(e.target.value as BaseVocation|'')}><option value="">Todas</option>
          {(Object.keys(vocations) as BaseVocation[]).map(v=><option key={v} value={v}>{vocations[v].name}</option>)}</select></label>
        <label>Conjunto <select value={set} onChange={e=>setSet(e.target.value)}><option value="">Todos</option>{itemSets.map(s=><option key={s.key} value={s.key}>{s.name}</option>)}</select></label>
      </div>
      <p className="muted">{items.length.toLocaleString('pt-BR')} item(ns){vocation?' (inclui os que servem a todas as vocações)':''}.</p>
      <div className="wiki-grid"><Limited key={`${itemQ}|${category}|${vocation}|${set}`} items={items} label="Ver mais itens" render={i=><ItemCard key={i.id} i={i} regionName={regionName} open={open}/>}/></div>
      {!items.length&&<p className="empty">Nenhum item com esses filtros.</p>}
    </>}

    {view==='monsters'&&<>
      <div className="wiki-filters">
        <input aria-label="Buscar criatura" placeholder="Buscar criatura…" value={monsterQ} onChange={e=>setMonsterQ(e.target.value)}/>
        <label>Região <select value={region} onChange={e=>setRegion(e.target.value)}><option value="">Todas</option>{data.regions.map(r=><option key={r.key} value={r.key}>{r.name}</option>)}</select></label>
        <label>Chefes <select value={boss} onChange={e=>setBoss(e.target.value as ''|'yes'|'no')}><option value="">Todos</option><option value="yes">Só chefes</option><option value="no">Sem chefes</option></select></label>
      </div>
      <p className="muted">{monsters.length.toLocaleString('pt-BR')} criatura(s). XP e ouro já com as regras de recompensa de hoje.</p>
      <div className="wiki-grid"><Limited key={`${monsterQ}|${region}|${boss}`} items={monsters} label="Ver mais criaturas" render={m=><MonsterCard key={m.id} m={m} regionName={regionName} task={taskOf.get(m.id)} open={open}/>}/></div>
      {!monsters.length&&<p className="empty">Nenhuma criatura com esses filtros.</p>}
    </>}

    {view==='regions'&&<>
      <div className="wiki-filters"><input aria-label="Buscar região ou criatura" placeholder="Buscar região ou criatura…" value={regionQ} onChange={e=>setRegionQ(e.target.value)}/></div>
      <div className="wiki-grid"><Limited key={regionQ} items={regions} label="Ver mais regiões" render={r=><article key={r.key} className="wiki-card">
        <div className="wiki-head"><RegionIcon region={r.key} fallback={r.icon} size={48}/><div><h3>{r.name}</h3>
          <p>Entrada a partir do nível {r.minLevel}{r.monsterLevels?` · criaturas do nível ${r.monsterLevels[0]} ao ${r.monsterLevels[1]}`:''}</p></div></div>
        <p className="muted">{r.description}</p>
        <ul className="wiki-creatures"><Limited items={r.monsters.map(id=>byId.get(id)).filter((m):m is Monster=>!!m)} label="Ver mais criaturas" render={m=><li key={m.id}>
          <button type="button" className="link-button" onClick={()=>open.monster(m.name)}><CreatureIcon name={m.name} src={m.spriteUrl} size={28}/> {m.name}</button>
          <small className="muted">Nv. {m.level}{m.isBoss?' · chefe':''}</small></li>}/></ul>
        <button type="button" className="show-more" onClick={()=>openRegion(r.key)}>Ver fichas das criaturas</button>
      </article>}/></div>
      {!regions.length&&<p className="empty">Nenhuma região com esse nome ou criatura.</p>}
    </>}

    {view==='vocations'&&<div className="wiki-grid"><VocationsView data={data}/></div>}
    {view==='missions'&&<MissionsView data={data} open={open}/>}
    {view==='forge'&&<ForgeView data={data}/>}
    {view==='sets'&&<SetsView data={data} open={open}/>}
    {view==='combat'&&<CombatView data={data}/>}
    {view==='group'&&<GroupDuelView data={data}/>}
    {view==='trade'&&<TradeView data={data}/>}
  </section>;
}
