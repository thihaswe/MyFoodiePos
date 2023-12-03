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
import {
  CreateAddonOptions,
  DeleteAddonOptions,
  UpdateAddonOptions,
} from "@/types/addon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unaunthorized");
  const method = req.method;
  if (method === "POST") {
    const { name, price = 0, addonCategoryId } = req.body as CreateAddonOptions;
    const isValid = name && name !== "" && price && addonCategoryId;
    if (!isValid) return res.status(400).send("Bad Request");
    const addon = await prisma.addon.create({
      data: { name, price, addonCategoryId },
    });

    return res.status(200).json(addon);
  } else if (method === "PUT") {
    const { id, name, price, addonCategoryId } = req.body as UpdateAddonOptions;
    const isValid = id && name && price && addonCategoryId;
    if (!isValid) return res.status(400).send("Bad Request");
    const exist = await prisma.addon.findUnique({ where: { id } });
    if (!exist) return res.status(404).send("Not Found");
    const addon = await prisma.addon.update({
      data: { name, price, addonCategoryId },
      where: { id },
    });

    return res.status(200).json(addon);
  } else if (method === "DELETE") {
    const { id } = req.query;
    const addonId = Number(id);

    const isValid = addonId;
    if (!isValid) return res.status(400).send("Bad Request");
    const exist = await prisma.addon.findUnique({ where: { id: addonId } });
    if (!exist) return res.status(404).send("Not Found");
    const addon = await prisma.addon.update({
      data: { isArchived: true },
      where: { id: addonId },
    });

    return res.status(200).json("deleted");
  }
  res.status(200).json({ name: "John Doe" });
}
