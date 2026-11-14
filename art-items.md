# Arte original dos itens de O Confronto

O catálogo reúne 190 itens com um prompt completo por folha. São 125 itens-base e 65 variantes das Eras e de Capriel, incluindo equipamentos, munições, runas, poções, mochila, moeda, pedra de proteção e materiais do Ferreiro. Os títulos em português servem de direção de arte. A chave do catálogo identifica o item no jogo.

## Produção e conferência

1. Copie um bloco inteiro e gere uma folha por vez. Para uma variante, use apenas a arte original do item-base de O Confronto como referência de família visual, quando estiver pronta.
2. Confira o alfa, as 24 células, as margens e a transição do quadro 24 para o 01. Verifique também a leitura do primeiro quadro no tema claro e no escuro.
3. Guarde o PNG mestre, o prompt e a origem da geração. Para o lote comercial, desenhe silhuetas e símbolos próprios e dispense sprites, logos e pixels de terceiros.

Leia as seis linhas da esquerda para a direita, de cima para baixo. A lógica dos personagens vira um ciclo de exposição para o inventário. O gesto é próprio de cada objeto e ocupa 24 quadros. Sugestão de reprodução de 12 quadros por segundo, com o quadro 01 quando as animações estiverem desligadas.

Destinos: o GIF em frontend/public/assets/items/ (é o que o site usa) e o PNG mestre em art/items/ (original de ~1 MB, fora do site: tudo o que fica em public/ vai para o ar). A exibição das folhas e camadas no jogo depende de integração na interface.

## Raridade e efeitos

No jogo atual, o equipamento +10 é registrado como raro serializado. A identidade de cada Era fica na folha-base. O aprimoramento recebe uma camada animada independente para que uma arma avançada conserve seu acabamento mesmo sem melhoria.

| Estado | Tratamento visual |
|---|---|
| +0 a +6 | Só a animação própria do item |
| +7 e +8 | Halo âmbar discreto com dois traços de contorno |
| +9 | Duas curvas em dourado quente, com pontas claras |
| +10 raro | Chamas laranja-brasa, faíscas ouro-branco e acento da família visual |

Use também o rótulo do aprimoramento e, quando houver, o número de série na interface. Materiais e poções podem ter efeitos próprios. As camadas +7 a +10 correspondem apenas a equipamentos aprimoráveis.

### Prompts das camadas de aprimoramento

#### aprimoramento-7-8.png

```
Crie somente uma camada original de efeitos para itens de O Confronto. Deixe o espaço central livre para compor a folha sobre o objeto.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um halo fino âmbar cresce com dois reflexos curtos nas laterais.
Linha 4 · quadros 13–16 — A intensidade fica baixa e o centro permanece totalmente transparente.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### aprimoramento-9.png

```
Crie somente uma camada original de efeitos para itens de O Confronto. Deixe o espaço central livre para compor a folha sobre o objeto.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Duas curvas douradas interrompidas acendem com dois pontos claros em suas pontas.
Linha 4 · quadros 13–16 — Use dourado quente com pontos ouro-branco, mantendo o centro transparente.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### aprimoramento-10-raro.png

```
Crie somente uma camada original de efeitos para itens de O Confronto. Deixe o espaço central livre para compor a folha sobre o objeto.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Chamas compactas sobem pelas laterais e soltam pequenas faíscas.
Linha 4 · quadros 13–16 — Chamas laranja com pontas ouro-branco. Use acento ciano, azul-gelo, violeta, laranja ou vinho conforme a família, com o centro transparente.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

## Prompts do catálogo

### Armas

#### Espada de Guarda Trançada · sword.png

Chave do catálogo **Sword** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Espada de Guarda Trançada, de O Confronto.
Desenho — Lâmina reta de aço fosco com canal central curto, guarda de ferro trançado e pomo de couro vinho. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo frio percorre o canal em direção à ponta.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Espada Longa do Meridiano · magic-longsword.png

Chave do catálogo **Magic Longsword** · nível mínimo 50.

```
Crie uma folha de sprites animada e original para Espada Longa do Meridiano, de O Confronto.
Desenho — Espada longa de aço azulado com espiga exposta, guarda em asa curta e incrustação ciano interrompida. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A incrustação conduz um pulso ciano até a ponta.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Espada do Carvão Vivo · fire-sword.png

Chave do catálogo **Fire Sword** · nível mínimo 15.

```
Crie uma folha de sprites animada e original para Espada do Carvão Vivo, de O Confronto.
Desenho — Lâmina larga de aço escuro com três bolsões de brasa perto do gume, guarda curva de cobre. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasas caminham pelo gume e duas faíscas se desfazem.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Arco do Freixo · bow.png

Chave do catálogo **Bow** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Arco do Freixo, de O Confronto.
Desenho — Arco de freixo claro com dois encaixes de chifre escuro e empunhadura verde-musgo. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A corda vibra de leve e a madeira volta à tensão inicial.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Varinha do Remoinho · wand-of-vortex.png

Chave do catálogo **Wand of Vortex** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Varinha do Remoinho, de O Confronto.
Desenho — Haste de madeira escura com forquilha de cobre em espiral e seixo azul suspenso. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um fio azul circunda a forquilha e retorna ao núcleo.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Cetro da Presa Verde · snakebite-rod.png

Chave do catálogo **Snakebite Rod** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Cetro da Presa Verde, de O Confronto.
Desenho — Ramo torto com abraçadeira de cobre em forma de mandíbula e ponta de resina verde. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um filete verde escorre por dentro da resina.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Espada Longa do Caminho · longsword.png

Chave do catálogo **Longsword** · nível mínimo 6.

```
Crie uma folha de sprites animada e original para Espada Longa do Caminho, de O Confronto.
Desenho — Lâmina longa com dois sulcos finos e guarda de bronze rebaixada. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo branco passa pelos sulcos.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Espada de Guarda Espinhosa · spike-sword.png

Chave do catálogo **Spike Sword** · nível mínimo 25.

```
Crie uma folha de sprites animada e original para Espada de Guarda Espinhosa, de O Confronto.
Desenho — Lâmina estreita em aço fosco com dois espigões na guarda e cabo trançado vinho. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Os espigões refletem luz em sequência.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Lança da Escama Quebrada · dragon-lance.png

Chave do catálogo **Dragon Lance** · nível mínimo 35.

```
Crie uma folha de sprites animada e original para Lança da Escama Quebrada, de O Confronto.
Desenho — Lança de haste escura com lâmina cor de cobre e colar de escamas no encaixe. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um brilho laranja aparece entre as escamas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Espada dos Gigantes · giant-sword.png

Chave do catálogo **Giant Sword** · nível mínimo 60.

```
Crie uma folha de sprites animada e original para Espada dos Gigantes, de O Confronto.
Desenho — Lâmina de ferro espessa com ponta chanfrada, cabo longo e contrapeso redondo. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo pesado atravessa a face martelada.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Espada da Luz Pálida · bright-sword.png

Chave do catálogo **Bright Sword** · nível mínimo 70.

```
Crie uma folha de sprites animada e original para Espada da Luz Pálida, de O Confronto.
Desenho — Lâmina fina prateada de ponta triangular, guarda de latão em arco aberto. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma linha branca percorre o gume e desaparece.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Espada do Estandarte Partido · warlord-sword.png

Chave do catálogo **Warlord Sword** · nível mínimo 85.

```
Crie uma folha de sprites animada e original para Espada do Estandarte Partido, de O Confronto.
Desenho — Lâmina larga com talão serrado, guarda assimétrica escura e fita ocre. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A fita se agita e a crista do metal reflete.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Alabarda do Portão · guardian-halberd.png

Chave do catálogo **Guardian Halberd** · nível mínimo 100.

```
Crie uma folha de sprites animada e original para Alabarda do Portão, de O Confronto.
Desenho — Haste de freixo negro, lâmina de machado trapezoidal, ponta de lança e gancho traseiro de cobre. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo sobe da lâmina para o gancho.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Lança de Ponta Folhada · spear.png

Chave do catálogo **Spear** · nível mínimo 6.

```
Crie uma folha de sprites animada e original para Lança de Ponta Folhada, de O Confronto.
Desenho — Haste clara com atadura de couro e ponta de ferro em forma de folha. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A atadura vibra e o ferro responde com luz breve.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Besta da Roldana de Bronze · crossbow.png

Chave do catálogo **Crossbow** · nível mínimo 20.

```
Crie uma folha de sprites animada e original para Besta da Roldana de Bronze, de O Confronto.
Desenho — Besta de coronha curta e angular, arco de aço e roldana de bronze exposta. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A roldana tensiona a corda e volta à posição.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Lança da Caçada · hunting-spear.png

Chave do catálogo **Hunting Spear** · nível mínimo 40.

```
Crie uma folha de sprites animada e original para Lança da Caçada, de O Confronto.
Desenho — Lança de madeira escura com duas farpas voltadas para trás e amarra de tendão. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O tendão vibra e as farpas recebem um reflexo.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Estrela dos Quatro Gumes · throwing-star.png

Chave do catálogo **Throwing Star** · nível mínimo 65.

```
Crie uma folha de sprites animada e original para Estrela dos Quatro Gumes, de O Confronto.
Desenho — Disco de ferro com quatro pontas recurvadas em torno de um furo quadrado. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O reflexo salta de um gume para outro.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Cajado do Freixo Entalhado · staff.png

Chave do catálogo **Staff** · nível mínimo 6.

```
Crie uma folha de sprites animada e original para Cajado do Freixo Entalhado, de O Confronto.
Desenho — Cajado de freixo com punho de couro e travessa de madeira incrustada com quartzo fosco. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo opaco atravessa o quartzo.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Cajado do Ossário · skull-staff.png

Chave do catálogo **Skull Staff** · nível mínimo 35.

```
Crie uma folha de sprites animada e original para Cajado do Ossário, de O Confronto.
Desenho — Cajado de madeira cinza com crânio de animal encastoado em três garras de ferro. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Luz violeta fraca percorre as órbitas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Lâmina de Haste Curva · naginata.png

Chave do catálogo **Naginata** · nível mínimo 115.

