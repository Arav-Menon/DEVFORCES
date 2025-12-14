/*
  Warnings:

  - You are about to drop the column `contestToChallengeMappingId` on the `Challenge` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "contestToChallengeMappingId",
ADD COLUMN     "contestId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_title_key" ON "Challenge"("title");

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
