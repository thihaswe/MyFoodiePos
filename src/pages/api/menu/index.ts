// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface Menu {
  id: number;
  name: string;
  price: number;
  assetUrl?: string;
  isArchived: boolean;
}

//DEMO menus array
let menus: Menu[] = []; // non-persistent

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "POST") {
    const newMenuId = menus.length === 0 ? 1 : menus[menus.length - 1].id + 1;
    const isArchived = false;
    const newMenu = {
      ...req.body,
      id: newMenuId,
      isArchived,
      assetUrl:
        "https://thumbs.dreamstimehttps://thumbs.dreamstime.com/z/heart-shape-various-vegetables-fruits-healthy-food-concept-isolated-white-background-140287808.jpg.com/b/heart-shape-various-vegetables-fruits-healthy-food-concept-isolated-white-background-140287808.jpg",
    };
    menus.push(newMenu);
    console.log(menus);

    return res.status(200).json(menus);
  }
  res.status(200).json({ name: "John Doe" });
}
