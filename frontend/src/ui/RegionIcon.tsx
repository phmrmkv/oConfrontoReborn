import {useState,useSyncExternalStore} from 'react';
import Icon,{StillFrame} from './GameIcon';
import {motionStill,watchMotion} from '../lib/theme';
// Ícone próprio de cada local de caça. Primeiro o pintado e animado (/assets/regions/<chave>.webp, de art/regions por
// scripts/art-motion.mjs), parado no primeiro quadro quando as animações estão desligadas; sem ele, o desenho antigo em SVG
// (scripts/region-icons.mjs); se nada carregar, o quadrinho com as iniciais.
export default function RegionIcon({region,fallback,size=32}:{region:string;fallback:string;size?:number}){
  const [failed,setFailed]=useState<string[]>([]);
  const still=useSyncExternalStore(watchMotion,motionStill);
  const src=[`/assets/regions/${region}.webp`,`/assets/regions/${region}.svg`].find(s=>!failed.includes(s));
  if(!src)return <Icon name={fallback} size={size}/>;
  const fail=()=>setFailed(f=>[...f,src]);
  if(still&&src.endsWith('.webp'))return <StillFrame src={src} size={size} alt="" onError={fail} className="region-icon"/>;
  return <img className="region-icon" src={src} width={size} height={size} alt="" onError={fail}/>;
}
