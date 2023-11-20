/*
  Warnings:

  - The primary key for the `Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `res_id` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `res_image` on the `Restaurant` table. All the data in the column will be lost.
  - The `id` column on the `Restaurant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `slug` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_categoryId_fkey";

-- DropIndex
DROP INDEX "Restaurant_email_key";

-- AlterTable
ALTER TABLE "Food" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_pkey",
DROP COLUMN "email",
DROP COLUMN "res_id",
DROP COLUMN "res_image",
ADD COLUMN     "image" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "slug" SET NOT NULL,
ADD CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
