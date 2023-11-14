// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CreateMenuOptions } from "@/types/menu";

import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/utils/db";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getServerSession(req, res, authOptions);
  if (!session) res.status(405).send("unauthorized");
  const method = req.method;
  if (method === "POST") {
    const menu = req.body as CreateMenuOptions;
    const { name, price = 0, menuCategoryIds } = menu;
    const isValid = name && price != undefined && menuCategoryIds.length != 0;
    if (!isValid) return res.status(400).send("Bad Request");
    const menus = await prisma.menu.create({
      data: { name, price, assetUrl: menu.assetUrl },
    });
    const newMenuCategoryMenu = menuCategoryIds.map((id) => ({
      menuId: menus.id,
      menuCategoryId: id,
    }));

    const menuCategoryMenus = await prisma.$transaction(
      newMenuCategoryMenu.map(
        (item: { menuId: number; menuCategoryId: number }) =>
          prisma.menuCategoryMenu.create({
            data: item,
          })
      )
    );

    return res.status(200).json({ menus, menuCategoryMenus });
  } else if (method === "PUT") {
    const menu = req.body;
    const name = menu.name as string;
    const id = menu.id as number;
    const price = menu.price as number;
    const menuCategoryIds = menu.menuCategoryIds as number[];
    const isValid = name && id && price && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request");
    const exist = await prisma.menu.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request");
    const menus = await prisma.menu.update({
      data: { name, price },
      where: { id },
    });
    await prisma.menuCategoryMenu.deleteMany({ where: { menuId: id } });
    const menuCategoryMenusData: {
      menuId: number;
      menuCategoryId: number;
    }[] = menuCategoryIds.map((item: number) => ({
      menuId: id,
      menuCategoryId: item,
    }));
    const menuCategoryMenus = await prisma.$transaction(
      menuCategoryMenusData.map((item) =>
        prisma.menuCategoryMenu.create({
          data: item,
        })
      )
    );
    if (menu.locationId && menu.isAvailable === false) {
      const exist = await prisma.disableLocationMenu.findFirst({
        where: { menuId: id, locationId: menu.locationId },
      });
      if (!exist) {
        await prisma.disableLocationMenu.create({
          data: { locationId: menu.locationId, menuId: id },
        });
      }
    } else if (menu.locationId && menu.isAvailable === true) {
      const exist = await prisma.disableLocationMenu.findFirst({
        where: { menuId: id, locationId: menu.locationId },
      });
      if (exist) {
        await prisma.disableLocationMenu.delete({
          where: { id: exist.id },
        });
      }
    }
    const disabledLocationMenus = await prisma.disableLocationMenu.findMany({
      where: { menuId: id },
    });
    return res
      .status(200)
      .json({ menus, menuCategoryMenus, disabledLocationMenus });
  } else if (method === "DELETE") {
    const menuId = Number(req.query.id);
    const exist = await prisma.menu.findFirst({ where: { id: menuId } });
    if (!exist) return res.status(400).send("Bad request");
    await prisma.menu.update({
      data: { isArchived: true },
      where: { id: menuId },
    });
    const menuCategoryMenusIds = (
      await prisma.menuCategoryMenu.findMany({
        where: { menuId: menuId },
      })
    ).map((item) => item.id);
    await prisma.menuCategoryMenu.updateMany({
      data: { isArchived: true },
      where: { id: menuId },
    });
    const menuAddonCategoryIds = (
      await prisma.menuAddonCategory.findMany({
        where: { menuId: menuId },
      })
    ).map((item) => item.id);

    await prisma.menuAddonCategory.updateMany({
      data: { isArchived: true },
      where: { id: menuId },
    });
    return res
      .status(200)
      .json({ name: "delete", menuCategoryMenusIds, menuAddonCategoryIds });
  }

  res.status(200).json({ name: "John Doe" });
}
