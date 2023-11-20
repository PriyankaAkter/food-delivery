/*
  Warnings:

  - You are about to drop the column `city` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "district",
ADD COLUMN     "address" TEXT;
