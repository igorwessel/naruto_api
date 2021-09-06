-- CreateTable
CREATE TABLE `Affiliation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassificationJutsu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Family` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `relationship` VARCHAR(100) NOT NULL,
    `parentFromId` INTEGER,
    `parentToId` INTEGER,

    INDEX `FK_4a5e036ebfc008c8d985e5eda73`(`parentToId`),
    INDEX `FK_951991781739cbcff0876268b88`(`parentFromId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jutsu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `description` TEXT,
    `kanji` VARCHAR(255),
    `romaji` VARCHAR(255),
    `portugues` VARCHAR(255),
    `games` VARCHAR(255),
    `mangaPanini` VARCHAR(255),
    `tvBrasileira` VARCHAR(255),
    `range` VARCHAR(255),
    `rank` VARCHAR(255),
    `handSeals` LONGTEXT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KekkeiGenkai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NatureType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `kekkeiGenkai` BOOLEAN NOT NULL,
    `kekkeiTota` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ninja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `birthdate` VARCHAR(50),
    `specie` VARCHAR(255),
    `status` VARCHAR(40),
    `sex` ENUM('Masculino', 'Feminino', 'Hermafrodita', 'Desconhecido'),
    `bloodType` VARCHAR(10),
    `ninjaRegistration` VARCHAR(30),
    `academyGradAge` VARCHAR(10),
    `chuninPromAge` VARCHAR(10),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NinjaAttr` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `age` VARCHAR(30),
    `height` VARCHAR(30),
    `weight` VARCHAR(30),
    `ninjaRank` VARCHAR(30),
    `ninjaId` INTEGER NOT NULL,
    `seasonId` INTEGER NOT NULL,

    INDEX `FK_852bfd4e14bf21c2b73c37dc32e`(`seasonId`),
    INDEX `FK_8a1d40f5833ad577f58ebcbe6de`(`ninjaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Occupation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Season` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `description` TEXT,
    `kanji` VARCHAR(255),
    `romaji` VARCHAR(255),
    `portugues` VARCHAR(255),
    `games` VARCHAR(255),
    `mangaPanini` VARCHAR(255),
    `tvBrasileira` VARCHAR(255),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AffiliationToNinja` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AffiliationToNinja_AB_unique`(`A`, `B`),
    INDEX `_AffiliationToNinja_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AffiliationToTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AffiliationToTeam_AB_unique`(`A`, `B`),
    INDEX `_AffiliationToTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClanToNinja` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClanToNinja_AB_unique`(`A`, `B`),
    INDEX `_ClanToNinja_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_JutsuToRenamedClass` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_JutsuToRenamedClass_AB_unique`(`A`, `B`),
    INDEX `_JutsuToRenamedClass_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClassificationToNinja` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClassificationToNinja_AB_unique`(`A`, `B`),
    INDEX `_ClassificationToNinja_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClassificationJutsuToJutsu` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClassificationJutsuToJutsu_AB_unique`(`A`, `B`),
    INDEX `_ClassificationJutsuToJutsu_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_JutsuToNinja` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_JutsuToNinja_AB_unique`(`A`, `B`),
    INDEX `_JutsuToNinja_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_JutsuToNatureType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_JutsuToNatureType_AB_unique`(`A`, `B`),
    INDEX `_JutsuToNatureType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NatureTypeToNinja` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NatureTypeToNinja_AB_unique`(`A`, `B`),
    INDEX `_NatureTypeToNinja_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NinjaToOccupation` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NinjaToOccupation_AB_unique`(`A`, `B`),
    INDEX `_NinjaToOccupation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NinjaToTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NinjaToTeam_AB_unique`(`A`, `B`),
    INDEX `_NinjaToTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NinjaToTools` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NinjaToTools_AB_unique`(`A`, `B`),
    INDEX `_NinjaToTools_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Family` ADD FOREIGN KEY (`parentFromId`) REFERENCES `Ninja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Family` ADD FOREIGN KEY (`parentToId`) REFERENCES `Ninja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NinjaAttr` ADD FOREIGN KEY (`ninjaId`) REFERENCES `Ninja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NinjaAttr` ADD FOREIGN KEY (`seasonId`) REFERENCES `Season`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AffiliationToNinja` ADD FOREIGN KEY (`A`) REFERENCES `Affiliation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AffiliationToNinja` ADD FOREIGN KEY (`B`) REFERENCES `Ninja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AffiliationToTeam` ADD FOREIGN KEY (`A`) REFERENCES `Affiliation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AffiliationToTeam` ADD FOREIGN KEY (`B`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClanToNinja` ADD FOREIGN KEY (`A`) REFERENCES `Clan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClanToNinja` ADD FOREIGN KEY (`B`) REFERENCES `Ninja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JutsuToRenamedClass` ADD FOREIGN KEY (`A`) REFERENCES `Jutsu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JutsuToRenamedClass` ADD FOREIGN KEY (`B`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassificationToNinja` ADD FOREIGN KEY (`A`) REFERENCES `Classification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassificationToNinja` ADD FOREIGN KEY (`B`) REFERENCES `Ninja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassificationJutsuToJutsu` ADD FOREIGN KEY (`A`) REFERENCES `ClassificationJutsu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassificationJutsuToJutsu` ADD FOREIGN KEY (`B`) REFERENCES `Jutsu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JutsuToNinja` ADD FOREIGN KEY (`A`) REFERENCES `Jutsu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JutsuToNinja` ADD FOREIGN KEY (`B`) REFERENCES `Ninja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JutsuToNatureType` ADD FOREIGN KEY (`A`) REFERENCES `Jutsu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JutsuToNatureType` ADD FOREIGN KEY (`B`) REFERENCES `NatureType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NatureTypeToNinja` ADD FOREIGN KEY (`A`) REFERENCES `NatureType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NatureTypeToNinja` ADD FOREIGN KEY (`B`) REFERENCES `Ninja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NinjaToOccupation` ADD FOREIGN KEY (`A`) REFERENCES `Ninja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NinjaToOccupation` ADD FOREIGN KEY (`B`) REFERENCES `Occupation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NinjaToTeam` ADD FOREIGN KEY (`A`) REFERENCES `Ninja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NinjaToTeam` ADD FOREIGN KEY (`B`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NinjaToTools` ADD FOREIGN KEY (`A`) REFERENCES `Ninja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NinjaToTools` ADD FOREIGN KEY (`B`) REFERENCES `Tools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
