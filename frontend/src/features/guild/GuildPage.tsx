import {useCallback,useEffect,useState} from 'react';
import {api} from '../../lib/api';
import {msg} from '../../lib/format';
import type {Hero} from '../../lib/types';
import {LimitedRows} from '../../ui/ShowMore';
import {canGuild,canKick,guildLimits,guildRanks,isOnline,type GuildRank} from '../../../../shared/guild';
import {Avatar,Counter,Crumbs,RankBadge,Seen,Table,classText,dateOnly,type Act,type Card} from './guildBits';
import GuildBoard from './GuildBoard';
import GuildBenefits from './GuildBenefits';
import type {Me} from './GuildPanel';

export type Member=Card&{rank:GuildRank;joinedAt:string;lastSeenAt:string|null;online:boolean};
type Application={id:number;kind:'REQUEST'|'INVITE';createdAt:string;character:Card};
type Detail={id:number;name:string;tag:string;description:string;announcement:string|null;createdAt:string;leaderId:number;memberLimit:number;members:Member[];
  viewerRank:GuildRank|null;viewerInGuild:boolean;viewerApplication:{id:number;kind:'REQUEST'|'INVITE'}|null;applications:Application[]};
type Inner='members'|'board'|'benefits'|'apps'|'manage';

// Página de uma guilda: migalhas, cabeçalho, aviso do líder e as abas Membros, Quadro, Pedidos e Gerenciar.
export default function GuildPage({hero,gid,me,version,act,openProfile,onHall,onChanged,onLeft}:{hero:Hero;gid:number;me:Me|null;version:number;act:Act;openProfile:(name:string)=>void;onHall:()=>void;onChanged:()=>void;onLeft:()=>void}){
  const [g,setG]=useState<Detail|null>(null),[missing,setMissing]=useState(''),[inner,setInner]=useState<Inner>('members'),[mark,setMark]=useState(0);
  const load=useCallback(()=>api<Detail>(`/guilds/${gid}?as=${hero.id}`).then(d=>{setG(d);setMissing('');}).catch(e=>setMissing(msg(e))),[gid,hero.id]);
  useEffect(()=>{void load();},[load,version,mark]);
  const base=`/characters/${hero.id}/guild`,changed=()=>{setMark(m=>m+1);onChanged();};
  if(!g)return <section className="panel gx-panel"><Crumbs items={[{label:'Comunidade'},{label:'Guildas',onClick:onHall},{label:'…'}]}/>
    {missing?<><p className="error" role="alert">{missing}</p><button type="button" onClick={onHall}>Voltar ao Salão das Guildas</button></>:<p className="muted">Carregando a guilda…</p>}</section>;
  const rank=g.viewerRank,member=!!rank,app=g.viewerApplication,leader=g.members.find(m=>m.rank==='LEADER');
  const pending=g.applications.filter(a=>a.kind==='REQUEST').length,tabs:[Inner,string][]=[['members','Membros']];
  if(member)tabs.push(['board','Quadro'],['benefits','Benefícios']);
  if(canGuild(rank,'accept'))tabs.push(['apps',`Pedidos${pending?` (${pending})`:''}`]);
  if(canGuild(rank,'announce'))tabs.push(['manage','Gerenciar']);
  const current=tabs.some(t=>t[0]===inner)?inner:'members';
  const post=(path:string,body:unknown={},after:()=>void=changed)=>void act.run(()=>api<{message:string}>(`${base}/${path}`,body),after);
  const leave=()=>{if(window.confirm(`Sair da guilda [${g.tag}] ${g.name}?`))post('leave',{},onLeft);};
  return <section className="panel gx-panel">
    <Crumbs items={[{label:'Comunidade'},{label:'Guildas',onClick:onHall},{label:`[${g.tag}] ${g.name}`}]}/>
    <header className="gx-head"><div><h2><span className="gx-tag">[{g.tag}]</span> {g.name}</h2>
      <p className="gx-meta">Criada em {dateOnly(g.createdAt)} · Líder: {leader?<button type="button" className="link-button" onClick={()=>openProfile(leader.name)}>{leader.name}</button>:'—'} · {g.members.length}/{g.memberLimit} membros{pending>0&&canGuild(rank,'accept')?` · ${pending} pedido(s)`:''}</p></div>
      <div className="gx-headactions">
        {member&&<button type="button" disabled={act.busy} onClick={leave}>Sair da guilda</button>}
        {!member&&!app&&!g.viewerInGuild&&<button type="button" className="primary" disabled={act.busy||g.members.length>=g.memberLimit} onClick={()=>post(`join/${g.id}`)}>Pedir entrada</button>}
        {!member&&app?.kind==='REQUEST'&&<><span className="tag">PEDIDO ENVIADO</span><button type="button" disabled={act.busy} onClick={()=>post(`applications/${app.id}/cancel`)}>Cancelar pedido</button></>}
        {!member&&app?.kind==='INVITE'&&<><button type="button" className="primary" disabled={act.busy||!!me?.guild} onClick={()=>post(`applications/${app.id}/accept`)}>Aceitar convite</button><button type="button" disabled={act.busy} onClick={()=>post(`applications/${app.id}/decline`)}>Recusar convite</button></>}
        <button type="button" onClick={onHall}>Salão das Guildas</button></div></header>
    {g.description&&<p className="gx-description">{g.description}</p>}
    {!member&&g.viewerInGuild&&!app&&<p className="muted">Você já faz parte de outra guilda. Saia dela para pedir entrada aqui.</p>}
    {!member&&<p className="muted">O quadro de tópicos e o aviso do líder são só para membros.</p>}
    {member&&g.announcement&&<aside className="gx-announce" aria-label="Aviso do líder"><b>Aviso da guilda</b><p>{g.announcement}</p></aside>}
    <div className="gx-tabs" role="tablist" aria-label="Seções da guilda">{tabs.map(([id,label])=><button key={id} type="button" role="tab" aria-selected={current===id} className={current===id?'active-chip':''} onClick={()=>setInner(id)}>{label}</button>)}</div>
    {current==='members'&&<Members g={g} hero={hero} act={act} openProfile={openProfile} post={post}/>}
    {current==='board'&&member&&<GuildBoard hero={hero} gid={g.id} members={g.members} act={act} openProfile={openProfile}/>}
    {current==='benefits'&&member&&<GuildBenefits hero={hero} act={act} openProfile={openProfile} onChanged={changed}/>}
    {current==='apps'&&<Applications g={g} act={act} openProfile={openProfile} post={post}/>}
    {current==='manage'&&<Manage g={g} act={act} post={post} onLeft={onLeft}/>}
  </section>;
}

