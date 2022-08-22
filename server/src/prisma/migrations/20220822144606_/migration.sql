/*
  Warnings:

  - A unique constraint covering the columns `[userUuid]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "userUuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Room_userUuid_key" ON "Room"("userUuid");
