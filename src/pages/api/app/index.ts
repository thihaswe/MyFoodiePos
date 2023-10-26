// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import { prisma } from "@/utils/db";
import menuAddonCategory from "@/store/slices/menuAddonCategory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method !== "GET") return res.status(400).send("Bad request");
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("unauthorized");
  const { user } = session;
  if (!user) return res.status(401).send("server error ");
  const name = user?.name as string;
  const email = user?.email as string;
  const dbUser = await prisma.user.findUnique({ where: { email } });
  if (!dbUser) {
    // company create
    const newCompanyName = "foodie company";
    const newCompanyAddress = "NO,100mote zayy tan street";

    const company = await prisma.company.create({
      data: { name: newCompanyName, address: newCompanyAddress },
    });
    // user create
    const companyId = company.id;
    const createUser = { name, email, companyId };

    const user = await prisma.user.create({
      data: createUser,
    });
    // menuCategory create
    const newMenuCategoryName = "default menuCategory";
    const menuCategories = await prisma.menuCategory.create({
      data: { name: newMenuCategoryName },
    });
    // menu create
    const menuName = "default menu";
    const price = 1000;
    const menus = await prisma.menu.create({
      data: { name: menuName, price },
    });
    // menuCategoryMenu create
    const menuId = menus.id;
    const menuCategoryId = menuCategories.id;
    const menuCategoryMenus = prisma.menuCategoryMenu.create({
      data: { menuCategoryId, menuId },
    });
    // addonCategoryCreate
    const newAddonName = "default AddonCategory";
    const addonCategories = await prisma.addonCategory.create({
      data: { name: newAddonName },
    });
    // menuAddonCategory Create
    const menuAddonCategories = await prisma.menuAddonCategory.create({
      data: { menuId, addonCategoryId: addonCategories.id },
    });

    // Addon create
    const addonCategoryId = addonCategories.id;
    const addonName1 = {
      name: "default addon one",
      price: 100,
      addonCategoryId,
    };
    const addonName2 = {
      name: "default addon two",
      price: 100,
      addonCategoryId,
    };
    const addonName3 = {
      name: "default addon three",
      price: 100,
      addonCategoryId,
    };
    const newAddon = [addonName1, addonName2, addonName3];

    const addons = await prisma.$transaction(
      newAddon.map((item) => prisma.addon.create({ data: item }))
    );
    const newLocation = "default Location";
    const locations = await prisma.location.create({
      data: { name: newLocation, companyId },
    });
    const data = {
      user,
      company,
      menuCategories: [...[], menuCategories],
      menus: [...[], menus],
      menuCategoryMenus: [...[], menuCategoryMenus],
      addonCategories: [...[], addonCategories],
      menuAddonCategories: [...[], menuAddonCategories],
      addons,
      locations: [...[], locations],
    };
    return res.status(200).send(data);
  }
  res.status(200).send("hello i get it");
}

// const student = {name:"thiha"}
// const students = [1,2,3,4]
// const arryStudent = [...[students],student]

// console.log(arryStudent)

// const numbe = [1,2,3,4,5]
// const student = {name:"hello",age:"16"}
// const numberobjs = {...{},numbers}
// const numandObjects = {...student,numbers}
// console.log(numberobjs)
