import {useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {itemArt} from '../lib/itemArt';
import {creatureFile,livePortraitUrl,portraitUrl} from '../lib/creatureArt';
import {motionStill,watchMotion} from '../lib/theme';
// Lado, em pixels, do GIF próprio de um item (public/assets/items): o canvas do ícone parado guarda esse tamanho.
const OWN_ART_SIDE=128;

// O primeiro quadro de um GIF ou WebP animado, que é o ícone parado: um <img> não deixa parar a animação, um canvas não anima.
// Também usado pelos ícones de região (RegionIcon) e de poder (PowerIcon) com as animações desligadas.
export function StillFrame({src,size,alt,onError,className='sprite own-art'}:{src:string;size:number;alt:string;onError:()=>void;className?:string}){
  const ref=useRef<HTMLCanvasElement>(null),failed=useRef(onError);failed.current=onError;
  useEffect(()=>{
    let alive=true;const img=new Image();
    img.onload=()=>{const canvas=ref.current,ctx=canvas?.getContext('2d');if(!alive||!canvas||!ctx)return;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);};
    img.onerror=()=>{if(alive)failed.current();};
    img.src=src;
    return()=>{alive=false;};
  },[src]);
  return <canvas ref={ref} className={className} width={OWN_ART_SIDE} height={OWN_ART_SIDE} style={{width:size,height:size}} role="img" aria-label={alt}/>;
}

// Quadrinho no lugar de um ícone que ainda não tem arte própria: as iniciais do nome (a figura chega quando o GIF for gerado).
export function Placeholder({label,size}:{label:string;size:number}){
  const initials=label.replace(/[^\p{L}\p{N} ]/gu,'').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('')||'?';
  return <span className="missing-icon" role="img" aria-label={label} title={label} style={{width:size,height:size,fontSize:Math.max(9,Math.round(size*.34))}}>{initials}</span>;
}

// Um item com arte própria (GIF animado em public/assets/items, lib/itemArt.ts) usa a sua; criatura ou herói, o retrato próprio.
// `tier` (melhoria do item): +7 e +8 com brilho discreto, +9 forte, +10 em chamas (raro). "Menos movimento" deixa tudo parado,
// inclusive o GIF, que fica no primeiro quadro.
export default function Icon({name,size=32,src,fire=false,tier=0}:{name:string;size?:number;src?:string;fire?:boolean;tier?:number}) {
  // Guarda QUAL imagem falhou (e não só "falhou"): a mesma linha pode receber outro item depois.
  const [failed,setFailed]=useState(''),[ownFailed,setOwnFailed]=useState('');
  const still=useSyncExternalStore(watchMotion,motionStill);
  // "A|B" = tenta A e cai para B se A ainda não tem arte própria.
  const names=name.split('|');const label=names[0];
  const drawn=names.map(n=>itemArt(n)).find(Boolean)??null,own=drawn&&drawn!==ownFailed?drawn:null;
  // Sem GIF de item: o retrato próprio da criatura ou do herói com esse nome; depois `src`, se for arte própria (o banco antigo
  // ainda pode trazer caminhos do TibiaWiki, que não existem mais no jogo). Sem nada disso, um quadrinho com as iniciais.
  // Retrato: o vivo (respirando) com as animações ligadas; se ele falhar, o parado.
  const file=names.map(n=>creatureFile(n)).find(Boolean),live=still?undefined:livePortraitUrl(file);
  const portrait=live&&live!==failed?live:portraitUrl(file),ownSrc=src&&!src.startsWith('/assets/tibia/')?src:undefined;
  const image=own??portrait??ownSrc;
  if(!image||image===failed)return <Placeholder label={label} size={size}/>;
  const burning=fire||tier>=10,glow=!burning&&tier>=9?'glow-strong':!burning&&tier>=7?'glow-soft':'';
  const alt=burning?`${label} (+10, em chamas)`:tier>=7?`${label} (+${tier}, brilhando)`:label;
  // Se o GIF próprio não carregar (figura ainda fora do servidor), o ícone mostra o quadrinho com as iniciais em vez de sumir.
  const img=own&&still?<StillFrame src={own} size={size} alt={alt} onError={()=>setOwnFailed(own)}/>
    :<img className={own?'sprite own-art':'sprite'} src={image} width={size} height={size} alt={alt} loading={own?'lazy':undefined} decoding="async" onError={()=>own?setOwnFailed(own):setFailed(image)}/>;
  // Camada própria de aprimoramento (art-items.md: aro dourado no +7 e +8, aro forte no +9, fogo no +10 raro), por cima do ícone.
  // Sem o GIF da camada, fica o brilho e o fogo antigos.
  const layer=burning?itemArt('aprimoramento-10-raro'):tier>=9?itemArt('aprimoramento-9'):tier>=7?itemArt('aprimoramento-7-8'):null;
  const title=burning?'Item raro +10':`Melhorado +${tier}`;
  if(layer)return <span className={`upgrade-layer ${burning?'burning':''}`} title={title} style={{width:size,height:size}}>{img}
    {still?<StillFrame src={layer} size={size} alt="" onError={()=>{}}/>:<img className="upgrade-ring" src={layer} alt="" width={size} height={size} loading="lazy" decoding="async"/>}</span>;
  if(burning)return <span className="fire-icon" title={title}>{img}</span>;
  return glow?<span className={`tier-glow ${glow}`} title={title}>{img}</span>:img;
}