```
Crie uma folha de sprites animada e original para Lâmina de Haste Curva, de O Confronto.
Desenho — Arma de haste laqueada com lâmina curva estreita e encaixe de bronze. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um brilho percorre o arco do gume.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Machado das Lâminas Largas · great-axe.png

Chave do catálogo **Great Axe** · nível mínimo 130.

```
Crie uma folha de sprites animada e original para Machado das Lâminas Largas, de O Confronto.
Desenho — Machado pesado de duas lâminas chanfradas e cabo de carvalho reforçado. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — As lâminas recebem reflexos alternados.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Lança de Vidro Negro · obsidian-lance.png

Chave do catálogo **Obsidian Lance** · nível mínimo 145.

```
Crie uma folha de sprites animada e original para Lança de Vidro Negro, de O Confronto.
Desenho — Lança com ponta serrilhada de obsidiana e três anéis de cobre. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexos roxos cruzam o vidro negro.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Machado do Vigia de Pedra · guardian-axe.png

Chave do catálogo **Guardian Axe** · nível mínimo 160.

```
Crie uma folha de sprites animada e original para Machado do Vigia de Pedra, de O Confronto.
Desenho — Machado de uma lâmina arredondada, contrapeso de pedra e abraçadeira dourada. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um pulso dourado percorre a abraçadeira.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Machado da Geada · icy-barbarian-axe.png

Chave do catálogo **Icy Barbarian Axe** · nível mínimo 175.

```
Crie uma folha de sprites animada e original para Machado da Geada, de O Confronto.
Desenho — Machado de aço azul com gume de gelo facetado e couro branco. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Cristais pequenos acendem em ciano no gume.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Machado da Rocha Viva · earth-barbarian-axe.png

Chave do catálogo **Earth Barbarian Axe** · nível mínimo 190.

```
Crie uma folha de sprites animada e original para Machado da Rocha Viva, de O Confronto.
Desenho — Machado com lâmina de xisto em armação de ferro e nervuras musgo. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — As nervuras verdes pulsam dentro do xisto.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Machado do Trovão Preso · energy-barbarian-axe.png

Chave do catálogo **Energy Barbarian Axe** · nível mínimo 210.

```
Crie uma folha de sprites animada e original para Machado do Trovão Preso, de O Confronto.
Desenho — Machado de bronze escuro com dois terminais afastados na lâmina. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um arco violeta curto salta entre os terminais.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Machado do Forno · fiery-barbarian-axe.png

Chave do catálogo **Fiery Barbarian Axe** · nível mínimo 235.

```
Crie uma folha de sprites animada e original para Machado do Forno, de O Confronto.
Desenho — Machado com lâmina negra vazada por canais de brasa e empunhadura vinho. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasa laranja corre pelos canais internos.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Espada Longa do Meridiano da Primeira Era · magic-longsword-da-1-era.png

Chave do catálogo **Magic Longsword da 1ª Era** · nível mínimo 250 · item-base **Magic Longsword**.

```
Crie uma folha de sprites animada e original para Espada Longa do Meridiano da Primeira Era, de O Confronto.
Desenho — Espada longa de aço azulado com espiga exposta, guarda em asa curta e incrustação ciano interrompida. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A incrustação conduz um pulso ciano até a ponta.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Besta da Roldana de Bronze da Primeira Era · crossbow-da-1-era.png

Chave do catálogo **Crossbow da 1ª Era** · nível mínimo 250 · item-base **Crossbow**.

```
Crie uma folha de sprites animada e original para Besta da Roldana de Bronze da Primeira Era, de O Confronto.
Desenho — Besta de coronha curta e angular, arco de aço e roldana de bronze exposta. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A roldana tensiona a corda e volta à posição.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Cajado do Ossário da Primeira Era · skull-staff-da-1-era.png

Chave do catálogo **Skull Staff da 1ª Era** · nível mínimo 250 · item-base **Skull Staff**.

```
Crie uma folha de sprites animada e original para Cajado do Ossário da Primeira Era, de O Confronto.
Desenho — Cajado de madeira cinza com crânio de animal encastoado em três garras de ferro. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Luz violeta fraca percorre as órbitas.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Espada do Estandarte Partido da Segunda Era · warlord-sword-da-2-era.png

Chave do catálogo **Warlord Sword da 2ª Era** · nível mínimo 400 · item-base **Warlord Sword**.

```
Crie uma folha de sprites animada e original para Espada do Estandarte Partido da Segunda Era, de O Confronto.
Desenho — Lâmina larga com talão serrado, guarda assimétrica escura e fita ocre. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A fita se agita e a crista do metal reflete.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Estrela dos Quatro Gumes da Segunda Era · throwing-star-da-2-era.png

Chave do catálogo **Throwing Star da 2ª Era** · nível mínimo 400 · item-base **Throwing Star**.

```
Crie uma folha de sprites animada e original para Estrela dos Quatro Gumes da Segunda Era, de O Confronto.
Desenho — Disco de ferro com quatro pontas recurvadas em torno de um furo quadrado. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O reflexo salta de um gume para outro.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Varinha do Remoinho da Segunda Era · wand-of-vortex-da-2-era.png

Chave do catálogo **Wand of Vortex da 2ª Era** · nível mínimo 400 · item-base **Wand of Vortex**.

```
Crie uma folha de sprites animada e original para Varinha do Remoinho da Segunda Era, de O Confronto.
Desenho — Haste de madeira escura com forquilha de cobre em espiral e seixo azul suspenso. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um fio azul circunda a forquilha e retorna ao núcleo.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Machado do Forno da Terceira Era · fiery-barbarian-axe-da-3-era.png

Chave do catálogo **Fiery Barbarian Axe da 3ª Era** · nível mínimo 550 · item-base **Fiery Barbarian Axe**.

```
Crie uma folha de sprites animada e original para Machado do Forno da Terceira Era, de O Confronto.
Desenho — Machado com lâmina negra vazada por canais de brasa e empunhadura vinho. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasa laranja corre pelos canais internos.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Besta da Roldana de Bronze da Terceira Era · crossbow-da-3-era.png

Chave do catálogo **Crossbow da 3ª Era** · nível mínimo 550 · item-base **Crossbow**.

```
Crie uma folha de sprites animada e original para Besta da Roldana de Bronze da Terceira Era, de O Confronto.
Desenho — Besta de coronha curta e angular, arco de aço e roldana de bronze exposta. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A roldana tensiona a corda e volta à posição.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Cetro da Presa Verde da Terceira Era · snakebite-rod-da-3-era.png

Chave do catálogo **Snakebite Rod da 3ª Era** · nível mínimo 550 · item-base **Snakebite Rod**.

```
Crie uma folha de sprites animada e original para Cetro da Presa Verde da Terceira Era, de O Confronto.
Desenho — Ramo torto com abraçadeira de cobre em forma de mandíbula e ponta de resina verde. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um filete verde escorre por dentro da resina.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Alabarda do Portão da Quarta Era · guardian-halberd-da-4-era.png

Chave do catálogo **Guardian Halberd da 4ª Era** · nível mínimo 700 · item-base **Guardian Halberd**.

```
Crie uma folha de sprites animada e original para Alabarda do Portão da Quarta Era, de O Confronto.
Desenho — Haste de freixo negro, lâmina de machado trapezoidal, ponta de lança e gancho traseiro de cobre. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo sobe da lâmina para o gancho.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Estrela dos Quatro Gumes da Quarta Era · throwing-star-da-4-era.png

Chave do catálogo **Throwing Star da 4ª Era** · nível mínimo 700 · item-base **Throwing Star**.

```
Crie uma folha de sprites animada e original para Estrela dos Quatro Gumes da Quarta Era, de O Confronto.
Desenho — Disco de ferro com quatro pontas recurvadas em torno de um furo quadrado. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O reflexo salta de um gume para outro.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Cajado do Ossário da Quarta Era · skull-staff-da-4-era.png

Chave do catálogo **Skull Staff da 4ª Era** · nível mínimo 700 · item-base **Skull Staff**.

```
Crie uma folha de sprites animada e original para Cajado do Ossário da Quarta Era, de O Confronto.
Desenho — Cajado de madeira cinza com crânio de animal encastoado em três garras de ferro. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Luz violeta fraca percorre as órbitas.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Espada do Carvão Vivo de Capriel · fire-sword-de-capriel.png

Chave do catálogo **Fire Sword de Capriel** · nível mínimo 850 · item-base **Fire Sword**.

```
Crie uma folha de sprites animada e original para Espada do Carvão Vivo de Capriel, de O Confronto.
Desenho — Lâmina larga de aço escuro com três bolsões de brasa perto do gume, guarda curva de cobre. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasas caminham pelo gume e duas faíscas se desfazem.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Besta da Roldana de Bronze de Capriel · crossbow-de-capriel.png

Chave do catálogo **Crossbow de Capriel** · nível mínimo 850 · item-base **Crossbow**.

```
Crie uma folha de sprites animada e original para Besta da Roldana de Bronze de Capriel, de O Confronto.
Desenho — Besta de coronha curta e angular, arco de aço e roldana de bronze exposta. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A roldana tensiona a corda e volta à posição.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Varinha do Remoinho de Capriel · wand-of-vortex-de-capriel.png

Chave do catálogo **Wand of Vortex de Capriel** · nível mínimo 850 · item-base **Wand of Vortex**.

```
Crie uma folha de sprites animada e original para Varinha do Remoinho de Capriel, de O Confronto.
Desenho — Haste de madeira escura com forquilha de cobre em espiral e seixo azul suspenso. Mostre lâminas na diagonal com a ponta para cima e à direita. Arcos, bestas e cajados usam três quartos para mostrar o mecanismo ou foco.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um fio azul circunda a forquilha e retorna ao núcleo.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

### Escudos

#### Escudo das Três Tábuas · wooden-shield.png

Chave do catálogo **Wooden Shield** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Escudo das Três Tábuas, de O Confronto.
Desenho — Três tábuas de freixo desencontradas, borda de couro costurado e broquel triangular de bronze. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo âmbar passa pelos rebites.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo dos Sete Elos · mastermind-shield.png

Chave do catálogo **Mastermind Shield** · nível mínimo 30.

```
Crie uma folha de sprites animada e original para Escudo dos Sete Elos, de O Confronto.
Desenho — Escudo de aço grafite em forma de losango truncado com sete elos de bronze gravados. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Os elos acendem um após o outro em azul pálido.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo de Aço Vincado · steel-shield.png

