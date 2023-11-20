/*
  Warnings:

  - You are about to drop the `CustomerAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomerAddress" DROP CONSTRAINT "CustomerAddress_CustomerId_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantAddress" DROP CONSTRAINT "RestaurantAddress_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- DropTable
DROP TABLE "CustomerAddress";

-- DropTable
DROP TABLE "RestaurantAddress";
