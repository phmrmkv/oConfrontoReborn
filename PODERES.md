# Poderes da luta: o que existe e o que pode entrar

Avaliação de 2026-11-13 (pedido do dono: "na luta avalie mais poderes pra ser usado"). Os 5 poderes abaixo já estão na caçada solo (`shared/powers.ts`, `core/engine.ts`); duelo e Caçada em grupo seguem sem eles. `npm run powers:simulate` compara a caçada com e sem eles: a vitória não muda, as lutas ficam 1 a 2,5 turnos mais longas com o uso ingênuo, e o Arqueiro passa a vencer mais os chefes de nível 36 a 40.

## O que existe hoje (caçada solo e duelo)
Sete ações iguais para todas as vocações; só o nome dos dois especiais muda. O único limite é a mana, que não volta durante a luta.

| Ação | Cavaleiro | Arqueiro | Feiticeiro | Druida | Efeito |
|---|---|---|---|---|---|
| Ataque | Atacar | Disparar | Rajada | Rajada | dano ×1 |
| Especial 1 | Golpe brutal | Tiro preciso | Explosão | Espinhos | dano ×1,85 (12–15 MP) |
| Especial 2 | Fúria berserker | Salva de flechas | Tempestade | Fúria natural | dano ×2,75 (28–35 MP) |
| Curar | igual | igual | igual | só a do Druida limpa efeitos | 25–45% da vida (14–20 MP) |
| Defender | igual | igual | igual | igual | defesa ×2,5 e dano ×0,5 (10 MP) |
| Interromper | igual | igual | igual | igual | cancela o golpe pesado do chefe (12 MP) |
| Fugir | igual | igual | igual | igual | sai da luta |

Na Caçada em grupo já há poderes de vocação (Segurar, Mirar o ponto fraco, Curar o grupo, Quebrar selo), que não existem na caçada solo nem no duelo.

**O que a luta tem e o jogador não usa:** veneno, queimadura e lentidão (só as criaturas causam), e nenhum jeito de recuperar mana. Os dois especiais de cada vocação são só "mais dano", então a escolha na luta é quase sempre a mesma.

## Proposta: um poder próprio por vocação e um para todos
Cada um usa uma peça que o motor já tem, para dar escolha de verdade sem inventar sistema novo.

| Poder | Quem | Mana | O que faz | Por que |
|---|---|---|---|---|
| **Grito de guerra** | Cavaleiro | 15 | 2 turnos com dano ×1,3 e defesa ×1,2 | o Cavaleiro aguenta mais, mas não tem como se preparar para o chefe |
| **Flecha envenenada** | Arqueiro | 12 | dano ×0,8 e envenena a criatura (3% da vida dela por turno, 3 turnos) | primeiro efeito que o jogador aplica; bom contra criatura de muita vida |
| **Raio congelante** | Feiticeiro | 18 | dano ×1,2 e deixa a criatura lenta (2 turnos com 20% menos dano) | o Feiticeiro é o mais frágil (defesa ×0,85) e precisa de um jeito de se proteger atacando |
| **Raízes** | Druida | 22 | a criatura perde o próximo ataque; não funciona em chefe com golpe pesado anunciado (aí é Interromper) | controle, que combina com a vocação da natureza |
| **Meditar** | todos | 0 | recupera 25% da mana máxima e defende com ×1,5 nesse turno | hoje a mana só acaba; dá um respiro em lutas longas e contra chefe |

Regras para não quebrar o equilíbrio: efeito do jogador na criatura não acumula (repetir só renova a duração); chefe resiste a metade da duração; no duelo, Raízes e lentidão valem só 1 rodada. Cada poder novo precisa passar pelo simulador (`npm run duel:simulate`, `levels:simulate`) antes de entrar.

## Arte
Ícone próprio para cada ação (os 8 especiais de hoje, Interromper e os 5 poderes novos), gerado no gerador local a partir do estilo dos GIFs de itens. Ficam em `art/powers/` (originais) e `frontend/public/assets/powers/` (versão de site). Os botões de habilidade passam a usar esses ícones quando existem.
