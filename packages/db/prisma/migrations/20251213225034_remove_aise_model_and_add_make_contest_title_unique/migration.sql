/*
  Warnings:

  - You are about to drop the `AISE` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Contest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "AISE";

-- CreateIndex
CREATE UNIQUE INDEX "Contest_title_key" ON "Contest"("title");
