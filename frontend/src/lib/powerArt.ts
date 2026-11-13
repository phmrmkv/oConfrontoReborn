// Ícones próprios dos poderes da luta (frontend/public/assets/powers/<arquivo>.webp; originais em art/powers, gerados no
// gerador local em 2026-11-13, ver PODERES.md). Os especiais mudam por vocação; Interromper é igual para todas.
// Ação sem ícone próprio continua com o ícone de item que a tela já usava.
const specials: Record<string, Record<string, string>> = {
  KNIGHT: { TRIPLE_HIT: 'k1-golpe-brutal', FIFTH_HIT: 'k2-furia-berserker' },
  PALADIN: { TRIPLE_HIT: 'p1-tiro-preciso', FIFTH_HIT: 'p2-salva-de-flechas' },
  SORCERER: { TRIPLE_HIT: 's1-explosao', FIFTH_HIT: 's2-tempestade' },
  DRUID: { TRIPLE_HIT: 'd1-espinhos', FIFTH_HIT: 'd2-furia-natural' },
};
const shared: Record<string, string> = { INTERRUPT: 'interromper' };
/** O ícone próprio de uma ação da luta para a vocação-base, ou `undefined` se ela usa ícone de item. */
export const powerArt = (baseVocation: string, action: string): string | undefined => {
  const file = specials[baseVocation]?.[action] ?? shared[action];
  return file ? `/assets/powers/${file}.webp` : undefined;
};
