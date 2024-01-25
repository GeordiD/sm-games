-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "pokerRoomId" TEXT;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_pokerRoomId_fkey" FOREIGN KEY ("pokerRoomId") REFERENCES "PokerRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