Chave do catálogo **Steel Shield** · nível mínimo 8.

```
Crie uma folha de sprites animada e original para Escudo de Aço Vincado, de O Confronto.
Desenho — Escudo curto de aço escovado com espinha central e borda cravada. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo frio acompanha o vinco.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo da Serpente de Brasa · dragon-shield.png

Chave do catálogo **Dragon Shield** · nível mínimo 20.

```
Crie uma folha de sprites animada e original para Escudo da Serpente de Brasa, de O Confronto.
Desenho — Escudo ovóide com escamas sobrepostas de cobre e veio de brasa em zigue-zague. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A brasa percorre o veio por baixo das placas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo da Muralha · tower-shield.png

Chave do catálogo **Tower Shield** · nível mínimo 45.

```
Crie uma folha de sprites animada e original para Escudo da Muralha, de O Confronto.
Desenho — Escudo alto retangular com canto entalhado, madeira escura e três nervuras verticais. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexos passam pelas três nervuras.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo de Contrafortes · great-shield.png

Chave do catálogo **Great Shield** · nível mínimo 75.

```
Crie uma folha de sprites animada e original para Escudo de Contrafortes, de O Confronto.
Desenho — Escudo largo de cinco lados, duas placas grossas em diagonal e broquel de ferro. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O brilho atravessa as placas em passos pesados.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo do Nó Guardião · guardian-shield.png

Chave do catálogo **Guardian Shield** · nível mínimo 95.

```
Crie uma folha de sprites animada e original para Escudo do Nó Guardião, de O Confronto.
Desenho — Escudo com base cortada e um nó de bronze envolvendo três pedras escuras. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — As pedras recebem luz dourada em sequência.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo de Filigrana · ornamented-shield.png

Chave do catálogo **Ornamented Shield** · nível mínimo 115.

```
Crie uma folha de sprites animada e original para Escudo de Filigrana, de O Confronto.
Desenho — Escudo oval de madeira negra com filigrana em espiral de latão e borda de couro. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A luz percorre a filigrana.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo das Asas de Cobre · griffin-shield.png

Chave do catálogo **Griffin Shield** · nível mínimo 135.

```
Crie uma folha de sprites animada e original para Escudo das Asas de Cobre, de O Confronto.
Desenho — Escudo pentagonal com duas asas de cobre rebatidas em torno de uma pedra ocre. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Os relevos das asas refletem em sequência.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo das Ameias · castle-shield.png

Chave do catálogo **Castle Shield** · nível mínimo 160.

```
Crie uma folha de sprites animada e original para Escudo das Ameias, de O Confronto.
Desenho — Escudo vertical com topo em três degraus e travessas de ferro. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Luz fria sobe pelas travessas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo da Rosa de Ferro · rose-shield.png

Chave do catálogo **Rose Shield** · nível mínimo 190.

```
Crie uma folha de sprites animada e original para Escudo da Rosa de Ferro, de O Confronto.
Desenho — Escudo pequeno de aço com roseta de seis pétalas em cobre escuro. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brilho âmbar abre do miolo para as pétalas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo da Vigília Escura · dark-shield.png

Chave do catálogo **Dark Shield** · nível mínimo 220.

```
Crie uma folha de sprites animada e original para Escudo da Vigília Escura, de O Confronto.
Desenho — Escudo de ferro negro com chanfro fundo e centro de pedra violeta. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A pedra pulsa e a borda responde em violeta fosco.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo dos Sete Elos da Primeira Era · mastermind-shield-da-1-era.png

Chave do catálogo **Mastermind Shield da 1ª Era** · nível mínimo 250 · item-base **Mastermind Shield**.

```
Crie uma folha de sprites animada e original para Escudo dos Sete Elos da Primeira Era, de O Confronto.
Desenho — Escudo de aço grafite em forma de losango truncado com sete elos de bronze gravados. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Os elos acendem um após o outro em azul pálido.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo do Nó Guardião da Segunda Era · guardian-shield-da-2-era.png

Chave do catálogo **Guardian Shield da 2ª Era** · nível mínimo 400 · item-base **Guardian Shield**.

```
Crie uma folha de sprites animada e original para Escudo do Nó Guardião da Segunda Era, de O Confronto.
Desenho — Escudo com base cortada e um nó de bronze envolvendo três pedras escuras. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — As pedras recebem luz dourada em sequência.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo de Contrafortes da Terceira Era · great-shield-da-3-era.png

Chave do catálogo **Great Shield da 3ª Era** · nível mínimo 550 · item-base **Great Shield**.

```
Crie uma folha de sprites animada e original para Escudo de Contrafortes da Terceira Era, de O Confronto.
Desenho — Escudo largo de cinco lados, duas placas grossas em diagonal e broquel de ferro. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O brilho atravessa as placas em passos pesados.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo da Muralha da Quarta Era · tower-shield-da-4-era.png

Chave do catálogo **Tower Shield da 4ª Era** · nível mínimo 700 · item-base **Tower Shield**.

```
Crie uma folha de sprites animada e original para Escudo da Muralha da Quarta Era, de O Confronto.
Desenho — Escudo alto retangular com canto entalhado, madeira escura e três nervuras verticais. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexos passam pelas três nervuras.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Escudo da Serpente de Brasa de Capriel · dragon-shield-de-capriel.png

Chave do catálogo **Dragon Shield de Capriel** · nível mínimo 850 · item-base **Dragon Shield**.

```
Crie uma folha de sprites animada e original para Escudo da Serpente de Brasa de Capriel, de O Confronto.
Desenho — Escudo ovóide com escamas sobrepostas de cobre e veio de brasa em zigue-zague. Vista de três quartos com a face frontal dominante, espessura e orla visíveis.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A brasa percorre o veio por baixo das placas.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

### Armaduras e mantos

#### Colete de Couro Costurado · leather-armor.png

Chave do catálogo **Leather Armor** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Colete de Couro Costurado, de O Confronto.
Desenho — Colete de couro castanho com ombros assimétricos, costura clara e três presilhas diagonais. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A aba de couro oscila levemente.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça do Juramento Gravado · magic-plate-armor.png

Chave do catálogo **Magic Plate Armor** · nível mínimo 40.

```
Crie uma folha de sprites animada e original para Couraça do Juramento Gravado, de O Confronto.
Desenho — Placas azul-ardósia encaixadas em cunha, filigrana de cobre e nó rúnico original no esterno. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O nó acende em ciano e percorre as juntas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Colete de Rebites Quadrados · studded-armor.png

Chave do catálogo **Studded Armor** · nível mínimo 5.

```
Crie uma folha de sprites animada e original para Colete de Rebites Quadrados, de O Confronto.
Desenho — Colete de couro escuro com rebites quadrados, forro ocre e fivela lateral. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Os rebites refletem luz em diagonal.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Cota do Elo Duplo · chain-armor.png

Chave do catálogo **Chain Armor** · nível mínimo 10.

```
Crie uma folha de sprites animada e original para Cota do Elo Duplo, de O Confronto.
Desenho — Cota de malha escura com grupos alternados de elos de bronze e aço. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo cascata percorre os elos.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça de Placas Articuladas · plate-armor.png

Chave do catálogo **Plate Armor** · nível mínimo 18.

```
Crie uma folha de sprites animada e original para Couraça de Placas Articuladas, de O Confronto.
Desenho — Peitoral de aço cru com três placas sobrepostas no abdômen e rebites escuros. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — As bordas das placas refletem em sequência.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça do Portão de Ferro · knight-armor.png

Chave do catálogo **Knight Armor** · nível mínimo 28.

```
Crie uma folha de sprites animada e original para Couraça do Portão de Ferro, de O Confronto.
Desenho — Couraça de aço escuro com gola em V e faixa de tecido vinho encaixada. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A faixa oscila e o peitoral capta um reflexo.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça das Três Torres · crown-armor.png

Chave do catálogo **Crown Armor** · nível mínimo 55.

```
Crie uma folha de sprites animada e original para Couraça das Três Torres, de O Confronto.
Desenho — Peitoral azul-ardósia com três nervuras douradas no alto e ombreiras facetadas. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — As nervuras recebem luz âmbar em sequência.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça do Sol Martelado · golden-armor.png

Chave do catálogo **Golden Armor** · nível mínimo 70.

```
Crie uma folha de sprites animada e original para Couraça do Sol Martelado, de O Confronto.
Desenho — Armadura dourada fosca com placas escalonadas, gola escura e gravações em leque. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo abre e fecha como leque.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Malha de Escamas Rubras · dragon-scale-mail.png

Chave do catálogo **Dragon Scale Mail** · nível mínimo 85.

```
Crie uma folha de sprites animada e original para Malha de Escamas Rubras, de O Confronto.
Desenho — Torso de escamas ferrugem com orlas de ferro e cintura escura. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasa baixa acende entre as escamas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça da Serpe Coroada · royal-draken-mail.png

Chave do catálogo **Royal Draken Mail** · nível mínimo 100.

```
Crie uma folha de sprites animada e original para Couraça da Serpe Coroada, de O Confronto.
Desenho — Torso de escamas verde-petróleo sob meia couraça de bronze e fecho hexagonal. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo verde contorna as escamas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Manto do Lago Profundo · blue-robe.png

Chave do catálogo **Blue Robe** · nível mínimo 15.

```
Crie uma folha de sprites animada e original para Manto do Lago Profundo, de O Confronto.
Desenho — Manto vazio de lã azul, ombro franzido e borda em ondas bordadas. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A bainha oscila e o bordado capta luz azul.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Manto das Raízes · terra-mantle.png

Chave do catálogo **Terra Mantle** · nível mínimo 45.

```
Crie uma folha de sprites animada e original para Manto das Raízes, de O Confronto.
Desenho — Manto de linho ocre com bordado de raízes e fecho de pedra verde. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O verde percorre discretamente as raízes.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Veste de Escamas de Seda · royal-scale-robe.png

Chave do catálogo **Royal Scale Robe** · nível mínimo 75.

