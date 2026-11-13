import {useState} from 'react';

// Pede um motivo na própria tela, no lugar de window.prompt: o botão abre uma caixa de texto com Enviar e Cancelar.
// Usa <span> (e não <form>) porque aparece dentro de parágrafos e linhas de ação.
// `onSubmit` recebe o motivo e o aviso `sent`: a caixa só fecha quando quem chamou avisa que o servidor aceitou, então um
// envio que falha (ou é descartado) não apaga o que a pessoa escreveu. `busy` desliga o Enviar enquanto outra ação está a caminho.
export default function AskReason({label,question,onSubmit,send='Enviar',className='link-button',min=2,max=500,disabled=false,busy=false}:{label:string;question:string;onSubmit:(reason:string,sent:()=>void)=>void;send?:string;className?:string;min?:number;max?:number;disabled?:boolean;busy?:boolean}){
  const [open,setOpen]=useState(false),[text,setText]=useState('');
  const close=()=>{setOpen(false);setText('');};
  if(!open)return <button type="button" className={className} disabled={disabled} onClick={()=>setOpen(true)}>{label}</button>;
  const reason=text.trim();
  return <span className="ask-reason" role="group" aria-label={label}>
    <label>{question}<textarea autoFocus rows={2} maxLength={max} value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==='Escape')close();}}/></label>
    <span className="inline-actions"><button type="button" className="primary" disabled={busy||reason.length<min} onClick={()=>onSubmit(reason,close)}>{send}</button><button type="button" onClick={close}>Cancelar</button></span>
  </span>;
}
