/*
  Warnings:

  - You are about to drop the column `contestToChallengeMappingId` on the `Contest` table. All the data in the column will be lost.
  - You are about to drop the `ContestToChallengeMapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_contestToChallengeMappingId_fkey";

-- DropForeignKey
ALTER TABLE "Contest" DROP CONSTRAINT "Contest_contestToChallengeMappingId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_contestToChallengeMappingId_fkey";

-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "contestToChallengeMappingId",
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "ContestToChallengeMapping";

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
