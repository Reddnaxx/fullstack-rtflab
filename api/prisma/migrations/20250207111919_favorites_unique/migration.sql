/*
  Warnings:

  - A unique constraint covering the columns `[userId,cardId]` on the table `UserFavorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserFavorites_userId_cardId_key" ON "UserFavorites"("userId", "cardId");
