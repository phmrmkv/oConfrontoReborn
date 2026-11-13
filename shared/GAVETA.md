# Gaveta `shared`
**Para que serve:** regras puras usadas pelo servidor E pela tela, para nunca divergirem. Sem banco, sem Express, sem React.

- `economy.ts` – motivos de ouro/item (fonte/ralo/transferência), configurações com limites, taxas, preços NPC, regras de melhoria (`upgradeSuccessPercent`, `resolveUpgrade`), `settingsConflict`.
- `adventure.ts` – vocações, regiões, jornada, promoção de classe.
- `binding.ts` – comércio limitado: os três estados do exemplar (livre, vincula ao equipar, vinculado), como chega o que cai (`bindingOnDrop`) e o texto da tela.
- `itemStats.ts` – atributos secundários dos equipamentos (dano crítico, roubo de vida, poder de cura, resistência a efeitos): nomes, tetos e texto para a tela.
- `loot.ts` – loot inteligente: quando cai equipamento de outra vocação, qual é o equivalente da vocação de quem caçou (`vocationEquivalent`).
- `rarity.ts` – raridade do exemplar (Comum a Mítico): orçamento de atributos de cada uma, quem tem raridade, sorteio do drop (`rollRarity`) e quanto vale no duelo.
- `forge.ts` – materiais do Ferreiro por faixa de nível, o que pode ser forjado, melhoria guardada ao reforjar e retorno ao desmontar.
- `progression.ts` – teto de nível (`MAX_LEVEL`), ganhos por nível, curva de XP do personagem (`expForLevel`) e curva-alvo de XP dos monstros. Ver `PLANO-NIVEIS.md`.
- `premium.ts` – benefícios, molduras, títulos, `layoutPeriods`.
- `permissions.ts` – cargos e permissões.

**Regras:** não importa `backend/` nem `frontend/` (verificado por `npm run check:drawers`). Valores em ouro são inteiros/BigInt. Mudou uma regra aqui? Rode `npm test` e os testes de integração.
