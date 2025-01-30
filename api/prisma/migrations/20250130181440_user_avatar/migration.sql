/*
  Warnings:

  - Made the column `about` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telegram` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ALTER COLUMN "about" SET NOT NULL,
ALTER COLUMN "telegram" SET NOT NULL;
