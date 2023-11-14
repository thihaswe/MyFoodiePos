// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../authmiddleware/authmiddleware";
import { prisma } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authMiddleware(req, res, async () => {
    const method = req.method;
    if (method === "POST") {
      const { companyId, name } = req.body;
      const isValid =
        companyId !== 0 &&
        name !== "" &&
        companyId !== undefined &&
        name !== undefined;
      if (!isValid) return res.status(400).send("Bad Request");
      const locations = await prisma.location.create({
        data: { companyId, name },
      });
      return res.status(200).json(locations);
    } else if (method === "PUT") {
      const { id, name } = req.body;
      const isValid =
        id !== 0 && name !== "" && id !== undefined && name !== undefined;
      if (!isValid) return res.status(400).send("Bad Request");
      const exist = await prisma.location.findUnique({ where: { id } });
      if (!exist) return res.status(400).send("Not Found");
      const locations = await prisma.location.update({
        data: { name },
        where: { id },
      });
      return res.status(200).json(locations);
    } else if (method === "DELETE") {
      const { id } = req.body;
      const locationId = Number(id);
      const isValid = locationId !== 0 && locationId !== undefined;
      if (!isValid) return res.status(400).send("Bad Request");
      const exist = await prisma.location.findUnique({
        where: { id: locationId },
      });
      if (!exist) return res.status(400).send("Not Found");
      const locations = await prisma.location.update({
        data: { isArchived: true },
        where: { id: locationId },
      });
      return res.status(200).json("deleted");
    }
  });

  res.status(200).json({ name: "John Doe" });
}
