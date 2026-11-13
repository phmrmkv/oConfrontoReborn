// Prova da Vigília: a luta curta que o servidor calcula sozinho para os rankings do Confrontation.
//
// É a segunda escrita de `scripts/trial.gd` do app, passo a passo na mesma ordem: mesmos números de
// entrada, mesmos dados (um gerador próprio, semeado pelo andar), mesma soma, mesmo resultado. As regras
// vêm de `trialRules.json`, que o app exporta de `Data` (`-- --trial-export`); `trial.test.ts` confere
// este arquivo contra `trialVectors.json`, companhias montadas pelo jogo com o resultado que o jogo dá.
//
// Antes da conta, `legalCompany` tira o que o jogo não poderia ter feito (peça com linha acima da melhor
// rolagem, pontos a mais, licença fora de ordem). Sem banco e sem relógio: tudo entra por parâmetro.
//
// Mudou uma fórmula no app? Exporte de novo lá, copie os dois JSON para cá e rode os testes dos dois lados.
import rulesJson from './trialRules.json';

type Num = Record<string, number>;
export interface TrialRules {
  version: number;
  stats: string[];
  heroes: Record<string, Num & { class: any; ranged: any; element: any; promotes: any; heal?: any }>;
  creatures: Record<string, Num & { ranged: any; element: any; aspect: any; undead: any }>;
  point_inc: Num; power_weights: Num;
  cap_dodge: number; cap_block: number; cap_mitigation: number; armor_k: number; hero_resist: number;
  enchant_step: number; refine_step: number; refine_max: number;
  promote_level: number; promote_stats: number; max_level: number; points_per_level: number;
  licences: { type: string; stat: string; value: number; kind: string }[][];
  pets: Record<string, { bonus: string; amount: number }>;
  item_stats: Record<string, Record<string, number[]>>;
  rarities: { stat: number; lines: number }[];
  mod_roll_high: number; mod_level_from: number; mod_level_span: number; mod_level_cap: number; item_level_max: number;
  slots: string[]; slot_kind: Record<string, string>;
  elements: Record<string, string>; element_edge: number; undead_bane: string;
  trial: { enemies: string[]; hp_mult: number; damage_mult: number; base: number; step: number; seconds: number; max_floor: number };
}
/** As regras exportadas pelo app (cópia de `shared/online/trial_rules.json` de lá). */
export const trialRules = rulesJson as unknown as TrialRules;
/** Formato das regras que este arquivo sabe ler (`Trial.VERSION` no app). */
export const TRIAL_VERSION = 1;

// O gerador da luta (Park-Miller) e o traço dos golpes: os mesmos números de `scripts/trial.gd`.
const RNG_STEP = 48271, RNG_MOD = 2147483647, SEED_STEP = 7919, SEED_BASE = 104729;
const DIGEST_STEP = 31, DIGEST_MOD = 1000000007, CLIMB_STEP = 131;
/** Folga da conferência de uma linha de item contra a melhor rolagem: a runa multiplica a linha e arredonda no último dígito. */
const TOP_SLACK = 1e-9;

const own = (o: object, key: string) => Object.prototype.hasOwnProperty.call(o, key);
const isObject = (v: unknown): v is Record<string, any> => typeof v === 'object' && v !== null && !Array.isArray(v);
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
const text = (v: unknown) => (typeof v === 'string' ? v : '');

export interface LicenceStats { flat: Num; percent: Num }
/** O que as licenças compradas somam a cada herói (`Game._license_stat`). */
export function licenceStats(bought: Record<string, unknown>, r: TrialRules): LicenceStats {
  const out: LicenceStats = { flat: {}, percent: {} };
  r.licences.forEach((nodes, b) => nodes.forEach((node, i) => {
    if (!own(bought, `b${b}_${i}`) || node.type !== 'stat') return;
    const bucket = node.kind === 'flat' ? out.flat : out.percent;
    bucket[node.stat] = (bucket[node.stat] ?? 0) + node.value;
  }));
  return out;
}

