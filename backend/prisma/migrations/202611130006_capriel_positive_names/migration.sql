-- Capriel só empresta o nome ao que é bom (decisão do dono em 2026-11-13).
-- Migração só de dados: renomeia linhas do catálogo no lugar (mesmos ids), então batalhas, tarefas, saques, mochila,
-- Mercado e extrato continuam ligados. Cada troca só acontece se o nome novo ainda não existe (nunca falha por nome repetido);
-- o seed se recusa a rodar enquanto sobrar nome antigo, então a ordem certa é sempre migração e depois seed.
-- 1) As 10 criaturas da região final (Vale da Perdição) deixam "… de Capriel" e passam a "… da Perdição".
-- 2) As tarefas de caça delas ("Caçada: <nome>") acompanham.
-- 3) A runa da linha de Capriel troca de família: "Sudden Death Rune de Capriel" (Runa do Último Sopro de Capriel) vira
--    "Soulfire Rune de Capriel" (Runa da Chama Interior de Capriel), com os mesmos atributos e a figura da Soulfire Rune.
-- 4) O histórico de aventura passa a mostrar os nomes novos.

-- 1) Criaturas
UPDATE `Monster` AS m LEFT JOIN `Monster` AS taken ON taken.`name` = 'Elf Arcanist da Perdição'
  SET m.`name` = 'Elf Arcanist da Perdição' WHERE m.`name` = 'Elf Arcanist de Capriel' AND taken.`id` IS NULL;
UPDATE `Monster` AS m LEFT JOIN `Monster` AS taken ON taken.`name` = 'Young Sea Serpent da Perdição'
  SET m.`name` = 'Young Sea Serpent da Perdição' WHERE m.`name` = 'Young Sea Serpent de Capriel' AND taken.`id` IS NULL;
UPDATE `Monster` AS m LEFT JOIN `Monster` AS taken ON taken.`name` = 'Wailing Widow da Perdição'
  SET m.`name` = 'Wailing Widow da Perdição' WHERE m.`name` = 'Wailing Widow de Capriel' AND taken.`id` IS NULL;
UPDATE `Monster` AS m LEFT JOIN `Monster` AS taken ON taken.`name` = 'Black Knight da Perdição'
  SET m.`name` = 'Black Knight da Perdição' WHERE m.`name` = 'Black Knight de Capriel' AND taken.`id` IS NULL;
UPDATE `Monster` AS m LEFT JOIN `Monster` AS taken ON taken.`name` = 'Hero da Perdição'
  SET m.`name` = 'Hero da Perdição' WHERE m.`name` = 'Hero de Capriel' AND taken.`id` IS NULL;
UPDATE `Monster` AS m LEFT JOIN `Monster` AS taken ON taken.`name` = 'Warlock da Perdição'
  SET m.`name` = 'Warlock da Perdição' WHERE m.`name` = 'Warlock de Capriel' AND taken.`id` IS NULL;
UPDATE `Monster` AS m LEFT JOIN `Monster` AS taken ON taken.`name` = 'Fire Devil da Perdição'
  SET m.`name` = 'Fire Devil da Perdição' WHERE m.`name` = 'Fire Devil de Capriel' AND taken.`id` IS NULL;
UPDATE `Monster` AS m LEFT JOIN `Monster` AS taken ON taken.`name` = 'Giant Spider da Perdição'
  SET m.`name` = 'Giant Spider da Perdição' WHERE m.`name` = 'Giant Spider de Capriel' AND taken.`id` IS NULL;
UPDATE `Monster` AS m LEFT JOIN `Monster` AS taken ON taken.`name` = 'Dragon Lord da Perdição'
  SET m.`name` = 'Dragon Lord da Perdição' WHERE m.`name` = 'Dragon Lord de Capriel' AND taken.`id` IS NULL;
UPDATE `Monster` AS m LEFT JOIN `Monster` AS taken ON taken.`name` = 'Demon da Perdição'
  SET m.`name` = 'Demon da Perdição' WHERE m.`name` = 'Demon de Capriel' AND taken.`id` IS NULL;

