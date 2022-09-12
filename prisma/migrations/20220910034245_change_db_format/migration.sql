/*
  Warnings:

  - You are about to drop the `Campaign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `General` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Main` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rights` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sports` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BoardType" AS ENUM ('Rights', 'Sports', 'Campaign', 'Event', 'General', 'Main');

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_authorId_fkey";

-- DropForeignKey
ALTER TABLE "General" DROP CONSTRAINT "General_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Main" DROP CONSTRAINT "Main_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Rights" DROP CONSTRAINT "Rights_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Sports" DROP CONSTRAINT "Sports_authorId_fkey";

-- DropTable
DROP TABLE "Campaign";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "General";

-- DropTable
DROP TABLE "Main";

-- DropTable
DROP TABLE "Rights";

-- DropTable
DROP TABLE "Sports";

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" VARCHAR(5000) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "BoardType" NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
