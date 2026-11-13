# Gaveta `confrontation`

**Para que serve:** O servidor do app **Confrontation** (Godot, idle de celular, repositório `C:\Users\phsil\Aplicativos\confrontation`): entrada por token, save na nuvem, validação do progresso idle e rankings. O combate idle roda no aparelho; aqui o servidor **guarda e confere**, nunca confia no número cru. A Vigília e o poder dos rankings ele **calcula sozinho**, da companhia que vem no save (a Prova da Vigília).

## Arquivos
- `syncRules.ts` – regras puras (com testes em `syncRules.test.ts`): ler o progresso de um save, tetos por hora (`capProgress`), corte do ouro (`withGoldCut`), semana ISO, métricas de ranking
- `trial.ts` – a **Prova da Vigília** (com testes em `trial.test.ts`): confere a companhia do save (`legalCompany`), soma o poder e faz a luta andar por andar (`runTrial`). É a segunda escrita de `scripts/trial.gd` do app, passo a passo na mesma ordem
- `trialRules.json` e `trialVectors.json` – **cópias** do que o app exporta (`shared/online/` de lá): as regras lidas de `Data` e companhias montadas pelo jogo com o resultado que o jogo dá. Nunca editar à mão
- `appAuth.ts` – entrar, criar conta e sair pelo app; `appAuthenticate` (Bearer) e `appOptionalAuth`
- `cloudService.ts` – `putSave` (envio com tetos, conta travada por `lockAccount`), `loadSave`, `saveInfo`, `rankings`
- `appRoutes.ts` – rotas em `/api/app` (montadas em `server.ts` **antes** de `protectOrigin` e do limite de 16 KB)

## Rotas (`/api/app`)
| Rota | O quê |
|---|---|
| `POST /auth/login` `{email,password}` | Token (64 hex), validade e nome. Mesmas contas e senhas do site. |
| `POST /auth/register` `{email,password,name}` | Cria conta e primeiro personagem como o site (201 + token). E-mail já usado: 202 sem token (não revela a conta). |
| `POST /auth/logout` | Apaga o token. |
| `POST /auth/forgot-password` `{email}` | Mesmo pedido do site (`requestPasswordReset`): resposta igual exista a conta ou não; o link do e-mail abre a página de nova senha do site. |
| `POST /account/delete` `{password}` | Apaga a conta (`account/accountDeletion.ts`). Pede a senha de novo. |
| `GET /me` | Nome e resumo do save na nuvem (versão, data, números verificados). |
| `GET /save` / `PUT /save` `{baseVersion,data,force?}` | Baixa / envia o save. Versão diferente da nuvem = 409 (outro aparelho), a menos que `force`. A resposta do envio traz `trial: {floor, power, rejected}`: o andar da Prova, o poder e quantas peças vestidas não contaram. O `summary` que o app antigo manda não é lido. |
| `GET /rankings?metric=vigil\|power\|stage&period=all\|week&page=N` | 10 por página, com a posição de quem pediu (token opcional). |

Todas sem cookie, sem `Origin` e sem `X-Game-Client`: o token vai em `Authorization: Bearer …`, e um site estranho não consegue mandá-lo sozinho (sem CSRF). Corpo até 512 KB; save até 450.000 caracteres.

## Como a validação funciona
- O token é uma linha da tabela `Session` (a mesma do cookie): redefinir a senha e o banimento derrubam o app também. Validade `confrontation.sessionDays`, renovada com o uso.
- Cada conta tem um **registro verificado** (`ConfrontationSave`: ouro total, XP total, itens, fase mais longe, Vigília, poder). Um envio só pode crescer cada número até `teto por hora × horas desde o último envio aceito`, pelo **relógio do servidor**. O primeiro envio vale `confrontation.firstSyncHours` (progresso feito antes da conta).
- Ouro e XP têm teto que cresce com a fase (`confrontation.stageGrowthPercent`), porque as fases novas pagam mais. A Vigília só conta depois de `confrontation.maxStage`.
- Passou do teto: entra o teto, o envio fica registrado em `ConfrontationSync` (o que o app disse, o que entrou, o que foi cortado). **O ouro cortado sai do save** (ouro em mãos e `counters.gold`) e a resposta devolve o save corrigido para o app usar; O ouro em mãos também nunca passa do total ganho na vida que o servidor aceitou (no jogo todo ouro entra pelo total; mais que isso só num save editado). XP, itens, fase, Vigília e poder ficam no save como estavam, mas o registro e o ranking só têm o valor verificado (o resto entra aos poucos, no ritmo do teto).
- Rankings (`ConfrontationRank`): o melhor valor verificado de cada conta, geral (`all`) e por semana ISO em UTC. Empate: quem chegou antes fica na frente.
- **Vigília e poder não vêm do app.** A cada envio o servidor monta a companhia do save (heróis em campo, na ordem de marcha) e calcula os dois em `trial.ts`:
  - *Poder*: os números de cada herói pela fórmula do jogo (`Game.stats_of`: itens × encantamento × refino, licenças, mascote, pontos, promoção) vezes os pesos do jogo.
  - *Prova da Vigília*: a companhia enfrenta a batalha do chefe da última fase; cada andar deixa os inimigos 10% mais fortes; vale o andar mais alto vencido. Cada lutador bate a cada `1 / velocidade` segundos no primeiro inimigo de pé, com a conta de golpe do jogo (esquiva, crítico, bloqueio, elemento, armadura). O Druida cura. Sem especiais, poções nem mascote; luta que passa de 120 s está perdida. Os dados da luta saem do número do andar: a mesma companhia dá sempre o mesmo resultado.
  - *Conferência* (`legalCompany`): peça com linha acima da melhor rolagem do jogo para o tipo, nível e raridade, fora do lugar, de outra classe ou de nível acima do herói **não conta** (`rejected`, gravado em `ConfrontationSync.claimed`); pontos gastos acima do que o nível deu contam como nenhum; encantamento até o nível, refino até o máximo, licenças só em ordem, mascote só comprado.
  - O andar só entra para quem chegou à última fase (`confrontation.maxStage`); antes disso a Vigília é 0, sem aviso.
  - Os tetos por hora continuam valendo para os dois, mas partem do **melhor já aceito da conta** (linha `all` do ranking): a companhia muda de um envio para o outro (herói em expedição), e voltar aonde já esteve não é cortado.
