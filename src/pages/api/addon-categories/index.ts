// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import {
  CreateAddonCategoryOptions,
  DeleteAddonCategoryOptions,
  UpdateAddonCategoryOptions,
} from "@/types/addonCategory";
import { prisma } from "@/utils/db";
import { UpdateMenuCategoryOptions } from "@/types/menuCategory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unaunthorized");
  const method = req.method;
  if (method === "POST") {
    const { name, menuIds, isRequired } =
      req.body as CreateAddonCategoryOptions;
    const isValid = name && name !== "" && menuIds.length > 0 && isRequired;
    if (!isValid) return res.status(400).send("Bad Request");
    const addonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });
    const menuAddonCategory = await prisma.$transaction(
      menuIds.map((item) =>
        prisma.menuAddonCategory.create({
          data: { menuId: item, addonCategoryId: addonCategory.id },
        })
      )
    );
    return res.status(200).json({ addonCategory, menuAddonCategory });
  } else if (method === "PUT") {
    const { id, name, menuIds, isRequired } =
      req.body as UpdateAddonCategoryOptions;
    const isValid = id && name && menuIds.length > 0 && isRequired;
    if (!isValid) return res.status(400).send("Bad Request");
    const exist = await prisma.addonCategory.findUnique({ where: { id } });
    if (!exist) return res.status(404).send("Not Found");
    const addonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id },
    });
    await prisma.menuAddonCategory.deleteMany({
      where: { addonCategoryId: { in: [id] } },
    });
    const menuAddonCategory = await prisma.$transaction(
      menuIds.map((item) =>
        prisma.menuAddonCategory.create({
          data: { menuId: item, addonCategoryId: addonCategory.id },
        })
      )
    );
    return res.status(200).json({ addonCategory, menuAddonCategory });
  } else if (method === "DELETE") {
    const { id } = req.body as DeleteAddonCategoryOptions;
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");
    const exist = await prisma.addonCategory.findUnique({ where: { id } });
    if (!exist) return res.status(404).send("Not Found");
    const addonCategory = await prisma.addonCategory.update({
      data: { isArchived: true },
      where: { id },
    });
    const menuAddonCategoryIds = (
      await prisma.menuAddonCategory.findMany({ where: { id } })
    ).map((item) => item.id);
    await prisma.menuAddonCategory.deleteMany({
      where: { id: { in: menuAddonCategoryIds } },
    });
    return res.status(200).json(menuAddonCategoryIds);
  }
  res.status(200).json({ name: "John Doe" });
}
