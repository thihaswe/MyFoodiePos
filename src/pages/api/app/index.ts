// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utils/db";
import {
  DisableLocationMenu,
  DisableLocationMenuCategory,
} from "@prisma/client";
import { getQrCodeUrl, qrCodeImageUpload } from "@/utils/fileUpload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("unauthorized");
  if (method !== "GET") return res.status(405).send("Invalid Method");
  const { user } = session;
  if (!user) return res.status(401).send("server error ");
  const name = user?.name as string;
  const email = user?.email as string;
  const dbUser = await prisma.user.findUnique({ where: { email } });
  if (!dbUser) {
    // company create
    const newCompanyName = "foodie company";
    const newCompanyAddress = "NO,100mote zayy tan street";

    const newCompany = await prisma.company.create({
      data: { name: newCompanyName, address: newCompanyAddress },
    });

    // user create
    const companyId = newCompany.id;
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

    // table create
    const newTableName = "Default table";
    const tables = await prisma.table.create({
      data: { name: newTableName, locationId: locations.id, assetUrl: "" },
    });
    await qrCodeImageUpload(tables.id);
    const assetUrl = getQrCodeUrl(tables.id);
    await prisma.table.update({
      data: { assetUrl },
      where: { id: tables.id },
    });

    const disableLocationMenus: DisableLocationMenu[] = [];
    const disableLocationMenuCategories: DisableLocationMenuCategory[] = [];

    const data = {
      user,
      company: [...[], newCompany],
      menuCategories: [...[], menuCategories],
      menus: [...[], menus],
      disableLocationMenus,
      disableLocationMenuCategories,
      menuCategoryMenus: [...[], menuCategoryMenus],
      addonCategories: [...[], addonCategories],
      menuAddonCategories: [...[], menuAddonCategories],
      addons,
      locations: [...[], locations],
      tables: [...[], tables],
    };
    return res.status(200).send(data);
  } else {
    const companyId = dbUser.companyId;
    //getting company
    const company = await prisma.company.findMany({
      where: { id: companyId, isArchived: false },
    });
    const companyIds = company.map((item) => item.id);
    // getting locations

    const locations = await prisma.location.findMany({
      where: { companyId, isArchived: false },
    });
    const locationsIds = locations.map((item) => item.id);

    // getting menuCategory
    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId: { in: companyIds }, isArchived: false },
      orderBy: { id: "asc" },
    });

    // getting menuCategoryMenu
    const menuCategoriesIds = menuCategories.map((item) => item.id);
    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: {
        menuCategoryId: { in: menuCategoriesIds },
        isArchived: false,
      },
    });
    // getting menu
    const menuIds = menuCategoryMenus.map((item) => item.menuId);
    const menus = await prisma.menu.findMany({
      where: { id: { in: menuIds }, isArchived: false },
      orderBy: { id: "asc" },
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

    // getting tables
    const tables = await prisma.table.findMany({
      where: { locationId: { in: locationsIds }, isArchived: false },
    });

    const data = {
      company,
      menuCategories,
      menus,
      disableLocationMenus,
      disableLocationMenuCategories,
      menuCategoryMenus,
      addonCategories,
      menuAddonCategories,
      addons,
      locations,
      tables,
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

// how-to-fetch-all-git-branches.html:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
// const num = [1,2,3]
// undefined
// const fun1 = async () => {
//     num.map(async (a) => {
//         await fetch("https://fakestoreapi.com/products/1");
//         console.log(a);
//     });
//     console.log("outside");
// };

// undefined
// const fun2 = async()=>{
//     for(const ele of num){
//         await fetch ("https://fakestoreapi.com/products/1")
//         console.log(ele)
//     }
//     console.log("outside")
// }
// undefined
// fun2()
// Promise {<pending>}
// VM107:4 1
// VM107:4 2
// VM107:4 3
// VM107:6 outside
// fun1()
// VM95:6 outside
// Promise {<fulfilled>: undefined}
// VM95:4 2
// VM95:4 3
// VM95:4 1
