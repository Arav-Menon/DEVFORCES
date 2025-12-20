/*
  Warnings:

  - You are about to drop the column `startAt` on the `Challenge` table. All the data in the column will be lost.
  - The `examples` column on the `Challenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `userId` on the `Contest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Contest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `difficulty` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluationConfig` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Made the column `contestId` on table `Challenge` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `createdById` to the `Contest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Contest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContestStatus" AS ENUM ('UPCOMING', 'ONGOING', 'ENDED');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_contestId_fkey";

-- DropForeignKey
ALTER TABLE "Contest" DROP CONSTRAINT "Contest_userId_fkey";

-- DropIndex
DROP INDEX "Challenge_title_key";

-- DropIndex
DROP INDEX "Contest_title_key";

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "startAt",
ADD COLUMN     "allowedLanguages" TEXT[],
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "difficulty" "Difficulty" NOT NULL,
ADD COLUMN     "evaluationConfig" JSONB NOT NULL,
ALTER COLUMN "contestId" SET NOT NULL,
ALTER COLUMN "constraints" DROP NOT NULL,
DROP COLUMN "examples",
ADD COLUMN     "examples" JSONB;

-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "ContestStatus" NOT NULL DEFAULT 'UPCOMING';

-- CreateIndex
CREATE UNIQUE INDEX "Contest_slug_key" ON "Contest"("slug");

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