/** A fração de vida que o mascote em campo dá (0 sem um que dê). */
export function petLife(pet: string, r: TrialRules): number {
  return own(r.pets, pet) && r.pets[pet].bonus === 'life' ? r.pets[pet].amount : 0;
}

/** Os números finais de um herói: `Game.stats_of`, na mesma ordem de contas. */
export function stats(m: Record<string, any>, licence: LicenceStats, life: number, r: TrialRules): Num {
  const d = r.heroes[String(m.key)];
  const flat: Num = {}, percent: Num = {};
  for (const s of r.stats) { flat[s] = 0; percent[s] = 0; }
  const gear = isObject(m.gear) ? m.gear : {}, enchant = isObject(m.enchant) ? m.enchant : {};
  for (const slot of Object.keys(gear)) {
    const it = gear[slot];
    const ench = 1 + r.enchant_step * num(enchant[slot]);
    const refined = 1 + r.refine_step * Math.trunc(num(it.plus));
    for (const mod of it.mods) if (own(flat, mod.stat)) flat[mod.stat] += num(mod.value) * ench * refined;
  }
  for (const k of Object.keys(licence.flat)) if (own(flat, k)) flat[k] += licence.flat[k];
  for (const k of Object.keys(licence.percent)) if (own(percent, k)) percent[k] += licence.percent[k];
  percent.max_hp += life;
  const alloc = isObject(m.alloc) ? m.alloc : {};
  const out: Num = {};
  for (const s of r.stats) {
    const base = d[s];
    let value = (base + flat[s]) * (1 + percent[s]);
    if (s === 'range' && !d.ranged) value = base;
    const points = Math.trunc(num(alloc[s]));
    if (s === 'attack_damage' || s === 'max_hp') for (let i = 0; i < points; i++) value += Math.max(1, value * r.point_inc[s]);
    else if (own(r.point_inc, s)) value += points * r.point_inc[s];
    out[s] = value;
  }
  out.crit_chance = Math.min(out.crit_chance, 1);
  out.dodge = Math.min(out.dodge, r.cap_dodge);
  out.block = Math.min(out.block, r.cap_block);
  if (m.promoted === true) { out.max_hp = out.max_hp * (1 + r.promote_stats); out.attack_damage = out.attack_damage * (1 + r.promote_stats); }
  return out;
}

/** Um lutador como a luta o vê: os números e o que um golpe precisa saber de quem dá ou leva. */
export type Fighter = Num & { key: any; ranged: any; element: any; aspect: any; undead: any; resist: number; heal?: any };

/** A companhia de um save: os heróis em campo, na ordem de marcha (`Trial.fighters`). Não confere nada: é a conta pura. */
export function fighters(save: Record<string, any>, r: TrialRules): Fighter[] {
  const licence = licenceStats(isObject(save.licenses) ? save.licenses : {}, r);
  const life = petLife(text(save.pet), r);
  const out: Fighter[] = [];
  for (const m of Array.isArray(save.members) ? save.members : []) {
    if (!isObject(m) || m.kind !== 'hero' || !m.in_field || !own(r.heroes, text(m.key))) continue;
    const d = r.heroes[m.key];
    const f = stats(m, licence, life, r) as Fighter;
    f.key = m.key; f.ranged = Boolean(d.ranged); f.element = d.element;
    f.aspect = text(isObject(m.gear) && isObject(m.gear.weapon) ? m.gear.weapon.aspect : '');
    f.undead = false; f.resist = r.hero_resist;
    if (d.heal) f.heal = d.heal;
    out.push(f);
  }
  return out;
}

/** Os inimigos de um andar: a batalha do chefe da última fase, mais forte a cada andar (`Trial.enemies`). */
export function enemies(level: number, r: TrialRules): Fighter[] {
  const t = r.trial;
  const harder = t.base + t.step * (level - 1);
  return t.enemies.map(key => {
    const c = r.creatures[key];
    return { ...c, key, max_hp: c.max_hp * t.hp_mult * harder, attack_damage: c.attack_damage * t.damage_mult * harder, resist: 0 } as unknown as Fighter;
  });
}

