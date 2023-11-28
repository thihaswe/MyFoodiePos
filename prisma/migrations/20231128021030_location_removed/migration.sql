/*
  Warnings:

  - You are about to drop the column `locationId` on the `MenuCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenuCategory" DROP CONSTRAINT "MenuCategory_locationId_fkey";

-- AlterTable
ALTER TABLE "MenuCategory" DROP COLUMN "locationId";
