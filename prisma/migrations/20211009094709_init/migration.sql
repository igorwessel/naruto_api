-- CreateEnum
CREATE TYPE "ninja_sex" AS ENUM ('Masculino', 'Feminino', 'Hermafrodita', 'Desconhecido');

-- CreateTable
CREATE TABLE "Affiliation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clan" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classification" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassificationJutsu" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "relationship" VARCHAR(100) NOT NULL,
    "parentFromId" INTEGER,
    "parentToId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jutsu" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,
    "kanji" VARCHAR(255),
    "romaji" VARCHAR(255),
    "portugues" VARCHAR(255),
    "games" VARCHAR(255),
    "mangaPanini" VARCHAR(255),
    "tvBrasileira" VARCHAR(255),
    "range" VARCHAR(255),
    "rank" VARCHAR(255),
    "handSeals" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KekkeiGenkai" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NatureType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "kekkeiGenkai" BOOLEAN NOT NULL,
    "kekkeiTota" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ninja" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "birthdate" VARCHAR(50),
    "specie" VARCHAR(255),
    "status" VARCHAR(40),
    "sex" "ninja_sex",
    "bloodType" VARCHAR(10),
    "ninjaRegistration" VARCHAR(30),
    "academyGradAge" VARCHAR(10),
    "chuninPromAge" VARCHAR(10),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NinjaAttr" (
    "id" SERIAL NOT NULL,
    "age" VARCHAR(30),
    "height" VARCHAR(30),
    "weight" VARCHAR(30),
    "ninjaRank" VARCHAR(30),
    "ninjaId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occupation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tools" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,
    "kanji" VARCHAR(255),
    "romaji" VARCHAR(255),
    "portugues" VARCHAR(255),
    "games" VARCHAR(255),
    "mangaPanini" VARCHAR(255),
    "tvBrasileira" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AffiliationToNinja" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AffiliationToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClanToNinja" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_JutsuToRenamedClass" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassificationToNinja" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassificationJutsuToJutsu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_JutsuToNinja" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_JutsuToNatureType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NatureTypeToNinja" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NinjaToOccupation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NinjaToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NinjaToTools" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "FK_4a5e036ebfc008c8d985e5eda73" ON "Family"("parentToId");

-- CreateIndex
CREATE INDEX "FK_951991781739cbcff0876268b88" ON "Family"("parentFromId");

-- CreateIndex
CREATE INDEX "FK_852bfd4e14bf21c2b73c37dc32e" ON "NinjaAttr"("seasonId");

-- CreateIndex
CREATE INDEX "FK_8a1d40f5833ad577f58ebcbe6de" ON "NinjaAttr"("ninjaId");

-- CreateIndex
CREATE UNIQUE INDEX "_AffiliationToNinja_AB_unique" ON "_AffiliationToNinja"("A", "B");

-- CreateIndex
CREATE INDEX "_AffiliationToNinja_B_index" ON "_AffiliationToNinja"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AffiliationToTeam_AB_unique" ON "_AffiliationToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_AffiliationToTeam_B_index" ON "_AffiliationToTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClanToNinja_AB_unique" ON "_ClanToNinja"("A", "B");

-- CreateIndex
CREATE INDEX "_ClanToNinja_B_index" ON "_ClanToNinja"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_JutsuToRenamedClass_AB_unique" ON "_JutsuToRenamedClass"("A", "B");

-- CreateIndex
CREATE INDEX "_JutsuToRenamedClass_B_index" ON "_JutsuToRenamedClass"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassificationToNinja_AB_unique" ON "_ClassificationToNinja"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassificationToNinja_B_index" ON "_ClassificationToNinja"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassificationJutsuToJutsu_AB_unique" ON "_ClassificationJutsuToJutsu"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassificationJutsuToJutsu_B_index" ON "_ClassificationJutsuToJutsu"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_JutsuToNinja_AB_unique" ON "_JutsuToNinja"("A", "B");

-- CreateIndex
CREATE INDEX "_JutsuToNinja_B_index" ON "_JutsuToNinja"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_JutsuToNatureType_AB_unique" ON "_JutsuToNatureType"("A", "B");

-- CreateIndex
CREATE INDEX "_JutsuToNatureType_B_index" ON "_JutsuToNatureType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NatureTypeToNinja_AB_unique" ON "_NatureTypeToNinja"("A", "B");

-- CreateIndex
CREATE INDEX "_NatureTypeToNinja_B_index" ON "_NatureTypeToNinja"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NinjaToOccupation_AB_unique" ON "_NinjaToOccupation"("A", "B");

-- CreateIndex
CREATE INDEX "_NinjaToOccupation_B_index" ON "_NinjaToOccupation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NinjaToTeam_AB_unique" ON "_NinjaToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_NinjaToTeam_B_index" ON "_NinjaToTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NinjaToTools_AB_unique" ON "_NinjaToTools"("A", "B");

-- CreateIndex
CREATE INDEX "_NinjaToTools_B_index" ON "_NinjaToTools"("B");

-- AddForeignKey
ALTER TABLE "Family" ADD FOREIGN KEY ("parentFromId") REFERENCES "Ninja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD FOREIGN KEY ("parentToId") REFERENCES "Ninja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NinjaAttr" ADD FOREIGN KEY ("ninjaId") REFERENCES "Ninja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NinjaAttr" ADD FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliationToNinja" ADD FOREIGN KEY ("A") REFERENCES "Affiliation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliationToNinja" ADD FOREIGN KEY ("B") REFERENCES "Ninja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliationToTeam" ADD FOREIGN KEY ("A") REFERENCES "Affiliation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliationToTeam" ADD FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClanToNinja" ADD FOREIGN KEY ("A") REFERENCES "Clan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClanToNinja" ADD FOREIGN KEY ("B") REFERENCES "Ninja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JutsuToRenamedClass" ADD FOREIGN KEY ("A") REFERENCES "Jutsu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JutsuToRenamedClass" ADD FOREIGN KEY ("B") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassificationToNinja" ADD FOREIGN KEY ("A") REFERENCES "Classification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassificationToNinja" ADD FOREIGN KEY ("B") REFERENCES "Ninja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassificationJutsuToJutsu" ADD FOREIGN KEY ("A") REFERENCES "ClassificationJutsu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassificationJutsuToJutsu" ADD FOREIGN KEY ("B") REFERENCES "Jutsu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JutsuToNinja" ADD FOREIGN KEY ("A") REFERENCES "Jutsu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JutsuToNinja" ADD FOREIGN KEY ("B") REFERENCES "Ninja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JutsuToNatureType" ADD FOREIGN KEY ("A") REFERENCES "Jutsu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JutsuToNatureType" ADD FOREIGN KEY ("B") REFERENCES "NatureType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NatureTypeToNinja" ADD FOREIGN KEY ("A") REFERENCES "NatureType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NatureTypeToNinja" ADD FOREIGN KEY ("B") REFERENCES "Ninja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NinjaToOccupation" ADD FOREIGN KEY ("A") REFERENCES "Ninja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NinjaToOccupation" ADD FOREIGN KEY ("B") REFERENCES "Occupation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NinjaToTeam" ADD FOREIGN KEY ("A") REFERENCES "Ninja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NinjaToTeam" ADD FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NinjaToTools" ADD FOREIGN KEY ("A") REFERENCES "Ninja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NinjaToTools" ADD FOREIGN KEY ("B") REFERENCES "Tools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