-- 2) Tarefas de caça
UPDATE `TaskBlueprint` AS t LEFT JOIN `TaskBlueprint` AS taken ON taken.`title` = 'Caçada: Elf Arcanist da Perdição'
  SET t.`title` = 'Caçada: Elf Arcanist da Perdição' WHERE t.`title` = 'Caçada: Elf Arcanist de Capriel' AND taken.`id` IS NULL;
UPDATE `TaskBlueprint` AS t LEFT JOIN `TaskBlueprint` AS taken ON taken.`title` = 'Caçada: Young Sea Serpent da Perdição'
  SET t.`title` = 'Caçada: Young Sea Serpent da Perdição' WHERE t.`title` = 'Caçada: Young Sea Serpent de Capriel' AND taken.`id` IS NULL;
UPDATE `TaskBlueprint` AS t LEFT JOIN `TaskBlueprint` AS taken ON taken.`title` = 'Caçada: Wailing Widow da Perdição'
  SET t.`title` = 'Caçada: Wailing Widow da Perdição' WHERE t.`title` = 'Caçada: Wailing Widow de Capriel' AND taken.`id` IS NULL;
UPDATE `TaskBlueprint` AS t LEFT JOIN `TaskBlueprint` AS taken ON taken.`title` = 'Caçada: Black Knight da Perdição'
  SET t.`title` = 'Caçada: Black Knight da Perdição' WHERE t.`title` = 'Caçada: Black Knight de Capriel' AND taken.`id` IS NULL;
UPDATE `TaskBlueprint` AS t LEFT JOIN `TaskBlueprint` AS taken ON taken.`title` = 'Caçada: Hero da Perdição'
  SET t.`title` = 'Caçada: Hero da Perdição' WHERE t.`title` = 'Caçada: Hero de Capriel' AND taken.`id` IS NULL;
UPDATE `TaskBlueprint` AS t LEFT JOIN `TaskBlueprint` AS taken ON taken.`title` = 'Caçada: Warlock da Perdição'
  SET t.`title` = 'Caçada: Warlock da Perdição' WHERE t.`title` = 'Caçada: Warlock de Capriel' AND taken.`id` IS NULL;
UPDATE `TaskBlueprint` AS t LEFT JOIN `TaskBlueprint` AS taken ON taken.`title` = 'Caçada: Fire Devil da Perdição'
  SET t.`title` = 'Caçada: Fire Devil da Perdição' WHERE t.`title` = 'Caçada: Fire Devil de Capriel' AND taken.`id` IS NULL;
UPDATE `TaskBlueprint` AS t LEFT JOIN `TaskBlueprint` AS taken ON taken.`title` = 'Caçada: Giant Spider da Perdição'
  SET t.`title` = 'Caçada: Giant Spider da Perdição' WHERE t.`title` = 'Caçada: Giant Spider de Capriel' AND taken.`id` IS NULL;
UPDATE `TaskBlueprint` AS t LEFT JOIN `TaskBlueprint` AS taken ON taken.`title` = 'Caçada: Dragon Lord da Perdição'
  SET t.`title` = 'Caçada: Dragon Lord da Perdição' WHERE t.`title` = 'Caçada: Dragon Lord de Capriel' AND taken.`id` IS NULL;
UPDATE `TaskBlueprint` AS t LEFT JOIN `TaskBlueprint` AS taken ON taken.`title` = 'Caçada: Demon da Perdição'
  SET t.`title` = 'Caçada: Demon da Perdição' WHERE t.`title` = 'Caçada: Demon de Capriel' AND taken.`id` IS NULL;

