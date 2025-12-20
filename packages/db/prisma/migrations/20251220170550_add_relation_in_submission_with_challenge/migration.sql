/*
  Warnings:

  - You are about to drop the column `contestToChallengeMappingId` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `challengeId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "contestToChallengeMappingId",
ADD COLUMN     "challengeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
