import {useCallback,useEffect,useState} from 'react';
import {api} from '../../lib/api';
import {msg} from '../../lib/format';
import type {Hero} from '../../lib/types';
import {Pager,usePaged} from '../../ui/Pager';
import {Limited} from '../../ui/ShowMore';
import {guildLimits,cleanGuildName,cleanGuildTag} from '../../../../shared/guild';
import {Counter,Crumbs,Table,dateOnly,useAct,type Act,type GuildRef} from './guildBits';
import GuildPage from './GuildPage';

type Row={id:number;name:string;tag:string;description:string;leader:string;members:number;createdAt:string};
export type Me={guild:GuildRef|null;rank:'LEADER'|'VICE'|'MEMBER'|null;level:number;canCreate:boolean;minLevel:number;invites:{id:number;guild:GuildRef;createdAt:string}[];requests:{id:number;guild:GuildRef;createdAt:string}[]};

// Aba Guildas, no jeito dos fóruns antigos: Salão das Guildas (diretório, convites, fundar) e a página de cada guilda.
export default function GuildPanel({hero,openProfile,initialGuildId=null}:{hero:Hero;openProfile:(name:string)=>void;initialGuildId?:number|null}){
  const [me,setMe]=useState<Me|null>(null),[view,setView]=useState<number|'hall'|null>(initialGuildId),[tick,setTick]=useState(0),act=useAct();
  const base=`/characters/${hero.id}/guild`,setError=act.setError;
  const loadMe=useCallback(()=>api<Me>(base).then(setMe).catch(e=>setError(msg(e))),[base,setError]);
  useEffect(()=>{void loadMe();},[loadMe,tick]);
  useEffect(()=>{if(initialGuildId)setView(initialGuildId);},[initialGuildId]);
  const refresh=()=>setTick(t=>t+1);
  const shown=view==='hall'?null:view??me?.guild?.id??null;
  return <div className="gx">
    {act.error&&<p className="error" role="alert">{act.error}</p>}
    {act.toast}
    {shown?<GuildPage key={shown} hero={hero} gid={shown} me={me} version={tick} act={act} openProfile={openProfile} onHall={()=>setView('hall')} onChanged={refresh}
        onLeft={()=>{setView('hall');refresh();}}/>
      :<Hall hero={hero} me={me} act={act} onOpen={id=>setView(id)} onChanged={refresh} onCreated={id=>{setView(id);refresh();}}/>}
  </div>;
}

