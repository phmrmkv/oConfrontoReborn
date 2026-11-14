import {useState} from 'react';
import {api} from '../../lib/api';
import type {Hero} from '../../lib/types';
import {Pager,usePaged} from '../../ui/Pager';
import {canGuild,guildLimits,type GuildRank} from '../../../../shared/guild';
import {Avatar,Counter,RankBadge,Table,classText,dateOnly,dateTime,type Act,type Card} from './guildBits';
import type {Member} from './GuildPage';

type Topic={id:number;title:string;pinned:boolean;replyCount:number;createdAt:string;lastReplyAt:string|null;author:Card};
type Reply={id:number;body:string;createdAt:string;author:Card};
type TopicHead={id:number;title:string;body:string;pinned:boolean;createdAt:string;author:Card;replyCount:number};
type Props={hero:Hero;gid:number;members:Member[];act:Act;openProfile:(name:string)=>void};

// Quadro de tópicos da guilda: lista em tabela e, dentro do tópico, o layout clássico de duas colunas por post.
export default function GuildBoard(props:Props){
  const [topic,setTopic]=useState<number|null>(null),[writing,setWriting]=useState(false);
  if(topic)return <TopicView {...props} pid={topic} onBack={()=>setTopic(null)}/>;
  return <TopicList {...props} writing={writing} setWriting={setWriting} onOpen={setTopic}/>;
}

function TopicList({hero,act,openProfile,writing,setWriting,onOpen}:Props&{writing:boolean;setWriting:(v:boolean)=>void;onOpen:(id:number)=>void}){
  const [tick,setTick]=useState(0),list=usePaged<Topic>(`/characters/${hero.id}/guild/board`,tick);
  return <div className="gx-board">
    <div className="gx-bar"><span className="muted">{list.total} tópico(s)</span><button type="button" className="primary" aria-expanded={writing} onClick={()=>setWriting(!writing)}>Novo tópico</button></div>
    {writing&&<NewTopic hero={hero} act={act} onDone={()=>{setWriting(false);setTick(t=>t+1);}}/>}
    {list.error&&<p className="error" role="alert">{list.error}</p>}
    <Table className="gx-topics" head={[{label:'Tópico'},{label:'Respostas',className:'gx-num'},{label:'Última resposta'}]}>
      {list.items.map(t=><tr key={t.id} className={t.pinned?'pinned':''}>
        <td data-label="Tópico">{t.pinned&&<span className="gx-pin">FIXO</span>}<button type="button" className="link-button gx-title" onClick={()=>onOpen(t.id)}>{t.title}</button>
          <small className="gx-desc">por <button type="button" className="link-button" onClick={()=>openProfile(t.author.name)}>{t.author.name}</button> · {dateTime(t.createdAt)}</small></td>
        <td data-label="Respostas" className="gx-num">{t.replyCount}</td>
        <td data-label="Última resposta">{t.lastReplyAt?dateTime(t.lastReplyAt):'—'}</td></tr>)}
      {!list.loading&&!list.items.length&&<tr className="gx-empty"><td colSpan={3}>Nenhum tópico ainda. Abra o primeiro!</td></tr>}
    </Table>
    <Pager page={list.page} pages={list.pages} onPage={p=>void list.go(p)} busy={list.loading}/>
  </div>;
}

function NewTopic({hero,act,onDone}:{hero:Hero;act:Act;onDone:()=>void}){
  const [title,setTitle]=useState(''),[body,setBody]=useState('');
  const ready=title.trim().length>0&&body.trim().length>0;
  return <form className="gx-box gx-form" onSubmit={e=>{e.preventDefault();if(!ready)return;
    void act.run(()=>api<{message:string}>(`/characters/${hero.id}/guild/topics`,{title:title.trim(),body:body.trim()}),onDone);}}>
    <h3>Novo tópico</h3>
    <label>Título<input value={title} maxLength={guildLimits.postTitle} onChange={e=>setTitle(e.target.value)}/><Counter value={title} max={guildLimits.postTitle}/></label>
    <label>Texto<textarea rows={6} value={body} maxLength={guildLimits.postBody} onChange={e=>setBody(e.target.value)}/><Counter value={body} max={guildLimits.postBody}/></label>
    <button type="submit" className="primary" disabled={act.busy||!ready}>Publicar tópico</button></form>;
}