```
Crie uma folha de sprites animada e original para Veste de Escamas de Seda, de O Confronto.
Desenho — Veste de seda escura com painéis em escama e borda de ouro fosco. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo violeta passa pelo tecido.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça de Veludo e Bronze · noble-armor.png

Chave do catálogo **Noble Armor** · nível mínimo 120.

```
Crie uma folha de sprites animada e original para Couraça de Veludo e Bronze, de O Confronto.
Desenho — Peitoral de bronze velho com tecido vinho aparente e fecho lateral. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O veludo ondula de leve e o fecho reflete.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça de Ferro Noturno · dark-armor.png

Chave do catálogo **Dark Armor** · nível mínimo 160.

```
Crie uma folha de sprites animada e original para Couraça de Ferro Noturno, de O Confronto.
Desenho — Armadura de placas de ferro negro em cunhas sobrepostas com forro violeta. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexos violetas seguem as bordas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Manto do Carmim · red-robe.png

Chave do catálogo **Red Robe** · nível mínimo 130.

```
Crie uma folha de sprites animada e original para Manto do Carmim, de O Confronto.
Desenho — Manto vazio de lã carmim com bainha de fio de cobre e broche de carvão polido. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A bainha ondula e o broche recebe luz quente.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Veste de Escamas de Seda da Primeira Era · royal-scale-robe-da-1-era.png

Chave do catálogo **Royal Scale Robe da 1ª Era** · nível mínimo 250 · item-base **Royal Scale Robe**.

```
Crie uma folha de sprites animada e original para Veste de Escamas de Seda da Primeira Era, de O Confronto.
Desenho — Veste de seda escura com painéis em escama e borda de ouro fosco. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo violeta passa pelo tecido.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça do Juramento Gravado da Primeira Era · magic-plate-armor-da-1-era.png

Chave do catálogo **Magic Plate Armor da 1ª Era** · nível mínimo 250 · item-base **Magic Plate Armor**.

```
Crie uma folha de sprites animada e original para Couraça do Juramento Gravado da Primeira Era, de O Confronto.
Desenho — Placas azul-ardósia encaixadas em cunha, filigrana de cobre e nó rúnico original no esterno. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O nó acende em ciano e percorre as juntas.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Manto do Carmim da Segunda Era · red-robe-da-2-era.png

Chave do catálogo **Red Robe da 2ª Era** · nível mínimo 400 · item-base **Red Robe**.

```
Crie uma folha de sprites animada e original para Manto do Carmim da Segunda Era, de O Confronto.
Desenho — Manto vazio de lã carmim com bainha de fio de cobre e broche de carvão polido. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A bainha ondula e o broche recebe luz quente.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça da Serpe Coroada da Segunda Era · royal-draken-mail-da-2-era.png

Chave do catálogo **Royal Draken Mail da 2ª Era** · nível mínimo 400 · item-base **Royal Draken Mail**.

```
Crie uma folha de sprites animada e original para Couraça da Serpe Coroada da Segunda Era, de O Confronto.
Desenho — Torso de escamas verde-petróleo sob meia couraça de bronze e fecho hexagonal. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo verde contorna as escamas.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Veste de Escamas de Seda da Terceira Era · royal-scale-robe-da-3-era.png

Chave do catálogo **Royal Scale Robe da 3ª Era** · nível mínimo 550 · item-base **Royal Scale Robe**.

```
Crie uma folha de sprites animada e original para Veste de Escamas de Seda da Terceira Era, de O Confronto.
Desenho — Veste de seda escura com painéis em escama e borda de ouro fosco. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo violeta passa pelo tecido.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Malha de Escamas Rubras da Terceira Era · dragon-scale-mail-da-3-era.png

Chave do catálogo **Dragon Scale Mail da 3ª Era** · nível mínimo 550 · item-base **Dragon Scale Mail**.

```
Crie uma folha de sprites animada e original para Malha de Escamas Rubras da Terceira Era, de O Confronto.
Desenho — Torso de escamas ferrugem com orlas de ferro e cintura escura. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasa baixa acende entre as escamas.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Manto do Carmim da Quarta Era · red-robe-da-4-era.png

Chave do catálogo **Red Robe da 4ª Era** · nível mínimo 700 · item-base **Red Robe**.

```
Crie uma folha de sprites animada e original para Manto do Carmim da Quarta Era, de O Confronto.
Desenho — Manto vazio de lã carmim com bainha de fio de cobre e broche de carvão polido. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A bainha ondula e o broche recebe luz quente.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça do Sol Martelado da Quarta Era · golden-armor-da-4-era.png

Chave do catálogo **Golden Armor da 4ª Era** · nível mínimo 700 · item-base **Golden Armor**.

```
Crie uma folha de sprites animada e original para Couraça do Sol Martelado da Quarta Era, de O Confronto.
Desenho — Armadura dourada fosca com placas escalonadas, gola escura e gravações em leque. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo abre e fecha como leque.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Veste de Escamas de Seda de Capriel · royal-scale-robe-de-capriel.png

Chave do catálogo **Royal Scale Robe de Capriel** · nível mínimo 850 · item-base **Royal Scale Robe**.

```
Crie uma folha de sprites animada e original para Veste de Escamas de Seda de Capriel, de O Confronto.
Desenho — Veste de seda escura com painéis em escama e borda de ouro fosco. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo violeta passa pelo tecido.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Couraça das Três Torres de Capriel · crown-armor-de-capriel.png

Chave do catálogo **Crown Armor de Capriel** · nível mínimo 850 · item-base **Crown Armor**.

```
Crie uma folha de sprites animada e original para Couraça das Três Torres de Capriel, de O Confronto.
Desenho — Peitoral azul-ardósia com três nervuras douradas no alto e ombreiras facetadas. Mostre apenas a peça vazia, em três quartos, com gola, ombreiras ou bainha legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — As nervuras recebem luz âmbar em sequência.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

### Elmos, capuzes e chapéus

#### Capuz de Couro do Vigia · leather-helmet.png

Chave do catálogo **Leather Helmet** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Capuz de Couro do Vigia, de O Confronto.
Desenho — Capuz aberto de couro escuro com protetores de orelha dobrados e costura espinha de peixe. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A luz percorre a costura.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo das Brasas Seladas · demon-helmet.png

Chave do catálogo **Demon Helmet** · nível mínimo 30.

```
Crie uma folha de sprites animada e original para Elmo das Brasas Seladas, de O Confronto.
Desenho — Elmo de ferro negro com duas lâminas recuadas e respiradouro de cobre em fendas verticais. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Três fendas acendem em brasa e apagam.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo de Latão Costurado · brass-helmet.png

Chave do catálogo **Brass Helmet** · nível mínimo 5.

```
Crie uma folha de sprites animada e original para Elmo de Latão Costurado, de O Confronto.
Desenho — Elmo aberto de latão com união marcada por grandes rebites e aba lateral curta. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Os rebites piscam em sequência.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo da Cunha de Aço · steel-helmet.png

Chave do catálogo **Steel Helmet** · nível mínimo 15.

```
Crie uma folha de sprites animada e original para Elmo da Cunha de Aço, de O Confronto.
Desenho — Elmo fechado de aço azulado com visor em cunha e dobradiça exposta. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo atravessa a fenda do visor.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo das Três Pontas · crown-helmet.png

Chave do catálogo **Crown Helmet** · nível mínimo 55.

```
Crie uma folha de sprites animada e original para Elmo das Três Pontas, de O Confronto.
Desenho — Elmo em aço escuro com três pontas baixas, cobre gravado e visor aberto. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O latão reflete da ponta central para as laterais.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo da Guarda Real · royal-helmet.png

Chave do catálogo **Royal Helmet** · nível mínimo 75.

```
Crie uma folha de sprites animada e original para Elmo da Guarda Real, de O Confronto.
Desenho — Elmo de aço polido com gola cor de vinho e crista única de latão. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Luz quente contorna a crista.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo de Ouro Batido · golden-helmet.png

Chave do catálogo **Golden Helmet** · nível mínimo 95.

```
Crie uma folha de sprites animada e original para Elmo de Ouro Batido, de O Confronto.
Desenho — Elmo dourado fosco de topo hexagonal com respiradouros em leque. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O reflexo acompanha as facetas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Capuz da Rocha Verde · terra-hood.png

Chave do catálogo **Terra Hood** · nível mínimo 45.

```
Crie uma folha de sprites animada e original para Capuz da Rocha Verde, de O Confronto.
Desenho — Capuz vazio de tecido ocre com costura verde e fivela de pedra. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A orla ondula e a pedra pulsa.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Chapéu do Riscador · hat-of-the-mad.png

Chave do catálogo **Hat of the Mad** · nível mínimo 70.

```
Crie uma folha de sprites animada e original para Chapéu do Riscador, de O Confronto.
Desenho — Chapéu de aba larga torta, tecido índigo, remendos e fita com marcas abstratas. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A ponta balança e duas marcas brilham em lilás.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo dos Flancos Alados · winged-helmet.png

Chave do catálogo **Winged Helmet** · nível mínimo 115.

```
Crie uma folha de sprites animada e original para Elmo dos Flancos Alados, de O Confronto.
Desenho — Elmo de aço escuro com aletas curtas de bronze voltadas para trás. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo alterna entre as aletas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo da Face Marcada · warrior-helmet.png

Chave do catálogo **Warrior Helmet** · nível mínimo 130.

```
Crie uma folha de sprites animada e original para Elmo da Face Marcada, de O Confronto.
Desenho — Elmo de ferro com faceira angular, três riscos diagonais e rebites de cobre. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo atravessa os riscos.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo do Caminho Selado · crusader-helmet.png

Chave do catálogo **Crusader Helmet** · nível mínimo 150.

```
Crie uma folha de sprites animada e original para Elmo do Caminho Selado, de O Confronto.
Desenho — Elmo fechado de aço fosco, fenda horizontal e placa frontal em degraus. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo breve passa pelo degrau central.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo da Guarda de Linha · legion-helmet.png

Chave do catálogo **Legion Helmet** · nível mínimo 175.

```
Crie uma folha de sprites animada e original para Elmo da Guarda de Linha, de O Confronto.
Desenho — Elmo bronzeado com protetores de bochecha articulados e crista baixa vinho. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A crista vibra e as placas refletem.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo da Vigília · dark-helmet.png

Chave do catálogo **Dark Helmet** · nível mínimo 200.

