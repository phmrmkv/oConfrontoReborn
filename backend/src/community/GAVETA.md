# Gaveta `community`

**Para que serve:** Comunidade: perfil público do personagem (imagem da galeria, descrição), recados, depoimentos com aprovação, amizades, visitas e denúncias. O fórum, o ranking, as guildas e a lista de amigos entram aqui também.

## Arquivos
- `communityService.ts` – regras de perfil, recados, depoimentos, amizades, visitas e denúncias
- `communityRoutes.ts` – rotas `/community/*`, `/forum*` e `/characters/:id/{community,forum}/*`
- `rankingService.ts` – ranking geral (aba Ranking): Nível ou Honra, filtro de vocação e de classe, páginas de 10 e a posição de quem olha
- `guildService.ts` – guildas (estilo fórum antigo): criar, pedido de entrada e convite, cargos Líder/Vice-líder/Membro, expulsar, passar a liderança, dissolver e o quadro interno (tópicos e respostas, só para membros)
- `guildRoutes.ts` – rotas `/guilds*`, `/characters/:id/guild*` (inclui benefícios, doação e baús) e `/characters/:id/friends`
- `friendsService.ts` – lista de amigos com última visita, online e guilda (só leitura)
- `forumService.ts` – fórum: tópicos, comentários (um nível de resposta), votos, resolvido, apagar o próprio

## Rotas
`GET /ranking?board=LEVEL|HONOR&vocation=&tier=&page=&as=<id>` (regras em `shared/ranking.ts`; nunca por ouro; sem fama escondida, conta apagada nem equipe).
`GET /community/profiles/:nome?as=<id>`, `GET /community/search?q=`, `GET /characters/:id/community`, `POST /characters/:id/community/{profile,scraps,testimonials,friends,report,block,unblock}` e ações por id.

`GET /guilds?q=&page=` (diretório), `GET /guilds/:gid?as=<id>`, `GET /characters/:id/guild` (a minha situação, convites e pedidos), `GET /characters/:id/guild/{board,topics/:pid}` (só membros), `GET /characters/:id/friends?page=&q=`; `GET /characters/:id/guild/benefits`; mudanças em `POST /characters/:id/guild/*` (regras em `shared/guild.ts`), entre elas `guild/donate` e `guild/chest/(daily|weekly)`.

## Dependências permitidas
`core` e `premium` (só `isPremium`). Regras e limites em `shared/community.ts`.

## Regras que não podem quebrar
Toda mudança trava o personagem do autor (`lockCharacter`) e confere a conta. Texto é puro (`cleanText`), com limite de tamanho; recados têm intervalo mínimo. Depoimento só aparece depois de aprovado. O dono do perfil apaga o que está no próprio perfil; denúncias viram atendimento `REPORT` na fila da equipe (repetir a denúncia de um texto que ainda está em análise não abre outro atendimento, e cada conta tem no máximo `limits.openReports` denúncias em análise; `reportContent` trava a conta antes do personagem para conferir isso); remoção pela equipe é rota `/admin/*` com permissão `community.moderate`, motivo e auditoria. Premium só libera imagens "lendárias" e descrição maior.

Guilda: toda mudança trava o personagem de quem age e, depois, a linha da guilda (sempre nessa ordem); entrar usa UPDATE condicional (`guildId` nulo), então ninguém fica em duas guildas nem mesmo com dois líderes aceitando ao mesmo tempo. Cargos: o vice cuida de pedidos, convites, aviso, quadro e expulsa membros comuns; promover, passar a liderança, mudar a descrição e dissolver são do líder. O líder não sai com gente na guilda (passa o cargo antes); apagar a conta passa a liderança ao vice ou ao mais antigo, e o último a sair apaga a guilda (`leaveGuildOnDelete`). A guilda não mexe em combate, XP nem drops. Benefícios (migração `202611140002_guild_benefits`): o ouro doado ao cofre sai do personagem (`GUILD_DONATION`, ralo, por `addGold` na mesma transação) e soma em `Guild.treasury`, que dá o nível da guilda (`Guild.level`, 1 a 10, recalculado a cada doação); o nível dá vagas (+5 por nível), tópicos fixados e bônus nos baús. O baú do dia (um por personagem por dia de Brasília, depois de 24 h na guilda) e o da semana (um por semana, depois de 72 h e só se a guilda juntou a meta de doações da semana) entram como `GUILD_CHEST` (ouro por `addGold`, poção ou material por `addItem`). `GuildChestClaim` tem chave única por personagem, tipo e período e NÃO tem chave estrangeira para a guilda, para o registro sobreviver à guilda dissolvida. Todos os números (`guild.*`) vêm de `loadSettings`; dia e semana em `shared/guild.ts` (`guildDayKey`, `guildWeekKey`). `Guild.wins` e `losses` ficam sem uso. `Character.lastSeenAt` é gravado, no máximo a cada 2 minutos, ao ler o herói (`GET /characters/:id`).

## Testes
`npm run test:integration` (community-integration, forum-integration, ranking-integration e guild-integration); regras puras em `shared/guild.test.ts`.
