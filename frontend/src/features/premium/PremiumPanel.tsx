import {useEffect,useRef,useState} from 'react';
import {api} from '../../lib/api';
import {fmt,brl,when,msg} from '../../lib/format';
import type {Hero} from '../../lib/types';
import type {Tab} from '../../lib/tabs';
import {useAction,Feedback} from '../../ui/Feedback';
import Icon from '../../ui/GameIcon';
import {Limited} from '../../ui/ShowMore';
import {Pager,usePaged} from '../../ui/Pager';
import {premiumBenefits,frames,profileTitles,emblems,titleName,premiumPhase,type PremiumPhase} from '../../../../shared/premium';
import {gemReasons,type GemPack} from '../../../../shared/gems';
import {vocationLabel} from '../../../../shared/adventure';
import './gems.css';
type Overview={enabled:boolean;disabledReason:string|null;testMode:boolean;gems:number;gemPrice:number;days:number;packs:GemPack[];active:boolean;until:string|null;upcoming:string|null;lastEndedAt:string|null;
  pendingPack:string|null;emailVerified:boolean;perks:{presetLimit:number;charactersFree:number;charactersPremium:number}};
type Order={id:number;status:string;amountCents:number;days:number;gems:number;packKey:string|null;createdAt:string;paidAt:string|null;refundedAt:string|null;providerPaymentId:string|null};
type GemEntry={id:number;delta:number;balanceAfter:number;reason:string;createdAt:string};
type Preset={id:number;name:string};
type Stats={days:number;totals:{battles:number;victories:number;defeats:number;flees:number;gold:string;experience:number;winRate:number};byMonster:{name:string;battles:number;victories:number;gold:string;experience:number}[];byDay:{day:string;battles:number;victories:number;gold:string;experience:number}[]};
export type PaymentReturn='ok'|'pendente'|'falhou';
const orderStatus:Record<string,string>={PENDING:'Aguardando pagamento',EXPIRED:'Expirado',PAID:'Pago',FAILED:'Não concluído',REFUNDED:'Reembolsado',CANCELLED:'Cancelado'};
const headline:Record<PremiumPhase,string>={free:'Mais conforto para sua jornada',active:'Seu Premium está ativo',expiring:'Seu Premium está terminando',queued:'Seu Premium já está agendado',ended:'Seu Premium terminou'};
// Onde cada benefício fica: uma seção desta página ou outra aba do jogo.
const where:Record<string,{tab?:Tab;anchor?:string;label:string}>={appearance:{anchor:'premium-profile',label:'Escolher moldura'},presets:{anchor:'premium-presets',label:'Montar conjuntos'},bag:{tab:'bag',label:'Abrir a mochila'},
  diary:{anchor:'premium-diary',label:'Ver o diário'},profile:{anchor:'premium-profile',label:'Editar perfil'},characters:{tab:'characters',label:'Criar personagem'}};