type Post=(path:string,body?:unknown,after?:()=>void)=>void;

function Members({g,hero,act,openProfile,post}:{g:Detail;hero:Hero;act:Act;openProfile:(name:string)=>void;post:Post}){
  const rank=g.viewerRank,sorted=[...g.members].sort((a,b)=>guildRanks[b.rank].order-guildRanks[a.rank].order||new Date(a.joinedAt).getTime()-new Date(b.joinedAt).getTime());
  const groupName:Record<GuildRank,string>={LEADER:'Líder',VICE:'Vice-líderes',MEMBER:'Membros'};
  const confirmDo=(text:string,path:string)=>{if(window.confirm(text))post(path);};
  return <Table head={[{label:'Membro'},{label:'Cargo'},{label:'Nível / classe'},{label:'Entrou em'},{label:'Última visita'},{label:'Ações',className:'gx-actions'}]}>
    <LimitedRows cols={6} items={sorted} render={(m,i)=><Fragment2 key={m.id} head={i===0||sorted[i-1].rank!==m.rank?groupName[m.rank]:null}>
      <tr className={m.id===hero.id?'mine':''}>
        <td data-label="Membro"><span className="gx-who"><Avatar c={m}/><button type="button" className="link-button gx-title" onClick={()=>openProfile(m.name)}>{m.name}</button></span></td>
        <td data-label="Cargo"><RankBadge rank={m.rank}/></td>
        <td data-label="Nível / classe">Nv. {m.level} · {classText(m)}</td>
        <td data-label="Entrou em">{dateOnly(m.joinedAt)}</td>
        <td data-label="Última visita"><Seen at={m.lastSeenAt} online={m.online||isOnline(m.lastSeenAt)}/></td>
        <td data-label="Ações" className="gx-actions">
          {canGuild(rank,'promote')&&m.rank==='MEMBER'&&<button type="button" disabled={act.busy} onClick={()=>post(`members/${m.id}/promote`)}>Promover a vice</button>}
          {canGuild(rank,'promote')&&m.rank==='VICE'&&<button type="button" disabled={act.busy} onClick={()=>post(`members/${m.id}/demote`)}>Rebaixar</button>}
          {canGuild(rank,'transfer')&&m.rank!=='LEADER'&&<button type="button" disabled={act.busy} onClick={()=>confirmDo(`Passar a liderança para ${m.name}? Você vira vice-líder.`,`members/${m.id}/leader`)}>Passar liderança</button>}
          {canKick(rank,m.rank)&&m.id!==hero.id&&<button type="button" className="gx-danger" disabled={act.busy} onClick={()=>confirmDo(`Expulsar ${m.name} da guilda?`,`members/${m.id}/kick`)}>Expulsar</button>}
        </td></tr></Fragment2>}/>
  </Table>;
}
// Linha de título do grupo (Líder / Vice-líderes / Membros) seguida da linha do membro.
function Fragment2({head,children}:{head:string|null;children:React.ReactNode}){
  return <>{head&&<tr className="gx-group"><th scope="rowgroup" colSpan={6}>{head}</th></tr>}{children}</>;
}

