/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Food` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_categoryId_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "categoryId";