```
Crie uma folha de sprites animada e original para Elmo da Vigília, de O Confronto.
Desenho — Elmo fechado de ferro negro com crista curta e duas fendas lilás fracas. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um pulso contido passa pelas fendas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo de Rebites do Norte · viking-helmet.png

Chave do catálogo **Viking Helmet** · nível mínimo 225.

```
Crie uma folha de sprites animada e original para Elmo de Rebites do Norte, de O Confronto.
Desenho — Elmo de placas curvas com protetor de nariz bifurcado e malha na nuca. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo de gelo cruza os rebites.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo das Brasas Seladas da Primeira Era · demon-helmet-da-1-era.png

Chave do catálogo **Demon Helmet da 1ª Era** · nível mínimo 250 · item-base **Demon Helmet**.

```
Crie uma folha de sprites animada e original para Elmo das Brasas Seladas da Primeira Era, de O Confronto.
Desenho — Elmo de ferro negro com duas lâminas recuadas e respiradouro de cobre em fendas verticais. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Três fendas acendem em brasa e apagam.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo da Guarda Real da Segunda Era · royal-helmet-da-2-era.png

Chave do catálogo **Royal Helmet da 2ª Era** · nível mínimo 400 · item-base **Royal Helmet**.

```
Crie uma folha de sprites animada e original para Elmo da Guarda Real da Segunda Era, de O Confronto.
Desenho — Elmo de aço polido com gola cor de vinho e crista única de latão. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Luz quente contorna a crista.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo de Ouro Batido da Terceira Era · golden-helmet-da-3-era.png

Chave do catálogo **Golden Helmet da 3ª Era** · nível mínimo 550 · item-base **Golden Helmet**.

```
Crie uma folha de sprites animada e original para Elmo de Ouro Batido da Terceira Era, de O Confronto.
Desenho — Elmo dourado fosco de topo hexagonal com respiradouros em leque. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O reflexo acompanha as facetas.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo das Três Pontas da Quarta Era · crown-helmet-da-4-era.png

Chave do catálogo **Crown Helmet da 4ª Era** · nível mínimo 700 · item-base **Crown Helmet**.

```
Crie uma folha de sprites animada e original para Elmo das Três Pontas da Quarta Era, de O Confronto.
Desenho — Elmo em aço escuro com três pontas baixas, cobre gravado e visor aberto. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O latão reflete da ponta central para as laterais.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Elmo dos Flancos Alados de Capriel · winged-helmet-de-capriel.png

Chave do catálogo **Winged Helmet de Capriel** · nível mínimo 850 · item-base **Winged Helmet**.

```
Crie uma folha de sprites animada e original para Elmo dos Flancos Alados de Capriel, de O Confronto.
Desenho — Elmo de aço escuro com aletas curtas de bronze voltadas para trás. Mostre a peça vazia em três quartos para a direita, com visor ou abertura reconhecível.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo alterna entre as aletas.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

### Perneiras

#### Grevas de Sol Batido · golden-legs.png

Chave do catálogo **Golden Legs** · nível mínimo 25.

```
Crie uma folha de sprites animada e original para Grevas de Sol Batido, de O Confronto.
Desenho — Par de grevas de latão dourado com joelheiras hexagonais e faixas cor de vinho. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um filete dourado passa pelas faces batidas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Calças de Couro Rebitado · studded-legs.png

Chave do catálogo **Studded Legs** · nível mínimo 5.

```
Crie uma folha de sprites animada e original para Calças de Couro Rebitado, de O Confronto.
Desenho — Par de perneiras marrom com reforço de couro cruzado e rebites quadrados. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Luz quente acompanha os rebites.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Grevas de Placas Sobrepostas · plate-legs.png

Chave do catálogo **Plate Legs** · nível mínimo 15.

```
Crie uma folha de sprites animada e original para Grevas de Placas Sobrepostas, de O Confronto.
Desenho — Par de grevas de aço cinza com joelheira em cunha e placas rebitadas. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um brilho frio passa pelas junções.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Grevas do Vigia · knight-legs.png

Chave do catálogo **Knight Legs** · nível mínimo 40.

```
Crie uma folha de sprites animada e original para Grevas do Vigia, de O Confronto.
Desenho — Par de grevas de aço escuro com tiras vinho e placas inclinadas. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O brilho acompanha as inclinações.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Grevas das Três Torres · crown-legs.png

Chave do catálogo **Crown Legs** · nível mínimo 55.

```
Crie uma folha de sprites animada e original para Grevas das Três Torres, de O Confronto.
Desenho — Par de grevas azul-ardósia com três relevos dourados na joelheira. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Os relevos refletem em sequência.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Perneiras de Escama Rubra · dragon-scale-legs.png

Chave do catálogo **Dragon Scale Legs** · nível mínimo 85.

```
Crie uma folha de sprites animada e original para Perneiras de Escama Rubra, de O Confronto.
Desenho — Par de perneiras de escamas cor de ferrugem e presilhas de ferro escuro. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasa suave sobe por entre as escamas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Grevas de Sol Batido da Primeira Era · golden-legs-da-1-era.png

Chave do catálogo **Golden Legs da 1ª Era** · nível mínimo 250 · item-base **Golden Legs**.

```
Crie uma folha de sprites animada e original para Grevas de Sol Batido da Primeira Era, de O Confronto.
Desenho — Par de grevas de latão dourado com joelheiras hexagonais e faixas cor de vinho. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um filete dourado passa pelas faces batidas.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Perneiras de Escama Rubra da Segunda Era · dragon-scale-legs-da-2-era.png

Chave do catálogo **Dragon Scale Legs da 2ª Era** · nível mínimo 400 · item-base **Dragon Scale Legs**.

```
Crie uma folha de sprites animada e original para Perneiras de Escama Rubra da Segunda Era, de O Confronto.
Desenho — Par de perneiras de escamas cor de ferrugem e presilhas de ferro escuro. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasa suave sobe por entre as escamas.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Grevas das Três Torres da Terceira Era · crown-legs-da-3-era.png

Chave do catálogo **Crown Legs da 3ª Era** · nível mínimo 550 · item-base **Crown Legs**.

```
Crie uma folha de sprites animada e original para Grevas das Três Torres da Terceira Era, de O Confronto.
Desenho — Par de grevas azul-ardósia com três relevos dourados na joelheira. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Os relevos refletem em sequência.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Grevas do Vigia da Quarta Era · knight-legs-da-4-era.png

Chave do catálogo **Knight Legs da 4ª Era** · nível mínimo 700 · item-base **Knight Legs**.

```
Crie uma folha de sprites animada e original para Grevas do Vigia da Quarta Era, de O Confronto.
Desenho — Par de grevas de aço escuro com tiras vinho e placas inclinadas. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O brilho acompanha as inclinações.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Grevas de Placas Sobrepostas de Capriel · plate-legs-de-capriel.png

Chave do catálogo **Plate Legs de Capriel** · nível mínimo 850 · item-base **Plate Legs**.

```
Crie uma folha de sprites animada e original para Grevas de Placas Sobrepostas de Capriel, de O Confronto.
Desenho — Par de grevas de aço cinza com joelheira em cunha e placas rebitadas. Mostre o par vazio e ligeiramente escalonado, com joelheiras e tiras legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um brilho frio passa pelas junções.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

### Botas

#### Botas do Passo Leve · boots-of-haste.png

Chave do catálogo **Boots of Haste** · nível mínimo 20.

```
Crie uma folha de sprites animada e original para Botas do Passo Leve, de O Confronto.
Desenho — Botas estreitas de couro azul-petróleo, sola segmentada e tiras de cobre no calcanhar. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Duas linhas de vento contornam o calcanhar.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Botas do Caminhante · leather-boots.png

Chave do catálogo **Leather Boots** · nível mínimo 3.

```
Crie uma folha de sprites animada e original para Botas do Caminhante, de O Confronto.
Desenho — Par de botas baixas marrom com sola grossa, cadarço bege e cano dobrado. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O cadarço oscila e volta ao lugar.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Botas de Biqueira de Aço · steel-boots.png

Chave do catálogo **Steel Boots** · nível mínimo 35.

```
Crie uma folha de sprites animada e original para Botas de Biqueira de Aço, de O Confronto.
Desenho — Par de botas de cano médio com biqueira em quatro lâminas e couro grafite. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo atravessa as quatro lâminas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Botas de Ouro Martelado · golden-boots.png

Chave do catálogo **Golden Boots** · nível mínimo 80.

```
Crie uma folha de sprites animada e original para Botas de Ouro Martelado, de O Confronto.
Desenho — Par de botas de latão dourado com gomos no tornozelo e sola escura. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexos alternam entre os gomos.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Botas Gastas do Caminho de Brasa · worn-firewalker-boots.png

Chave do catálogo **Worn Firewalker Boots** · nível mínimo 140.

```
Crie uma folha de sprites animada e original para Botas Gastas do Caminho de Brasa, de O Confronto.
Desenho — Par de botas gastas de couro carvão com sola rachada e anéis de cobre no cano. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasas fracas aparecem nas rachaduras e apagam.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Botas de Camurça de Viagem · worn-soft-boots.png

Chave do catálogo **Worn Soft Boots** · nível mínimo 190.

```
Crie uma folha de sprites animada e original para Botas de Camurça de Viagem, de O Confronto.
Desenho — Par de botas flexíveis de camurça verde-oliva com remendos e cadarço claro. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O cano flexiona levemente.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Botas do Passo Leve da Primeira Era · boots-of-haste-da-1-era.png

Chave do catálogo **Boots of Haste da 1ª Era** · nível mínimo 250 · item-base **Boots of Haste**.

```
Crie uma folha de sprites animada e original para Botas do Passo Leve da Primeira Era, de O Confronto.
Desenho — Botas estreitas de couro azul-petróleo, sola segmentada e tiras de cobre no calcanhar. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Duas linhas de vento contornam o calcanhar.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Botas de Ouro Martelado da Segunda Era · golden-boots-da-2-era.png

Chave do catálogo **Golden Boots da 2ª Era** · nível mínimo 400 · item-base **Golden Boots**.

```
Crie uma folha de sprites animada e original para Botas de Ouro Martelado da Segunda Era, de O Confronto.
Desenho — Par de botas de latão dourado com gomos no tornozelo e sola escura. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexos alternam entre os gomos.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Botas de Biqueira de Aço da Terceira Era · steel-boots-da-3-era.png

