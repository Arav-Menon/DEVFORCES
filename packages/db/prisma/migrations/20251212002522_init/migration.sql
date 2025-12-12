/*
  Warnings:

  - You are about to drop the column `passowrd` on the `User` table. All the data in the column will be lost.
  - Made the column `contestToChallengeMappingId` on table `Challenge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contestToChallengeMappingId` on table `Contest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Leaderboard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contestId` on table `Leaderboard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contestToChallengeMappingId` on table `Submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Submission` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_contestToChallengeMappingId_fkey";

-- DropForeignKey
ALTER TABLE "Contest" DROP CONSTRAINT "Contest_contestToChallengeMappingId_fkey";

-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_contestId_fkey";

-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_userId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_contestToChallengeMappingId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- AlterTable
ALTER TABLE "Challenge" ALTER COLUMN "contestToChallengeMappingId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Contest" ALTER COLUMN "contestToChallengeMappingId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Leaderboard" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "contestId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "contestToChallengeMappingId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passowrd",
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AISE" (
    "id" TEXT NOT NULL,

    CONSTRAINT "AISE_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_contestToChallengeMappingId_fkey" FOREIGN KEY ("contestToChallengeMappingId") REFERENCES "ContestToChallengeMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_contestToChallengeMappingId_fkey" FOREIGN KEY ("contestToChallengeMappingId") REFERENCES "ContestToChallengeMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_contestToChallengeMappingId_fkey" FOREIGN KEY ("contestToChallengeMappingId") REFERENCES "ContestToChallengeMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
