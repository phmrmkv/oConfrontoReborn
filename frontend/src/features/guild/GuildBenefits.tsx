import {useCallback,useEffect,useState} from 'react';
import {api} from '../../lib/api';
import {fmt,msg} from '../../lib/format';
import type {Hero} from '../../lib/types';
import Icon from '../../ui/GameIcon';
import {Table,type Act} from './guildBits';

type Perks={members:number;pinned:number;chestBonusPercent:number};
type Reward={gold:string;item:{name:string;quantity:number}};
type Benefits={level:number;maxLevel:number;treasury:string;levelBase:number;nextLevelAt:number|null;perks:Perks;nextPerks:Perks|null;donationMin:number;
  daily:{claimed:boolean;eligibleAt:string;resetsAt:string;reward:Reward};
  weekly:{claimed:boolean;goal:string;donated:string;goalMet:boolean;eligibleAt:string;resetsAt:string;reward:Reward};
  topDonors:{id:number;name:string;amount:string}[]};

const pct=(part:bigint,total:bigint)=>total<=0n?100:Math.max(0,Math.min(100,Number(part*10000n/total)/100));
// Tempo restante em texto curto: dias e horas, horas e minutos ou minutos.
function span(ms:number){
  const m=Math.max(1,Math.ceil(ms/60000)),d=Math.floor(m/1440),h=Math.floor((m%1440)/60);
  if(d>0)return h>0?`${d} d ${h} h`:`${d} d`;
  if(h>0)return `${h} h ${m%60} min`;
  return `${m} min`;
}
function Bar({value,label}:{value:number;label:string}){
  return <div className="gx-meter" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)}><span style={{width:`${value}%`}}/></div>;
}

