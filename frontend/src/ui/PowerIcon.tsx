import {useState,useSyncExternalStore} from 'react';
import Icon,{StillFrame} from './GameIcon';
import {motionStill,watchMotion} from '../lib/theme';
import {powerArt} from '../lib/powerArt';

// Ícone de um poder da luta: o desenho próprio e animado (lib/powerArt.ts; scripts/art-motion.mjs) quando existe, parado no
// primeiro quadro com as animações desligadas; senão o ícone de item que a tela já usava (`fallback`).
export default function PowerIcon({vocation,action,fallback,size=32}:{vocation:string;action:string;fallback:string;size?:number}){
  const [failed,setFailed]=useState('');
  const still=useSyncExternalStore(watchMotion,motionStill);
  const own=powerArt(vocation,action);
  if(!own||own===failed)return <Icon name={fallback} size={size}/>;
  if(still)return <StillFrame src={own} size={size} alt="" onError={()=>setFailed(own)} className="sprite power-art"/>;
  return <img onError={()=>setFailed(own)} className="sprite power-art" src={own} width={size} height={size} alt="" loading="lazy" decoding="async"/>;
}
