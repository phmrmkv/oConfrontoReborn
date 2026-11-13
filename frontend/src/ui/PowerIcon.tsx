import Icon from './GameIcon';
import {powerArt} from '../lib/powerArt';

// Ícone de um poder da luta: o desenho próprio (lib/powerArt.ts) quando existe; senão o ícone de item que a tela já usava (`fallback`).
export default function PowerIcon({vocation,action,fallback,size=32}:{vocation:string;action:string;fallback:string;size?:number}){
  const own=powerArt(vocation,action);
  if(!own)return <Icon name={fallback} size={size}/>;
  return <img className="sprite power-art" src={own} width={size} height={size} alt="" loading="lazy" decoding="async"/>;
}