/** Quanto um golpe do elemento `mine` muda contra um alvo do elemento `theirs` (`Data.element_mult`). */
export function elementMult(mine: string, theirs: string, undead: boolean, r: TrialRules): number {
  if (!own(r.elements, mine)) return 1;
  if (mine === r.undead_bane) return undead ? 1 + r.element_edge : 1;
  if (!own(r.elements, theirs)) return 1;
  if (r.elements[mine] === theirs) return 1 + r.element_edge;
  if (r.elements[theirs] === mine) return 1 - r.element_edge;
  return 1;
}

/** O estado do gerador com que a luta de um andar começa. */
export const seedOf = (level: number) => (SEED_BASE + level * SEED_STEP) % (RNG_MOD - 1) + 1;

export interface FightResult { won: boolean; time: number; blows: number; standing: number; digest: number }
/** Uma luta da companhia contra os inimigos de um andar (`Trial.fight`). */
export function fight(company: Fighter[], level: number, r: TrialRules): FightResult {
  const all = [...company, ...enemies(level, r)];
  const count = all.length, ours = company.length, limit = r.trial.seconds;
  const hp: number[] = [], top: number[] = [], strikeAt: number[] = [], strikeEvery: number[] = [];
  const healAt: number[] = [], healEvery: number[] = [], pastArmor: number[] = [], pastResist: number[] = [];
  for (const f of all) {
    hp.push(f.max_hp); top.push(f.max_hp);
    strikeEvery.push(f.attack_speed > 0 ? 1 / f.attack_speed : Infinity);
    strikeAt.push(f.attack_speed > 0 ? 1 / f.attack_speed : Infinity);
    healEvery.push(f.heal ? f.heal.every : Infinity);
    healAt.push(f.heal ? f.heal.every : Infinity);
    pastArmor.push(1 - Math.min(f.armor / (f.armor + r.armor_k), r.cap_mitigation));
    pastResist.push(1 - f.resist);
  }
  let state = seedOf(level), digest = 0, blows = 0, clock = 0, standing = ours, facing = count - ours;
  while (standing > 0 && facing > 0) {
    // Quem age agora: o golpe ou a cura mais cedo; no empate, o primeiro encontrado.
    let who = -1, when = Infinity, healing = false;
    for (let i = 0; i < count; i++) {
      if (hp[i] <= 0) continue;
      if (strikeAt[i] < when) { when = strikeAt[i]; who = i; healing = false; }
      if (healAt[i] < when) { when = healAt[i]; who = i; healing = true; }
    }
    if (who < 0 || when > limit) break;
    clock = when; blows++;
    const actor = all[who];
    if (healing) {
      healAt[who] += healEvery[who];
      let worst = -1;
      for (let i = 0; i < ours; i++) if (hp[i] > 0 && hp[i] < top[i] && (worst < 0 || hp[i] / top[i] < hp[worst] / top[worst])) worst = i;
      if (worst >= 0) {
        const amount = actor.attack_damage * actor.heal.mult;
        hp[worst] = Math.min(top[worst], hp[worst] + amount);
        digest = (digest * DIGEST_STEP + Math.floor(amount * 100)) % DIGEST_MOD;
      }
      continue;
    }
    strikeAt[who] += strikeEvery[who];
    let target = -1;
    if (who < ours) { for (let i = ours; i < count; i++) if (hp[i] > 0) { target = i; break; } }
    else { for (let i = 0; i < ours; i++) if (hp[i] > 0) { target = i; break; } }
    const taker = all[target];
    // `Game.resolve_hit`, com o gerador da luta na mesma ordem: esquiva, crítico, bloqueio.
    state = state * RNG_STEP % RNG_MOD;
    if (state / RNG_MOD < taker.dodge) { digest = digest * DIGEST_STEP % DIGEST_MOD; continue; }
    let damage = actor.attack_damage;
    state = state * RNG_STEP % RNG_MOD;
    if (state / RNG_MOD < actor.crit_chance) damage *= actor.crit_damage;
    state = state * RNG_STEP % RNG_MOD;
    if (state / RNG_MOD < taker.block) damage *= 0.5;
    damage *= elementMult(String(actor.aspect), String(taker.aspect), Boolean(taker.undead), r);
    damage *= actor.element === 'phys' ? pastArmor[target] : pastResist[target];
    damage = Math.max(1, damage);
    hp[target] -= damage;
    digest = (digest * DIGEST_STEP + Math.floor(damage * 100)) % DIGEST_MOD;
    if (hp[target] <= 0) { if (target < ours) standing--; else facing--; }
  }
  return { won: facing === 0 && standing > 0, time: clock, blows, standing, digest };
}

