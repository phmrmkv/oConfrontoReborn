// Histórico de atualizações mostrado na página "Novidades". A mais recente primeiro; `id` nunca muda (a tela usa para marcar o que já foi lido).
export interface ChangelogEntry { id: string; date: string; title: string; items: string[] }
export const changelog: ChangelogEntry[] = [
  { id: '2026-11-13-gemas', date: '2026-11-13', title: 'Gemas e Premium', items: [
    'Chegaram as gemas: compre um pacote na aba Premium, pague com Pix ou cartão pelo Mercado Pago e as gemas entram sozinhas assim que o pagamento é confirmado. Os pacotes maiores vêm com gemas de bônus.',
    'Com gemas você ativa o Premium por 30 dias ou renova antes de acabar: os dias novos começam quando os atuais terminam, sem perder nenhum.',
    'A aba Premium mostra o seu saldo, todas as suas compras e o extrato de gemas, em páginas.',
    'Gemas não viram ouro, XP nem item, e o Premium continua sem mexer em combate, XP, ouro ou drops.',
  ] },
  { id: '2026-11-13-wiki', date: '2026-11-13', title: 'Wiki do jogo', items: [
    'Nova aba Wiki, em Comunidade: todos os itens, criaturas e regiões do jogo num lugar só.',
    'Itens com nível, vocações, ataque, defesa, atributos secundários, conjunto, preço no Mercador e de quais criaturas caem, com a chance de cada uma.',
    'Criaturas e chefes com vida, ataque, defesa, elemento, XP, ouro e o que derrubam. Regiões com a faixa de nível e quem vive em cada uma.',
    'Busca e filtros por tipo, vocação, conjunto, região e chefe; clicar numa criatura ou num item abre a ficha dele.',
  ] },
  { id: '2026-11-13-icones-animados', date: '2026-11-13', title: 'Ícones com vida', items: [
    'Os locais de caça ganharam ícones novos, pintados e animados: o portal do Abismo da 4ª Era gira, as fogueiras tremem e soltam brasas, cai neve nas Terras Geladas e há vaga-lumes no Pântano Sombrio.',
    'As criaturas e os heróis agora respiram nas listas do jogo (Caçar, missões, Bestiário e outras), não só na arena.',
    'Os ícones dos poderes da luta também se mexem. Quem desliga as animações em Configurações continua vendo tudo parado.',
  ] },
  { id: '2026-11-13-ranking', date: '2026-11-13', title: 'Ranking', items: [
    'Nova aba Ranking, em Comunidade: os aventureiros de nível mais alto e os de mais honra no Duelo.',
    'Dá para filtrar por vocação (Cavaleiro, Arqueiro, Feiticeiro, Druida) e por classe, da que ainda não tem classe até a 8ª.',
    'Sua posição aparece no alto, com um atalho para a sua página. Quem esconde a fama no perfil não entra no ranking.',
  ] },
  { id: '2026-11-13-poderes', date: '2026-11-13', title: 'Poderes novos na caçada', items: [
    'Cada vocação ganhou um poder próprio na caçada: Grito de guerra (Cavaleiro), Flecha envenenada (Arqueiro), Raio congelante (Feiticeiro) e Raízes (Druida).',
    'Todos ganharam Meditar, que recupera parte da mana e defende melhor naquele turno.',
    'Os poderes têm tempo de recarga, mostrado no botão. Os efeitos que você põe na criatura aparecem embaixo da vida dela.',
  ] },
  { id: '2026-11-13-so-arte-propria', date: '2026-11-13', title: 'Só arte própria no jogo', items: [
    'Os sprites do TibiaWiki saíram do jogo: agora tudo o que você vê é arte própria de O Confronto.',
    'Itens que ainda não têm a arte própria mostram um quadradinho com as iniciais do nome até a figura chegar.',
    'As imagens de perfil agora usam os retratos próprios das criaturas; quem tinha uma imagem que saiu da galeria vê o quadradinho até escolher outra.',
  ] },
  { id: '2026-11-13-criaturas-da-perdicao', date: '2026-11-13', title: 'Criaturas da Perdição', items: [
    'As dez criaturas do Vale da Perdição deixaram de levar o nome de Capriel e agora levam o da região: Elf Arcanist da Perdição, Hero da Perdição, Warlock da Perdição, Demon da Perdição e as outras. Capriel é a cidade e só dá nome ao que é bom: o Templo, a guarda, os títulos e o equipamento Herdeiro de Capriel.',
    'A runa do equipamento de Capriel agora é a Soulfire Rune de Capriel, com os mesmos atributos.',
    'Tarefas, missões e o seu histórico de batalhas já mostram os nomes novos; nada do que você conquistou mudou.',
  ] },
  { id: '2026-11-13-conjuntos-das-eras', date: '2026-11-13', title: 'Conjuntos das Eras', items: [
    'O equipamento de cada Era agora forma um conjunto: Guardião da 1ª Era, Caçador da 2ª Era, Sábio da 3ª Era, Vigia da 4ª Era e Herdeiro de Capriel.',
    'Vestir 2 peças do mesmo conjunto dá o primeiro bônus e 4 peças, o segundo. Dá para misturar dois conjuntos. O detalhe de cada item mostra o conjunto e quantas peças você veste; o resumo do equipamento mostra os bônus ativos.',
    'No duelo, os bônus de conjunto valem metade.',
  ] },
  { id: '2026-11-13-comercio-limitado', date: '2026-11-13', title: 'Comércio limitado: itens vinculados', items: [
    'Equipamentos agora têm três estados. Livre: anda pelo Mercado como sempre (Comum e Incomum, itens da loja e do Ferreiro). Vincula ao equipar: Raro e Épico que caem são livres até você vestir, e aí ficam seus. Vinculado: Lendário e Mítico que caem de chefe, recompensas da Jornada e itens despertados com fragmentos.',
    'Item vinculado não pode ser anunciado no Mercado nem cair no Espólio do duelo. O jogo avisa antes de você vestir um item que vai vincular.',
    'Itens raros numerados (+10) continuam sempre livres, para a história de donos seguir; a taxa de venda deles no Mercado é de 10%.',
    'Tudo o que você já tinha continua livre.',
  ] },
  { id: '2026-11-13-fragmentos-de-chefe', date: '2026-11-13', title: 'Fragmentos de chefe: raridade garantida', items: [
    'Em Caçar, cada criatura mostra o que pode deixar e a chance de cada item, em "O que pode deixar".',
    'Cada vitória contra um chefe, na caçada ou em grupo, dá 1 fragmento de chefe.',
    'No Ferreiro, a aba Despertar usa os fragmentos para subir a raridade de um equipamento em um degrau, sem sorteio: 5 para Incomum, 10 para Raro, 20 para Épico, 40 para Lendário e 80 para Mítico. Vale para itens equipados, favoritos e +10, e a melhoria continua a mesma.',
  ] },
  { id: '2026-11-13-melhoria-com-ajuda', date: '2026-11-13', title: 'Ferreiro: cada falha ajuda a próxima', items: [
    'Quando uma melhoria falha e o item continua inteiro, a próxima tentativa daquele mesmo item ganha +5 pontos de chance, até +15. A ajuda zera quando a melhoria dá certo, ao reforjar o item ou se ele for vendido no Mercado.',
    'O risco de quebra continua o mesmo, mas fica menor junto com a chance de falhar. A tela do Ferreiro mostra a ajuda de cada item.',
  ] },
  { id: '2026-11-13-atributos-secundarios', date: '2026-11-13', title: 'Equipamentos com atributos novos', items: [
    'Anéis, amuletos e o equipamento das Eras agora trazem atributos novos: dano crítico (o crítico bate mais forte), roubo de vida (parte do dano volta como vida), poder de cura (a cura recupera mais) e resistência a efeitos (chance de evitar veneno, queimadura e lentidão).',
    'Eles aparecem no detalhe de cada item, na comparação do Mercado e no resumo do seu equipamento. Na arena, o roubo de vida aparece como um número verde no seu personagem.',
    'No duelo, o roubo de vida vale 60% do que vale na caçada.',
  ] },
  { id: '2026-11-13-duelo-melhoria-comprimida', date: '2026-11-13', title: 'Duelo mais justo com equipamento melhorado', items: [
    'No duelo, a melhoria +N do equipamento vale metade do que vale na caçada: um item +10, que dobra os atributos contra criaturas, vale +50% contra outro jogador. Junto com a raridade, isso evita que o equipamento decida o duelo sozinho.',
    'Na caçada e na Caçada em grupo nada mudou.',
  ] },
  { id: '2026-11-13-loot-da-sua-vocacao', date: '2026-11-13', title: 'O equipamento que cai serve para você', items: [
    'Quando uma criatura derruba um equipamento de outra vocação, na maior parte das vezes ele chega como o equivalente da sua: mesmo tipo e nível parecido. O resultado da batalha avisa quando isso acontece.',
    'Itens que servem a todas as vocações continuam caindo como sempre.',
  ] },
  { id: '2026-11-13-forum-nao-perde-texto', date: '2026-11-13', title: 'O Fórum não perde mais o que você escreveu', items: [
    'Se o envio de um comentário ou de uma resposta falhar (por exemplo, pelo intervalo de 10 segundos entre comentários), o texto continua no campo para você tentar de novo.',
    'No Fórum e no Perfil, os botões de enviar ficam desligados enquanto uma ação está a caminho.',
    'Denunciar duas vezes o mesmo texto não abre dois atendimentos: o jogo avisa que a equipe já está analisando. Cada conta pode ter até 10 denúncias em análise, contadas à parte dos pedidos de ajuda.',
  ] },
  { id: '2026-11-12-raridade-dos-equipamentos', date: '2026-11-12', title: 'Equipamentos agora têm raridade', items: [
    'Cada equipamento que cai pode vir Comum, Incomum, Raro, Épico, Lendário ou Mítico. Quanto mais raro, mais ataque, magia, defesa e armadura o mesmo item entrega (até +40% no Mítico). Chefes têm três vezes mais chance de derrubar exemplares acima de Comum.',
    'A raridade aparece como uma moldura colorida em volta do ícone e uma etiqueta ao lado do nome: verde, azul, roxo, dourado e vermelho.',
    'Ela é do exemplar: continua a mesma ao melhorar, reforjar, vender no Mercado ou trocar de dono no Espólio. O Mercado ganhou um filtro por raridade.',
    'No duelo só metade da vantagem da raridade vale, para o equipamento não decidir a luta sozinho.',
    'O que você já tinha na mochila continua igual: é Comum. Os itens +10 numerados seguem como antes; a raridade é outra coisa e pode se somar a eles.',
  ] },
  { id: '2026-11-12-app-no-site', date: '2026-11-12', title: 'O app Confrontation aparece no site', items: [
    'A aba App Confrontation, em Comunidade, mostra o progresso que a sua conta enviou pelo app: fase mais longe, poder da companhia, Vigília, ouro ganho e itens coletados.',
    'Na mesma aba ficam os rankings do app, desta semana e geral, com a sua posição. O ouro do app e o ouro deste jogo continuam separados.',
  ] },
  { id: '2026-11-12-retratos-das-criaturas', date: '2026-11-12', title: 'A arte nova saiu da arena', items: [
    'As criaturas aparecem com o retrato da arte nova também na lista de Caçar, no Bestiário, nas Missões, no registro da batalha e na Caçada em grupo.',
    'Na Caçada em grupo, a fera da arena também usa a arte nova, com as mesmas animações da caçada.',
    'Arqueiros, magos e dragões inimigos agora atacam de longe: disparam do lugar em vez de correr até você.',
  ] },
  { id: '2026-11-12-apagar-conta-no-site', date: '2026-11-12', title: 'Apagar a conta pelo site', items: [
    'Em Configurações há agora o quadro "Apagar a conta". Ele pede a sua senha e a palavra APAGAR, e apaga na hora, sem volta.',
    'Saem do servidor o e-mail, a senha, o perfil, os recados, as amizades e o progresso do app guardado na nuvem. Os registros de ouro, de itens e de pagamentos ficam guardados sem o seu nome, pelo prazo que a lei pede.',
  ] },
  { id: '2026-11-12-artes-mais-leves', date: '2026-11-12', title: 'Batalhas abrem mais rápido', items: [
    'As artes da arena ficaram cerca de 6 vezes mais leves, então a batalha carrega mais depressa, principalmente no celular.',
    'Pequenos defeitos das artes foram limpos: sobras na borda de alguns quadros e uma névoa clara em volta de alguns personagens.',
  ] },
  { id: '2026-11-12-arte-propria-catalogo', date: '2026-11-12', title: 'Arte própria para todas as criaturas', items: [
    'As 55 criaturas distintas do catálogo de Caçar agora têm arte própria na arena, com animações de movimento, ataque, defesa e queda. As variantes das Eras e do Vale da Perdição usam a folha da criatura original.',
  ] },
  { id: '2026-11-12-arqueiro-feiticeiro-arte-propria', date: '2026-11-12', title: 'Arqueiro e Feiticeiro com arte própria', items: [
    'Na arena, o Arqueiro puxa a flecha da aljava e dispara. O Feiticeiro lança fogo com o cajado e se protege com um escudo mágico.',
    'O rato e o besouro dos primeiros campos também ganharam animações próprias.',
  ] },
  { id: '2026-11-12-druida-arte-propria', date: '2026-11-12', title: 'A Druida ganhou arte própria na arena', items: [
    'A Druida corre, lança espinhos, ergue raízes para se defender e se cura com animações quadro a quadro.',
  ] },
  { id: '2026-11-12-fuga-de-frente', date: '2026-11-12', title: 'Ninguém mais corre de costas', items: [
    'Ao fugir da batalha, o personagem agora vira o corpo antes de correr. O mesmo vale na volta depois de um golpe.',
  ] },
  { id: '2026-11-12-habilidades-novas', date: '2026-11-12', title: 'Habilidades de cara nova', items: [
    'Os botões de habilidade da batalha foram redesenhados: cada golpe tem o seu ícone, o custo de mana aparece numa etiqueta (verde quando é livre, vermelha quando falta mana) e o grupo vem numa etiqueta na borda.',
    'No computador, as teclas 1 a 6 usam as habilidades. Fugir continua só no clique, para ninguém fugir por engano.',
  ] },
  { id: '2026-11-12-sprites-proprios', date: '2026-11-12', title: 'Primeiros personagens com arte própria', items: [
    'O Cavaleiro ganhou um boneco próprio na arena, animado quadro a quadro: respira parado, corre, golpeia, ergue o escudo, se cura e cai.',
    'O Wolf virou o Lobo das Cinzas na arena, com as brasas no dorso, mordida, uivo e queda desenhados.',
    'É um teste: as outras vocações e criaturas continuam com os sprites de antes até a arte nova ficar pronta.',
  ] },
  { id: '2026-11-12-arena-animada', date: '2026-11-12', title: 'A batalha ganhou vida', items: [
    'Seu herói e a criatura agora aparecem frente a frente numa arena e encenam cada turno: quem ataca avança, quem apanha leva o tranco e pisca, e o número do dano sobe na tela.',
    'Cada vocação tem o seu boneco. Arqueiro, Feiticeiro e Druida atacam de longe, com flecha ou magia voando; cura brilha, a guarda ergue o escudo, a esquiva desvia e quem perde cai.',
    'Golpes críticos e golpes pesados dos chefes fazem a arena tremer. Veneno, queimadura e lentidão mudam a cor do herói.',
    'A arena fica presa no topo enquanto você escolhe as habilidades, e vale também no Duelo e na Caçada em grupo. Prefere tudo parado? Use o botão logo abaixo da arena ou Configurações.',
  ] },
  { id: '2026-11-12-bloquear-jogador', date: '2026-11-12', title: 'Bloquear um aventureiro', items: [
    'No perfil de qualquer jogador há agora o botão Bloquear. Quem você bloqueia não deixa mais recado, depoimento nem pedido de amizade para você.',
    'Bloquear desfaz a amizade entre os dois, e com isso acabam também os desafios de duelo e os convites de caçada em grupo.',
    'A lista de bloqueados fica no seu perfil, em Visitas e pedidos, com o botão Desbloquear.',
  ] },
  { id: '2026-11-12-pedra-de-protecao', date: '2026-11-12', title: 'A Pedra de Proteção ganhou rosto', items: [
    'A Pedra de Proteção agora tem imagem na mochila, no Ferreiro e no Mercado: a runa de muralha mágica do TibiaWiki.',
  ] },
  { id: '2026-11-12-leitura-mais-facil', date: '2026-11-12', title: 'Leitura mais fácil', items: [
    'Nenhum texto do jogo fica abaixo de 12 px: rótulos, legendas e números pequenos cresceram.',
    'No celular, o resumo do herói ficou mais baixo e o conteúdo da aba aparece antes.',
    'Quem joga pelo teclado ganhou o atalho "Pular para o conteúdo" (primeiro Tab da página), e os botões de texto ficaram maiores para o toque.',
  ] },
  { id: '2026-11-12-vozes-dos-chefes', date: '2026-11-12', title: 'Os chefes ganharam voz', items: [
    'Cada um dos 13 chefes tem agora uma fala ao começar a luta e outra ao entrar em fúria.',
    'Quando alguém leva um equipamento ao +10, o mundo fica sabendo: um anúncio aparece no topo da tela por 48 horas, com atalho para os Itens raros.',
    'Uma batalha dura no máximo 60 turnos. Sem vencedor até lá, os dois lados recuam e ninguém leva nada; a tela avisa quando faltam 10.',
  ] },
  { id: '2026-11-12-chefes-em-furia', date: '2026-11-12', title: 'Chefes em fúria', items: [
    'Todo chefe agora tem duas fases. Ao cair para metade da vida, ele entra em fúria e os golpes ficam 10% mais fortes até o fim da luta.',
    'A batalha mostra a fase do chefe o tempo todo. Guarde mana para defender ou interromper o golpe pesado na segunda metade.',
    'O Orc Leader teve o ataque reduzido de leve para a luta continuar justa com a fúria.',
  ] },
  { id: '2026-11-12-efeitos-de-status', date: '2026-11-12', title: 'Veneno, fogo e gelo', items: [
    'Criaturas de fogo podem queimar, as do Pântano Sombrio podem envenenar e as das terras geladas podem deixar você lento. A batalha mostra o que a criatura pode causar e quantos turnos o efeito ainda dura.',
    'Veneno e queimadura tiram um pouco de vida no fim do turno (resistência a fogo reduz a queimadura). Lento, você não esquiva e bate 15% mais fraco.',
    'Erguer a guarda no turno impede o efeito, e a cura do Druida limpa todos. Os efeitos terminam com a batalha.',
  ] },
  { id: '2026-11-12-colecao-de-raros', date: '2026-11-12', title: 'Itens raros de Capriel', items: [
    'Nova aba Itens raros, em Comunidade: todos os equipamentos que chegaram ao +10, com número de série, quem forjou e a história de cada um.',
    'Busque pelo nome do item e filtre por em circulação, destruídos ou primeiros do tipo. Quem escondeu o nome no Ferreiro aparece como aventureiro anônimo.',
  ] },
  { id: '2026-11-12-inicio-guiado', date: '2026-11-12', title: 'A Jornada ficou maior', items: [
    'Cinco etapas novas depois do Guardião da Pedreira: distribuir atributos, visitar o Templo, fazer a primeira venda, anunciar no Mercado e fazer um amigo. Cada uma leva você à aba certa e paga uma vez.',
    'Quem já tinha terminado a Jornada não perde nada: as regiões continuam abertas, e as etapas novas que você já cumpriu podem ser recebidas na hora.',
  ] },
  { id: '2026-11-12-conta-e-seguranca', date: '2026-11-12', title: 'Sua conta mais segura', items: [
    'Configurações ganhou Conta e segurança: troque a senha sem sair do jogo e encerre o acesso dos outros aparelhos com um clique.',
    'O Mercado agora abre no nível 5, para dificultar contas criadas só para repassar ouro e itens.',
    'O Ferreiro passou a mostrar todos os equipamentos da mochila, e não só a página aberta no Inventário.',
    'O perfil agora mostra os duelos: vitórias, derrotas, sequência, honra e os cinco últimos. Quem escondeu o nome dos registros públicos só vê o próprio.',
    'Caçar abre direto na região mais alta que você já liberou. Denúncias no Fórum e no Perfil agora são escritas na própria tela.',
  ] },
  { id: '2026-11-01-validacao-eventos', date: '2026-11-01', title: 'Validação de eventos do jogo', items: [
    'Navegações e escolhas em listas agora registram page_view e select_content, sem texto pessoal do jogador.',
    'A Equipe ganhou a tela Validação: dispare lotes reais de até 100 eventos, com atalhos para 20 pageviews ou 30 seleções, e confira o registro logo abaixo.',
  ] },
  { id: '2026-11-01-amigos-no-duelo', date: '2026-11-01', title: 'Amigos dentro do Duelo', items: [
    'A aba Duelo ganhou a seção Amigos: procure um aventureiro pelo nome, peça amizade, aceite ou recuse pedidos e cancele os enviados, sem sair da arena.',
    'Aposta de ouro mais clara: mostra quanto ouro você tem, botões de 1%, 5% e 10%, aviso quando o valor passa do seu ouro e o motivo quando o Desafiar está desligado.',
  ] },
  { id: '2026-10-31-duelo-valendo', date: '2026-10-31', title: 'Duelo valendo: ouro, espólio e honra', items: [
    'Ao desafiar, escolha o que está em jogo: Honra, Aposta de ouro ou Espólio. O convite mostra o risco antes de aceitar, e o Espólio pede confirmação.',
    'Aposta de ouro: os dois depositam o mesmo valor (até 10% do ouro do mais pobre). Quem vence leva o pote, menos a taxa da arena; empate devolve.',
    'Espólio: quem vence tem 25% de chance de levar um item da mochila do outro. Nunca o equipado, favorito, +7 ou mais ou raro; uma Pedra de Proteção salva o item. Dá para resgatar em 48 h pelo preço de loja.',
    'Honra virou pontuação (vencer quem tem mais honra vale mais) e cada duelo dá marcas, que compram títulos e a Moldura da Honra na Loja da honra.',
  ] },
  { id: '2026-10-31-configuracoes', date: '2026-10-31', title: 'Menu Configurações', items: [
    'Nova aba Configurações (no grupo Conta): tema claro ou escuro e animações ligadas ou desligadas, com a explicação do que cada escolha muda.',
    'O botão "Menos movimento" saiu do cabeçalho; agora é a opção Animações em Configurações.',
  ] },
  { id: '2026-10-31-duelo', date: '2026-10-31', title: 'Duelo entre amigos', items: [
    'Nova aba Duelo: desafie um amigo do seu nível (até 10% de diferença) para um duelo de honra. Os dois escolhem em segredo o golpe de cada rodada; quem tem mais agilidade age primeiro.',
    'Nada se perde: vida, mana, ouro, XP e itens ficam iguais. Só vitórias e derrotas entram no registro, com sequência, histórico e o ranking de Honra por classe.',
    'Cada rodada tem prazo: quem não escolhe só defende, e duas rodadas seguidas sem voltar é derrota. Dá para se render a qualquer momento.',
    'Novas conquistas: Primeiro Sangue e Dez Duelos. Algo errado num duelo? Use Denunciar no histórico.',
  ] },
  { id: '2026-10-31-tela-batalha', date: '2026-10-31', title: 'Nova tela de batalha', items: [
    'Habilidades separadas em Ataque, Suporte e Fuga, com ícones do TibiaWiki.',
    'Sua mana agora aparece em barra, ao lado da vida, durante a batalha.',
    'A última rodada fica em um só quadro: seu golpe × golpe da criatura, com o dano em destaque.',
  ] },
  { id: '2026-10-31-voz-rpg', date: '2026-10-31', title: 'Textos com voz de aventura', items: [
    'Combate, caçada, jornada, diário, mochila, templo e mercado foram reescritos com linguagem de RPG: Batalha em curso, Partir para nova caçada, Beber poção, Seu golpe causa X de dano…',
  ] },
  { id: '2026-10-31-nomes', date: '2026-10-31', title: 'Nomes de habilidades do Cavaleiro', items: [
    'Triplo hit agora se chama Golpe brutal, e Quinto hit virou Fúria berserker. O espólio dos monstros também ganhou nome em português nas telas.',
  ] },
  { id: '2026-10-31-turnos', date: '2026-10-31', title: 'Combate: turno a turno, ataque × defesa', items: [
    'Cada turno aparece em dois cartões lado a lado: o seu golpe e o do monstro, com o dano em destaque, críticos, esquivas, golpes pesados e interrupções.',
    'Ver histórico completo mostra todos os turnos do combate e o total de dano causado, recebido, cura, críticos e esquivas.',
  ] },
  { id: '2026-10-31-pocoes', date: '2026-10-31', title: 'Poções para todos os níveis e lojas separadas por tipo', items: [
    'Novas poções do TibiaWiki: Strong, Great, Ultimate e Supreme Health Potion; Strong, Great e Ultimate Mana Potion; Great e Ultimate Spirit Potion (vida e mana).',
    'Cada poção cura um valor fixo mais uma parte da sua vida/mana máxima, e as mais fortes pedem nível mínimo. Monstros de cada faixa deixam as poções do seu nível.',
    'Mercador e Mercado separados por tipo: Poções, Armas, Munição, Armaduras, Escudos, Joias e Outros. O Mercador destaca as melhores poções para você.',
    'Clicar num lugar do equipamento (ex.: Mochila) abre o Inventário com os itens daquele tipo; os ícones de Ataque, Defesa e Armadura mostram o que você usa.',
    'Cada região de caça mostra o nível recomendado e se está fácil, ideal ou perigosa para você.',
  ] },
  { id: '2026-10-31-mercado-filtros', date: '2026-10-31', title: 'Mercado com filtros e comparação', items: [
    'Filtre os anúncios por tipo de item, por melhoria mínima (+1 a +10) e por "só o que posso usar".',
    'Cada equipamento anunciado mostra a diferença (▲/▼) para o que você tem equipado no mesmo lugar.',
  ] },
  { id: '2026-10-31-ferreiro-historico', date: '2026-10-31', title: 'Ferreiro: seu histórico e itens que brilham', items: [
    'Nova aba Meu histórico no Ferreiro: todas as suas tentativas de melhoria, com sucessos, falhas, itens quebrados, salvamentos da Pedra de Proteção e o ouro gasto.',
    'Itens +7 e +8 ganham um brilho discreto, +9 brilha forte e +10 continua em chamas. Com Menos movimento, o brilho fica parado.',
  ] },
  { id: '2026-10-31-movimento', date: '2026-10-31', title: 'Opção "Menos movimento"', items: [
    'Novo botão Menos movimento ao lado do tema (no celular, no menu): desliga animações, transições e o fogo animado dos itens +10.',
    'Sem escolha, o jogo segue a preferência de acessibilidade do seu sistema.',
  ] },
  { id: '2026-10-31-favoritos', date: '2026-10-31', title: 'Novidades, avisos e itens favoritos protegidos', items: [
    'Nova página Novidades com o histórico de atualizações; a equipe agora pode publicar avisos de manutenção que aparecem no topo do jogo.',
    'Item favorito (a estrela da mochila) fica protegido: não pode ser vendido, anunciado nem levado ao Ferreiro, e só arrisca melhoria que pode quebrar com Pedra de Proteção.',
    'Tirar a estrela não exige mais Premium.',
  ] },
  { id: '2026-10-31-quatro-marcas', date: '2026-10-31', title: 'A Caçada das Quatro Marcas: caçada em grupo com amigos', items: [
    'A partir do nível 100, monte um grupo de 2 a 4 amigos em Caçada em grupo. Cada rodada tem prazo; quem não escolher a tempo defende.',
    'Cada vocação tem seu papel: o Cavaleiro segura, o Paladino mira, o Druida cura e o Feiticeiro quebra selos.',
    'Quatro caçadas: a Fera da Serra Vermelha (nível 100), o Espírito da Floresta Oca (250), o Monstro do Lago Cinzento (400) e o Dragão Adormecido (550), em que o grupo vota o destino do dragão.',
    'Novas conquistas: Ninguém caça sozinho e As Quatro Marcas.',
  ] },
  { id: '2026-10-31-paginas', date: '2026-10-31', title: 'Listas mais leves: páginas e "Ver mais"', items: [
    'Nenhuma lista mostra mais de 10 itens de uma vez: use "Ver mais", a busca ou as páginas numeradas.',
    'Mercado com busca por nome e anúncios mais recentes primeiro; extrato, diário, recados, fórum e mochila em páginas.',
    'Missões agrupadas por faixa de nível, com busca e filtros.',
  ] },
  { id: '2026-10-31-comunidade', date: '2026-10-31', title: 'Perfil de comunidade e fórum', items: [
    'Perfil com imagem do TibiaWiki, descrição, recados, depoimentos, amigos e visitas.',
    'Fórum com categorias, votos, comentários e dúvidas marcadas como resolvidas.',
  ] },
  { id: '2026-10-31-classes', date: '2026-10-31', title: 'Classes até o nível 1000 e missões com história', items: [
    'Cada vocação tem 8 classes (níveis 20, 100, 250, 400, 550, 700, 850 e 1000), com bônus de ataque, defesa e crítico.',
    'Tarefas viraram Missões, cada uma com quem pede e a sua história. A cidade agora se chama Capriel, e a primeira região, Campos do Amanhecer.',
  ] },
  { id: '2026-10-30-ferreiro', date: '2026-10-30', title: 'Ferreiro: fabricar, reforjar e desmontar', items: [
    'O Mercador vende equipamentos só até o nível 100. Acima disso, os itens vêm do Ferreiro e do espólio dos monstros.',
    'Fabricar cria um item com materiais e ouro; reforjar troca um item pelo de outro nível mantendo parte da melhoria; desmontar devolve materiais.',
    'Os materiais (do Minério de Ferro à Essência Demoníaca) caem dos monstros de cada faixa de nível; chefes sempre deixam algum.',
    'Atributos podem ser distribuídos de 10 em 10, de 100 em 100 ou de uma vez, e redistribuídos pagando ouro.',
  ] },
  { id: '2026-10-29-niveis', date: '2026-10-29', title: 'Conteúdo até o nível 1000', items: [
    'Regiões, monstros e equipamentos para todos os níveis, das Campos do Amanhecer ao Vale da Perdição, passando pelas quatro Eras.',
    'Barra de experiência do nível atual e endereço próprio para cada página (/atributos, /inventario…).',
  ] },
];
