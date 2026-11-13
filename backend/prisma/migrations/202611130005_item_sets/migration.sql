-- Conjuntos das Eras (shared/itemSets.ts): a qual conjunto cada item pertence. Os valores vêm do catálogo (npm run seed).
-- Migração aditiva: só acrescenta a coluna, vazia por padrão.
-- AlterTable
ALTER TABLE `ItemBlueprint` ADD COLUMN `setKey` VARCHAR(16) NULL;