Chave do catálogo **Steel Boots da 3ª Era** · nível mínimo 550 · item-base **Steel Boots**.

```
Crie uma folha de sprites animada e original para Botas de Biqueira de Aço da Terceira Era, de O Confronto.
Desenho — Par de botas de cano médio com biqueira em quatro lâminas e couro grafite. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo atravessa as quatro lâminas.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Botas de Camurça de Viagem da Quarta Era · worn-soft-boots-da-4-era.png

Chave do catálogo **Worn Soft Boots da 4ª Era** · nível mínimo 700 · item-base **Worn Soft Boots**.

```
Crie uma folha de sprites animada e original para Botas de Camurça de Viagem da Quarta Era, de O Confronto.
Desenho — Par de botas flexíveis de camurça verde-oliva com remendos e cadarço claro. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O cano flexiona levemente.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Botas do Passo Leve de Capriel · boots-of-haste-de-capriel.png

Chave do catálogo **Boots of Haste de Capriel** · nível mínimo 850 · item-base **Boots of Haste**.

```
Crie uma folha de sprites animada e original para Botas do Passo Leve de Capriel, de O Confronto.
Desenho — Botas estreitas de couro azul-petróleo, sola segmentada e tiras de cobre no calcanhar. Mostre o par vazio, uma bota atrás da outra, bicos para a direita.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Duas linhas de vento contornam o calcanhar.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

### Mochilas

#### Mochila de Caravana · backpack.png

Chave do catálogo **Backpack** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Mochila de Caravana, de O Confronto.
Desenho — Bolsa de lona verde-musgo com fole de couro, fivela quadrada e manta ocre enrolada. Vista de três quartos com fecho, aba e alças visíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A alça solta balança e a lona acomoda.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

### Amuletos e colares

#### Amuleto do Nó de Platina · platinum-amulet.png

Chave do catálogo **Platinum Amulet** · nível mínimo 10.

```
Crie uma folha de sprites animada e original para Amuleto do Nó de Platina, de O Confronto.
Desenho — Pingente trançado de platina fosca sobre cordão vinho com fecho de osso. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O contorno metálico acende em branco frio.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Colar da Escama de Brasa · dragon-necklace.png

Chave do catálogo **Dragon Necklace** · nível mínimo 15.

```
Crie uma folha de sprites animada e original para Colar da Escama de Brasa, de O Confronto.
Desenho — Colar com escama de cobre suspensa em correntes escuras. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasa alaranjada pulsa sob a escama.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Talismã dos Aros Cruzados · strange-talisman.png

Chave do catálogo **Strange Talisman** · nível mínimo 30.

```
Crie uma folha de sprites animada e original para Talismã dos Aros Cruzados, de O Confronto.
Desenho — Pingente de três aros irregulares em torno de uma semente violeta. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A semente oscila e acende os aros.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Amuleto da Pele de Basalto · stone-skin-amulet.png

Chave do catálogo **Stone Skin Amulet** · nível mínimo 45.

```
Crie uma folha de sprites animada e original para Amuleto da Pele de Basalto, de O Confronto.
Desenho — Pingente de basalto lascado preso em couro claro e resina âmbar. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo mineral percorre a aresta.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Colar da Geoda Fria · crystal-necklace.png

Chave do catálogo **Crystal Necklace** · nível mínimo 70.

```
Crie uma folha de sprites animada e original para Colar da Geoda Fria, de O Confronto.
Desenho — Colar de prata escura com geoda azul de interior facetado. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma cintilação ciano corre pelas facetas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Amuleto da Espiral de Ouro · golden-amulet.png

Chave do catálogo **Golden Amulet** · nível mínimo 150.

```
Crie uma folha de sprites animada e original para Amuleto da Espiral de Ouro, de O Confronto.
Desenho — Pingente de ouro envelhecido com espiral entrelaçada sobre cordão negro. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um brilho âmbar acompanha a espiral.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Amuleto do Nó de Platina da Primeira Era · platinum-amulet-da-1-era.png

Chave do catálogo **Platinum Amulet da 1ª Era** · nível mínimo 250 · item-base **Platinum Amulet**.

```
Crie uma folha de sprites animada e original para Amuleto do Nó de Platina da Primeira Era, de O Confronto.
Desenho — Pingente trançado de platina fosca sobre cordão vinho com fecho de osso. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O contorno metálico acende em branco frio.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Amuleto da Espiral de Ouro da Segunda Era · golden-amulet-da-2-era.png

Chave do catálogo **Golden Amulet da 2ª Era** · nível mínimo 400 · item-base **Golden Amulet**.

```
Crie uma folha de sprites animada e original para Amuleto da Espiral de Ouro da Segunda Era, de O Confronto.
Desenho — Pingente de ouro envelhecido com espiral entrelaçada sobre cordão negro. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um brilho âmbar acompanha a espiral.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Colar da Geoda Fria da Terceira Era · crystal-necklace-da-3-era.png

Chave do catálogo **Crystal Necklace da 3ª Era** · nível mínimo 550 · item-base **Crystal Necklace**.

```
Crie uma folha de sprites animada e original para Colar da Geoda Fria da Terceira Era, de O Confronto.
Desenho — Colar de prata escura com geoda azul de interior facetado. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma cintilação ciano corre pelas facetas.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Colar da Escama de Brasa da Quarta Era · dragon-necklace-da-4-era.png

Chave do catálogo **Dragon Necklace da 4ª Era** · nível mínimo 700 · item-base **Dragon Necklace**.

```
Crie uma folha de sprites animada e original para Colar da Escama de Brasa da Quarta Era, de O Confronto.
Desenho — Colar com escama de cobre suspensa em correntes escuras. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Brasa alaranjada pulsa sob a escama.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Amuleto da Pele de Basalto de Capriel · stone-skin-amulet-de-capriel.png

Chave do catálogo **Stone Skin Amulet de Capriel** · nível mínimo 850 · item-base **Stone Skin Amulet**.

```
Crie uma folha de sprites animada e original para Amuleto da Pele de Basalto de Capriel, de O Confronto.
Desenho — Pingente de basalto lascado preso em couro claro e resina âmbar. Deixe o pingente dominante, com cordão ou corrente em arco aberto.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo mineral percorre a aresta.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

### Anéis

#### Anel da Abóbada · ring-of-the-sky.png

Chave do catálogo **Ring of the Sky** · nível mínimo 20.

```
Crie uma folha de sprites animada e original para Anel da Abóbada, de O Confronto.
Desenho — Aro prateado aberto em duas pontas que sustentam uma pedra azul leitosa. Mostre o aro inclinado em três quartos, com a abertura e a montagem da pedra legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um ponto branco cruza a pedra em arco.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Anel da Geoda · crystal-ring.png

Chave do catálogo **Crystal Ring** · nível mínimo 60.

```
Crie uma folha de sprites animada e original para Anel da Geoda, de O Confronto.
Desenho — Aro de aço polido com cristal incolor preso por três garras de cobre. Mostre o aro inclinado em três quartos, com a abertura e a montagem da pedra legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Refração branca e ciano atravessa a pedra.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Anel da Abóbada da Primeira Era · ring-of-the-sky-da-1-era.png

Chave do catálogo **Ring of the Sky da 1ª Era** · nível mínimo 250 · item-base **Ring of the Sky**.

```
Crie uma folha de sprites animada e original para Anel da Abóbada da Primeira Era, de O Confronto.
Desenho — Aro prateado aberto em duas pontas que sustentam uma pedra azul leitosa. Mostre o aro inclinado em três quartos, com a abertura e a montagem da pedra legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um ponto branco cruza a pedra em arco.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Anel da Geoda da Segunda Era · crystal-ring-da-2-era.png

Chave do catálogo **Crystal Ring da 2ª Era** · nível mínimo 400 · item-base **Crystal Ring**.

```
Crie uma folha de sprites animada e original para Anel da Geoda da Segunda Era, de O Confronto.
Desenho — Aro de aço polido com cristal incolor preso por três garras de cobre. Mostre o aro inclinado em três quartos, com a abertura e a montagem da pedra legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Refração branca e ciano atravessa a pedra.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Anel da Abóbada da Terceira Era · ring-of-the-sky-da-3-era.png

Chave do catálogo **Ring of the Sky da 3ª Era** · nível mínimo 550 · item-base **Ring of the Sky**.

```
Crie uma folha de sprites animada e original para Anel da Abóbada da Terceira Era, de O Confronto.
Desenho — Aro prateado aberto em duas pontas que sustentam uma pedra azul leitosa. Mostre o aro inclinado em três quartos, com a abertura e a montagem da pedra legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um ponto branco cruza a pedra em arco.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Anel da Geoda da Quarta Era · crystal-ring-da-4-era.png

Chave do catálogo **Crystal Ring da 4ª Era** · nível mínimo 700 · item-base **Crystal Ring**.

```
Crie uma folha de sprites animada e original para Anel da Geoda da Quarta Era, de O Confronto.
Desenho — Aro de aço polido com cristal incolor preso por três garras de cobre. Mostre o aro inclinado em três quartos, com a abertura e a montagem da pedra legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Refração branca e ciano atravessa a pedra.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Anel da Abóbada de Capriel · ring-of-the-sky-de-capriel.png

Chave do catálogo **Ring of the Sky de Capriel** · nível mínimo 850 · item-base **Ring of the Sky**.

```
Crie uma folha de sprites animada e original para Anel da Abóbada de Capriel, de O Confronto.
Desenho — Aro prateado aberto em duas pontas que sustentam uma pedra azul leitosa. Mostre o aro inclinado em três quartos, com a abertura e a montagem da pedra legíveis.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um ponto branco cruza a pedra em arco.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

### Munições e runas

#### Flecha de Ponta Triangular · arrow.png

Chave do catálogo **Arrow** · nível mínimo 20.

```
Crie uma folha de sprites animada e original para Flecha de Ponta Triangular, de O Confronto.
Desenho — Flecha única de madeira clara, pena cinza e ponta triangular de ferro. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A pena vibra e o ferro cintila.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Flecha de Resina Verde · poison-arrow.png

Chave do catálogo **Poison Arrow** · nível mínimo 45.

