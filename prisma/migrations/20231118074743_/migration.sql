/*
  Warnings:

  - You are about to drop the column `password` on the `Restaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "password",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_name_key" ON "Restaurant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_email_key" ON "Restaurant"("email");
