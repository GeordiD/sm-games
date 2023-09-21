-- CreateTable
CREATE TABLE "PokerRoom" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nickname" TEXT,

    CONSTRAINT "PokerRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PokerRoom" ADD CONSTRAINT "PokerRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
