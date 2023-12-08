// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import { CreateTableOptions } from "@/types/table";
import { prisma } from "@/utils/db";

import { qrCodeImageUpload, getQrCodeUrl } from "@/utils/fileUpload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized");
  const method = req.method;
  if (method === "POST") {
    const { name, locationId } = req.body as CreateTableOptions;

    const idLocation = Number(locationId);
    const isValid = idLocation && name;
    if (!isValid) return res.status(400).send("Bad Request");
    let table = await prisma.table.create({
      data: { name, locationId: idLocation, assetUrl: "" },
    });
    await qrCodeImageUpload(table.id);
    const assetUrl = getQrCodeUrl(table.id);
    table = await prisma.table.update({
      data: { assetUrl },
      where: { id: table.id },
    });

    return res.status(200).json(table);
  } else if (method === "PUT") {
    const table = req.body;
    const name = table.name;
    const id = Number(table.id);
    const isValid = id && name;
    if (!isValid) return res.status(400).send("Bad Request");
    const exist = await prisma.table.findUnique({ where: { id } });
    if (!exist) return res.status(404).send("Not Found");
    const tables = await prisma.table.update({ data: { name }, where: { id } });
    return res.status(200).json(tables);
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");
    const exist = await prisma.table.findUnique({ where: { id } });
    if (!exist) return res.status(404).send("Not Found");
    await prisma.table.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).json("deleted");
  }
  res.status(200).json({ name: "John Doe" });
}