type Extra={post?:TopicHead;viewerRank?:GuildRank|null};
function Author({a,m,openProfile}:{a:Card;m?:Member;openProfile:(name:string)=>void}){
  return <><Avatar c={a} size={48}/><b><button type="button" className="link-button" onClick={()=>openProfile(a.name)}>{a.name}</button></b>
    {m?<RankBadge rank={m.rank}/>:<span className="gx-rank gx-rank-ex">Ex-membro</span>}<small>Nv. {a.level}</small><small>{classText(a)}</small>{m&&<small>Entrou em {dateOnly(m.joinedAt)}</small>}</>;
}
function TopicView({hero,pid,members,act,openProfile,onBack}:Props&{pid:number;onBack:()=>void}){
  const [tick,setTick]=useState(0),list=usePaged<Reply>(`/characters/${hero.id}/guild/topics/${pid}`,tick),x=list as typeof list&Extra;
  const post=x.post,rank=x.viewerRank??null,base=`/characters/${hero.id}/guild`,byId=new Map(members.map(m=>[m.id,m]));
  const [body,setBody]=useState('');
  const reload=()=>setTick(t=>t+1);
  const canDelete=(a:Card)=>a.id===hero.id||canGuild(rank,'moderate');
  const first=(list.page??1)===1;
  return <div className="gx-board gx-thread">
    <div className="gx-bar"><button type="button" onClick={onBack}>‹ Voltar ao quadro</button>
      {post&&canGuild(rank,'moderate')&&<button type="button" disabled={act.busy} onClick={()=>void act.run(()=>api<{message:string}>(`${base}/topics/${pid}/pin`,{pinned:!post.pinned}),reload)}>{post.pinned?'Desafixar':'Fixar'}</button>}</div>
    {list.error&&<p className="error" role="alert">{list.error}</p>}
    {post&&<h3 className="gx-topictitle">{post.pinned&&<span className="gx-pin">FIXO</span>} {post.title}</h3>}
    <table className="gx-posts"><thead><tr><th scope="col">Autor</th><th scope="col">Mensagem</th></tr></thead><tbody>
      {post&&first&&<tr><th scope="row" className="gx-author"><Author a={post.author} m={byId.get(post.author.id)} openProfile={openProfile}/></th>
        <td className="gx-text" data-label="Mensagem"><div className="gx-posthead"><span>{dateTime(post.createdAt)}</span><span className="gx-postnum">#1</span>
          {canDelete(post.author)&&<button type="button" className="link-button" disabled={act.busy} onClick={()=>{if(window.confirm('Apagar este tópico e todas as respostas?'))void act.run(()=>api<{message:string}>(`${base}/topics/${pid}/delete`,{}),onBack);}}>Apagar</button>}</div>
          <div className="gx-body">{post.body}</div></td></tr>}
      {list.items.map((r,i)=><tr key={r.id}><th scope="row" className="gx-author"><Author a={r.author} m={byId.get(r.author.id)} openProfile={openProfile}/></th>
        <td className="gx-text" data-label="Mensagem"><div className="gx-posthead"><span>{dateTime(r.createdAt)}</span><span className="gx-postnum">#{(list.page-1)*10+i+2}</span>
          {canDelete(r.author)&&<button type="button" className="link-button" disabled={act.busy} onClick={()=>{if(window.confirm('Apagar esta resposta?'))void act.run(()=>api<{message:string}>(`${base}/replies/${r.id}/delete`,{}),reload);}}>Apagar</button>}</div>
          <div className="gx-body">{r.body}</div></td></tr>)}
    </tbody></table>
    <Pager page={list.page} pages={list.pages} onPage={p=>void list.go(p)} busy={list.loading}/>
    <form className="gx-box gx-form" onSubmit={e=>{e.preventDefault();const text=body.trim();if(!text)return;
      void act.run(()=>api<{message:string}>(`${base}/topics/${pid}/replies`,{body:text}),()=>{setBody('');void list.go(Math.max(1,Math.ceil((list.total+1)/10)));});}}>
      <h3>Resposta rápida</h3>
      <label>Sua mensagem<textarea rows={4} value={body} maxLength={guildLimits.replyBody} onChange={e=>setBody(e.target.value)}/><Counter value={body} max={guildLimits.replyBody}/></label>
      <button type="submit" className="primary" disabled={act.busy||!body.trim()}>Responder</button></form>
  </div>;
}
