-- CreateTable
CREATE TABLE `GuildDonation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guildId` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,
    `amount` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `GuildDonation_guildId_createdAt_idx`(`guildId`, `createdAt`),
    INDEX `GuildDonation_characterId_idx`(`characterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GuildChestClaim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `guildId` INTEGER NOT NULL,
    `kind` VARCHAR(8) NOT NULL,
    `period` VARCHAR(10) NOT NULL,
    `gold` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `GuildChestClaim_guildId_kind_period_idx`(`guildId`, `kind`, `period`),
    UNIQUE INDEX `GuildChestClaim_characterId_kind_period_key`(`characterId`, `kind`, `period`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GuildDonation` ADD CONSTRAINT `GuildDonation_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuildDonation` ADD CONSTRAINT `GuildDonation_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuildChestClaim` ADD CONSTRAINT `GuildChestClaim_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

