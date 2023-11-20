/*
  Warnings:

  - The primary key for the `Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `categoryId` on table `Food` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_categoryId_fkey";

-- AlterTable
ALTER TABLE "Food" ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Restaurant_id_seq";

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
