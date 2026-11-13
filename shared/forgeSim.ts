// Simulador do Ferreiro: calcula, SEM sorteio, quanto custa em média chegar ao +10 (ou a outro alvo).
// Usa exatamente as mesmas regras do jogo (upgradeSuccessPercent / upgradeBreakPercent).
import { UpgradeRules, upgradeBreakPercent, upgradeSuccessPercent, resolveUpgrade, upgradeFailBonus, upgradeFailCap } from './economy';

export interface ForgeAnalysis {
  target: number;
  /** Chance de um mesmo item chegar ao alvo sem nunca quebrar (0..1). */
  survivalChance: number;
  /** Ouro esperado (item inicial + melhorias + reposição dos itens quebrados, partindo de um item +0 novo. */
  expectedGold: number;
  /** Itens-base esperados para queimar (inclui o primeiro) até conseguir 1 item no alvo. */
  expectedItemsUsed: number;
  /** Tentativas esperadas de melhoria. */
  expectedAttempts: number;
  /** Por nível: chances e custo esperado para sair dele. */
  /** `bestSuccessPct`: a chance no teto da ajuda das falhas seguidas. */
  steps: { tier: number; successPct: number; breakPct: number; failKeepPct: number; cost: number; bestSuccessPct: number }[];
}

/** Valor esperado de um "custo" somado a cada tentativa (attemptCost) e a cada item quebrado (lossCost), até o alvo.
 * Cada estado é (nível, falhas seguidas naquele nível): com a falha que acumula chance (upgrade.failBonus*), a chance
 * de sucesso depende das falhas. Item quebrado recomeça do +0 com item novo e sem falhas (E0). Sem a ajuda, só há
 * o estado de zero falhas por nível e a conta é a antiga. Cada valor é guardado como a + k·E0 e resolvido de trás para frente. */
function expected(rules: UpgradeRules, target: number, attemptCost: (tier: number) => number, lossCost: number): number {
  const cap = upgradeFailCap(rules);
  let nextA = 0, nextK = 0; // E[alvo] = 0
  for (let t = target - 1; t >= 0; t--) {
    const at = (f: number) => { const p = upgradeSuccessPercent(t, rules.safeUntilTier, upgradeFailBonus(f, rules)) / 100, b = upgradeBreakPercent(t, rules, f) / 100; return { p, b, q: 1 - p - b }; };
    // No teto de falhas, falhar volta para o mesmo estado: E = (custo + b·perda + p·E[t+1]) / (p + b).
    const top = at(cap);
    let a = (attemptCost(t) + top.b * lossCost + top.p * nextA) / (top.p + top.b), k = (top.b + top.p * nextK) / (top.p + top.b);
    for (let f = cap - 1; f >= 0; f--) {
      const s = at(f);
      [a, k] = [attemptCost(t) + s.b * lossCost + s.p * nextA + s.q * a, s.b + s.p * nextK + s.q * k];
    }
    nextA = a; nextK = k;
  }
  return nextA / (1 - nextK);
}

/** Chance de um item sair do nível `tier` para o seguinte sem quebrar, começando sem falhas. */
function survive(rules: UpgradeRules, tier: number): number {
  const cap = upgradeFailCap(rules), at = (f: number) => { const p = upgradeSuccessPercent(tier, rules.safeUntilTier, upgradeFailBonus(f, rules)) / 100, b = upgradeBreakPercent(tier, rules, f) / 100; return { p, b, q: 1 - p - b }; };
  const top = at(cap);
  let s = top.p / (top.p + top.b);
  for (let f = cap - 1; f >= 0; f--) { const x = at(f); s = x.p + x.q * s; }
  return s;
}

export function analyzeForge(rules: UpgradeRules, target: number, upgradeCost: (tier: number) => number, baseItemCost: number): ForgeAnalysis {
  if (!Number.isInteger(target) || target < 1 || target > 10) throw new RangeError('Alvo inválido.');
  let survival = 1;
  const steps: ForgeAnalysis['steps'] = [];
  for (let t = 0; t < target; t++) {
    const p = upgradeSuccessPercent(t, rules.safeUntilTier), b = upgradeBreakPercent(t, rules);
    survival *= survive(rules, t);
    steps.push({ tier: t, successPct: p, breakPct: b, failKeepPct: 100 - p - b, cost: upgradeCost(t), bestSuccessPct: upgradeSuccessPercent(t, rules.safeUntilTier, upgradeFailBonus(upgradeFailCap(rules), rules)) });
  }
  return {
    target, survivalChance: survival, steps,
    expectedGold: baseItemCost + expected(rules, target, upgradeCost, baseItemCost),
    expectedItemsUsed: 1 + expected(rules, target, () => 0, 1),
    expectedAttempts: expected(rules, target, () => 1, 0),
  };
}

/** Conferência por sorteio: usa resolveUpgrade de verdade. rng deve devolver [0,1). */
export function monteCarloForge(rules: UpgradeRules, target: number, upgradeCost: (tier: number) => number, baseItemCost: number, runs: number, rng: () => number) {
  let gold = 0, items = 0, attempts = 0;
  const roll = () => 1 + Math.floor(rng() * 100);
  for (let r = 0; r < runs; r++) {
    items++; gold += baseItemCost; let tier = 0, fails = 0;
    while (tier < target) {
      gold += upgradeCost(tier); attempts++;
      const o = resolveUpgrade(tier, rules, roll(), roll(), fails);
      if (o === 'SUCCESS') { tier++; fails = 0; }
      else if (o === 'BROKE') { tier = 0; fails = 0; items++; gold += baseItemCost; }
      else fails++;
    }
  }
  return { expectedGold: gold / runs, expectedItemsUsed: items / runs, expectedAttempts: attempts / runs };
}