const day=(d:string|null)=>d?new Date(d).toLocaleDateString('pt-BR'):'—';
const scrollTo=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
const gemsLabel=(n:number)=>`${fmt(n)} ${Math.abs(n)===1?'gema':'gemas'}`;
// Gema desenhada aqui mesmo (arte própria, sem sprite de terceiros).
export function GemIcon({size=20}:{size?:number}){
  return <svg className="gem-icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9z" fill="#3fb6a8"/><path d="M2 9h20L12 21z" fill="#23897e"/><path d="M6 3l3 6h6l3-6z" fill="#7fe0d3"/><path d="M9 9l3 12 3-12z" fill="#2fa294"/></svg>;
}
const WATCH_MS=5000,WATCH_TRIES=36,BEFORE_KEY='oc_gems_before';
// Saldo de antes de ir ao Mercado Pago: se o webhook chegar antes de a tela voltar, o aumento ainda é percebido.
const savedBefore=()=>{try{const v=sessionStorage.getItem(BEFORE_KEY);return v===null?null:Number(v);}catch{return null;}};
const saveBefore=(n:number)=>{try{sessionStorage.setItem(BEFORE_KEY,String(n));}catch{/* sem armazenamento: cai no saldo da primeira leitura */}};
const clearBefore=()=>{try{sessionStorage.removeItem(BEFORE_KEY);}catch{/* nada a limpar */}};
export default function PremiumPanel({hero,onChanged,go,returning,onReturnSeen}:{hero:Hero;onChanged:()=>Promise<void>|void;go:(t:Tab)=>void;returning:PaymentReturn|null;onReturnSeen:()=>void}) {
  const [o,setO]=useState<Overview|null>(null),[loadError,setLoadError]=useState(''),[celebrate,setCelebrate]=useState<null|'gems'|'premium'>(null),[refresh,setRefresh]=useState(0),{busy,error,ok,run}=useAction();
  const [watching,setWatching]=useState(returning==='ok'||returning==='pendente'),baseline=useRef<{gems:number}|null>(null),activateKey=useRef<string|null>(null);
  const load=()=>api<Overview>('/premium').then(r=>{setO(r);if(!baseline.current){const before=returning?savedBefore():null;baseline.current={gems:before??r.gems};if(before!==null&&r.gems>before&&returning){setWatching(false);setCelebrate('gems');clearBefore();onReturnSeen();}}return r;});
  useEffect(()=>{load().catch(e=>setLoadError(msg(e)));},[]);
  // Na volta do Mercado Pago o webhook pode levar alguns segundos: consulta até as gemas chegarem (no máximo 3 minutos).
  useEffect(()=>{if(!watching)return;let tries=0;
    const timer=setInterval(()=>{tries++;load().then(r=>{const b=baseline.current;
      if(b&&r.gems>b.gems){setWatching(false);setCelebrate('gems');setRefresh(x=>x+1);clearBefore();onReturnSeen();}
      else if(tries>=WATCH_TRIES){setWatching(false);onReturnSeen();}}).catch(()=>{});},WATCH_MS);
    return()=>clearInterval(timer);},[watching]);
  if(!o)return <section className="panel">{loadError?<p className="error" role="alert">{loadError}</p>:<p>Carregando…</p>}</section>;
  const {phase,daysLeft}=premiumPhase(o),unlocked=o.active,p=o.perks,missing=Math.max(0,o.gemPrice-o.gems),canActivate=o.gemPrice>0&&missing===0;
  const statusLine:Record<PremiumPhase,string>={
    free:'Organização, personalização e conveniência para quem quer apoiar o jogo. Ele não altera as regras de combate: XP, ouro e drops são iguais para todos.',
    active:`Liberado até ${when(o.until)}. Renovar soma ${o.days} dias ao final do período atual, sem perder nenhum dia.`,
    expiring:`${daysLeft===1?'Falta 1 dia':`Faltam ${daysLeft} dias`}. Renove agora e os ${o.days} dias novos começam quando o atual terminar.`,
    queued:`Seu próximo período começa em ${when(o.upcoming)}.`,
    ended:`Terminou em ${day(o.lastEndedAt)}. Seus conjuntos, favoritos e perfil ficaram guardados e voltam assim que você renovar.`};
  const jump=(key:string)=>{const w=where[key];if(w.tab)go(w.tab);else if(w.anchor)scrollTo(w.anchor);};
  const renewing=unlocked||phase==='queued';
  const activate=()=>{
    if(!window.confirm(`${renewing?'Renovar':'Ativar'} o Premium por ${o.days} dias usando ${gemsLabel(o.gemPrice)}? Você fica com ${gemsLabel(o.gems-o.gemPrice)}.`))return;
    activateKey.current??=crypto.randomUUID();
    void run(async()=>{const r=await api<{endsAt:string}>('/premium/activate',{},activateKey.current!);activateKey.current=null;await load();setRefresh(x=>x+1);setCelebrate('premium');await onChanged();return `Premium liberado até ${when(r.endsAt)}.`;});};
  const actionLabel=renewing?'Renovar':phase==='ended'?'Voltar ao Premium':'Ativar Premium';
  return <div className="premium-page">
    {celebrate&&<section className="panel premium-celebrate" role="status">{celebrate==='gems'?<GemIcon size={48}/>:<Icon name="Crown Helmet" size={48}/>}<div>
      <h2>{celebrate==='gems'?'Gemas recebidas!':'Premium ativado!'}</h2><p className="muted">{celebrate==='gems'?`Seu saldo agora é de ${gemsLabel(o.gems)}. ${canActivate&&!unlocked?'Já dá para ativar o Premium aqui em cima.':'Obrigado por apoiar O Confronto.'}`:'Obrigado por apoiar O Confronto. Seus benefícios já estão liberados abaixo.'}</p></div>
      <button className="quiet" onClick={()=>setCelebrate(null)}>Fechar</button></section>}
    {watching&&<div className="notice premium-watch" role="status"><i className="premium-spinner" aria-hidden="true"/>{returning==='pendente'?'Pagamento pendente.':'Pagamento recebido.'} Aguardando a confirmação do Mercado Pago para creditar suas gemas. Esta página atualiza sozinha.</div>}
    {!watching&&!celebrate&&returning&&<div className="notice" role="status">{returning==='falhou'?'O pagamento não foi concluído. Você pode tentar de novo quando quiser.':'A confirmação ainda não chegou. Se o pagamento foi aprovado, as gemas entram automaticamente; volte em alguns minutos ou fale com o Suporte.'} <button className="link-button" onClick={onReturnSeen}>Fechar</button></div>}
    <section className={`panel premium-hero phase-${phase}`} id="premium-top">
      <div className="premium-status"><div className="premium-crown"><Icon name="Crown Helmet" size={64}/></div><div>
        <span className="eyebrow">{unlocked?`PREMIUM ATIVO · ${daysLeft} ${daysLeft===1?'DIA RESTANTE':'DIAS RESTANTES'}`:`PASSE DE ${o.days} DIAS`}</span>
        <h2>{headline[phase]}</h2><p className="muted">{statusLine[phase]}</p>
        {unlocked&&<div className="premium-meter"><progress max={o.days} value={Math.min(daysLeft,o.days)} aria-label="Dias restantes do Premium"/><small>até {day(o.until)}</small></div>}
      </div></div>
      <Feedback error={error} ok={ok}/>
      <div className="gem-activate">
        <div className="gem-balance"><GemIcon size={28}/><div><small className="muted">Seu saldo</small><strong className={o.gems<0?'neg':''}>{gemsLabel(o.gems)}</strong></div></div>
        {o.gemPrice>0?<div className="premium-cta"><button className="primary" disabled={busy||!canActivate} onClick={activate}>{actionLabel} · {gemsLabel(o.gemPrice)}</button>
          {missing>0?<div className="gem-shortfall"><small className="muted">Faltam {gemsLabel(missing)}</small><button className="gem-buy-cta" onClick={()=>scrollTo('premium-gems')}><GemIcon size={18}/>Comprar gemas</button></div>:<small className="muted">{o.days} dias de acesso · sem renovação automática.</small>}</div>
          :<p className="muted">A ativação do Premium com gemas está desligada no momento.</p>}
      </div>
      {o.gems<0&&<p className="notice">Seu saldo ficou negativo porque uma compra foi reembolsada depois de usada. Ele volta ao normal com a próxima compra de gemas.</p>}
      <div className="benefit-grid premium-benefits">{premiumBenefits.map(b=><div key={b.key} className={unlocked?'unlocked':''}><Icon name={b.icon} size={32}/><strong>{b.title}</strong><span>{b.description}</span>
        {unlocked?<button className="link-button" onClick={()=>jump(b.key)}>{where[b.key].label} →</button>:<small className="pill">Premium</small>}</div>)}</div>
    </section>
    <GemShop o={o} watching={watching}/>
    {unlocked?<><PresetSection hero={hero} limit={p.presetLimit} onChanged={onChanged}/><ProfileSection hero={hero} onChanged={onChanged}/><StatsSection hero={hero}/></>
      :<><CompareSection perks={p}/><ProfileSection hero={hero} onChanged={onChanged} locked onUnlock={()=>scrollTo('premium-top')}/></>}
    <PurchaseHistory refresh={refresh}/>
  </div>;
}
function GemShop({o,watching}:{o:Overview;watching:boolean}) {
  const {busy,error,ok,run}=useAction();
  const bestPack=o.packs.reduce<GemPack|null>((best,pack)=>!best||pack.gems/pack.cents>best.gems/best.cents?pack:best,null);
  const onBuy=(pack:string)=>void run(async()=>{const r=await api<{url:string}>('/gems/checkout',{pack});saveBefore(o.gems);window.location.assign(r.url);});
  const onResend=()=>void run(async()=>(await api<{message:string}>('/auth/resend-verification',{})).message);
  return <section className="panel gem-shop" id="premium-gems"><div className="section-title"><h2>Loja de gemas</h2>{o.testMode&&<span className="pill">Modo de teste</span>}</div><Feedback error={error} ok={ok}/>
    <p className="muted">Gemas ativam e renovam o Premium. Elas não viram ouro, XP nem item. Pagamento único pelo Mercado Pago, com Pix ou cartão; as gemas entram assim que o Mercado Pago confirma.</p>
    {o.testMode&&<p className="notice">Modo de teste (sandbox): o Mercado Pago não cobra de verdade. Use uma conta compradora de teste.</p>}
    {!o.enabled&&o.packs.length>0&&<p className="notice gem-off" role="status">{o.disabledReason}</p>}
    {o.enabled&&!o.emailVerified&&<p className="notice">Confirme seu e-mail para comprar gemas. <button className="link-button" disabled={busy} onClick={onResend}>Reenviar link</button></p>}
    {o.packs.length?<div className="gem-packs">{o.packs.map((pk,index)=>{const gems=Math.min(4,index+1),best=pk.key===bestPack?.key;return <div className={`gem-pack ${best?'gem-pack-best':''}`} key={pk.key}>
      {best&&<span className="gem-best">Mais vantajoso</span>}<div className={`gem-stack gem-stack-${gems}`} aria-hidden="true">{Array.from({length:gems},(_,i)=><GemIcon key={i} size={34+i*4}/>)}</div>
      <strong>{fmt(pk.gems)} gemas</strong>{pk.bonusPercent>0?<small className="pill">+{pk.bonusPercent}% de bônus</small>:<small className="muted">pacote básico</small>}
      <b>{brl(pk.cents)}</b>
      <button className="primary" disabled={!o.enabled||busy||watching||!o.emailVerified} onClick={()=>onBuy(pk.key)}>{!o.enabled?'Em breve':o.pendingPack===pk.key?'Continuar pagamento':'Comprar'}</button></div>;})}</div>
      :<p className="notice gem-off" role="status">{o.disabledReason}</p>}
  </section>;
}
function PurchaseHistory({refresh}:{refresh:number}) {
  const orders=usePaged<Order>('/gems/orders',refresh),ledger=usePaged<GemEntry>('/gems/history',refresh);
  if(!orders.total&&!ledger.total)return null;
  return <section className="panel"><div className="section-title"><h2>Compras e extrato de gemas</h2></div>
    {orders.error&&<p className="error" role="alert">{orders.error}</p>}
    {orders.total>0&&<><h3>Suas compras</h3>{orders.items.map(x=><div className="ledger-row" key={x.id}><span>#{x.id} · {when(x.createdAt)}</span>
      <span>{x.gems>0?gemsLabel(x.gems):`Premium ${x.days} dias`} · {brl(x.amountCents)}</span><b className={`order-${x.status.toLowerCase()}`}>{orderStatus[x.status]??x.status}</b>{(x.paidAt||x.refundedAt||x.providerPaymentId)&&<small className="gem-receipt">{x.paidAt&&<>Pago em {when(x.paidAt)}. </>}{x.refundedAt&&<>Reembolsado em {when(x.refundedAt)}. </>}{x.providerPaymentId&&<>Pagamento nº {x.providerPaymentId} no Mercado Pago.</>} Cite o pedido nº {x.id} no Suporte.</small>}</div>)}
      <Pager page={orders.page} pages={orders.pages} onPage={p=>void orders.go(p)} busy={orders.loading}/></>}
    {ledger.total>0&&<><h3>Extrato de gemas</h3>{ledger.items.map(g=><div className="ledger-row" key={g.id}><span>{when(g.createdAt)}</span><span>{gemReasons[g.reason as keyof typeof gemReasons]??g.reason}</span>
      <b className={g.delta<0?'neg':'pos'}>{g.delta>0?'+':''}{fmt(g.delta)}</b><small>saldo {fmt(g.balanceAfter)}</small></div>)}
      <Pager page={ledger.page} pages={ledger.pages} onPage={p=>void ledger.go(p)} busy={ledger.loading}/></>}
  </section>;
}
function CompareSection({perks}:{perks:Overview['perks']}) {
  const rows:[string,string,string][]=[['Combate, XP, ouro e drops','Iguais para todos','Iguais para todos'],['Personagens por conta',String(perks.charactersFree),String(perks.charactersPremium)],
    ['Conjuntos de equipamento','—',`Até ${perks.presetLimit}`],['Busca e favoritos na mochila','—','✓'],['Diário de caçadas (7 e 30 dias)','—','✓'],['Título, emblema, moldura e apresentação','—','✓'],['Temas claro e escuro','✓','✓']];
  return <section className="panel"><div className="section-title"><h2>Grátis e Premium, lado a lado</h2></div>
    <table className="compare-table"><thead><tr><th scope="col"><span className="sr-only">Recurso</span></th><th scope="col">Grátis</th><th scope="col">Premium</th></tr></thead>
      <tbody>{rows.map(([label,free,premium])=><tr key={label}><th scope="row">{label}</th><td>{free}</td><td>{premium}</td></tr>)}</tbody></table></section>;
}
function ProfileCard({hero,title,emblem,frame,bio}:{hero:Hero;title:string;emblem:string;frame:string;bio:string}) {
  return <div className={`profile-card ${frame!=='none'?`frame-${frame}`:''}`}><div className="crest"><Icon name={emblem||'Mastermind Shield'} size={48}/></div>
    <div><h3>{hero.name}</h3>{title&&<small className="hero-title">{titleName(title)}</small>}<p className="muted">{vocationLabel(hero.vocation)} · Nível {hero.level}</p>{bio&&<p className="profile-bio">“{bio}”</p>}</div></div>;
}
function ProfileSection({hero,onChanged,locked=false,onUnlock}:{hero:Hero;onChanged:()=>Promise<void>|void;locked?:boolean;onUnlock?:()=>void}) {
  const [title,setTitle]=useState(hero.profileTitle??''),[emblem,setEmblem]=useState(hero.profileEmblem??''),[frame,setFrame]=useState(hero.profileFrame??'none'),[bio,setBio]=useState(hero.profileBio??''),{busy,error,ok,run}=useAction();
  return <section className="panel" id="premium-profile"><div className="section-title"><h2>{locked?'Experimente seu visual':'Perfil e aparência'}</h2>{locked&&<small className="pill">Prévia</small>}</div><Feedback error={error} ok={ok}/>
    {locked&&<p className="muted">Monte o seu perfil à vontade. A prévia não é salva: para usar no jogo, ative o Premium.</p>}
    <div className="profile-editor"><ProfileCard hero={hero} title={title} emblem={emblem} frame={frame} bio={bio}/>
    <form className="ops-form" onSubmit={e=>{e.preventDefault();if(locked){onUnlock?.();return;}void run(async()=>{await api(`/characters/${hero.id}/profile`,{title:title||null,emblem:emblem||null,frame,bio});await onChanged();},'Perfil atualizado.');}}>
      <label>Título<select value={title} onChange={e=>setTitle(e.target.value)}><option value="">Nenhum</option>{profileTitles.map(t=><option key={t.key} value={t.key}>{t.name}</option>)}</select></label>
      <fieldset className="emblem-picker"><legend>Emblema</legend>{emblems.map(x=><button type="button" key={x} title={x} aria-label={x} aria-pressed={emblem===x} className={emblem===x?'selected':''} onClick={()=>setEmblem(emblem===x?'':x)}><Icon name={x} size={32}/></button>)}</fieldset>
      <fieldset className="frame-picker"><legend>Moldura do retrato</legend>{frames.map(f=><button type="button" key={f.key} aria-pressed={frame===f.key} className={`${frame===f.key?'selected':''} swatch-${f.key}`} onClick={()=>setFrame(f.key)}><i/>{f.name}</button>)}</fieldset>
      <label>Apresentação ({bio.length}/160)<textarea value={bio} onChange={e=>setBio(e.target.value)} maxLength={160} rows={3}/></label>
      <button className="primary" disabled={busy}>{locked?'Ativar Premium para salvar':'Salvar perfil'}</button></form></div></section>;
}
function PresetSection({hero,limit,onChanged}:{hero:Hero;limit:number;onChanged:()=>Promise<void>|void}) {
  const [presets,setPresets]=useState<Preset[]>([]),[name,setName]=useState(''),{busy,error,ok,run}=useAction();
  const load=()=>api<Preset[]>(`/characters/${hero.id}/presets`).then(setPresets).catch(()=>{});
  useEffect(()=>{void load();},[hero.id]);
  return <section className="panel" id="premium-presets"><div className="section-title"><h2>Conjuntos de equipamento</h2><span>{presets.length}/{limit}</span></div><Feedback error={error} ok={ok}/>
    <p className="muted">Salve o que você está usando agora e troque de conjunto fora de combate.</p>
    {presets.map(p=><div className="market-row" key={p.id}><Icon name="Golden Armor" size={32}/><div><h3>{p.name}</h3></div>
      <button disabled={busy||!!hero.activeBattleId} onClick={()=>void run(async()=>{const r=await api<{equipped:number;skipped:number}>(`/characters/${hero.id}/presets/${p.id}/apply`,{});await onChanged();return `${r.equipped} item(ns) equipado(s)${r.skipped?`, ${r.skipped} indisponível(is)`:''}.`;})}>Equipar</button>
      <button disabled={busy} onClick={()=>void run(async()=>{await api(`/characters/${hero.id}/presets/${p.id}/delete`,{});await load();},'Conjunto removido.')}>Excluir</button></div>)}
    {!presets.length&&<p className="empty">Nenhum conjunto ainda. Equipe seus itens de caçada e salve-os aqui.</p>}
    <form className="ops-inline" onSubmit={e=>{e.preventDefault();void run(async()=>{await api(`/characters/${hero.id}/presets`,{name});setName('');await load();},'Conjunto salvo.');}}>
      <input placeholder="Nome do conjunto" aria-label="Nome do conjunto" value={name} onChange={e=>setName(e.target.value)} maxLength={30} required/><button disabled={busy}>Salvar equipamento atual</button></form></section>;
}
function StatsSection({hero}:{hero:Hero}) {
  const [days,setDays]=useState(7),[s,setS]=useState<Stats|null>(null),[err,setErr]=useState('');
  useEffect(()=>{setErr('');api<Stats>(`/characters/${hero.id}/hunt-stats?days=${days}`).then(setS).catch(e=>setErr(msg(e)));},[hero.id,days]);
  const peak=Math.max(1,...(s?.byDay.map(d=>d.battles)??[1]));
  return <section className="panel" id="premium-diary"><div className="section-title"><h2>Diário detalhado</h2><span><button className={days===7?'active-chip':''} onClick={()=>setDays(7)}>7 dias</button> <button className={days===30?'active-chip':''} onClick={()=>setDays(30)}>30 dias</button></span></div>
    {err&&<p className="error" role="alert">{err}</p>}{s&&<>
      <div className="stat-tiles"><div><b>{s.totals.battles}</b><span>combates</span></div><div><b>{s.totals.winRate}%</b><span>vitórias</span></div><div><b>{fmt(s.totals.gold)}</b><span>ouro</span></div><div><b>{fmt(s.totals.experience)}</b><span>XP</span></div></div>
      {s.byDay.length>0&&<div className="day-bars" role="img" aria-label="Combates por dia">{s.byDay.map(d=><div key={d.day} title={`${d.day}: ${d.battles} combates, ${d.victories} vitórias`}><i style={{height:`${Math.max(6,d.battles/peak*100)}%`}}/><small>{d.day.slice(8)}/{d.day.slice(5,7)}</small></div>)}</div>}
      <Limited items={s.byMonster} label="Ver mais criaturas" render={m=><div className="ledger-row" key={m.name}><span>{m.name}</span><span>{m.victories}/{m.battles} vitórias</span><b>{fmt(m.gold)} ouro · {fmt(m.experience)} XP</b></div>}/>
      {!s.byMonster.length&&<p className="empty">Sem combates neste período.</p>}</>}</section>;
}
