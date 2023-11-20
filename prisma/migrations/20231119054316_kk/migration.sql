/*
  Warnings:

  - Added the required column `RestaurantId` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "RestaurantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_RestaurantId_fkey" FOREIGN KEY ("RestaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
