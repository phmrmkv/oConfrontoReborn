import {useEffect,useLayoutEffect,useRef,useState} from 'react';

// Aviso de sucesso que aparece perto do botão que o jogador acabou de usar (em vez de uma faixa fixa no alto da página, que
// ficava fora da tela quem rolava a lista). Some sozinho depois de alguns segundos; passar o mouse ou focar nele segura; o X e a
// tecla Esc fecham. A posição vem do último botão, link ou campo que a pessoa tocou: o elemento (se ainda estiver na tela) ou,
// se a tela se reorganizou depois do clique (a etapa concluída some do lugar), o ponto do clique. Sem nenhum dos dois, fica no
// alto, centralizado. "Menos movimento" desliga a animação de entrada pela regra geral do CSS.
const SHOW_MS = 7000, GAP = 10, EDGE = 8;
let lastEl: Element | null = null, lastPoint: { x: number; y: number } | null = null, lastAt = 0;
const TOUCHABLE = 'button,a,input,select,textarea,summary,[role="button"],[role="tab"]';
if (typeof document !== 'undefined') {
  const note = (e: Event) => {
    const el = (e.target as Element | null)?.closest?.(TOUCHABLE) ?? null; if (!el) return;
    lastEl = el; lastAt = Date.now();
    const p = e as PointerEvent; lastPoint = 'clientX' in p && (p.clientX || p.clientY) ? { x: p.clientX, y: p.clientY } : null;
  };
  document.addEventListener('pointerdown', note, true); document.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') note(e); }, true);
}
// Ponto de ancoragem (em coordenadas da janela): o elemento tocado se ainda existir e estiver visível, senão o ponto do clique.
function anchor(): { x: number; top: number; bottom: number } | null {
  if (Date.now() - lastAt > 60000) return null;
  if (lastEl?.isConnected) { const r = lastEl.getBoundingClientRect(); if (r.width && r.bottom > 0 && r.top < innerHeight) return { x: r.left + r.width / 2, top: r.top, bottom: r.bottom }; }
  return lastPoint ? { x: lastPoint.x, top: lastPoint.y - 12, bottom: lastPoint.y + 12 } : null;
}

export default function Toast({ text, onClose }: { text: string; onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null), [pos, setPos] = useState<{ left: number; top: number; below: boolean } | null>(null), hold = useRef(false);
  useLayoutEffect(() => {
    const el = box.current; if (!el) return;
    const a = anchor(), w = el.offsetWidth, h = el.offsetHeight;
    if (!a) { setPos({ left: Math.max(EDGE, (innerWidth - w) / 2), top: 76, below: true }); return; }
    // Acima do botão; se não couber no alto da janela, abaixo dele.
    const above = a.top - h - GAP >= EDGE, top = above ? a.top - h - GAP : Math.min(innerHeight - h - EDGE, a.bottom + GAP);
    setPos({ left: Math.min(Math.max(EDGE, a.x - w / 2), Math.max(EDGE, innerWidth - w - EDGE)), top: Math.max(EDGE, top), below: !above });
  }, [text]);
  useEffect(() => {
    let timer = 0; const arm = () => { window.clearTimeout(timer); timer = window.setTimeout(() => { if (hold.current) arm(); else onClose(); }, SHOW_MS); };
    arm(); const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', esc); return () => { window.clearTimeout(timer); document.removeEventListener('keydown', esc); };
  }, [text, onClose]);
  return <div ref={box} className={`toast ${pos?.below ? 'below' : 'above'}`} role="status" aria-live="polite"
    style={pos ? { left: pos.left, top: pos.top } : { left: -9999, top: 0 }}
    onMouseEnter={() => { hold.current = true; }} onMouseLeave={() => { hold.current = false; }} onFocus={() => { hold.current = true; }} onBlur={() => { hold.current = false; }}>
    <span className="toast-mark" aria-hidden="true">✓</span><span className="toast-text">{text}</span>
    <button type="button" className="toast-close" aria-label="Fechar aviso" onClick={onClose}>×</button>
  </div>;
}
