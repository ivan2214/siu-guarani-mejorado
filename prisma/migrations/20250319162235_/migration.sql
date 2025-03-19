/*
  Warnings:

  - Added the required column `duration` to the `Career` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Career" ADD COLUMN     "description" TEXT,
ADD COLUMN     "directorId" TEXT,
ADD COLUMN     "duration" INTEGER NOT NULL;
