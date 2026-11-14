import {Fragment,useCallback,useState,type ReactNode} from 'react';
import {msg} from '../../lib/format';
import Icon from '../../ui/GameIcon';
import Toast from '../../ui/Toast';
import {classLabel} from '../../../../shared/adventure';
import {guildRanks,seenLabel,type GuildRank} from '../../../../shared/guild';

export type Card={id:number;name:string;level:number;vocation:string;classTier:number;profileAvatar:string|null;profileEmblem:string|null};
export type GuildRef={id:number;name:string;tag:string};
export const dateOnly=(d:string|null|undefined)=>d?new Date(d).toLocaleDateString('pt-BR'):'—';
export const dateTime=(d:string|null|undefined)=>d?new Date(d).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'}):'—';
export const Avatar=({c,size=36}:{c:Card;size?:number})=><Icon name={c.profileAvatar??c.profileEmblem??'Hero'} size={size}/>;
export const classText=(c:Card)=>classLabel(c.vocation,c.classTier);

// Migalhas de pão do topo: Comunidade › Guildas › [TAG] Nome. O último item é a página atual.
export function Crumbs({items}:{items:{label:string;onClick?:()=>void}[]}){
  return <nav className="gx-crumbs" aria-label="Você está em">{items.map((it,i)=><Fragment key={i}>{i>0&&<span className="gx-sep" aria-hidden="true">›</span>}
    {it.onClick&&i<items.length-1?<button type="button" className="link-button" onClick={it.onClick}>{it.label}</button>:<span aria-current={i===items.length-1?'page':undefined}>{it.label}</span>}</Fragment>)}</nav>;
}
export const RankBadge=({rank}:{rank:GuildRank})=><span className={`gx-rank gx-rank-${rank.toLowerCase()}`}>{guildRanks[rank].name}</span>;
export const Dot=({online}:{online:boolean})=><span className={`gx-dot${online?' on':''}`} role="img" aria-label={online?'Online':'Offline'} title={online?'Online':'Offline'}/>;
export const Seen=({at,online}:{at:string|null;online:boolean})=><span className="gx-seen"><Dot online={online}/>{online?'online':seenLabel(at)}</span>;
export const GuildLink=({g,onOpen}:{g:GuildRef|null;onOpen:(id:number)=>void})=>g?<button type="button" className="link-button gx-tagname" onClick={()=>onOpen(g.id)} title={g.name}>[{g.tag}] {g.name}</button>:<span className="muted">sem guilda</span>;
export const Counter=({value,max}:{value:string;max:number})=><small className={`gx-counter${value.length>max*0.9?' near':''}`}>{value.length}/{max}</small>;
// Tabela de fórum: o cabeçalho some no celular e cada célula mostra seu rótulo (data-label).
export const Table=({head,children,className=''}:{head:{label:string;className?:string}[];children:ReactNode;className?:string})=>
  <div className="gx-tablewrap"><table className={`gx-table ${className}`}><thead><tr>{head.map(h=><th key={h.label} scope="col" className={h.className}>{h.label}</th>)}</tr></thead><tbody>{children}</tbody></table></div>;

// Um executor de ações para a aba: impede clique duplo, guarda o erro e o aviso de sucesso (balão perto do botão).
export function useAct(){
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[ok,setOk]=useState('');
  const close=useCallback(()=>setOk(''),[]);
  async function run(work:()=>Promise<{message?:string}|void>,after?:()=>void){
    if(busy)return false;setBusy(true);setError('');setOk('');
    try{const r=await work();setOk((r&&r.message)||'Pronto.');after?.();return true;}catch(e){setError(msg(e));return false;}finally{setBusy(false);}
  }
  const toast=ok?<Toast text={ok} onClose={close}/>:null;
  return {busy,error,setError,run,toast};
}
export type Act=ReturnType<typeof useAct>;
