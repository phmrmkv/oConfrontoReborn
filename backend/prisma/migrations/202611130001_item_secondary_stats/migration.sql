-- Atributos secundários dos equipamentos (shared/itemStats.ts): dano crítico, roubo de vida, poder de cura e resistência a efeitos, em %.
-- Migração aditiva: só acrescenta colunas com padrão 0. Os valores de cada item vêm do catálogo (npm run seed, que o iniciar.bat roda).
-- AlterTable
ALTER TABLE `ItemBlueprint` ADD COLUMN `critDamage` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `lifeSteal` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `healPower` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `statusResistance` INTEGER NOT NULL DEFAULT 0;
