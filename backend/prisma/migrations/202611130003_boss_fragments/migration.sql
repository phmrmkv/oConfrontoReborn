-- Fragmentos de chefe (plano de itens, Fase 2): cada vitória contra chefe dá fragmentos; o Ferreiro os usa para subir a raridade
-- de um exemplar em um degrau ("despertar"). Ficam no personagem e não são negociáveis.
-- Migração aditiva: só acrescenta a coluna, com padrão 0.
-- AlterTable
ALTER TABLE `Character` ADD COLUMN `bossFragments` INTEGER NOT NULL DEFAULT 0;
