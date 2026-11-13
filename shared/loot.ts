// Loot inteligente: o equipamento que cai serve, na maior parte das vezes, à vocação de quem caçou.
// Quando cai um equipamento de outra vocação (ex.: besta de Arqueiro para um Cavaleiro), o servidor sorteia
// `loot.ownVocationPercent` e, se der, troca pelo equivalente da vocação do personagem: mesmo espaço, nível igual
// ou um pouco menor. Item que serve a todos ("ALL") nunca é trocado. Ideia tirada do app Confrontation, onde item
// de classe que ninguém da companhia usa tem peso 0,2 no sorteio.
import { vocationAllowed } from './adventure';

export interface LootBlueprint { id: number; name: string; slot: string; vocations: string; minLevel: number; npcPrice: number }
/** O equivalente precisa ter pelo menos esta fração do nível do item que caiu; abaixo disso, a troca seria um rebaixamento. */
export const EQUIVALENT_LEVEL_FLOOR = 0.75;

/** O item que caiu precisa de troca? Só equipamento que a vocação não usa. */
export const needsAdapting = (dropped: Pick<LootBlueprint, 'vocations'>, vocation: string) => !vocationAllowed(dropped.vocations, vocation);

/**
 * O equivalente de `dropped` para `vocation` dentro de `catalog`, ou `null` se não houver um à altura.
 * Ordem: maior nível (sem passar do que caiu), depois o que é próprio da vocação (antes do "ALL"), depois o mais caro e o menor id.
 * Só entram itens à venda no catálogo (preço de loja maior que zero), para a troca nunca criar item exclusivo de missão ou de chefe.
 */
export function vocationEquivalent(dropped: LootBlueprint, vocation: string, catalog: readonly LootBlueprint[]): LootBlueprint | null {
  const floor = Math.floor(dropped.minLevel * EQUIVALENT_LEVEL_FLOOR);
  const options = catalog.filter(c => c.id !== dropped.id && c.slot === dropped.slot && c.npcPrice > 0
    && c.minLevel <= dropped.minLevel && c.minLevel >= floor && vocationAllowed(c.vocations, vocation));
  const own = (c: LootBlueprint) => c.vocations.split(',').map(v => v.trim()).includes('ALL') ? 0 : 1;
  options.sort((a, b) => b.minLevel - a.minLevel || own(b) - own(a) || b.npcPrice - a.npcPrice || a.id - b.id);
  return options[0] ?? null;
}
