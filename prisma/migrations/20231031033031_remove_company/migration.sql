/*
  Warnings:

  - You are about to drop the column `companyId` on the `Menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_companyId_fkey";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "companyId";
