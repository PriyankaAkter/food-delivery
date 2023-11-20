/*
  Warnings:

  - Added the required column `res_image` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "res_image" TEXT NOT NULL;
