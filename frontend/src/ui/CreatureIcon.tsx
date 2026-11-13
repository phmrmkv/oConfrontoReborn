import {useState,useSyncExternalStore} from 'react';
import Icon from './GameIcon';
import {creatureFile,livePortraitUrl,portraitUrl} from '../lib/creatureArt';
import {motionStill,watchMotion} from '../lib/theme';

// Ícone de criatura fora da arena (lista de Caçar, Bestiário, missões, registro da batalha, Caçada em grupo): quem tem arte
// própria mostra o retrato tirado da folha da arena; quem não tem, o quadrinho com as iniciais pelo GameIcon. Se o retrato não
// carregar, volta para o quadrinho com as iniciais em vez de sumir. Com as animações ligadas, o retrato vivo (respirando); se
// ele faltar, o parado.
export default function CreatureIcon({name,src,size=32}:{name:string;src?:string;size?:number}){
  const [failed,setFailed]=useState('');
  const still=useSyncExternalStore(watchMotion,motionStill),file=creatureFile(name,src),live=still?undefined:livePortraitUrl(file);
  const own=live&&live!==failed?live:portraitUrl(file);
  if(!own||own===failed)return <Icon name={name} src={src} size={size}/>;
  return <img className="sprite creature-art" src={own} width={size} height={size} alt={name} loading="lazy" decoding="async" onError={()=>setFailed(own)}/>;
}
