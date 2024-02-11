/*
  Warnings:

  - A unique constraint covering the columns `[roundId,playerId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_roundId_playerId_key" ON "Vote"("roundId", "playerId");