// Aba Benefícios: nível e cofre da guilda, vantagens, baús do dia e da semana e maiores doadores.
export default function GuildBenefits({hero,act,openProfile,onChanged}:{hero:Hero;act:Act;openProfile:(name:string)=>void;onChanged:()=>void}){
  const base=`/characters/${hero.id}/guild`;
  const [b,setB]=useState<Benefits|null>(null),[error,setError]=useState(''),[amount,setAmount]=useState('');
  const load=useCallback(()=>api<Benefits>(`${base}/benefits`).then(d=>{setB(d);setError('');}).catch(e=>setError(msg(e))),[base]);
  useEffect(()=>{void load();},[load]);
  if(!b)return error?<p className="error" role="alert">{error}</p>:<p className="muted">Carregando os benefícios…</p>;

  const now=Date.now(),treasury=BigInt(b.treasury);
  const maxed=b.nextLevelAt===null;
  const span1=maxed?0n:BigInt(b.nextLevelAt!)-BigInt(b.levelBase),done=maxed?0n:treasury-BigInt(b.levelBase),missing=maxed?0n:BigInt(b.nextLevelAt!)-treasury;
  const min=Math.max(1,b.donationMin),value=Number(amount),valid=Number.isInteger(value)&&value>=min;
  const donate=()=>{if(!valid)return;void act.run(()=>api<{message:string}>(`${base}/donate`,{amount:value}),()=>{setAmount('');void load();onChanged();});};
  const collect=(kind:'daily'|'weekly')=>void act.run(()=>api<{message:string}>(`${base}/chest/${kind}`,{}),()=>{void load();onChanged();});
  const perkRows:[string,(p:Perks)=>string][]=[['Vagas de membros',p=>String(p.members)],['Tópicos fixados no quadro',p=>String(p.pinned)],['Bônus no ouro dos baús',p=>`+${p.chestBonusPercent}%`]];

  const dailyWait=new Date(b.daily.eligibleAt).getTime()-now,weeklyWait=new Date(b.weekly.eligibleAt).getTime()-now;
  const dailyState=b.daily.claimed?'Coletado':dailyWait>0?`Disponível em ${span(dailyWait)}`:'Disponível';
  const weeklyState=b.weekly.claimed?'Coletado':weeklyWait>0?`Disponível em ${span(weeklyWait)}`:!b.weekly.goalMet?'Falta a meta da semana':'Disponível';
  const donated=BigInt(b.weekly.donated),goal=BigInt(b.weekly.goal);

  const chest=(title:string,kind:'daily'|'weekly',c:{claimed:boolean;resetsAt:string},reward:Reward,state:string,can:boolean,extra?:React.ReactNode)=>
    <div className="gx-box gx-chest"><h3>{title}</h3>
      <div className="gx-reward"><Icon name={reward.item.name} size={40}/><div><b>Ouro {fmt(reward.gold)} + {reward.item.quantity}× {reward.item.name}</b>
        <small>Renova em {span(new Date(c.resetsAt).getTime()-now)}</small></div></div>
      {extra}
      <div className="gx-chestfoot"><span className={`gx-state${c.claimed?' done':can?' ready':''}`}>{state}</span>
        <button type="button" className="primary" disabled={act.busy||!can} onClick={()=>collect(kind)}>Coletar</button></div></div>;

  return <div className="gx-benefits">
    {error&&<p className="error" role="alert">{error}</p>}
    <div className="gx-box"><h3>Nível {b.level} de {b.maxLevel}</h3>
      {maxed?<><Bar value={100} label="Nível da guilda"/><p className="gx-note">Nível máximo. Total doado: {fmt(b.treasury)} de ouro.</p></>
        :<><Bar value={pct(done,span1)} label="Progresso até o próximo nível"/>
          <p className="gx-note">{fmt(done.toString())} / {fmt(span1.toString())} de ouro neste nível. Faltam {fmt(missing.toString())} de ouro para o nível {b.level+1}.</p></>}
    </div>
    <Table head={[{label:'Vantagem'},{label:'Agora',className:'gx-num'},{label:'Próximo nível',className:'gx-num'}]}>
      {perkRows.map(([label,f])=><tr key={label}><td data-label="Vantagem">{label}</td><td data-label="Agora" className="gx-num">{f(b.perks)}</td><td data-label="Próximo nível" className="gx-num">{b.nextPerks?f(b.nextPerks):'—'}</td></tr>)}
    </Table>
    <form className="gx-box gx-form" onSubmit={e=>{e.preventDefault();donate();}}><h3>Cofre da guilda</h3>
      <p className="gx-note">O ouro doado sai do seu personagem e vira nível da guilda. Não volta.{hero.goldInHand!==undefined&&<> Você tem {fmt(hero.goldInHand)} de ouro.</>}</p>
      <label>Doar ouro (mínimo {fmt(min)})<input type="number" inputMode="numeric" min={min} step={1} value={amount} placeholder={String(min)} onChange={e=>setAmount(e.target.value)}/></label>
      <button type="submit" className="primary" disabled={act.busy||!valid}>Doar</button></form>
    <div className="gx-chests">
      {chest('Baú do dia','daily',b.daily,b.daily.reward,dailyState,!b.daily.claimed&&dailyWait<=0)}
      {chest('Baú da semana','weekly',b.weekly,b.weekly.reward,weeklyState,!b.weekly.claimed&&b.weekly.goalMet&&weeklyWait<=0,
        <div className="gx-goal"><span>Meta da semana: {fmt(b.weekly.donated)} / {fmt(b.weekly.goal)}{b.weekly.goalMet&&<b className="gx-met"> Meta batida!</b>}</span>
          <Bar value={pct(donated,goal)} label="Meta semanal de doações"/></div>)}
    </div>
    <h3 className="gx-sub">Maiores doadores da semana</h3>
    <Table head={[{label:'Pos.',className:'gx-num'},{label:'Aventureiro'},{label:'Ouro doado',className:'gx-num'}]}>
      {b.topDonors.slice(0,5).map((d,i)=><tr key={d.id} className={d.id===hero.id?'mine':''}><td data-label="Pos." className="gx-num">{i+1}º</td>
        <td data-label="Aventureiro"><button type="button" className="link-button gx-title" onClick={()=>openProfile(d.name)}>{d.name}</button></td>
        <td data-label="Ouro doado" className="gx-num">{fmt(d.amount)}</td></tr>)}
      {!b.topDonors.length&&<tr className="gx-empty"><td colSpan={3}>Ninguém doou nesta semana ainda.</td></tr>}
    </Table>
  </div>;
}
