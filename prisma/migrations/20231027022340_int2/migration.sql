/*
  Warnings:

  - Added the required column `disableLocationMenuId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "disableLocationMenuId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_disableLocationMenuId_fkey" FOREIGN KEY ("disableLocationMenuId") REFERENCES "DisableLocationMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
