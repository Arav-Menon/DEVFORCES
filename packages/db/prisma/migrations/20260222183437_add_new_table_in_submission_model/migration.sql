/*
  Warnings:

  - You are about to drop the column `points` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `status` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissionId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "points",
ADD COLUMN     "result" JSONB,
ADD COLUMN     "score" INTEGER,
ADD COLUMN     "status" "SubmissionStatus" NOT NULL,
ADD COLUMN     "submissionId" TEXT NOT NULL;
