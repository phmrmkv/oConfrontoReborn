import {useEffect,useState} from 'react';
import {api} from '../../lib/api';
import {fmt,msg,when} from '../../lib/format';
import Icon from '../../ui/GameIcon';
import {Pager} from '../../ui/Pager';

// O que o servidor aceitou do último envio do app (backend/src/confrontation): o ranking usa só estes números.
type Verified={goldTotal:string;xpTotal:string;items:number;furthest:number;vigilBest:number;power:string};
type Summary={save:{version:number;savedAt:string;verified:Verified}|null};
type Row={rank:number;name:string;value:string;mine:boolean};
type Board={page:number;pages:number;total:number;items:Row[];me:{rank:number;value:string}|null};
type Metric='vigil'|'power'|'stage';
type Period='week'|'all';
const metrics:readonly (readonly [Metric,string])[]=[['vigil','Vigília'],['power','Poder'],['stage','Fase']];
const periods:readonly (readonly [Period,string])[]=[['week','Esta semana'],['all','Geral']];
// Como cada ranking escreve o seu valor.
const shown=(metric:Metric,value:string)=>metric==='vigil'?`Vigília ${fmt(value)}`:metric==='stage'?`Fase ${fmt(value)}`:`${fmt(value)} de poder`;

// O app Confrontation visto pelo site: a conta é a mesma, então aqui aparecem o progresso que ela mandou pelo app e os
// rankings de lá. Só leitura; o ouro do app e o ouro deste jogo são separados.
export default function AppPanel({openProfile}:{openProfile:(name:string)=>void}){
  const [summary,setSummary]=useState<Summary|null>(null),[summaryError,setSummaryError]=useState('');
  const [metric,setMetric]=useState<Metric>('vigil'),[period,setPeriod]=useState<Period>('week'),[page,setPage]=useState(1);
  const [board,setBoard]=useState<Board|null>(null),[loading,setLoading]=useState(false),[error,setError]=useState('');
  useEffect(()=>{api<Summary>('/confrontation/summary').then(setSummary).catch(e=>setSummaryError(msg(e)));},[]);
  useEffect(()=>{let live=true;setLoading(true);
    api<Board>(`/confrontation/rankings?metric=${metric}&period=${period}&page=${page}`).then(r=>{if(live){setBoard(r);setError('');}})
      .catch(e=>{if(live)setError(msg(e));}).finally(()=>{if(live)setLoading(false);});
    return()=>{live=false;};},[metric,period,page]);
  const save=summary?.save??null;
  return <><section className="panel"><div className="section-title"><h2>Confrontation, o jogo de celular</h2><Icon name="Castle Shield|Crown Shield" size={36}/></div>
    <p className="muted">O app usa esta mesma conta: você entra nele com o e-mail e a senha daqui. O progresso de lá fica guardado no servidor, e é dele que saem os rankings abaixo. O ouro do app e o ouro deste jogo são separados.</p>
    {summaryError&&<p className="error" role="alert">{summaryError}</p>}
    {!summary&&!summaryError&&<p className="muted" role="status">Procurando o seu progresso no app…</p>}
    {summary&&!save&&<p className="empty">Esta conta ainda não enviou progresso pelo app. No Confrontation, abra Menu, depois Configurações, e entre no quadro Conta com este mesmo e-mail e senha.</p>}
    {save&&<><dl className="duel-record"><div><dt>Fase mais longe</dt><dd>{fmt(save.verified.furthest)}</dd></div><div><dt>Poder da companhia</dt><dd>{fmt(save.verified.power)}</dd></div>
        <div><dt>Vigília</dt><dd>{fmt(save.verified.vigilBest)}</dd></div><div><dt>Ouro ganho no app</dt><dd>{fmt(save.verified.goldTotal)}</dd></div><div><dt>Itens coletados</dt><dd>{fmt(save.verified.items)}</dd></div></dl>
      <p className="muted">Último envio do app: {when(save.savedAt)} (envio nº {save.version}). São os números que o servidor aceitou; o que passa do limite por hora entra aos poucos.</p></>}
  </section>
  <section className="panel"><div className="section-title"><h2>Ranking do app</h2><span>{board?`${board.total} ${board.total===1?'companhia':'companhias'}`:''}</span></div>
    <div className="profile-tabs" role="group" aria-label="Qual ranking">{metrics.map(([key,label])=><button key={key} type="button" aria-pressed={metric===key} className={metric===key?'active-chip':''} onClick={()=>{setMetric(key);setPage(1);}}>{label}</button>)}</div>
    <div className="profile-tabs" role="group" aria-label="Período do ranking">{periods.map(([key,label])=><button key={key} type="button" aria-pressed={period===key} className={period===key?'active-chip':''} onClick={()=>{setPeriod(key);setPage(1);}}>{label}</button>)}</div>
    {error&&<p className="error" role="alert">{error}</p>}
    {board?.items.map(row=><div className="market-row" key={row.rank}><b className="duel-rank">{row.rank}º</b>
      <div><h3><button type="button" className="link-button" onClick={()=>openProfile(row.name)}>{row.name}</button>{row.mine&&<> <span className="tag">você</span></>}</h3><p>{shown(metric,row.value)}</p></div></div>)}
    {board&&!board.items.length&&!error&&<p className="empty">{period==='week'?'Ninguém entrou neste ranking nesta semana ainda.':'Ninguém entrou neste ranking ainda.'}</p>}
    {board&&<p className="muted" role="status">{board.me?`Sua posição: ${board.me.rank}º, com ${shown(metric,board.me.value)}.`:save?'Sua companhia ainda não entrou neste ranking.':'Envie o progresso pelo app para entrar no ranking.'}</p>}
    <Pager page={board?.page??1} pages={board?.pages??1} busy={loading} onPage={setPage}/>
  </section></>;
}
