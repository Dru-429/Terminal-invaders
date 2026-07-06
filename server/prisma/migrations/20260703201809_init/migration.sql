-- CreateTable
CREATE TABLE "Players" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "highestScore" INTEGER NOT NULL,
    "gamePlayed" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Scores" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playersTag" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Players_tag_key" ON "Players"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Scores_id_key" ON "Scores"("id");

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_playersTag_fkey" FOREIGN KEY ("playersTag") REFERENCES "Players"("tag") ON DELETE SET NULL ON UPDATE CASCADE;