```
Crie uma folha de sprites animada e original para Flecha de Resina Verde, de O Confronto.
Desenho — Flecha escura com ponta bifurcada selada com resina verde. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma gota luminosa desce pela ponta e recua.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Virote de Pena Curta · bolt.png

Chave do catálogo **Bolt** · nível mínimo 80.

```
Crie uma folha de sprites animada e original para Virote de Pena Curta, de O Confronto.
Desenho — Virote grosso de madeira escura com ponta quadrada e penas curtas ocre. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo curto passa pela ponta quadrada.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Flecha de Cápsula de Brasa · burst-arrow.png

Chave do catálogo **Burst Arrow** · nível mínimo 120.

```
Crie uma folha de sprites animada e original para Flecha de Cápsula de Brasa, de O Confronto.
Desenho — Flecha com cápsula de cerâmica cobre perto da ponta e pavio embutido. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma brasa pulsa sob a cerâmica, sem explosão que oculte o item.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Virote de Núcleo de Aço · power-bolt.png

Chave do catálogo **Power Bolt** · nível mínimo 170.

```
Crie uma folha de sprites animada e original para Virote de Núcleo de Aço, de O Confronto.
Desenho — Virote espesso com pontas escalonadas, colar de latão e penas pretas. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O núcleo recebe um reflexo firme e curto.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Faca de Arremesso Chanfrada · throwing-knife.png

Chave do catálogo **Throwing Knife** · nível mínimo 230.

```
Crie uma folha de sprites animada e original para Faca de Arremesso Chanfrada, de O Confronto.
Desenho — Faca curta equilibrada, lâmina de aço chanfrada e cabo sem guarda. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo corre do pomo à ponta.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa do Dardo Claro · light-magic-missile-rune.png

Chave do catálogo **Light Magic Missile Rune** · nível mínimo 20.

```
Crie uma folha de sprites animada e original para Runa do Dardo Claro, de O Confronto.
Desenho — Pedra fina cinza com um sulco ciano em forma de agulha. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um dardo de luz percorre o sulco.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa do Dardo Denso · heavy-magic-missile-rune.png

Chave do catálogo **Heavy Magic Missile Rune** · nível mínimo 45.

```
Crie uma folha de sprites animada e original para Runa do Dardo Denso, de O Confronto.
Desenho — Pedra escura trapezoidal com duas agulhas azuis encaixadas. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Dois traços azuis carregam e descarregam juntos.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa da Brasa Circular · fireball-rune.png

Chave do catálogo **Fireball Rune** · nível mínimo 70.

```
Crie uma folha de sprites animada e original para Runa da Brasa Circular, de O Confronto.
Desenho — Disco de argila escura com incisão circular e três pontos de brasa. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma brasa orbita o círculo gravado.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa do Sol de Cinza · great-fireball-rune.png

Chave do catálogo **Great Fireball Rune** · nível mínimo 100.

```
Crie uma folha de sprites animada e original para Runa do Sol de Cinza, de O Confronto.
Desenho — Placa de basalto com anéis quebrados e núcleo alaranjado. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O brilho avança pelos anéis e recua.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa da Fenda de Impacto · explosion-rune.png

Chave do catálogo **Explosion Rune** · nível mínimo 130.

```
Crie uma folha de sprites animada e original para Runa da Fenda de Impacto, de O Confronto.
Desenho — Placa de pedra ocre com três fraturas radiais profundas. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — As fraturas recebem uma descarga laranja em sequência.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa da Chama Interior · soulfire-rune.png

Chave do catálogo **Soulfire Rune** · nível mínimo 165.

```
Crie uma folha de sprites animada e original para Runa da Chama Interior, de O Confronto.
Desenho — Pedra negra fina com incisão em espiral e centro violeta. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Chama violeta gira dentro da incisão.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa do Último Sopro · sudden-death-rune.png

Chave do catálogo **Sudden Death Rune** · nível mínimo 210.

```
Crie uma folha de sprites animada e original para Runa do Último Sopro, de O Confronto.
Desenho — Fragmento de obsidiana com dois cortes que convergem para um ponto branco. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O ponto branco pisca entre dois pulsos índigo.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Virote de Núcleo de Aço da Primeira Era · power-bolt-da-1-era.png

Chave do catálogo **Power Bolt da 1ª Era** · nível mínimo 250 · item-base **Power Bolt**.

```
Crie uma folha de sprites animada e original para Virote de Núcleo de Aço da Primeira Era, de O Confronto.
Desenho — Virote espesso com pontas escalonadas, colar de latão e penas pretas. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O núcleo recebe um reflexo firme e curto.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa do Último Sopro da Primeira Era · sudden-death-rune-da-1-era.png

Chave do catálogo **Sudden Death Rune da 1ª Era** · nível mínimo 250 · item-base **Sudden Death Rune**.

```
Crie uma folha de sprites animada e original para Runa do Último Sopro da Primeira Era, de O Confronto.
Desenho — Fragmento de obsidiana com dois cortes que convergem para um ponto branco. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
Preserve a silhueta da família e redesenhe os acabamentos com bronze envelhecido, rebites de cobre e pátina turquesa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O ponto branco pisca entre dois pulsos índigo.
Linha 4 · quadros 13–16 — Use uma aura ciano-pátina contida e própria da Era. No pico, três pontos percorrem as bordas como sinais despertando.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Flecha de Cápsula de Brasa da Segunda Era · burst-arrow-da-2-era.png

Chave do catálogo **Burst Arrow da 2ª Era** · nível mínimo 400 · item-base **Burst Arrow**.

```
Crie uma folha de sprites animada e original para Flecha de Cápsula de Brasa da Segunda Era, de O Confronto.
Desenho — Flecha com cápsula de cerâmica cobre perto da ponta e pavio embutido. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma brasa pulsa sob a cerâmica, sem explosão que oculte o item.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa da Chama Interior da Segunda Era · soulfire-rune-da-2-era.png

Chave do catálogo **Soulfire Rune da 2ª Era** · nível mínimo 400 · item-base **Soulfire Rune**.

```
Crie uma folha de sprites animada e original para Runa da Chama Interior da Segunda Era, de O Confronto.
Desenho — Pedra negra fina com incisão em espiral e centro violeta. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
Preserve a silhueta da família e redesenhe os acabamentos com prata escovada, encaixes azul-aço e marcas de geada. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Chama violeta gira dentro da incisão.
Linha 4 · quadros 13–16 — Use uma aura azul-gelo contida e própria da Era. No pico, um arco de geada se desfaz em dois cristais.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Virote de Núcleo de Aço da Terceira Era · power-bolt-da-3-era.png

Chave do catálogo **Power Bolt da 3ª Era** · nível mínimo 550 · item-base **Power Bolt**.

```
Crie uma folha de sprites animada e original para Virote de Núcleo de Aço da Terceira Era, de O Confronto.
Desenho — Virote espesso com pontas escalonadas, colar de latão e penas pretas. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O núcleo recebe um reflexo firme e curto.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa do Último Sopro da Terceira Era · sudden-death-rune-da-3-era.png

Chave do catálogo **Sudden Death Rune da 3ª Era** · nível mínimo 550 · item-base **Sudden Death Rune**.

```
Crie uma folha de sprites animada e original para Runa do Último Sopro da Terceira Era, de O Confronto.
Desenho — Fragmento de obsidiana com dois cortes que convergem para um ponto branco. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
Preserve a silhueta da família e redesenhe os acabamentos com ferro azulado, incrustações de ametista e linhas quebradas. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O ponto branco pisca entre dois pulsos índigo.
Linha 4 · quadros 13–16 — Use uma aura violeta-ametista contida e própria da Era. No pico, dois fios violetas se cruzam e voltam ao encaixe.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Flecha de Cápsula de Brasa da Quarta Era · burst-arrow-da-4-era.png

Chave do catálogo **Burst Arrow da 4ª Era** · nível mínimo 700 · item-base **Burst Arrow**.

```
Crie uma folha de sprites animada e original para Flecha de Cápsula de Brasa da Quarta Era, de O Confronto.
Desenho — Flecha com cápsula de cerâmica cobre perto da ponta e pavio embutido. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma brasa pulsa sob a cerâmica, sem explosão que oculte o item.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa da Chama Interior da Quarta Era · soulfire-rune-da-4-era.png

Chave do catálogo **Soulfire Rune da 4ª Era** · nível mínimo 700 · item-base **Soulfire Rune**.

```
Crie uma folha de sprites animada e original para Runa da Chama Interior da Quarta Era, de O Confronto.
Desenho — Pedra negra fina com incisão em espiral e centro violeta. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
Preserve a silhueta da família e redesenhe os acabamentos com ferro carvão, latão aquecido e veios cor de brasa. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Chama violeta gira dentro da incisão.
Linha 4 · quadros 13–16 — Use uma aura laranja-brasa contida e própria da Era. No pico, três brasas seguem o contorno e desaparecem em sequência.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Virote de Núcleo de Aço de Capriel · power-bolt-de-capriel.png

Chave do catálogo **Power Bolt de Capriel** · nível mínimo 850 · item-base **Power Bolt**.

```
Crie uma folha de sprites animada e original para Virote de Núcleo de Aço de Capriel, de O Confronto.
Desenho — Virote espesso com pontas escalonadas, colar de latão e penas pretas. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O núcleo recebe um reflexo firme e curto.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

#### Runa da Chama Interior de Capriel · soulfire-rune-de-capriel.png

Chave do catálogo **Soulfire Rune de Capriel** · nível mínimo 850 · item-base **Soulfire Rune**.

```
Crie uma folha de sprites animada e original para Runa da Chama Interior de Capriel, de O Confronto.
Desenho — Pedra negra fina com incisão em espiral e centro violeta. Incline projéteis na diagonal para cima e à direita. Para runas, mostre face gravada e espessura.
Preserve a silhueta da família e redesenhe os acabamentos com aço azul-noite, ouro envelhecido e acentos vinho. Diferencie a Era também por relevos e encaixes.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Chama violeta gira dentro da incisão.
Linha 4 · quadros 13–16 — Use uma aura ouro pálido com acento vinho contida e própria da Era. No pico, um arco dourado incompleto se divide em três faíscas.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
Entregue a folha-base com o acabamento descrito. A camada de aprimoramento é composta separadamente.
```

### Poções

#### Frasco de Bálsamo Rubro · health-potion.png

Chave do catálogo **Health Potion** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Frasco de Bálsamo Rubro, de O Confronto.
Desenho — Ampola arredondada de vidro âmbar claro, rolha de cortiça e líquido rubro. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma bolha sobe e o líquido se assenta.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Ampola de Orvalho Azul · mana-potion.png

Chave do catálogo **Mana Potion** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Ampola de Orvalho Azul, de O Confronto.
Desenho — Ampola alongada de vidro claro com tampa de estanho e líquido azul. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma onda ciano sobe pelo gargalo.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Bálsamo Rubro Concentrado · strong-health-potion.png

Chave do catálogo **Strong Health Potion** · nível mínimo 50.

```
Crie uma folha de sprites animada e original para Bálsamo Rubro Concentrado, de O Confronto.
Desenho — Frasco baixo de vidro espesso com dois aros de cobre e líquido rubro escuro. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Duas bolhas vermelhas se unem e a superfície volta ao nível.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Bálsamo Rubro do Bastião · great-health-potion.png