-- 3) Runa
UPDATE `ItemBlueprint` AS i
  LEFT JOIN `ItemBlueprint` AS taken ON taken.`name` = 'Soulfire Rune de Capriel'
  LEFT JOIN `ItemBlueprint` AS base ON base.`name` = 'Soulfire Rune'
  SET i.`name` = 'Soulfire Rune de Capriel', i.`spriteUrl` = COALESCE(base.`spriteUrl`, i.`spriteUrl`)
  WHERE i.`name` = 'Sudden Death Rune de Capriel' AND taken.`id` IS NULL;

-- 4) Histórico de aventura (só o nome muda; o evento continua o mesmo)
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Elf Arcanist de Capriel', 'Elf Arcanist da Perdição'), `description` = REPLACE(`description`, 'Elf Arcanist de Capriel', 'Elf Arcanist da Perdição')
  WHERE `title` LIKE '%Elf Arcanist de Capriel%' OR `description` LIKE '%Elf Arcanist de Capriel%';
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Young Sea Serpent de Capriel', 'Young Sea Serpent da Perdição'), `description` = REPLACE(`description`, 'Young Sea Serpent de Capriel', 'Young Sea Serpent da Perdição')
  WHERE `title` LIKE '%Young Sea Serpent de Capriel%' OR `description` LIKE '%Young Sea Serpent de Capriel%';
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Wailing Widow de Capriel', 'Wailing Widow da Perdição'), `description` = REPLACE(`description`, 'Wailing Widow de Capriel', 'Wailing Widow da Perdição')
  WHERE `title` LIKE '%Wailing Widow de Capriel%' OR `description` LIKE '%Wailing Widow de Capriel%';
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Black Knight de Capriel', 'Black Knight da Perdição'), `description` = REPLACE(`description`, 'Black Knight de Capriel', 'Black Knight da Perdição')
  WHERE `title` LIKE '%Black Knight de Capriel%' OR `description` LIKE '%Black Knight de Capriel%';
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Hero de Capriel', 'Hero da Perdição'), `description` = REPLACE(`description`, 'Hero de Capriel', 'Hero da Perdição')
  WHERE `title` LIKE '%Hero de Capriel%' OR `description` LIKE '%Hero de Capriel%';
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Warlock de Capriel', 'Warlock da Perdição'), `description` = REPLACE(`description`, 'Warlock de Capriel', 'Warlock da Perdição')
  WHERE `title` LIKE '%Warlock de Capriel%' OR `description` LIKE '%Warlock de Capriel%';
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Fire Devil de Capriel', 'Fire Devil da Perdição'), `description` = REPLACE(`description`, 'Fire Devil de Capriel', 'Fire Devil da Perdição')
  WHERE `title` LIKE '%Fire Devil de Capriel%' OR `description` LIKE '%Fire Devil de Capriel%';
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Giant Spider de Capriel', 'Giant Spider da Perdição'), `description` = REPLACE(`description`, 'Giant Spider de Capriel', 'Giant Spider da Perdição')
  WHERE `title` LIKE '%Giant Spider de Capriel%' OR `description` LIKE '%Giant Spider de Capriel%';
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Dragon Lord de Capriel', 'Dragon Lord da Perdição'), `description` = REPLACE(`description`, 'Dragon Lord de Capriel', 'Dragon Lord da Perdição')
  WHERE `title` LIKE '%Dragon Lord de Capriel%' OR `description` LIKE '%Dragon Lord de Capriel%';
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Demon de Capriel', 'Demon da Perdição'), `description` = REPLACE(`description`, 'Demon de Capriel', 'Demon da Perdição')
  WHERE `title` LIKE '%Demon de Capriel%' OR `description` LIKE '%Demon de Capriel%';
UPDATE `AdventureEvent` SET `title` = REPLACE(`title`, 'Sudden Death Rune de Capriel', 'Soulfire Rune de Capriel'), `description` = REPLACE(`description`, 'Sudden Death Rune de Capriel', 'Soulfire Rune de Capriel')
  WHERE `title` LIKE '%Sudden Death Rune de Capriel%' OR `description` LIKE '%Sudden Death Rune de Capriel%';
