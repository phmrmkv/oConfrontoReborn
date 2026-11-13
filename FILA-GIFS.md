# Fila de GIFs de itens ainda faltando

Como salvar: gere o GIF 128×128 do item e grave em `frontend/public/assets/items/` da pasta principal do projeto, com exatamente o nome indicado em cada entrada.
Depois rode `npm run build` (ou abra pelo `iniciar.bat`) para o `npm run art` atualizar `itemArt.json` e o jogo passar a usar o GIF.
Os prompts abaixo foram copiados do `art-items.md` (pedem a folha 4×6 de 24 quadros); monte o GIF de 128×128 a partir dela. Conferido em 2026-11-13: 118 GIFs existem, 72 dos 190 itens do catálogo ainda não têm GIF.

## Resumo

- Seção 1 (itens que o jogador vê em toda parte): 13
- Seção 2 (itens-base sem GIF): 31
- Seção 3 (variantes sem GIF cujo item-base também não tem GIF, mostram bloco com iniciais): 20
- Seção 4 (variantes cujo item-base já tem GIF, só se quiser a versão própria): 8
- Total: 72

## 1. Itens que o jogador vê em toda parte

Gold Coin é item do catálogo (LOOT), então vale como ícone da moeda de ouro.

#### Gold Coin · `gold-coin.gif`

Título no art-items.md: Moeda do Portão

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

#### Backpack · `backpack.gif`

Título no art-items.md: Mochila de Caravana

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

#### Mana Potion · `mana-potion.gif`

Título no art-items.md: Ampola de Orvalho Azul

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

#### Strong Health Potion · `strong-health-potion.gif`

Título no art-items.md: Bálsamo Rubro Concentrado

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

#### Great Health Potion · `great-health-potion.gif`

Título no art-items.md: Bálsamo Rubro do Bastião

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

#### Ultimate Health Potion · `ultimate-health-potion.gif`

Título no art-items.md: Bálsamo Rubro de Guerra

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

#### Supreme Health Potion · `supreme-health-potion.gif`

Título no art-items.md: Elixir Rubro da Alvorada

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

#### Strong Mana Potion · `strong-mana-potion.gif`

Título no art-items.md: Orvalho Azul Concentrado

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

#### Great Mana Potion · `great-mana-potion.gif`

Título no art-items.md: Orvalho do Meridiano

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

#### Ultimate Mana Potion · `ultimate-mana-potion.gif`

Título no art-items.md: Elixir da Maré Estelar

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

#### Great Spirit Potion · `great-spirit-potion.gif`

Título no art-items.md: Mistura do Fôlego

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

#### Ultimate Spirit Potion · `ultimate-spirit-potion.gif`

Título no art-items.md: Elixir das Duas Correntes

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

#### Pedra de Proteção · `pedra-de-protecao.gif`

Título no art-items.md: Seixo do Voto

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

## 2. Itens-base sem GIF

Ordem: munições, runas, amuletos, anéis, Crown Armor, Leather Boots e os 8 materiais do Ferreiro.

#### Arrow · `arrow.gif`

Título no art-items.md: Flecha de Ponta Triangular

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

#### Poison Arrow · `poison-arrow.gif`

Título no art-items.md: Flecha de Resina Verde

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

#### Bolt · `bolt.gif`

Título no art-items.md: Virote de Pena Curta

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

#### Burst Arrow · `burst-arrow.gif`

Título no art-items.md: Flecha de Cápsula de Brasa

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

#### Power Bolt · `power-bolt.gif`

Título no art-items.md: Virote de Núcleo de Aço

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

#### Throwing Knife · `throwing-knife.gif`

Título no art-items.md: Faca de Arremesso Chanfrada

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

#### Light Magic Missile Rune · `light-magic-missile-rune.gif`

Título no art-items.md: Runa do Dardo Claro

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

#### Heavy Magic Missile Rune · `heavy-magic-missile-rune.gif`

Título no art-items.md: Runa do Dardo Denso

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

#### Fireball Rune · `fireball-rune.gif`

Título no art-items.md: Runa da Brasa Circular

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

#### Great Fireball Rune · `great-fireball-rune.gif`

Título no art-items.md: Runa do Sol de Cinza

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

#### Explosion Rune · `explosion-rune.gif`

Título no art-items.md: Runa da Fenda de Impacto

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

#### Soulfire Rune · `soulfire-rune.gif`

Título no art-items.md: Runa da Chama Interior

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

#### Sudden Death Rune · `sudden-death-rune.gif`

Título no art-items.md: Runa do Último Sopro

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

#### Platinum Amulet · `platinum-amulet.gif`

Título no art-items.md: Amuleto do Nó de Platina

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

#### Dragon Necklace · `dragon-necklace.gif`

Título no art-items.md: Colar da Escama de Brasa

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

#### Strange Talisman · `strange-talisman.gif`

Título no art-items.md: Talismã dos Aros Cruzados

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

#### Stone Skin Amulet · `stone-skin-amulet.gif`

Título no art-items.md: Amuleto da Pele de Basalto

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

#### Crystal Necklace · `crystal-necklace.gif`

Título no art-items.md: Colar da Geoda Fria

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

#### Golden Amulet · `golden-amulet.gif`

Título no art-items.md: Amuleto da Espiral de Ouro

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

#### Ring of the Sky · `ring-of-the-sky.gif`

Título no art-items.md: Anel da Abóbada

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

#### Crystal Ring · `crystal-ring.gif`

Título no art-items.md: Anel da Geoda

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

#### Crown Armor · `crown-armor.gif`

Título no art-items.md: Couraça das Três Torres

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

#### Leather Boots · `leather-boots.gif`

