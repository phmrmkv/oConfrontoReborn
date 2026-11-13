import {useEffect,useState} from 'react';
import Icon from '../../ui/GameIcon';
import {Limited} from '../../ui/ShowMore';
import manifest from '../../../public/assets/tibia/manifest.json';
import {api} from '../../lib/api';
import {msg} from '../../lib/format';
import {baseItem,itemArtFiles,itemFile,missingArt,strayArt} from '../../lib/itemArt';

type CatalogItem={name:string;slot:string;spriteUrl:string};
// O que falta no lote de arte própria: os itens do jogo (rota /items/names) sem GIF com o próprio nome, com o nome
// exato do arquivo que faz cada um entrar sozinho no próximo build. A busca aceita o nome com ou sem acento.
function MissingArt(){
  const [items,setItems]=useState<CatalogItem[]|null>(null),[error,setError]=useState(''),[search,setSearch]=useState('');
  useEffect(()=>{api<{items:CatalogItem[]}>('/items/names').then(r=>setItems(r.items)).catch(e=>setError(msg(e)));},[]);
  if(error)return <p className="error" role="alert">{error}</p>;
  if(!items)return <p className="muted" role="status">Conferindo o catálogo de itens…</p>;
  const missing=missingArt(items),stray=strayArt(itemArtFiles,items),term=itemFile(search),found=missing.filter(i=>i.file.includes(term));
  return <>
    <h3 className="profile-subtitle">Ainda sem arte própria: {missing.length} de {items.length} {items.length===1?'item':'itens'}</h3>
    {missing.length===0?<p className="empty">Todos os itens do jogo já têm arte própria.</p>:<>
      <p className="muted">Salve o GIF com o nome que aparece em cada item e ele entra sozinho no próximo build. Enquanto isso, a variante das Eras ou de Capriel usa a figura do item-base, se ela já existir; os outros aparecem com o sprite do TibiaWiki.</p>
      <input placeholder="Buscar item sem arte…" aria-label="Buscar item sem arte própria" value={search} onChange={e=>setSearch(e.target.value)}/>
      {found.length===0&&<p className="muted">Nenhum item sem arte com esse nome.</p>}
      <Limited items={found} label="Ver mais itens sem arte" render={i=><div className="market-row" key={i.name}><Icon name={i.name} src={i.spriteUrl||undefined} size={40}/>
        <div><h3>{i.name}</h3><p>Arquivo: <b>{i.file}.gif</b> · {i.borrowed?`por enquanto usa a figura de ${baseItem(i.name)}`:'por enquanto, sprite do TibiaWiki'}</p></div></div>}/></>}
    {stray.length>0&&<p className="error" role="status">{stray.length===1?'Um GIF tem':`${stray.length} GIFs têm`} nome que não é de nenhum item do jogo e não aparece{stray.length===1?'':'m'} em lugar nenhum: {stray.map(f=>`${f}.gif`).join(', ')}. Confira o nome do arquivo.</p>}
  </>;
}

// A arte própria dos itens (GIFs de public/assets/items): tudo o que já entrou no jogo, num lugar só, para conferir o lote.
// Cada quadro abre o GIF no tamanho original. A busca aceita o nome do item com ou sem acento e maiúsculas.
function OwnArt(){
  const [search,setSearch]=useState('');
  const term=itemFile(search),found=itemArtFiles.filter(file=>file.includes(term));
  return <section className="panel"><div className="section-title"><h2>Arte própria dos itens</h2><span>{itemArtFiles.length} {itemArtFiles.length===1?'item':'itens'}</span></div>
    <p className="muted">Ícones animados feitos para o jogo, um por item. Entram sozinhos quando o arquivo é salvo com o nome do item; quem ainda não tem continua com o sprite do TibiaWiki.</p>
    {itemArtFiles.length===0?<p className="muted">Nenhum ícone próprio foi encontrado neste servidor.</p>:<>
      <input placeholder="Buscar item…" aria-label="Buscar item com arte própria" value={search} onChange={e=>setSearch(e.target.value)}/>
      {found.length===0&&<p className="muted">Nenhum item com esse nome tem arte própria ainda.</p>}
      <div className="atlas-grid"><Limited items={found} label="Ver mais itens" render={file=><a key={file} href={`/assets/items/${file}.gif`} target="_blank" rel="noreferrer"><Icon name={file} size={64}/><span>{file}</span></a>}/></div></>}
    <MissingArt/>
  </section>;
}

export default function AtlasPanel(){
  const [atlasSearch,setAtlasSearch]=useState('');
  return <><OwnArt/><section className="panel"><div className="section-title"><h2>Biblioteca de ícones</h2><span>{manifest.entries.length} sprites</span></div><p className="muted">Arquivos do TibiaWiki armazenados localmente. Imagens © CipSoft GmbH.</p><input placeholder="Buscar ícone…" aria-label="Buscar ícone" value={atlasSearch} onChange={e=>setAtlasSearch(e.target.value)}/><div className="atlas-grid"><Limited items={manifest.entries.filter(e=>e.name.toLowerCase().includes(atlasSearch.toLowerCase()))} label="Ver mais ícones" render={e=><a key={e.name} href={e.sourcePage} target="_blank" rel="noreferrer"><Icon name={e.name} size={40}/><span>{e.name}</span></a>}/></div></section></>;
}
