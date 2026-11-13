-- Comércio limitado (shared/binding.ts): estado de vínculo de cada exemplar.
-- Migração aditiva: só acrescenta colunas com padrão "livre". Tudo o que já existe continua livre; ninguém perde o que tinha.
-- AlterTable
ALTER TABLE `InventoryItem` ADD COLUMN `bound` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `bindOnEquip` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `MarketListing` ADD COLUMN `bindOnEquip` BOOLEAN NOT NULL DEFAULT false;