function Applications({g,act,openProfile,post}:{g:Detail;act:Act;openProfile:(name:string)=>void;post:Post}){
  if(!g.applications.length)return <p className="muted">Nenhum pedido nem convite pendente.</p>;
  return <Table head={[{label:'Aventureiro'},{label:'Tipo'},{label:'Nível / classe'},{label:'Em'},{label:'Ações',className:'gx-actions'}]}>
    <LimitedRows cols={5} items={g.applications} render={a=><tr key={a.id}>
      <td data-label="Aventureiro"><span className="gx-who"><Avatar c={a.character}/><button type="button" className="link-button gx-title" onClick={()=>openProfile(a.character.name)}>{a.character.name}</button></span></td>
      <td data-label="Tipo">{a.kind==='REQUEST'?'Pediu entrada':'Convite enviado'}</td>
      <td data-label="Nível / classe">Nv. {a.character.level} · {classText(a.character)}</td><td data-label="Em">{dateOnly(a.createdAt)}</td>
      <td data-label="Ações" className="gx-actions">{a.kind==='REQUEST'?<><button type="button" className="primary" disabled={act.busy} onClick={()=>post(`applications/${a.id}/accept`)}>Aceitar</button><button type="button" disabled={act.busy} onClick={()=>post(`applications/${a.id}/decline`)}>Recusar</button></>
        :<button type="button" disabled={act.busy} onClick={()=>post(`applications/${a.id}/cancel`)}>Cancelar convite</button>}</td></tr>}/>
  </Table>;
}

function Manage({g,act,post,onLeft}:{g:Detail;act:Act;post:Post;onLeft:()=>void}){
  const rank=g.viewerRank,[description,setDescription]=useState(g.description),[announcement,setAnnouncement]=useState(g.announcement??''),[invite,setInvite]=useState(''),[confirm,setConfirm]=useState('');
  const canDescribe=canGuild(rank,'describe'),canInvite=canGuild(rank,'invite');
  return <div className="gx-manage">
    {canDescribe&&<form className="gx-box gx-form" onSubmit={e=>{e.preventDefault();post('update',{description:description.trim()});}}><h3>Descrição</h3>
      <label>Texto que aparece no topo da guilda e no Salão<textarea rows={3} maxLength={guildLimits.description} value={description} onChange={e=>setDescription(e.target.value)}/><Counter value={description} max={guildLimits.description}/></label>
      <button type="submit" disabled={act.busy||description.trim()===g.description}>Salvar descrição</button></form>}
    <form className="gx-box gx-form" onSubmit={e=>{e.preventDefault();post('update',{announcement:announcement.trim()});}}><h3>Aviso da guilda</h3>
      <label>Só os membros veem este aviso<textarea rows={4} maxLength={guildLimits.announcement} value={announcement} onChange={e=>setAnnouncement(e.target.value)}/><Counter value={announcement} max={guildLimits.announcement}/></label>
      <button type="submit" disabled={act.busy||announcement.trim()===(g.announcement??'')}>Salvar aviso</button></form>
    {canInvite&&<form className="gx-box gx-form" onSubmit={e=>{e.preventDefault();const name=invite.trim();if(name)post('invite',{name},()=>setInvite(''));}}><h3>Convidar aventureiro</h3>
      <label>Nome do personagem<input value={invite} maxLength={24} onChange={e=>setInvite(e.target.value)}/></label>
      <button type="submit" disabled={act.busy||invite.trim().length<2}>Enviar convite</button></form>}
    {canGuild(rank,'disband')&&<form className="gx-box gx-form gx-dangerbox" onSubmit={e=>{e.preventDefault();if(confirm===g.name&&window.confirm(`Dissolver a guilda ${g.name} para sempre? Não dá para desfazer.`))post('disband',{confirm:g.name},onLeft);}}><h3>Dissolver a guilda</h3>
      <p className="muted">Todos os membros saem e o quadro de tópicos é apagado. Para confirmar, digite o nome da guilda: <b>{g.name}</b></p>
      <label>Nome da guilda<input value={confirm} onChange={e=>setConfirm(e.target.value)} autoComplete="off"/></label>
      <button type="submit" className="gx-danger" disabled={act.busy||confirm!==g.name}>Dissolver guilda</button></form>}
    {!canDescribe&&<p className="muted">Só o líder muda a descrição, passa a liderança ou dissolve a guilda.</p>}
  </div>;
}