Título no art-items.md: Botas do Caminhante

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

#### Minério de Ferro · `minerio-de-ferro.gif`

Título no art-items.md: Minério de Ferro

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

#### Rubi Bruto · `rubi-bruto.gif`

Título no art-items.md: Rubi Bruto

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

#### Safira Bruta · `safira-bruta.gif`

Título no art-items.md: Safira Bruta

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

#### Esmeralda Bruta · `esmeralda-bruta.gif`

Título no art-items.md: Esmeralda Bruta

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

#### Diamante Bruto · `diamante-bruto.gif`

Título no art-items.md: Diamante Bruto

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

#### Lingote de Ouro · `lingote-de-ouro.gif`

Título no art-items.md: Lingote de Ouro

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

#### Orbe de Almas · `orbe-de-almas.gif`

Título no art-items.md: Orbe de Almas

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

#### Essência Demoníaca · `essencia-demoniaca.gif`

Título no art-items.md: Essência Demoníaca

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

## 3. Variantes sem GIF cujo item-base também não tem GIF

Gere o item-base (seção 2) primeiro: o prompt da variante pede a arte do item-base como referência de família visual. Quando o base ganhar GIF, a variante passa a mostrar a figura dele, e estes GIFs próprios ficam opcionais.

#### Power Bolt da 1ª Era · `power-bolt-da-1-era.gif`

Título no art-items.md: Virote de Núcleo de Aço da Primeira Era

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

#### Sudden Death Rune da 1ª Era · `sudden-death-rune-da-1-era.gif`

Título no art-items.md: Runa do Último Sopro da Primeira Era

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

#### Platinum Amulet da 1ª Era · `platinum-amulet-da-1-era.gif`

Título no art-items.md: Amuleto do Nó de Platina da Primeira Era

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

#### Ring of the Sky da 1ª Era · `ring-of-the-sky-da-1-era.gif`

Título no art-items.md: Anel da Abóbada da Primeira Era

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

#### Burst Arrow da 2ª Era · `burst-arrow-da-2-era.gif`

Título no art-items.md: Flecha de Cápsula de Brasa da Segunda Era

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

#### Soulfire Rune da 2ª Era · `soulfire-rune-da-2-era.gif`

Título no art-items.md: Runa da Chama Interior da Segunda Era

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

#### Golden Amulet da 2ª Era · `golden-amulet-da-2-era.gif`

Título no art-items.md: Amuleto da Espiral de Ouro da Segunda Era

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

#### Crystal Ring da 2ª Era · `crystal-ring-da-2-era.gif`

Título no art-items.md: Anel da Geoda da Segunda Era

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

#### Power Bolt da 3ª Era · `power-bolt-da-3-era.gif`

Título no art-items.md: Virote de Núcleo de Aço da Terceira Era

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

#### Sudden Death Rune da 3ª Era · `sudden-death-rune-da-3-era.gif`

Título no art-items.md: Runa do Último Sopro da Terceira Era

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

#### Crystal Necklace da 3ª Era · `crystal-necklace-da-3-era.gif`

Título no art-items.md: Colar da Geoda Fria da Terceira Era

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

#### Ring of the Sky da 3ª Era · `ring-of-the-sky-da-3-era.gif`

Título no art-items.md: Anel da Abóbada da Terceira Era

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

#### Burst Arrow da 4ª Era · `burst-arrow-da-4-era.gif`

Título no art-items.md: Flecha de Cápsula de Brasa da Quarta Era

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

#### Soulfire Rune da 4ª Era · `soulfire-rune-da-4-era.gif`

Título no art-items.md: Runa da Chama Interior da Quarta Era

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

#### Dragon Necklace da 4ª Era · `dragon-necklace-da-4-era.gif`

Título no art-items.md: Colar da Escama de Brasa da Quarta Era

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

#### Crystal Ring da 4ª Era · `crystal-ring-da-4-era.gif`

Título no art-items.md: Anel da Geoda da Quarta Era

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

#### Power Bolt de Capriel · `power-bolt-de-capriel.gif`

Título no art-items.md: Virote de Núcleo de Aço de Capriel

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

#### Soulfire Rune de Capriel · `soulfire-rune-de-capriel.gif`

Título no art-items.md: Runa da Chama Interior de Capriel

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

#### Stone Skin Amulet de Capriel · `stone-skin-amulet-de-capriel.gif`

Título no art-items.md: Amuleto da Pele de Basalto de Capriel

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

#### Ring of the Sky de Capriel · `ring-of-the-sky-de-capriel.gif`

Título no art-items.md: Anel da Abóbada de Capriel

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

## 4. Já aparecem com a figura do item-base; gerar só se quiser a versão própria

- Magic Longsword da 1ª Era · `magic-longsword-da-1-era.gif` (base: `magic-longsword.gif`)
- Dragon Scale Legs da 2ª Era · `dragon-scale-legs-da-2-era.gif` (base: `dragon-scale-legs.gif`)
- Golden Boots da 2ª Era · `golden-boots-da-2-era.gif` (base: `golden-boots.gif`)
- Fiery Barbarian Axe da 3ª Era · `fiery-barbarian-axe-da-3-era.gif` (base: `fiery-barbarian-axe.gif`)
- Golden Helmet da 3ª Era · `golden-helmet-da-3-era.gif` (base: `golden-helmet.gif`)
- Steel Boots da 3ª Era · `steel-boots-da-3-era.gif` (base: `steel-boots.gif`)
- Worn Soft Boots da 4ª Era · `worn-soft-boots-da-4-era.gif` (base: `worn-soft-boots.gif`)
- Boots of Haste de Capriel · `boots-of-haste-de-capriel.gif` (base: `boots-of-haste.gif`)
