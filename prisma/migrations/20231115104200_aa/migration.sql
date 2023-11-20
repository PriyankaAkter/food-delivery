/*
  Warnings:

  - You are about to drop the column `RestaurantId` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the `_FoodToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_RestaurantId_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToOrder" DROP CONSTRAINT "_FoodToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToOrder" DROP CONSTRAINT "_FoodToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "RestaurantId";

-- DropTable
DROP TABLE "_FoodToOrder";