Chave do catálogo **Great Health Potion** · nível mínimo 100.

```
Crie uma folha de sprites animada e original para Bálsamo Rubro do Bastião, de O Confronto.
Desenho — Frasco octogonal de vidro fumê com selo de cera vermelho e pé metálico. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma onda rubra pulsa atrás do vidro.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Bálsamo Rubro de Guerra · ultimate-health-potion.png

Chave do catálogo **Ultimate Health Potion** · nível mínimo 250.

```
Crie uma folha de sprites animada e original para Bálsamo Rubro de Guerra, de O Confronto.
Desenho — Frasco alto de vidro escarlate com tampa quadrada e duas hastes de latão protegendo o corpo. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma espiral rubra sobe dentro do frasco.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Elixir Rubro da Alvorada · supreme-health-potion.png

Chave do catálogo **Supreme Health Potion** · nível mínimo 450.

```
Crie uma folha de sprites animada e original para Elixir Rubro da Alvorada, de O Confronto.
Desenho — Frasco alto em forma de gota facetada com suporte de ouro envelhecido. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um núcleo rubro pulsa e ilumina as facetas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Orvalho Azul Concentrado · strong-mana-potion.png

Chave do catálogo **Strong Mana Potion** · nível mínimo 50.

```
Crie uma folha de sprites animada e original para Orvalho Azul Concentrado, de O Confronto.
Desenho — Frasco estreito de vidro azul com gargalo torcido e tampa de cobre. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Duas bolhas azuis sobem em sentidos alternados.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Orvalho do Meridiano · great-mana-potion.png

Chave do catálogo **Great Mana Potion** · nível mínimo 100.

```
Crie uma folha de sprites animada e original para Orvalho do Meridiano, de O Confronto.
Desenho — Frasco de seção triangular em vidro cobalto com selo prateado. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um arco ciano percorre a parede interna.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Elixir da Maré Estelar · ultimate-mana-potion.png

Chave do catálogo **Ultimate Mana Potion** · nível mínimo 250.

```
Crie uma folha de sprites animada e original para Elixir da Maré Estelar, de O Confronto.
Desenho — Frasco alongado com vidro índigo e três nervuras de prata escura. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Uma corrente azul com pontos brancos circula no líquido.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Mistura do Fôlego · great-spirit-potion.png

Chave do catálogo **Great Spirit Potion** · nível mínimo 100.

```
Crie uma folha de sprites animada e original para Mistura do Fôlego, de O Confronto.
Desenho — Frasco oval de duas câmaras visíveis, com uma solução rubra e outra ciano. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — As duas soluções avançam para o gargalo e recuam.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Elixir das Duas Correntes · ultimate-spirit-potion.png

Chave do catálogo **Ultimate Spirit Potion** · nível mínimo 250.

```
Crie uma folha de sprites animada e original para Elixir das Duas Correntes, de O Confronto.
Desenho — Frasco duplo alto com bico único e uma abraçadeira de bronze envelhecido. Mantenha o frasco fechado, em pé e visto em três quartos, com gargalo e líquido legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Correntes rubra e ciano formam uma trança dentro do vidro.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

### Materiais, pedra de proteção e moeda

#### Seixo do Voto · pedra-de-protecao.png

Chave do catálogo **Pedra de Proteção** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Seixo do Voto, de O Confronto.
Desenho — Seixo de ardósia redondo com nó de proteção entalhado e preenchido com bronze. Use uma vista de três quartos, com espessura, arestas e face principal legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um contorno âmbar fecha o nó e some.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Moeda do Portão · gold-coin.png

Chave do catálogo **Gold Coin** · nível mínimo 1.

```
Crie uma folha de sprites animada e original para Moeda do Portão, de O Confronto.
Desenho — Moeda grossa de ouro envelhecido com um portão de três traves em baixo relevo e borda serrilhada. Use uma vista de três quartos, com espessura, arestas e face principal legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um reflexo percorre o relevo sem girar a moeda.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Minério de Ferro · minerio-de-ferro.png

Chave do catálogo **Minério de Ferro** · nível mínimo 1 · faixa do material no Ferreiro 1.

```
Crie uma folha de sprites animada e original para Minério de Ferro, de O Confronto.
Desenho — Bloco irregular de rocha cinza com veios de ferro escuro e ferrugem fosca. Use uma vista de três quartos, com espessura, arestas e face principal legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Pequeno reflexo percorre o veio metálico.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Rubi Bruto · rubi-bruto.png

Chave do catálogo **Rubi Bruto** · nível mínimo 1 · faixa do material no Ferreiro 25.

```
Crie uma folha de sprites animada e original para Rubi Bruto, de O Confronto.
Desenho — Fragmento rubro triangular saindo de uma crosta marrom. Use uma vista de três quartos, com espessura, arestas e face principal legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo carmim entra por uma face e sai por outra.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Safira Bruta · safira-bruta.png

Chave do catálogo **Safira Bruta** · nível mínimo 1 · faixa do material no Ferreiro 60.

```
Crie uma folha de sprites animada e original para Safira Bruta, de O Confronto.
Desenho — Cristal azul cobalto irregular com inclusões branco-acinzentadas. Use uma vista de três quartos, com espessura, arestas e face principal legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — A luz percorre duas facetas em azul.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Esmeralda Bruta · esmeralda-bruta.png

Chave do catálogo **Esmeralda Bruta** · nível mínimo 1 · faixa do material no Ferreiro 100.

```
Crie uma folha de sprites animada e original para Esmeralda Bruta, de O Confronto.
Desenho — Prisma verde bruto com matriz de pedra cinza e uma fissura diagonal. Use uma vista de três quartos, com espessura, arestas e face principal legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Um pulso esmeralda segue a fissura.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Diamante Bruto · diamante-bruto.png

Chave do catálogo **Diamante Bruto** · nível mínimo 1 · faixa do material no Ferreiro 160.

```
Crie uma folha de sprites animada e original para Diamante Bruto, de O Confronto.
Desenho — Cristal incolor de três arestas nítidas preso a uma pequena rocha fosca. Use uma vista de três quartos, com espessura, arestas e face principal legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Faísca branca curta salta entre as arestas.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Lingote de Ouro · lingote-de-ouro.png

Chave do catálogo **Lingote de Ouro** · nível mínimo 1 · faixa do material no Ferreiro 250.

```
Crie uma folha de sprites animada e original para Lingote de Ouro, de O Confronto.
Desenho — Barra de ouro envelhecido com face martelada e marca abstrata do forno. Use uma vista de três quartos, com espessura, arestas e face principal legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Reflexo quente percorre a face martelada.
Linha 4 · quadros 13–16 — Segure o ponto de maior leitura do reflexo ou da reação descrita na linha 3.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Orbe de Almas · orbe-de-almas.png

Chave do catálogo **Orbe de Almas** · nível mínimo 1 · faixa do material no Ferreiro 550.

```
Crie uma folha de sprites animada e original para Orbe de Almas, de O Confronto.
Desenho — Orbe fumê irregular preso por três garras de metal escuro com névoa violeta interna. Use uma vista de três quartos, com espessura, arestas e face principal legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — Duas espirais violetas giram dentro do vidro.
Linha 4 · quadros 13–16 — Realce a névoa com um halo violeta interno e dois pontos fosforescentes.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```

#### Essência Demoníaca · essencia-demoniaca.png

Chave do catálogo **Essência Demoníaca** · nível mínimo 1 · faixa do material no Ferreiro 850.

```
Crie uma folha de sprites animada e original para Essência Demoníaca, de O Confronto.
Desenho — Fragmento de obsidiana com núcleo líquido magenta aprisionado em fissuras. Use uma vista de três quartos, com espessura, arestas e face principal legíveis.
PNG RGBA de 1024 × 1536 px, com fundo transparente. Grade de 4 colunas × 6 linhas, um quadro de 256 × 256 px por célula. Mesmo ângulo, escala e pivô nos 24 quadros. Centro em x=128, base visual em y=219, margem transparente mínima de 16 px nas bordas, inclusive para efeitos. A peça ocupa cerca de 70% da maior dimensão da célula. Sem texto, moldura, grade visível, chão ou sombra projetada.
Pixel art medieval nítida de O Confronto, com contorno escuro, luz do alto à esquerda, materiais bem separados e textura em grupos de pixels. Detalhe os encaixes sem sacrificar a silhueta a 32 × 32 px. Crie ornamentos originais e evite imitar sprites do Tibia ou de outros jogos.
Linha 1 · quadros 01–04 — Apresente o item em repouso e inicie o movimento sutilmente. O 01 serve de ícone estático.
Linha 2 · quadros 05–08 — Intensifique o movimento sem deslocar o pivô.
Linha 3 · quadros 09–12 — O núcleo pulsa em magenta e os veios escurecem.
Linha 4 · quadros 13–16 — Realce as fissuras com dois filetes magenta e uma faísca de brasa.
Linha 5 · quadros 17–20 — Dissipe o efeito em passos curtos, mantendo a silhueta legível.
Linha 6 · quadros 21–24 — Recupere a pose e a iluminação. Faça o 24 voltar ao 01 suavemente, sem duplicar o quadro inicial.
```
