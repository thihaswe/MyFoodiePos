/*
  Warnings:

  - Made the column `price` on table `Menu` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "price" SET NOT NULL;
