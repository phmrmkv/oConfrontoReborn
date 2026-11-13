// Comércio limitado (plano de itens, Fase 3; decisão do dono: comércio limitado). Cada exemplar de equipamento está em um
// de três estados, guardados em InventoryItem.bound e InventoryItem.bindOnEquip:
//  - livre: anda pelo Mercado e pode cair no Espólio do duelo (Comum e Incomum, loja, Ferreiro e tudo o que já existia);
//  - vincula ao equipar: livre até a primeira vez que é vestido (Raro e Épico; Lendário e Mítico que não vieram de chefe);
//  - vinculado: fica com o personagem (Lendário e Mítico de chefe, recompensas da Jornada, item despertado com fragmentos).
// O exemplar que chega a +10 vira item raro numerado e fica sempre livre: a história de donos faz parte da coleção
// (o Mercado cobra a taxa de raro, market.rareSaleFeePercent). Poção e material nunca vinculam. Desmontar item vinculado
// devolve material livre.
export interface Binding { bound: boolean; bindOnEquip: boolean }
export const FREE: Binding = { bound: false, bindOnEquip: false };
export const BOUND: Binding = { bound: true, bindOnEquip: false };
export const BIND_ON_EQUIP: Binding = { bound: false, bindOnEquip: true };

/** Como chega um equipamento que caiu de uma criatura, pela raridade sorteada e por ter vindo de chefe. */
export function bindingOnDrop(rarity: number, fromBoss: boolean): Binding {
  if (rarity >= 4 && fromBoss) return BOUND;
  if (rarity >= 2) return BIND_ON_EQUIP;
  return FREE;
}
/** Nome do estado para a tela, ou null quando o item é livre. */
export const bindingLabel = (b: Partial<Binding>) => b.bound ? 'Vinculado' : b.bindOnEquip ? 'Vincula ao equipar' : null;
export const bindingHelp = (b: Partial<Binding>) => b.bound
  ? 'Vinculado a você: não pode ser anunciado no Mercado nem cair no Espólio do duelo. Ao chegar a +10, vira item raro numerado e volta a ser livre.'
  : b.bindOnEquip ? 'Livre até ser vestido. Na primeira vez que você o equipar, ele fica vinculado a você.' : '';
