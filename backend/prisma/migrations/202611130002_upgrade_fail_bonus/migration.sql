-- Falha que acumula chance no Ferreiro (shared/economy.ts, upgrade.failBonus*): falhas seguidas de cada exemplar.
-- Migração aditiva: só acrescenta a coluna, com padrão 0. Zera no acerto, ao reforjar e quando o item muda de dono pelo Mercado.
-- AlterTable
ALTER TABLE `InventoryItem` ADD COLUMN `upgradeFails` INTEGER NOT NULL DEFAULT 0;
