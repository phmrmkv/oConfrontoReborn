// Arte própria dos itens: GIFs animados de 128 px em public/assets/items, ligados pelo nome do arquivo.
// A lista do que existe (itemArt.json) é escrita por `npm run art`, que o build roda antes: salvar o GIF com o
// nome do item basta. Quem ainda não tem figura mostra um quadrinho com as iniciais (ui/GameIcon.tsx decide).
import art from './itemArt.json';

const files = new Set<string>(art.files);
/** Os itens que têm GIF próprio, pelo nome do arquivo, em ordem alfabética (para a Biblioteca de ícones). */
export const itemArtFiles: readonly string[] = art.files;

/** O nome do arquivo de um item: minúsculas, sem acento, com hífen. "Crossbow da 1ª Era" → "crossbow-da-1-era". */
export const itemFile = (name: string) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[ªº]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** O item-base de uma variante das Eras ou de Capriel: "Crossbow da 1ª Era" → "Crossbow". */
export const baseItem = (name: string) => name.replace(/ (?:da \dª Era|de Capriel)$/, '');

/**
 * O GIF próprio de um item, ou `null` se ainda não existe. Uma variante sem figura usa a do item-base,
 * como já fazia com o sprite antigo. `has` existe para os testes (padrão: a lista gravada pelo build).
 */
export function itemArt(name: string, has: (file: string) => boolean = f => files.has(f)): string | null {
  for (const candidate of [name, baseItem(name)]) {
    const file = itemFile(candidate);
    if (file && has(file)) return `/assets/items/${file}.gif`;
  }
  return null;
}

/** Um item do catálogo sem GIF com o próprio nome: o arquivo que falta e a figura que ele usa enquanto isso. */
export type MissingArt<T> = T & { file: string; borrowed: string | null };

/**
 * O que falta no lote de arte: os itens do catálogo sem GIF com o próprio nome, na ordem recebida. `borrowed` é a
 * figura do item-base que uma variante usa enquanto não tem a sua, ou `null` (aparece com o sprite antigo).
 */
export function missingArt<T extends { name: string }>(items: readonly T[], has: (file: string) => boolean = f => files.has(f)): MissingArt<T>[] {
  return items.filter(item => !has(itemFile(item.name))).map(item => ({ ...item, file: itemFile(item.name), borrowed: itemArt(item.name, has) }));
}

/** Os GIFs cujo nome não é o de nenhum item do catálogo (nome digitado errado, ou item que saiu do jogo). */
export function strayArt(gifs: readonly string[], items: readonly { name: string }[]): string[] {
  const known = new Set(items.map(item => itemFile(item.name)));
  return gifs.filter(file => !known.has(file));
}
