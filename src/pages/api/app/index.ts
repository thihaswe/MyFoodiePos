// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utils/db";
import addonSlice from "@/store/slices/addonSlice";
import AddOnCategories from "@/pages/backoffice/addon-categories";
import {
  DisableLocationMenu,
  DisableLocationMenuCategory,
} from "@prisma/client";

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

    // location Create
    const newLocation = "default Location";
    const locations = await prisma.location.create({
      data: { name: newLocation, companyId },
    });

    // menuCategory create
    const newMenuCategoryName = "default menuCategory";
    const menuCategories = await prisma.menuCategory.create({
      data: { name: newMenuCategoryName, locationId: locations.id, companyId },
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
    const menuCategoryMenus = await prisma.menuCategoryMenu.create({
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

    const disableLocationMenus: DisableLocationMenu[] = [];
    const disableLocationMenuCategories: DisableLocationMenuCategory[] = [];

    const data = {
      user,
      company,
      menuCategories: [...[], menuCategories],
      menus: [...[], menus],
      disableLocationMenus,
      disableLocationMenuCategories,
      menuCategoryMenus: [...[], menuCategoryMenus],
      addonCategories: [...[], addonCategories],
      menuAddonCategories: [...[], menuAddonCategories],
      addons,
      locations: [...[], locations],
    };
    return res.status(200).send(data);
  } else {
    const { id, name, email, companyId } = dbUser;

    //getting company
    const company = await prisma.company.findUnique({
      where: { id: companyId, isArchived: false },
    });

    // getting locations

    const locations = await prisma.location.findMany({
      where: { companyId, isArchived: false },
    });

    // getting menuCategory
    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId, isArchived: false },
    });

    // getting menuCategoryMenu
    const menuCategoriesIds = menuCategories.map((item) => item.id);
    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: {
        menuCategoryId: { in: menuCategories.map((item) => item.id) },
        isArchived: false,
      },
    });
    // getting menu
    const menuIds = menuCategoryMenus.map((item) => item.menuId);
    const menus = await prisma.menu.findMany({
      where: { id: { in: menuIds }, isArchived: false },
    });

    // getting disableLocationMenuCategory
    const disableLocationMenuCategories =
      await prisma.disableLocationMenuCategory.findMany({
        where: {
          menuCategoryId: { in: menuCategories.map((item) => item.id) },
          locationId: { in: locations.map((item) => item.id) },
          isArchived: false,
        },
      });

    //  getting disableLocationMenus
    const disableLocationMenus = await prisma.disableLocationMenu.findMany({
      where: {
        menuId: { in: menus.map((item) => item.id) },
        locationId: { in: locations.map((item) => item.id) },
        isArchived: false,
      },
    });

    // getting menuaddoncategories
    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: {
        menuId: { in: menus.map((item) => item.id) },
        isArchived: false,
      },
    });

    // getting addonCategories
    const addonCategories = await prisma.addonCategory.findMany({
      where: {
        id: { in: menuAddonCategories.map((item) => item.id) },
        isArchived: false,
      },
    });

    // getting addons
    const addons = await prisma.addon.findMany({
      where: {
        addonCategoryId: { in: addonCategories.map((item) => item.id) },
        isArchived: false,
      },
    });
    const data = {
      company: [...[], company],
      menuCategories,
      menus,
      disableLocationMenus,
      disableLocationMenuCategories,
      menuCategoryMenus,
      addonCategories,
      menuAddonCategories,
      addons,
      locations,
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

// for (let i = 0; i < 100; i++) {
//   console.log("hello");
// }

// const human = { name: "thiha", age: 15, gender: "male" };
// const robot = { name: "robot", age: 15 };
// const {name ,age,gender:sex} = human