function Hall({hero,me,act,onOpen,onChanged,onCreated}:{hero:Hero;me:Me|null;act:Act;onOpen:(id:number)=>void;onChanged:()=>void;onCreated:(id:number)=>void}){
  const [q,setQ]=useState(''),[text,setText]=useState(''),[creating,setCreating]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setQ(text.trim()),300);return()=>clearTimeout(t);},[text]);
  const list=usePaged<Row>(`/guilds?q=${encodeURIComponent(q)}`),base=`/characters/${hero.id}/guild`;
  const answer=(path:string)=>void act.run(()=>api<{message:string}>(`${base}/applications/${path}`,{}),onChanged);
  return <section className="panel gx-panel">
    <Crumbs items={[{label:'Comunidade'},{label:'Guildas'}]}/>
    <div className="section-title"><h2>Salão das Guildas</h2>
      <span>{me?.guild?<button type="button" onClick={()=>onOpen(me.guild!.id)}>Ir para [{me.guild.tag}] {me.guild.name}</button>:me&&<button type="button" className="primary" aria-expanded={creating} onClick={()=>setCreating(c=>!c)}>Fundar guilda</button>}</span></div>
    <p className="muted">Guildas reúnem aventureiros num quadro de avisos e tópicos próprios. Aqui é só conversa e companhia: guilda não muda combate, XP, ouro nem drops.</p>
    {creating&&me&&!me.guild&&<CreateForm hero={hero} me={me} act={act} onCreated={onCreated}/>}
    {me&&me.invites.length>0&&<div className="gx-box"><h3>Convites recebidos</h3>
      <Table head={[{label:'Guilda'},{label:'Convidado em'},{label:'Ações',className:'gx-actions'}]}>
        <Limited items={me.invites} render={i=><tr key={i.id}><td data-label="Guilda"><button type="button" className="link-button" onClick={()=>onOpen(i.guild.id)}>[{i.guild.tag}] {i.guild.name}</button></td>
          <td data-label="Convidado em">{dateOnly(i.createdAt)}</td>
          <td data-label="Ações" className="gx-actions"><button type="button" className="primary" disabled={act.busy||!!me.guild} onClick={()=>answer(`${i.id}/accept`)}>Aceitar</button><button type="button" disabled={act.busy} onClick={()=>answer(`${i.id}/decline`)}>Recusar</button></td></tr>}/>
      </Table>{me.guild&&<p className="muted">Saia da sua guilda atual para aceitar um convite.</p>}</div>}
    {me&&me.requests.length>0&&<div className="gx-box"><h3>Meus pedidos</h3>
      <Table head={[{label:'Guilda'},{label:'Pedido em'},{label:'Ações',className:'gx-actions'}]}>
        <Limited items={me.requests} render={r=><tr key={r.id}><td data-label="Guilda"><button type="button" className="link-button" onClick={()=>onOpen(r.guild.id)}>[{r.guild.tag}] {r.guild.name}</button></td>
          <td data-label="Pedido em">{dateOnly(r.createdAt)}</td>
          <td data-label="Ações" className="gx-actions"><button type="button" disabled={act.busy} onClick={()=>answer(`${r.id}/cancel`)}>Cancelar pedido</button></td></tr>}/>
      </Table></div>}
    <label className="gx-search">Procurar guilda<input value={text} maxLength={24} placeholder="Nome ou sigla…" onChange={e=>setText(e.target.value)}/></label>
    {list.error&&<p className="error" role="alert">{list.error}</p>}
    <Table head={[{label:'Sigla'},{label:'Nome'},{label:'Líder'},{label:'Membros',className:'gx-num'},{label:'Criada em'}]}>
      {list.items.map(g=><tr key={g.id}><td data-label="Sigla"><span className="gx-tag">[{g.tag}]</span></td>
        <td data-label="Nome"><button type="button" className="link-button gx-title" onClick={()=>onOpen(g.id)}>{g.name}</button>{g.description&&<small className="gx-desc">{g.description}</small>}</td>
        <td data-label="Líder">{g.leader}</td><td data-label="Membros" className="gx-num">{g.members}/{guildLimits.members}</td><td data-label="Criada em">{dateOnly(g.createdAt)}</td></tr>)}
      {!list.loading&&!list.items.length&&<tr className="gx-empty"><td colSpan={5}>{q?'Nenhuma guilda com esse nome ou sigla.':'Ainda não há guildas. Funde a primeira!'}</td></tr>}
    </Table>
    <Pager page={list.page} pages={list.pages} onPage={p=>void list.go(p)} busy={list.loading}/>
  </section>;
}

function CreateForm({hero,me,act,onCreated}:{hero:Hero;me:Me;act:Act;onCreated:(id:number)=>void}){
  const [name,setName]=useState(''),[tag,setTag]=useState(''),[description,setDescription]=useState(''),[problem,setProblem]=useState('');
  function submit(e:React.FormEvent){e.preventDefault();setProblem('');
    const n=cleanGuildName(name),t=cleanGuildTag(tag);if(n.error)return setProblem(n.error);if(t.error)return setProblem(t.error);
    void act.run(async()=>{const r=await api<{message:string;guildId:number}>(`/characters/${hero.id}/guild`,{name:n.value,tag:t.value,description:description.trim()});onCreated(r.guildId);return r;});}
  if(!me.canCreate)return <div className="gx-box"><h3>Fundar guilda</h3><p className="notice">Para fundar uma guilda é preciso ter nível {me.minLevel}. {hero.name} está no nível {me.level}.</p></div>;
  return <form className="gx-box gx-form" onSubmit={submit}><h3>Fundar guilda</h3><p className="muted">Nível mínimo {me.minLevel}. Você vira o líder.</p>
    <label>Nome<input value={name} maxLength={guildLimits.nameMax} onChange={e=>setName(e.target.value)} required/></label>
    <label>Sigla (aparece entre colchetes)<input value={tag} maxLength={guildLimits.tagMax} onChange={e=>setTag(e.target.value.toUpperCase())} required/></label>
    <label>Descrição<textarea value={description} maxLength={guildLimits.description} rows={3} onChange={e=>setDescription(e.target.value)}/><Counter value={description} max={guildLimits.description}/></label>
    {problem&&<p className="error" role="alert">{problem}</p>}
    <button type="submit" className="primary" disabled={act.busy}>Fundar guilda</button></form>;
}
