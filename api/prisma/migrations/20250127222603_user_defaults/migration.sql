-- AlterTable
ALTER TABLE "User" ALTER COLUMN "about" SET DEFAULT '',
ALTER COLUMN "skills" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "telegram" SET DEFAULT '';