- Dois envios ao mesmo tempo: a conta é travada; o segundo vê a versão nova e recebe conflito.

## Fora desta gaveta (decisões que ficam para depois)
- **O ouro do app não entra no ouro dos personagens do site.** Nada muda de dono entre os dois jogos nesta fase, por isso não há lançamento em `addGold`/`recordGold`. Juntar as moedas (plano de união, "Moeda: uma só") precisa de uma taxa de conversão decidida pelo dono, e aí entra uma razão nova no extrato.
- Os tetos padrão de ouro, XP, itens, fase e Vigília são generosos e **não foram medidos** com simulação do app (o de ouro fica largo de propósito: ouro cortado sai do save do jogador). O de poder foi medido no app em 12/11/2026: uma companhia começa com cerca de 500 de poder, seis heróis sem itens têm 2.900, com itens de raridade média 10.800 e no máximo do jogo cerca de 130.000; por isso 3.000 por hora ou 25% por hora, e 48 h no primeiro envio (144.000). Ajuste no painel da Equipe, grupo "Confrontation (app)".
- **Limites da Prova, ditos às claras.** Ela mede os números da companhia, não a jogada: não tem especiais, golpes dos inimigos, poções, mascote que morde nem herói que se levanta. Um save editado com tudo no máximo que o jogo permite passa na conferência: o servidor sabe que a peça *poderia* existir, não que o jogador a ganhou (para isso os itens teriam de nascer no servidor, cartão "Mercado entre jogadores"). Quem compra herói, licença ou mascote também não é conferido contra pagamento.
- Arena (desafiar a companhia de outro jogador) e prêmios da semana ficam para as próximas etapas; a luta de `trial.ts` é a base das duas.

## Dependências permitidas
Depende de `core`, `economy` (só regras de `shared/economy.ts`), `game` (criar o primeiro personagem) e `account` (`digest`, `activeBan`, `validPassword`, `sendVerification`). Fica entre `account` e `admin`.

## Regras que não podem quebrar
Resposta uniforme no login e no cadastro (sem enumerar e-mails). Tetos só de `loadSettings`. Todo envio dentro de uma transação com `lockAccount`. Migração aditiva (`202611120001_confrontation_cloud`). Poder e Vigília nunca lidos do app. `trial.ts` e `scripts/trial.gd` do app mudam **juntos**: mudou uma fórmula lá, exporte de novo (`-- --trial-export shared/online`), copie os dois JSON para cá e rode os testes dos dois lados; `trial.test.ts` falha se as duas escritas derem resultados diferentes.

## Testes
`npm test` (`syncRules.test.ts`, `trial.test.ts`) e `npm run test:integration` (`backend/tests/confrontation-integration.ts`, base `_test`).

## Modelo de prompt de manutenção
```
Leia GAVETAS.md e backend/src/confrontation/GAVETA.md.
Tarefa: <descreva em uma frase o que mudar>.
Escopo: somente a gaveta confrontation (e shared/ se for regra compartilhada). Não renomeie rotas, props, colunas nem funções públicas.
Antes de editar: mostre o plano em passos curtos e espere eu aprovar. Trabalhe em uma branch.
Depois: rode npm run check, npm test, npm run check:drawers e backend/tests/confrontation-integration.ts (base *_test). Se mexer em trial.ts, mexa igual em scripts/trial.gd do app e exporte os vetores de novo.
Entregue: o que mudou, o que NÃO conseguiu verificar e uma lista separada de bugs vistos fora do escopo (não corrija).
```
