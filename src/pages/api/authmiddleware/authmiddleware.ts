// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
const authMiddleware = async (
  a: NextApiRequest,
  b: NextApiResponse,
  next: () => void
) => {
  const session = await getServerSession(a, b, authOptions);
  if (session) return next();

  return b.status(401).send("unauthorized");
};
export default authMiddleware;
