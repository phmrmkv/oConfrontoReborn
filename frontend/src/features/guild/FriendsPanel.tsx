import {useCallback,useEffect,useState} from 'react';
import {api} from '../../lib/api';
import {msg} from '../../lib/format';
import type {Hero} from '../../lib/types';
import {Pager,usePaged} from '../../ui/Pager';
import {LimitedRows} from '../../ui/ShowMore';
import {isOnline} from '../../../../shared/guild';
import {Avatar,Crumbs,GuildLink,Seen,Table,classText,useAct,type Card,type GuildRef} from './guildBits';

type Friend=Card&{lastSeenAt:string|null;online:boolean;guild:GuildRef|null;friendshipId:number};
type Community={incoming:{id:number;from:Card}[];outgoing:{id:number;to:Card}[]};
type Extra={totalFriends?:number;onlineCount?:number};

// Aba Amigos, no jeito dos fóruns antigos: lista paginada com guilda e última visita, pedidos e busca de aventureiros.
export default function FriendsPanel({hero,openProfile,openGuild}:{hero:Hero;openProfile:(name:string)=>void;openGuild:(id:number)=>void}){
  const [text,setText]=useState(''),[q,setQ]=useState(''),[tick,setTick]=useState(0),[mine,setMine]=useState<Community|null>(null),act=useAct();
  const [search,setSearch]=useState(''),[found,setFound]=useState<Card[]>([]);
  useEffect(()=>{const t=setTimeout(()=>setQ(text.trim()),300);return()=>clearTimeout(t);},[text]);
  const list=usePaged<Friend>(`/characters/${hero.id}/friends?q=${encodeURIComponent(q)}`,tick),extra=list as typeof list&Extra;
  const setError=act.setError;
  const loadMine=useCallback(()=>api<Community>(`/characters/${hero.id}/community`).then(setMine).catch(e=>setError(msg(e))),[hero.id,setError]);
  useEffect(()=>{void loadMine();const t=setInterval(()=>void loadMine(),30000);return()=>clearInterval(t);},[loadMine]);
  useEffect(()=>{const s=search.trim();if(s.length<2){setFound([]);return;}
    const t=setTimeout(()=>void api<Card[]>(`/community/search?q=${encodeURIComponent(s)}`).then(r=>setFound(r.filter(c=>c.id!==hero.id))).catch(()=>{}),300);return()=>clearTimeout(t);},[search,hero.id]);
  const reloadAll=()=>{setTick(t=>t+1);void loadMine();};
  const base=`/characters/${hero.id}/community/friends`;
  const send=(path:string,body:unknown={})=>void act.run(()=>api<{message:string}>(path,body),reloadAll);
  const pendingOut=new Set(mine?.outgoing.map(o=>o.to.id)),pendingIn=new Map(mine?.incoming.map(i=>[i.from.id,i.id]));
  const unfriend=(f:Friend)=>{if(window.confirm(`Desfazer a amizade com ${f.name}?`))send(`${base}/${f.friendshipId}/remove`);};
  return <div className="gx">{act.toast}
    <section className="panel gx-panel">
      <Crumbs items={[{label:'Comunidade'},{label:'Amigos'}]}/>
      <div className="section-title"><h2>Amigos</h2><span>{extra.totalFriends??0} amigo(s) · <span className="gx-seen"><i className="gx-dot on" aria-hidden="true"/>{extra.onlineCount??0} online</span></span></div>
      {act.error&&<p className="error" role="alert">{act.error}</p>}
      <p className="muted">Amigos aparecem em "Desafiar um amigo" no Duelo. Quem estiver com o jogo aberto nos últimos 5 minutos aparece como online.</p>
      <label className="gx-search">Procurar entre os amigos<input value={text} maxLength={24} placeholder="Nome do amigo…" onChange={e=>setText(e.target.value)}/></label>
      {list.error&&<p className="error" role="alert">{list.error}</p>}
      <Table head={[{label:'Amigo'},{label:'Nível / classe'},{label:'Guilda'},{label:'Última visita'},{label:'Ações',className:'gx-actions'}]}>
        {list.items.map(f=><tr key={f.id}>
          <td data-label="Amigo"><span className="gx-who"><Avatar c={f}/><button type="button" className="link-button gx-title" onClick={()=>openProfile(f.name)}>{f.name}</button></span></td>
          <td data-label="Nível / classe">Nv. {f.level} · {classText(f)}</td>
          <td data-label="Guilda"><GuildLink g={f.guild} onOpen={openGuild}/></td>
          <td data-label="Última visita"><Seen at={f.lastSeenAt} online={f.online||isOnline(f.lastSeenAt)}/></td>
          <td data-label="Ações" className="gx-actions"><button type="button" onClick={()=>openProfile(f.name)}>Perfil</button><button type="button" className="gx-danger" disabled={act.busy} onClick={()=>unfriend(f)}>Desfazer amizade</button></td></tr>)}
        {!list.loading&&!list.items.length&&<tr className="gx-empty"><td colSpan={5}>{q?'Nenhum amigo com esse nome.':'Você ainda não tem amigos. Procure um aventureiro logo abaixo e peça amizade.'}</td></tr>}
      </Table>
      <Pager page={list.page} pages={list.pages} onPage={p=>void list.go(p)} busy={list.loading}/>
    </section>
    {mine&&mine.incoming.length>0&&<section className="panel gx-panel"><div className="section-title"><h2>Pedidos recebidos</h2><span>{mine.incoming.length}</span></div>
      <Table head={[{label:'Aventureiro'},{label:'Nível / classe'},{label:'Ações',className:'gx-actions'}]}>
        <LimitedRows cols={3} items={mine.incoming} render={i=><tr key={i.id}>
          <td data-label="Aventureiro"><span className="gx-who"><Avatar c={i.from}/><button type="button" className="link-button gx-title" onClick={()=>openProfile(i.from.name)}>{i.from.name}</button></span></td>
          <td data-label="Nível / classe">Nv. {i.from.level} · {classText(i.from)}</td>
          <td data-label="Ações" className="gx-actions"><button type="button" className="primary" disabled={act.busy} onClick={()=>send(`${base}/${i.id}/accept`)}>Aceitar</button><button type="button" disabled={act.busy} onClick={()=>send(`${base}/${i.id}/decline`)}>Recusar</button></td></tr>}/>
      </Table></section>}
    {mine&&mine.outgoing.length>0&&<section className="panel gx-panel"><div className="section-title"><h2>Pedidos enviados</h2><span>{mine.outgoing.length}</span></div>
      <Table head={[{label:'Aventureiro'},{label:'Nível / classe'},{label:'Ações',className:'gx-actions'}]}>
        <LimitedRows cols={3} items={mine.outgoing} render={o=><tr key={o.id}>
          <td data-label="Aventureiro"><span className="gx-who"><Avatar c={o.to}/><button type="button" className="link-button gx-title" onClick={()=>openProfile(o.to.name)}>{o.to.name}</button></span></td>
          <td data-label="Nível / classe">Nv. {o.to.level} · {classText(o.to)}</td>
          <td data-label="Ações" className="gx-actions"><button type="button" disabled={act.busy} onClick={()=>send(`${base}/${o.id}/remove`)}>Cancelar pedido</button></td></tr>}/>
      </Table></section>}
    <section className="panel gx-panel"><div className="section-title"><h2>Procurar aventureiro</h2></div>
      <label className="gx-search">Nome do aventureiro<input value={search} maxLength={24} placeholder="Digite pelo menos 2 letras…" onChange={e=>setSearch(e.target.value)}/></label>
      {found.length>0&&<Table head={[{label:'Aventureiro'},{label:'Nível / classe'},{label:'Ações',className:'gx-actions'}]}>
        <LimitedRows cols={3} items={found} render={c=><tr key={c.id}>
          <td data-label="Aventureiro"><span className="gx-who"><Avatar c={c}/><button type="button" className="link-button gx-title" onClick={()=>openProfile(c.name)}>{c.name}</button></span></td>
          <td data-label="Nível / classe">Nv. {c.level} · {classText(c)}</td>
          <td data-label="Ações" className="gx-actions">{pendingIn.has(c.id)?<button type="button" className="primary" disabled={act.busy} onClick={()=>send(`${base}/${pendingIn.get(c.id)}/accept`)}>Aceitar pedido</button>
            :pendingOut.has(c.id)?<span className="tag">PEDIDO ENVIADO</span>
            :<button type="button" className="primary" disabled={act.busy} onClick={()=>send(base,{to:c.name})}>Adicionar amigo</button>}</td></tr>}/>
      </Table>}
      {search.trim().length>=2&&!found.length&&<p className="muted">Ninguém com nome começando por "{search.trim()}".</p>}
    </section>
  </div>;
}
