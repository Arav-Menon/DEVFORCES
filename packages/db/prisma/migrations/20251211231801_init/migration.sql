-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'CREATOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passowrd" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "contestToChallengeMappingId" TEXT,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestToChallengeMapping" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "ContestToChallengeMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notionDocId" TEXT NOT NULL,
    "maxPoints" INTEGER NOT NULL,
    "contestToChallengeMappingId" TEXT,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contestToChallengeMappingId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "userId" TEXT,
    "contestId" TEXT,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContestToChallengeMapping_contestId_challengeId_key" ON "ContestToChallengeMapping"("contestId", "challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_rank_contestId_key" ON "Leaderboard"("rank", "contestId");

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_contestToChallengeMappingId_fkey" FOREIGN KEY ("contestToChallengeMappingId") REFERENCES "ContestToChallengeMapping"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_contestToChallengeMappingId_fkey" FOREIGN KEY ("contestToChallengeMappingId") REFERENCES "ContestToChallengeMapping"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_contestToChallengeMappingId_fkey" FOREIGN KEY ("contestToChallengeMappingId") REFERENCES "ContestToChallengeMapping"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
