// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/utils/db";
import authMiddleware from "../authmiddleware/authmiddleware";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized");

  const method = req.method;
  if (method === "POST") {
    const { name, companyId, locationId } = req.body;
    const isValid =
      name &&
      locationId &&
      companyId &&
      name !== 0 &&
      locationId !== 0 &&
      companyId !== 0;

    if (!isValid) return res.status(400).send("Bad Request");
    const menuCategory = await prisma.menuCategory.create({
      data: { companyId, name },
    });

    return res.status(200).json(menuCategory);
  } else if (method === "PUT") {
    console.log("put");
    const { id, name, isAvailable, locationId } = req.body;
    const isValid = id && name && name !== "";
    if (!isValid) return res.status(400).send("Bad Request");
    const exist = await prisma.menuCategory.findUnique({ where: { id } });
    if (!exist) return res.status(404).send("Not Found");
    const menuCategory = await prisma.menuCategory.update({
      data: { name: name },
      where: { id },
    });
    if (locationId && isAvailable === false) {
      const exist = await prisma.disableLocationMenuCategory.findFirst({
        where: { menuCategoryId: id, locationId },
      });
      if (!exist) {
        await prisma.disableLocationMenuCategory.create({
          data: { locationId, menuCategoryId: id },
        });
      }
    } else if (locationId && isAvailable === true) {
      const exist = await prisma.disableLocationMenuCategory.findFirst({
        where: { menuCategoryId: id, locationId },
      });
      if (exist) {
        await prisma.disableLocationMenuCategory.delete({
          where: { id: exist.id },
        });
      }
    }
    const disableLocationMenuCategories =
      await prisma.disableLocationMenuCategory.findMany({
        where: { menuCategoryId: id },
      });

    return res
      .status(200)
      .json({ menuCategory, disableLocationMenuCategories });
  } else if (method === "DELETE") {
    const { id } = req.query;
    const menuCategoryIdToDelete = Number(id);

    if (!menuCategoryIdToDelete) return res.status(400).send("Bad Request");
    const exist = prisma.menuCategory.findUnique({
      where: { id: menuCategoryIdToDelete },
    });
    if (!exist) return res.status(404).send("Not Found");

    await prisma.menuCategory.update({
      where: { id: menuCategoryIdToDelete },
      data: { isArchived: true },
    });

    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: [menuCategoryIdToDelete] } },
    });

    const menuCategoryMenuIds = menuCategoryMenus.map((item) => item.id);

    return res.status(200).json(menuCategoryMenuIds);
  }

  res.status(200).json({ name: "John Doe" });
}
