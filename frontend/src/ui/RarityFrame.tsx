import type {ReactNode} from 'react';
import {rarityName} from '../../../shared/rarity';

// Raridade do exemplar (shared/rarity.ts) na tela: uma cor por raridade, em camada separada do ícone, sem imagem nova por item.
// Comum não ganha moldura nem etiqueta. As cores estão em styles/operations.css (--rarity-1 a --rarity-5).
export function RarityFrame({rarity=0,children}:{rarity?:number;children:ReactNode}){
  if(!rarity)return <>{children}</>;
  return <span className={`rarity-frame rarity-${rarity}`} title={rarityName(rarity)}>{children}</span>;
}
export function RarityTag({rarity=0}:{rarity?:number}){
  return rarity?<span className={`rarity-tag rarity-${rarity}`}>{rarityName(rarity)}</span>:null;
}
