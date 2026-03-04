/*
  Warnings:

  - The values [HONORARY] on the enum `AcheivementSpot` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `holderId` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContestTopic" AS ENUM ('MATH', 'PHYSICS', 'BIOLOGY', 'GEOGRAPHY', 'CHEMISTRY', 'PSYCHOLOGY', 'INFORMATICS', 'SOCIAL_STUDIES');

-- AlterEnum
BEGIN;
CREATE TYPE "AcheivementSpot_new" AS ENUM ('GOLD', 'SILVER', 'BRONZE');
ALTER TABLE "Achievement" ALTER COLUMN "spot" TYPE "AcheivementSpot_new" USING ("spot"::text::"AcheivementSpot_new");
ALTER TYPE "AcheivementSpot" RENAME TO "AcheivementSpot_old";
ALTER TYPE "AcheivementSpot_new" RENAME TO "AcheivementSpot";
DROP TYPE "public"."AcheivementSpot_old";
COMMIT;

-- AlterEnum
ALTER TYPE "ContestLevel" ADD VALUE 'HONORARY';

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "holderId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AchievementHolder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AchievementHolder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_holderId_fkey" FOREIGN KEY ("holderId") REFERENCES "AchievementHolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
