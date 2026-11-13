import {useState} from 'react';
import type {Hero} from '../../lib/types';
import Icon from '../../ui/GameIcon';
import {Pager,usePaged} from '../../ui/Pager';
import {baseVocation,classLabel,vocations,type BaseVocation} from '../../../../shared/adventure';
import {RANKING_MAX_CLASS,rankingBoards,rankingClassName,rankingVocations,type RankingBoard} from '../../../../shared/ranking';

type Row={id:number;name:string;level:number;experience:string;vocation:string;classTier:number;profileAvatar:string|null;profileEmblem:string|null;honorPoints:number;pvpWins:number;pvpLosses:number};
type Extra={first?:number;me?:{rank:number;page:number;character:Row}|null};
const Avatar=({c}:{c:Row})=><Icon name={c.profileAvatar??c.profileEmblem??'Hero'} size={36}/>;
const n=(v:number|string)=>BigInt(v).toLocaleString('pt-BR');
// "Arquimago · Feiticeiro"; sem classe, só a vocação.
const label=(r:Row)=>{const cls=classLabel(r.vocation,r.classTier),voc=vocations[baseVocation(r.vocation)].name;return cls===voc?voc:`${cls} · ${voc}`;};

// Ranking geral: Nível ou Honra, com filtro de vocação e de classe. O servidor filtra, ordena e diz a posição do herói.
export default function RankingPanel({hero,openProfile}:{hero:Hero;openProfile:(name:string)=>void}){
  const [board,setBoard]=useState<RankingBoard>('LEVEL'),[vocation,setVocation]=useState<BaseVocation|''>(''),[tier,setTier]=useState('');
  const path=`/ranking?board=${board}${vocation?`&vocation=${vocation}`:''}${tier?`&tier=${tier}`:''}&as=${hero.id}`;
  const list=usePaged<Row>(path),extra=list as typeof list&Extra,me=extra.me??null;
  const first=extra.first??1,mineHere=me&&me.page===list.page;
  const value=(r:Row)=>board==='LEVEL'?<span>Nv. {r.level} · {n(r.experience)} XP</span>:<span>{n(r.honorPoints)} de honra · {r.pvpWins}V/{r.pvpLosses}D</span>;
  return <section className="panel ranking-panel"><div className="section-title"><h2>Ranking</h2>
    <span>{(Object.keys(rankingBoards) as RankingBoard[]).map(b=><button key={b} type="button" className={board===b?'active-chip':''} aria-pressed={board===b} onClick={()=>setBoard(b)}>{rankingBoards[b].name}</button>)}</span></div>
    <p className="muted">{rankingBoards[board].help} Quem esconde a fama no perfil não aparece.</p>
    <div className="ranking-filters">
      <label>Vocação <select value={vocation} onChange={e=>setVocation(e.target.value as BaseVocation|'')}><option value="">Todas</option>
        {rankingVocations.map(v=><option key={v} value={v}>{vocations[v].name}</option>)}</select></label>
      <label>Classe <select value={tier} onChange={e=>setTier(e.target.value)}><option value="">Todas</option>
        {Array.from({length:RANKING_MAX_CLASS+1},(_,t)=><option key={t} value={t}>{rankingClassName(t,vocation||undefined)}</option>)}</select></label>
    </div>
    {me?<p className="ranking-me">Sua posição: <b>{me.rank}º</b> de {n(list.total)}{!mineHere&&<> · <button type="button" className="link-button" onClick={()=>void list.go(me.page)}>ver minha página</button></>}</p>
      :!list.loading&&list.total>0&&<p className="muted">{hero.name} não entra neste ranking com estes filtros.</p>}
    {list.error&&<p className="error" role="alert">{list.error}</p>}
    <ol className="ranking-list" start={first}>{list.items.map((r,i)=>{const pos=first+i;
      return <li key={r.id} className={`market-row${r.id===hero.id?' mine':''}${pos<=3?` podium-${pos}`:''}`}><b className="duel-rank">{pos}º</b><Avatar c={r}/>
        <div><h3><button type="button" className="link-button" onClick={()=>openProfile(r.name)}>{r.name}</button></h3><p>{label(r)}</p></div>{value(r)}</li>;})}</ol>
    {!list.loading&&!list.items.length&&<p className="muted">{board==='HONOR'?'Ninguém venceu um duelo com estes filtros ainda.':'Ninguém nesta vocação e classe ainda.'}</p>}
    <Pager page={list.page} pages={list.pages} onPage={p=>void list.go(p)} busy={list.loading}/>
  </section>;
}