export interface ClimbResult { floor: number; fights: number; digest: number }
/**
 * Até onde uma companhia sobe (`Trial.climb`). O caminho faz parte da regra, para os dois lados andarem
 * igual: andares 1, 2, 4, 8... até perder um (ou vencer o teto), depois ao meio entre o último vencido e o perdido.
 */
export function climb(company: Fighter[], r: TrialRules): ClimbResult {
  const out: ClimbResult = { floor: 0, fights: 0, digest: 0 };
  if (!company.length) return out;
  const tries = (level: number) => {
    const result = fight(company, level, r);
    out.fights++;
    out.digest = (out.digest * CLIMB_STEP + result.digest + level) % DIGEST_MOD;
    return result.won;
  };
  const top = r.trial.max_floor;
  let won = 0, lost = 0, level = 1;
  while (lost === 0 && won < top) {
    if (tries(level)) { won = level; level = Math.min(level * 2, top); } else lost = level;
  }
  while (lost - won > 1) {
    level = Math.floor((won + lost) / 2);
    if (tries(level)) won = level; else lost = level;
  }
  out.floor = won;
  return out;
}

/** O poder da companhia: soma, por herói em campo, de `Game.member_power` (pesos × números finais, arredondado). */
export function power(company: Fighter[], r: TrialRules): number {
  let total = 0;
  for (const f of company) {
    let one = 0;
    for (const s of r.stats) one += (r.power_weights[s] ?? 0) * f[s];
    total += Math.round(one);
  }
  return total;
}

/** O maior valor que uma linha pode ter numa peça desse tipo, nível e raridade: a melhor rolagem do jogo (`Trial.mod_top`). */
export function modTop(kind: string, stat: string, level: number, rarity: number, r: TrialRules): number {
  const [low, high] = r.item_stats[kind][stat];
  const f = Math.min(Math.max((level - r.mod_level_from) / r.mod_level_span, 0), r.mod_level_cap);
  const base = low + (high - low) * f;
  return base * r.rarities[rarity].stat * r.mod_roll_high;
}

const wholeIn = (v: unknown, min: number, max: number) => typeof v === 'number' && Number.isInteger(v) && v >= min && v <= max;

/** A peça como o jogo poderia tê-la feito para esse herói nesse lugar, ou `null`. */
function legalItem(it: unknown, slot: string, heroClass: string, heroLevel: number, r: TrialRules): Record<string, any> | null {
  if (!isObject(it) || !own(r.slot_kind, slot) || it.kind !== r.slot_kind[slot] || !own(r.item_stats, text(it.kind))) return null;
  if (!wholeIn(it.level, 1, Math.min(heroLevel, r.item_level_max)) || !wholeIn(it.rarity, 0, r.rarities.length - 1)) return null;
  if (it.class !== 'Universal' && it.class !== heroClass) return null;
  const table = r.item_stats[it.kind];
  if (!Array.isArray(it.mods) || it.mods.length > Math.min(2 + r.rarities[it.rarity].lines, Object.keys(table).length)) return null;
  const seen = new Set<string>();
  const mods: { stat: string; value: number }[] = [];
  for (const mod of it.mods) {
    if (!isObject(mod) || typeof mod.stat !== 'string' || !own(table, mod.stat) || seen.has(mod.stat)) return null;
    if (typeof mod.value !== 'number' || !Number.isFinite(mod.value) || mod.value < 0) return null;
    if (mod.value > modTop(it.kind, mod.stat, it.level, it.rarity, r) * (1 + TOP_SLACK)) return null;
    seen.add(mod.stat);
    mods.push({ stat: mod.stat, value: mod.value });
  }
  const plus = Math.min(Math.max(Math.trunc(num(it.plus)), 0), r.refine_max);
  // O elemento só existe em arma forjada; um nome que o jogo não conhece vale como nenhum.
  const aspect = slot === 'weapon' && own(r.elements, text(it.aspect)) ? it.aspect : '';
  return { kind: it.kind, level: it.level, rarity: it.rarity, class: it.class, mods, plus, aspect };
}

