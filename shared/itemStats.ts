// Atributos secundários dos equipamentos (plano de itens, Fase 1). Cada item pode somar um pouco de cada um;
// o total do personagem é feito só em backend/src/game/combatStats.ts, com os tetos abaixo, e usado pelos motores de combate.
// Valor zero não muda nada: sem esses atributos, o combate é exatamente o de antes (nenhum dado a mais é rolado).
// Regeneração de mana ficou de fora de propósito: as habilidades custam de 10 a 35 de mana e a mana máxima passa de mil
// cedo, então ela quase nunca acaba e o atributo não mudaria nada.
export const secondaryStats = [
  { key: 'critDamage', label: 'Dano crítico', short: 'Dano crítico', cap: 100,
    help: 'Soma ao dano do golpe crítico, que normalmente é 1,5 vez o golpe comum. Com +50%, o crítico vira 2 vezes.' },
  { key: 'lifeSteal', label: 'Roubo de vida', short: 'Roubo de vida', cap: 10,
    help: 'Parte do dano que você causa volta como vida, até essa mesma porcentagem da sua vida máxima por golpe.' },
  { key: 'healPower', label: 'Poder de cura', short: 'Cura', cap: 50,
    help: 'Aumenta a vida recuperada pela habilidade de cura.' },
  { key: 'statusResistance', label: 'Resistência a efeitos', short: 'Resist. a efeitos', cap: 60,
    help: 'Chance de evitar veneno, queimadura e lentidão quando a criatura tenta deixá-los em você.' },
] as const;
export type SecondaryStat = typeof secondaryStats[number]['key'];
export const secondaryCap = Object.fromEntries(secondaryStats.map(s => [s.key, s.cap])) as Record<SecondaryStat, number>;
/** Os atributos secundários diferentes de zero de um item ou personagem, prontos para mostrar ("Dano crítico +15%"). */
export function describeSecondary(source: Partial<Record<SecondaryStat, number | null | undefined>>): string[] {
  return secondaryStats.filter(s => (source[s.key] ?? 0) > 0).map(s => `${s.label} ${s.key === 'critDamage' || s.key === 'healPower' ? '+' : ''}${source[s.key]}%`);
}
