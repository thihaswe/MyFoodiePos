/*
  Warnings:

  - You are about to drop the column `createAt` on the `Addon` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `AddonCategory` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `DisableLocationMenu` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `DisableLocationMenuCategory` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `MenuAddonCategory` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `MenuCategory` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `MenuCategoryMenu` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Addon" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "AddonCategory" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "DisableLocationMenu" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "DisableLocationMenuCategory" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "MenuAddonCategory" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "MenuCategory" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "MenuCategoryMenu" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
