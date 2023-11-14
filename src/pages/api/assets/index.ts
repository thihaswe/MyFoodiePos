import { fileUpload } from "@/utils/fileUpload";

import type { Request, Response } from "express";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default function handler(req: Request, res: Response) {
  try {
    fileUpload(req, res, (error) => {
      if (error) return res.status(500).send("Internal Server Error");
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      res.status(200).json({ assetUrl });
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
