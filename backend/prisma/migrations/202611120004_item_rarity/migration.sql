-- Raridade do exemplar (0 = Comum, 1 = Incomum, 2 = Raro, 3 = Épico, 4 = Lendário, 5 = Mítico; regras em shared/rarity.ts).
-- Migração aditiva: só acrescenta a coluna. Tudo o que já existe (mochilas, anúncios, extrato, espólios) fica Comum.
-- AlterTable
ALTER TABLE `InventoryItem` ADD COLUMN `rarity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `MarketListing` ADD COLUMN `rarity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ItemLedger` ADD COLUMN `rarity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `DuelLoot` ADD COLUMN `rarity` INTEGER NOT NULL DEFAULT 0;
