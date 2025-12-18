/*
  Warnings:

  - You are about to drop the column `notionDocId` on the `Challenge` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `constraints` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "notionDocId",
ADD COLUMN     "constraints" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "examples" TEXT,
ADD COLUMN     "requirements" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_slug_key" ON "Challenge"("slug");
