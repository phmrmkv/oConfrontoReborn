-- Gemas (moeda da conta comprada com dinheiro real pelo Mercado Pago) e Premium ativado com gemas.
-- Migração aditiva: saldo começa em 0, pedidos antigos continuam como estão (gems = 0 = venda direta do Premium, legado).
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `gems` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `PremiumOrder` ADD COLUMN `gems` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `packKey` VARCHAR(16) NULL;

-- AlterTable
ALTER TABLE `PremiumPeriod` ADD COLUMN `gemsSpent` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `GemLedger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountId` INTEGER NOT NULL,
    `delta` INTEGER NOT NULL,
    `balanceAfter` INTEGER NOT NULL,
    `reason` VARCHAR(24) NOT NULL,
    `refType` VARCHAR(24) NULL,
    `refId` INTEGER NULL,
    `note` VARCHAR(500) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `GemLedger_accountId_id_idx`(`accountId`, `id`),
    INDEX `GemLedger_reason_createdAt_idx`(`reason`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GemLedger` ADD CONSTRAINT `GemLedger_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
