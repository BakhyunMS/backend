/*
  Warnings:

  - Added the required column `type` to the `VerifiedEmails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerifiedEmails" ADD COLUMN     "type" TEXT NOT NULL;