export interface LegalCompany { save: { members: Record<string, any>[]; licenses: Record<string, true>; pet: string }; rejected: number }
/**
 * A companhia de um save só com o que o jogo poderia ter feito. Não confia em nada do que chega:
 * - herói desconhecido, repetido ou fora de campo fica de fora;
 * - nível entre 1 e o máximo; pontos gastos acima de (nível − 1) × pontos por nível contam como nenhum;
 * - encantamento até o nível do herói; refino até o máximo; promoção só de quem pode e do nível certo;
 * - peça fora do lugar, de outra classe, de nível acima do herói ou com linha acima da melhor rolagem não conta (`rejected`);
 * - licenças só em ordem dentro de cada ramo; mascote só se for um dos comprados.
 */
export function legalCompany(save: unknown, r: TrialRules = trialRules): LegalCompany {
  const data = isObject(save) ? save : {};
  const licenses: Record<string, true> = {};
  const bought = isObject(data.licenses) ? data.licenses : {};
  r.licences.forEach((nodes, b) => { for (let i = 0; i < nodes.length && own(bought, `b${b}_${i}`) && bought[`b${b}_${i}`] === true; i++) licenses[`b${b}_${i}`] = true; });
  const pet = own(r.pets, text(data.pet)) && Array.isArray(data.pets) && data.pets.includes(data.pet) ? data.pet as string : '';
  const members: Record<string, any>[] = [];
  const seen = new Set<string>();
  let rejected = 0;
  for (const m of Array.isArray(data.members) ? data.members : []) {
    if (!isObject(m) || m.kind !== 'hero' || m.in_field !== true || typeof m.key !== 'string' || !own(r.heroes, m.key) || seen.has(m.key)) continue;
    seen.add(m.key);
    const hero = r.heroes[m.key];
    const level = Math.min(Math.max(Math.trunc(num(m.level)), 1), r.max_level);
    const given = isObject(m.alloc) ? m.alloc : {};
    let spent = 0, valid = true;
    for (const stat of Object.keys(given)) {
      if (!own(r.point_inc, stat) || !wholeIn(given[stat], 0, r.max_level * r.points_per_level)) { valid = false; break; }
      spent += given[stat];
    }
    const alloc = valid && spent <= (level - 1) * r.points_per_level ? { ...given } : {};
    const gear: Record<string, any> = {}, enchant: Num = {};
    const worn = isObject(m.gear) ? m.gear : {}, charms = isObject(m.enchant) ? m.enchant : {};
    for (const slot of Object.keys(worn)) {
      const it = legalItem(worn[slot], slot, hero.class, level, r);
      if (!it) { rejected++; continue; }
      gear[slot] = it;
      enchant[slot] = Math.min(Math.max(Math.trunc(num(charms[slot])), 0), level);
    }
    members.push({ kind: 'hero', key: m.key, in_field: true, level, alloc, gear, enchant, promoted: m.promoted === true && Boolean(hero.promotes) && level >= r.promote_level });
  }
  return { save: { members, licenses, pet }, rejected };
}

export interface TrialResult extends ClimbResult { power: number; rejected: number }
/** A Prova de um save: confere a companhia, soma o poder e sobe os andares. Nunca lança: save estranho dá andar 0. */
export function runTrial(save: unknown, r: TrialRules = trialRules): TrialResult {
  const legal = legalCompany(save, r);
  const company = fighters(legal.save, r);
  return { ...climb(company, r), power: power(company, r), rejected: legal.rejected };
}
