// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dumbData = {
    company: {
      id: 1,
      name: "Ah Wa Sarr",
      street: "Hintada Street 21",
      township: "Sanchaung",
      city: "Yangon",
      isArchived: false,
      createdAt: "2023-12-06T05:48:51.411Z",
      updatedAt: "2023-12-06T05:48:51.411Z",
    },
    locations: [
      {
        id: 1,
        name: "Sanchaung",
        street: "Sanchaung",
        township: "Sanchaung",
        city: "Sanchaung",
        companyId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:48:52.137Z",
        updatedAt: "2023-12-06T05:48:52.137Z",
      },
    ],
    menuCategories: [
      {
        id: 1,
        name: "Dessert",
        companyId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:48:51.553Z",
        updatedAt: "2023-12-06T06:24:16.693Z",
      },
      {
        id: 2,
        name: "Most Popular",
        companyId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:49:06.024Z",
        updatedAt: "2023-12-06T06:22:40.526Z",
      },
      {
        id: 3,
        name: "Appetizer",
        companyId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:49:06.024Z",
        updatedAt: "2023-12-06T06:23:43.074Z",
      },
      {
        id: 4,
        name: "Soup",
        companyId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:49:06.024Z",
        updatedAt: "2023-12-06T05:49:06.024Z",
      },
      {
        id: 5,
        name: "Salad",
        companyId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:49:06.024Z",
        updatedAt: "2023-12-06T05:49:06.024Z",
      },
      {
        id: 6,
        name: "Hot Dish",
        companyId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:49:06.024Z",
        updatedAt: "2023-12-06T05:49:06.024Z",
      },
      {
        id: 7,
        name: "Drink",
        companyId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:49:06.024Z",
        updatedAt: "2023-12-06T05:49:06.024Z",
      },
      {
        id: 8,
        name: "Main Dish",
        companyId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:49:06.024Z",
        updatedAt: "2023-12-06T06:24:02.962Z",
      },
    ],
    menus: [
      {
        id: 1,
        name: "Default menu",
        price: 1000,
        description: null,
        assetUrl: null,
        isArchived: false,
        createdAt: "2023-12-06T05:48:51.631Z",
        updatedAt: "2023-12-06T05:48:51.631Z",
      },
      {
        id: 2,
        name: "Mont Him Khar",
        price: 1000,
        description: "Burmese rice noodle with fish soup",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701844433945_mohinga.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T06:33:57.535Z",
      },
      {
        id: 3,
        name: "Shan Kout Swell",
        price: 2000,
        description: "Shan rice noodle with ckicken soup",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701873747360_shan.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T14:42:27.620Z",
      },
      {
        id: 4,
        name: "Laphet Tote",
        price: 1500,
        description: "Tea-leaf salad with mixed fries peas and dry shrimps.",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701844451016_laphet.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T06:50:21.629Z",
      },
      {
        id: 5,
        name: "Ohnoe Kout Swell",
        price: 1500,
        description: "Rice noodle wtih coconut milk and chicken",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701875560465_ohnoe.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T15:12:43.992Z",
      },
      {
        id: 6,
        name: "NanGyi Tote",
        price: 1500,
        description: "Noddle salad with chicken curry and  egg ",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701844722576_nangyi.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T06:50:50.736Z",
      },
      {
        id: 7,
        name: "Tofu Nway",
        price: 3500,
        description: " Shan style Tofu soup.",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701875627104_tofunway.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T15:13:47.356Z",
      },
      {
        id: 8,
        name: "Tamin Si San",
        price: 500,
        description: "Rice with peanut oil and yellow peas",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701846134044_photo-520.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T07:02:17.888Z",
      },
      {
        id: 9,
        name: "Si Tamin",
        price: 1000,
        description: "Sticky rice with fries-dry-fish and coconut chip",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701873644110_sitamin.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T14:40:52.851Z",
      },
      {
        id: 10,
        name: "Akyaw Sone",
        price: 3000,
        description:
          "Fries mixed vegetables with rice-powder,serve with tamarind sauce",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701846333050_AKyawSone-7ef8e742b8c74aebb8fc4aff087f3fca.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T07:05:36.565Z",
      },
      {
        id: 11,
        name: "Mont lin mayer",
        price: 1500,
        description: " Burmese pancake (couple) with peanuts and salted Sesame",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701873714161_lmy.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T14:42:10.672Z",
      },
      {
        id: 12,
        name: "Mont Kywel Thel",
        price: 2000,
        description: "Burmese sticky brown cake with coconut chip",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701875598596_mont1.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T15:13:28.561Z",
      },
      {
        id: 13,
        name: "Shwe Yin Aye",
        price: 2500,
        description: "Mixed gelly with sweet coconut milk",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701874351631_kout.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T14:52:35.588Z",
      },
      {
        id: 14,
        name: "Cho Saint",
        price: 1500,
        description: "Burmese tea with cream and evaporated milk",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701874461625_tea.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T14:54:27.173Z",
      },
      {
        id: 15,
        name: "Kaw Pyan Late",
        price: 1500,
        description: "Spring-roll with vegerables inside",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701845271896_sproll.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T06:52:56.240Z",
      },
      {
        id: 16,
        name: "Ham & Cheese Sandwish",
        price: 2500,
        description: "Grilled ham and cheese sandwish",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701845289327_hcsand.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T06:53:13.094Z",
      },
      {
        id: 17,
        name: "Boil Eggs",
        price: 1500,
        description: "Boil eggs ",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701874413116_egg.jpeg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T14:53:38.728Z",
      },
      {
        id: 18,
        name: "B.E.T",
        price: 2000,
        description: "fries eggs with bacon and tomato",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701845325397_bet.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T06:53:39.648Z",
      },
      {
        id: 19,
        name: "DTH steak",
        price: 5500,
        description: "Grilled Pork steak with flat chip ",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701873772313_steak1.png",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T14:42:52.601Z",
      },
      {
        id: 20,
        name: "Tomato soup",
        price: 1500,
        description: "Classic tomato soup with gallic-bread ",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701874480687_tmtsoup.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T14:54:44.306Z",
      },
      {
        id: 21,
        name: " Cream soup",
        price: 1500,
        description: "Tomato soup with cream and orzo-basil",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701875540559_029e34723a299a9706ab58d1c635cb16.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T15:12:23.262Z",
      },
      {
        id: 22,
        name: "Mushroom soup",
        price: 1500,
        description: "Mushroom soup with milk cream and sinamon",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701874496814_msc.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T14:55:08.627Z",
      },
      {
        id: 23,
        name: "Carrot Soup",
        price: 1500,
        description: "Carrot soup with white cream ",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701844158661_carrot.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T06:55:05.782Z",
      },
      {
        id: 24,
        name: "Rice Soup",
        price: 1500,
        description: "Rice soup with chicken ",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701874987989_Screenshot%202023-12-06%20220254.png",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T15:03:11.708Z",
      },
      {
        id: 25,
        name: "Orange Juice",
        price: 1000,
        description: "Fresh orange juice with orange slice",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701875076205_Screenshot%202023-12-06%20220417.png",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T15:04:41.428Z",
      },
      {
        id: 26,
        name: "Watermelon Juice",
        price: 1000,
        description: "Fresh Watermelon juice with Watermelon slice",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701875441618_85649244ed9724c534d1ba28656745c8.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T15:10:45.722Z",
      },
      {
        id: 27,
        name: "Avocado Juice",
        price: 2000,
        description: "Fresh Avocado juice with Avocados",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701845343058_juice1.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T06:55:52.998Z",
      },
      {
        id: 28,
        name: "stewberry Juice",
        price: 1000,
        description: "Fresh stewberry juice with stewberry",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701873686537_stew.png",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T14:41:41.718Z",
      },
      {
        id: 29,
        name: "Tamarind Juice",
        price: 1000,
        description: " Tamarind juice with burmese brown sugar",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701875102003_tamarind.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T15:05:04.779Z",
      },
      {
        id: 30,
        name: "French Fries",
        price: 1500,
        description: "serve with Mayonnaise and Ketchup",
        assetUrl:
          "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquarefdc/1701886026173_french-fries.jpg",
        isArchived: false,
        createdAt: "2023-12-06T06:01:42.423Z",
        updatedAt: "2023-12-06T18:07:13.005Z",
      },
    ],
    menuCategoryMenus: [
      {
        id: 1,
        menuCategoryId: 1,
        menuId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:48:51.704Z",
        updatedAt: "2023-12-06T05:48:51.704Z",
      },
      {
        id: 2,
        menuCategoryId: 1,
        menuId: 1,
        isArchived: false,
        createdAt: "2023-12-06T06:05:55.276Z",
        updatedAt: "2023-12-06T06:05:55.276Z",
      },
      {
        id: 105,
        menuCategoryId: 6,
        menuId: 2,
        isArchived: false,
        createdAt: "2023-12-06T06:33:57.650Z",
        updatedAt: "2023-12-06T06:33:57.650Z",
      },
      {
        id: 106,
        menuCategoryId: 4,
        menuId: 2,
        isArchived: false,
        createdAt: "2023-12-06T06:33:57.650Z",
        updatedAt: "2023-12-06T06:33:57.650Z",
      },
      {
        id: 107,
        menuCategoryId: 2,
        menuId: 2,
        isArchived: false,
        createdAt: "2023-12-06T06:33:57.650Z",
        updatedAt: "2023-12-06T06:33:57.650Z",
      },
      {
        id: 123,
        menuCategoryId: 2,
        menuId: 4,
        isArchived: false,
        createdAt: "2023-12-06T06:50:21.733Z",
        updatedAt: "2023-12-06T06:50:21.733Z",
      },
      {
        id: 124,
        menuCategoryId: 5,
        menuId: 4,
        isArchived: false,
        createdAt: "2023-12-06T06:50:21.733Z",
        updatedAt: "2023-12-06T06:50:21.733Z",
      },
      {
        id: 125,
        menuCategoryId: 3,
        menuId: 4,
        isArchived: false,
        createdAt: "2023-12-06T06:50:21.733Z",
        updatedAt: "2023-12-06T06:50:21.733Z",
      },
      {
        id: 130,
        menuCategoryId: 5,
        menuId: 6,
        isArchived: false,
        createdAt: "2023-12-06T06:50:50.839Z",
        updatedAt: "2023-12-06T06:50:50.839Z",
      },
      {
        id: 131,
        menuCategoryId: 2,
        menuId: 6,
        isArchived: false,
        createdAt: "2023-12-06T06:50:50.839Z",
        updatedAt: "2023-12-06T06:50:50.839Z",
      },
      {
        id: 150,
        menuCategoryId: 3,
        menuId: 15,
        isArchived: false,
        createdAt: "2023-12-06T06:52:56.337Z",
        updatedAt: "2023-12-06T06:52:56.337Z",
      },
      {
        id: 151,
        menuCategoryId: 3,
        menuId: 16,
        isArchived: false,
        createdAt: "2023-12-06T06:53:13.200Z",
        updatedAt: "2023-12-06T06:53:13.200Z",
      },
      {
        id: 152,
        menuCategoryId: 8,
        menuId: 16,
        isArchived: false,
        createdAt: "2023-12-06T06:53:13.200Z",
        updatedAt: "2023-12-06T06:53:13.200Z",
      },
      {
        id: 156,
        menuCategoryId: 3,
        menuId: 18,
        isArchived: false,
        createdAt: "2023-12-06T06:53:39.718Z",
        updatedAt: "2023-12-06T06:53:39.718Z",
      },
      {
        id: 165,
        menuCategoryId: 6,
        menuId: 23,
        isArchived: false,
        createdAt: "2023-12-06T06:55:05.940Z",
        updatedAt: "2023-12-06T06:55:05.940Z",
      },
      {
        id: 166,
        menuCategoryId: 4,
        menuId: 23,
        isArchived: false,
        createdAt: "2023-12-06T06:55:05.940Z",
        updatedAt: "2023-12-06T06:55:05.940Z",
      },
      {
        id: 175,
        menuCategoryId: 1,
        menuId: 27,
        isArchived: false,
        createdAt: "2023-12-06T06:55:53.118Z",
        updatedAt: "2023-12-06T06:55:53.118Z",
      },
      {
        id: 176,
        menuCategoryId: 7,
        menuId: 27,
        isArchived: false,
        createdAt: "2023-12-06T06:55:53.118Z",
        updatedAt: "2023-12-06T06:55:53.118Z",
      },
      {
        id: 195,
        menuCategoryId: 8,
        menuId: 8,
        isArchived: false,
        createdAt: "2023-12-06T07:02:18.007Z",
        updatedAt: "2023-12-06T07:02:18.007Z",
      },
      {
        id: 196,
        menuCategoryId: 2,
        menuId: 8,
        isArchived: false,
        createdAt: "2023-12-06T07:02:18.007Z",
        updatedAt: "2023-12-06T07:02:18.007Z",
      },
      {
        id: 199,
        menuCategoryId: 2,
        menuId: 10,
        isArchived: false,
        createdAt: "2023-12-06T07:05:36.669Z",
        updatedAt: "2023-12-06T07:05:36.669Z",
      },
      {
        id: 200,
        menuCategoryId: 3,
        menuId: 10,
        isArchived: false,
        createdAt: "2023-12-06T07:05:36.669Z",
        updatedAt: "2023-12-06T07:05:36.669Z",
      },
      {
        id: 206,
        menuCategoryId: 1,
        menuId: 9,
        isArchived: false,
        createdAt: "2023-12-06T14:40:52.956Z",
        updatedAt: "2023-12-06T14:40:52.956Z",
      },
      {
        id: 207,
        menuCategoryId: 3,
        menuId: 9,
        isArchived: false,
        createdAt: "2023-12-06T14:40:52.956Z",
        updatedAt: "2023-12-06T14:40:52.956Z",
      },
      {
        id: 210,
        menuCategoryId: 1,
        menuId: 28,
        isArchived: false,
        createdAt: "2023-12-06T14:41:41.822Z",
        updatedAt: "2023-12-06T14:41:41.822Z",
      },
      {
        id: 211,
        menuCategoryId: 7,
        menuId: 28,
        isArchived: false,
        createdAt: "2023-12-06T14:41:41.822Z",
        updatedAt: "2023-12-06T14:41:41.822Z",
      },
      {
        id: 214,
        menuCategoryId: 3,
        menuId: 11,
        isArchived: false,
        createdAt: "2023-12-06T14:42:10.786Z",
        updatedAt: "2023-12-06T14:42:10.786Z",
      },
      {
        id: 215,
        menuCategoryId: 2,
        menuId: 11,
        isArchived: false,
        createdAt: "2023-12-06T14:42:10.786Z",
        updatedAt: "2023-12-06T14:42:10.786Z",
      },
      {
        id: 216,
        menuCategoryId: 2,
        menuId: 3,
        isArchived: false,
        createdAt: "2023-12-06T14:42:27.726Z",
        updatedAt: "2023-12-06T14:42:27.726Z",
      },
      {
        id: 217,
        menuCategoryId: 5,
        menuId: 3,
        isArchived: false,
        createdAt: "2023-12-06T14:42:27.726Z",
        updatedAt: "2023-12-06T14:42:27.726Z",
      },
      {
        id: 218,
        menuCategoryId: 8,
        menuId: 19,
        isArchived: false,
        createdAt: "2023-12-06T14:42:52.676Z",
        updatedAt: "2023-12-06T14:42:52.676Z",
      },
      {
        id: 221,
        menuCategoryId: 1,
        menuId: 13,
        isArchived: false,
        createdAt: "2023-12-06T14:52:35.695Z",
        updatedAt: "2023-12-06T14:52:35.695Z",
      },
      {
        id: 222,
        menuCategoryId: 7,
        menuId: 13,
        isArchived: false,
        createdAt: "2023-12-06T14:52:35.695Z",
        updatedAt: "2023-12-06T14:52:35.695Z",
      },
      {
        id: 226,
        menuCategoryId: 6,
        menuId: 17,
        isArchived: false,
        createdAt: "2023-12-06T14:53:38.839Z",
        updatedAt: "2023-12-06T14:53:38.839Z",
      },
      {
        id: 227,
        menuCategoryId: 3,
        menuId: 17,
        isArchived: false,
        createdAt: "2023-12-06T14:53:38.839Z",
        updatedAt: "2023-12-06T14:53:38.839Z",
      },
      {
        id: 228,
        menuCategoryId: 2,
        menuId: 17,
        isArchived: false,
        createdAt: "2023-12-06T14:53:38.839Z",
        updatedAt: "2023-12-06T14:53:38.839Z",
      },
      {
        id: 233,
        menuCategoryId: 1,
        menuId: 14,
        isArchived: false,
        createdAt: "2023-12-06T14:54:27.349Z",
        updatedAt: "2023-12-06T14:54:27.349Z",
      },
      {
        id: 234,
        menuCategoryId: 3,
        menuId: 14,
        isArchived: false,
        createdAt: "2023-12-06T14:54:27.349Z",
        updatedAt: "2023-12-06T14:54:27.349Z",
      },
      {
        id: 235,
        menuCategoryId: 2,
        menuId: 14,
        isArchived: false,
        createdAt: "2023-12-06T14:54:27.349Z",
        updatedAt: "2023-12-06T14:54:27.349Z",
      },
      {
        id: 236,
        menuCategoryId: 7,
        menuId: 14,
        isArchived: false,
        createdAt: "2023-12-06T14:54:27.349Z",
        updatedAt: "2023-12-06T14:54:27.349Z",
      },
      {
        id: 239,
        menuCategoryId: 4,
        menuId: 20,
        isArchived: false,
        createdAt: "2023-12-06T14:54:44.412Z",
        updatedAt: "2023-12-06T14:54:44.412Z",
      },
      {
        id: 240,
        menuCategoryId: 6,
        menuId: 20,
        isArchived: false,
        createdAt: "2023-12-06T14:54:44.412Z",
        updatedAt: "2023-12-06T14:54:44.412Z",
      },
      {
        id: 244,
        menuCategoryId: 3,
        menuId: 22,
        isArchived: false,
        createdAt: "2023-12-06T14:55:08.749Z",
        updatedAt: "2023-12-06T14:55:08.749Z",
      },
      {
        id: 245,
        menuCategoryId: 6,
        menuId: 22,
        isArchived: false,
        createdAt: "2023-12-06T14:55:08.749Z",
        updatedAt: "2023-12-06T14:55:08.749Z",
      },
      {
        id: 246,
        menuCategoryId: 4,
        menuId: 22,
        isArchived: false,
        createdAt: "2023-12-06T14:55:08.749Z",
        updatedAt: "2023-12-06T14:55:08.749Z",
      },
      {
        id: 255,
        menuCategoryId: 6,
        menuId: 24,
        isArchived: false,
        createdAt: "2023-12-06T15:03:11.813Z",
        updatedAt: "2023-12-06T15:03:11.813Z",
      },
      {
        id: 256,
        menuCategoryId: 8,
        menuId: 24,
        isArchived: false,
        createdAt: "2023-12-06T15:03:11.813Z",
        updatedAt: "2023-12-06T15:03:11.813Z",
      },
      {
        id: 257,
        menuCategoryId: 4,
        menuId: 24,
        isArchived: false,
        createdAt: "2023-12-06T15:03:11.813Z",
        updatedAt: "2023-12-06T15:03:11.813Z",
      },
      {
        id: 258,
        menuCategoryId: 3,
        menuId: 24,
        isArchived: false,
        createdAt: "2023-12-06T15:03:11.813Z",
        updatedAt: "2023-12-06T15:03:11.813Z",
      },
      {
        id: 261,
        menuCategoryId: 1,
        menuId: 25,
        isArchived: false,
        createdAt: "2023-12-06T15:04:41.542Z",
        updatedAt: "2023-12-06T15:04:41.542Z",
      },
      {
        id: 262,
        menuCategoryId: 7,
        menuId: 25,
        isArchived: false,
        createdAt: "2023-12-06T15:04:41.542Z",
        updatedAt: "2023-12-06T15:04:41.542Z",
      },
      {
        id: 265,
        menuCategoryId: 1,
        menuId: 29,
        isArchived: false,
        createdAt: "2023-12-06T15:05:04.885Z",
        updatedAt: "2023-12-06T15:05:04.885Z",
      },
      {
        id: 266,
        menuCategoryId: 7,
        menuId: 29,
        isArchived: false,
        createdAt: "2023-12-06T15:05:04.885Z",
        updatedAt: "2023-12-06T15:05:04.885Z",
      },
      {
        id: 277,
        menuCategoryId: 1,
        menuId: 26,
        isArchived: false,
        createdAt: "2023-12-06T15:10:45.828Z",
        updatedAt: "2023-12-06T15:10:45.828Z",
      },
      {
        id: 278,
        menuCategoryId: 7,
        menuId: 26,
        isArchived: false,
        createdAt: "2023-12-06T15:10:45.828Z",
        updatedAt: "2023-12-06T15:10:45.828Z",
      },
      {
        id: 281,
        menuCategoryId: 6,
        menuId: 21,
        isArchived: false,
        createdAt: "2023-12-06T15:12:23.373Z",
        updatedAt: "2023-12-06T15:12:23.373Z",
      },
      {
        id: 282,
        menuCategoryId: 4,
        menuId: 21,
        isArchived: false,
        createdAt: "2023-12-06T15:12:23.373Z",
        updatedAt: "2023-12-06T15:12:23.373Z",
      },
      {
        id: 287,
        menuCategoryId: 6,
        menuId: 5,
        isArchived: false,
        createdAt: "2023-12-06T15:12:44.101Z",
        updatedAt: "2023-12-06T15:12:44.101Z",
      },
      {
        id: 288,
        menuCategoryId: 8,
        menuId: 5,
        isArchived: false,
        createdAt: "2023-12-06T15:12:44.101Z",
        updatedAt: "2023-12-06T15:12:44.101Z",
      },
      {
        id: 289,
        menuCategoryId: 4,
        menuId: 5,
        isArchived: false,
        createdAt: "2023-12-06T15:12:44.101Z",
        updatedAt: "2023-12-06T15:12:44.101Z",
      },
      {
        id: 290,
        menuCategoryId: 2,
        menuId: 5,
        isArchived: false,
        createdAt: "2023-12-06T15:12:44.101Z",
        updatedAt: "2023-12-06T15:12:44.101Z",
      },
      {
        id: 292,
        menuCategoryId: 1,
        menuId: 12,
        isArchived: false,
        createdAt: "2023-12-06T15:13:28.670Z",
        updatedAt: "2023-12-06T15:13:28.670Z",
      },
      {
        id: 293,
        menuCategoryId: 4,
        menuId: 7,
        isArchived: false,
        createdAt: "2023-12-06T15:13:47.517Z",
        updatedAt: "2023-12-06T15:13:47.517Z",
      },
      {
        id: 294,
        menuCategoryId: 2,
        menuId: 7,
        isArchived: false,
        createdAt: "2023-12-06T15:13:47.517Z",
        updatedAt: "2023-12-06T15:13:47.517Z",
      },
      {
        id: 295,
        menuCategoryId: 8,
        menuId: 7,
        isArchived: false,
        createdAt: "2023-12-06T15:13:47.517Z",
        updatedAt: "2023-12-06T15:13:47.517Z",
      },
      {
        id: 298,
        menuCategoryId: 3,
        menuId: 30,
        isArchived: false,
        createdAt: "2023-12-06T18:07:13.141Z",
        updatedAt: "2023-12-06T18:07:13.141Z",
      },
      {
        id: 299,
        menuCategoryId: 2,
        menuId: 30,
        isArchived: false,
        createdAt: "2023-12-06T18:07:13.141Z",
        updatedAt: "2023-12-06T18:07:13.141Z",
      },
    ],
    menuAddonCategories: [
      {
        id: 3,
        menuId: 1,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T07:09:16.878Z",
        updatedAt: "2023-12-06T07:09:16.878Z",
      },
      {
        id: 4,
        menuId: 2,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T07:09:16.878Z",
        updatedAt: "2023-12-06T07:09:16.878Z",
      },
      {
        id: 5,
        menuId: 3,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T07:09:16.878Z",
        updatedAt: "2023-12-06T07:09:16.878Z",
      },
      {
        id: 6,
        menuId: 4,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T07:09:16.878Z",
        updatedAt: "2023-12-06T07:09:16.878Z",
      },
      {
        id: 7,
        menuId: 5,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T07:09:16.878Z",
        updatedAt: "2023-12-06T07:09:16.878Z",
      },
      {
        id: 8,
        menuId: 6,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T07:09:16.878Z",
        updatedAt: "2023-12-06T07:09:16.878Z",
      },
      {
        id: 9,
        menuId: 7,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T07:09:16.878Z",
        updatedAt: "2023-12-06T07:09:16.878Z",
      },
      {
        id: 10,
        menuId: 10,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T07:09:16.878Z",
        updatedAt: "2023-12-06T07:09:16.878Z",
      },
      {
        id: 11,
        menuId: 30,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T07:09:16.878Z",
        updatedAt: "2023-12-06T07:09:16.878Z",
      },
      {
        id: 16,
        menuId: 2,
        addonCategoryId: 3,
        isArchived: false,
        createdAt: "2023-12-06T07:11:00.038Z",
        updatedAt: "2023-12-06T07:11:00.038Z",
      },
      {
        id: 17,
        menuId: 3,
        addonCategoryId: 3,
        isArchived: false,
        createdAt: "2023-12-06T07:11:00.038Z",
        updatedAt: "2023-12-06T07:11:00.038Z",
      },
      {
        id: 18,
        menuId: 5,
        addonCategoryId: 3,
        isArchived: false,
        createdAt: "2023-12-06T07:11:00.038Z",
        updatedAt: "2023-12-06T07:11:00.038Z",
      },
      {
        id: 19,
        menuId: 6,
        addonCategoryId: 3,
        isArchived: false,
        createdAt: "2023-12-06T07:11:00.038Z",
        updatedAt: "2023-12-06T07:11:00.038Z",
      },
      {
        id: 20,
        menuId: 8,
        addonCategoryId: 3,
        isArchived: false,
        createdAt: "2023-12-06T07:11:00.038Z",
        updatedAt: "2023-12-06T07:11:00.038Z",
      },
      {
        id: 31,
        menuId: 17,
        addonCategoryId: 5,
        isArchived: false,
        createdAt: "2023-12-06T07:13:07.536Z",
        updatedAt: "2023-12-06T07:13:07.536Z",
      },
      {
        id: 32,
        menuId: 18,
        addonCategoryId: 5,
        isArchived: false,
        createdAt: "2023-12-06T07:13:07.536Z",
        updatedAt: "2023-12-06T07:13:07.536Z",
      },
      {
        id: 33,
        menuId: 19,
        addonCategoryId: 5,
        isArchived: false,
        createdAt: "2023-12-06T07:13:07.536Z",
        updatedAt: "2023-12-06T07:13:07.536Z",
      },
      {
        id: 34,
        menuId: 3,
        addonCategoryId: 4,
        isArchived: false,
        createdAt: "2023-12-06T07:20:06.898Z",
        updatedAt: "2023-12-06T07:20:06.898Z",
      },
      {
        id: 35,
        menuId: 5,
        addonCategoryId: 4,
        isArchived: false,
        createdAt: "2023-12-06T07:20:06.898Z",
        updatedAt: "2023-12-06T07:20:06.898Z",
      },
      {
        id: 36,
        menuId: 6,
        addonCategoryId: 4,
        isArchived: false,
        createdAt: "2023-12-06T07:20:06.898Z",
        updatedAt: "2023-12-06T07:20:06.898Z",
      },
      {
        id: 37,
        menuId: 8,
        addonCategoryId: 4,
        isArchived: false,
        createdAt: "2023-12-06T07:20:06.898Z",
        updatedAt: "2023-12-06T07:20:06.898Z",
      },
      {
        id: 38,
        menuId: 4,
        addonCategoryId: 4,
        isArchived: false,
        createdAt: "2023-12-06T07:20:06.898Z",
        updatedAt: "2023-12-06T07:20:06.898Z",
      },
      {
        id: 39,
        menuId: 16,
        addonCategoryId: 4,
        isArchived: false,
        createdAt: "2023-12-06T07:20:06.898Z",
        updatedAt: "2023-12-06T07:20:06.898Z",
      },
      {
        id: 41,
        menuId: 2,
        addonCategoryId: 2,
        isArchived: false,
        createdAt: "2023-12-06T18:36:44.683Z",
        updatedAt: "2023-12-06T18:36:44.683Z",
      },
      {
        id: 42,
        menuId: 3,
        addonCategoryId: 2,
        isArchived: false,
        createdAt: "2023-12-06T18:36:44.683Z",
        updatedAt: "2023-12-06T18:36:44.683Z",
      },
      {
        id: 43,
        menuId: 5,
        addonCategoryId: 2,
        isArchived: false,
        createdAt: "2023-12-06T18:36:44.683Z",
        updatedAt: "2023-12-06T18:36:44.683Z",
      },
      {
        id: 44,
        menuId: 6,
        addonCategoryId: 2,
        isArchived: false,
        createdAt: "2023-12-06T18:36:44.683Z",
        updatedAt: "2023-12-06T18:36:44.683Z",
      },
    ],
    addonCategories: [
      {
        id: 1,
        name: "SIZE",
        isRequired: true,
        isArchived: false,
        createdAt: "2023-12-06T05:48:51.775Z",
        updatedAt: "2023-12-06T07:09:16.676Z",
      },
      {
        id: 2,
        name: "Spiciness",
        isRequired: true,
        isArchived: false,
        createdAt: "2023-12-06T07:10:00.236Z",
        updatedAt: "2023-12-06T18:36:44.493Z",
      },
      {
        id: 3,
        name: "Topping",
        isRequired: false,
        isArchived: false,
        createdAt: "2023-12-06T07:10:59.937Z",
        updatedAt: "2023-12-06T07:10:59.937Z",
      },
      {
        id: 4,
        name: "Extra",
        isRequired: false,
        isArchived: false,
        createdAt: "2023-12-06T07:12:00.966Z",
        updatedAt: "2023-12-06T07:20:06.548Z",
      },
      {
        id: 5,
        name: "Cooked Option",
        isRequired: true,
        isArchived: false,
        createdAt: "2023-12-06T07:13:03.387Z",
        updatedAt: "2023-12-06T07:13:07.432Z",
      },
    ],
    addons: [
      {
        id: 1,
        name: "Normal",
        price: 0,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:48:51.957Z",
        updatedAt: "2023-12-06T07:14:13.284Z",
      },
      {
        id: 2,
        name: "Big",
        price: 500,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:48:51.957Z",
        updatedAt: "2023-12-06T07:14:24.030Z",
      },
      {
        id: 3,
        name: "Extra Big",
        price: 700,
        addonCategoryId: 1,
        isArchived: false,
        createdAt: "2023-12-06T05:48:51.957Z",
        updatedAt: "2023-12-06T07:14:37.581Z",
      },
      {
        id: 4,
        name: "Normal",
        price: 0,
        addonCategoryId: 2,
        isArchived: false,
        createdAt: "2023-12-06T07:14:49.122Z",
        updatedAt: "2023-12-06T07:14:49.122Z",
      },
      {
        id: 5,
        name: "No Spicy",
        price: 0,
        addonCategoryId: 2,
        isArchived: false,
        createdAt: "2023-12-06T07:15:00.904Z",
        updatedAt: "2023-12-06T07:15:00.904Z",
      },
      {
        id: 6,
        name: "Super Spicy",
        price: 0,
        addonCategoryId: 2,
        isArchived: false,
        createdAt: "2023-12-06T07:15:12.410Z",
        updatedAt: "2023-12-06T07:15:12.410Z",
      },
      {
        id: 7,
        name: "Deep-fried Beans",
        price: 500,
        addonCategoryId: 3,
        isArchived: false,
        createdAt: "2023-12-06T07:15:39.385Z",
        updatedAt: "2023-12-06T07:15:39.385Z",
      },
      {
        id: 8,
        name: "Egg Slice",
        price: 500,
        addonCategoryId: 3,
        isArchived: false,
        createdAt: "2023-12-06T07:15:51.299Z",
        updatedAt: "2023-12-06T07:15:51.299Z",
      },
      {
        id: 9,
        name: "Sausage",
        price: 500,
        addonCategoryId: 3,
        isArchived: false,
        createdAt: "2023-12-06T07:16:19.972Z",
        updatedAt: "2023-12-06T07:16:19.972Z",
      },
      {
        id: 10,
        name: "Meat",
        price: 500,
        addonCategoryId: 4,
        isArchived: false,
        createdAt: "2023-12-06T07:16:30.046Z",
        updatedAt: "2023-12-06T07:16:30.046Z",
      },
      {
        id: 11,
        name: "Egg",
        price: 500,
        addonCategoryId: 4,
        isArchived: false,
        createdAt: "2023-12-06T07:16:39.447Z",
        updatedAt: "2023-12-06T07:16:39.447Z",
      },
      {
        id: 12,
        name: "Rice",
        price: 300,
        addonCategoryId: 4,
        isArchived: false,
        createdAt: "2023-12-06T07:16:49.141Z",
        updatedAt: "2023-12-06T07:16:49.141Z",
      },
      {
        id: 13,
        name: "Medium",
        price: 0,
        addonCategoryId: 5,
        isArchived: false,
        createdAt: "2023-12-06T07:17:20.356Z",
        updatedAt: "2023-12-06T07:17:20.356Z",
      },
      {
        id: 14,
        name: "Medium-rare",
        price: 0,
        addonCategoryId: 5,
        isArchived: false,
        createdAt: "2023-12-06T07:17:34.354Z",
        updatedAt: "2023-12-06T07:17:34.354Z",
      },
      {
        id: 15,
        name: "well-done",
        price: 0,
        addonCategoryId: 5,
        isArchived: false,
        createdAt: "2023-12-06T07:17:45.448Z",
        updatedAt: "2023-12-06T07:17:45.448Z",
      },
    ],
    tables: [
      {
        id: 1,
        name: "01",
        locationId: 1,
        assetUrl:
          "https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/msquarefdc/qrcode/tableId-1.png",
        isArchived: false,
        createdAt: "2023-12-07T04:19:20.157Z",
        updatedAt: "2023-12-07T04:19:20.572Z",
      },
    ],
    disabledLocationMenuCategories: [],
    disabledLocationMenus: [],
    orders: [],
  };

  // await prisma.location.create({
  //   data: { name: dumbData.locations[0].name, companyId: 1 },
  // });
  // await prisma.company.create({ data: { name: dumbData.company.name } });

  await prisma.menuCategory.createMany({
    data: dumbData.menuCategories.map((item) => {
      return { name: item.name, companyId: item.companyId };
    }),
  });
  await prisma.menu.createMany({
    data: dumbData.menus.map((item) => {
      return { name: item.name, price: item.price, assetUrl: item.assetUrl };
    }),
  });
  await prisma.menuCategoryMenu.createMany({
    data: dumbData.menuCategoryMenus.map((item) => {
      return {
        menuCategoryId: item.menuCategoryId + 1,
        menuId: item.menuId + 1,
      };
    }),
  });
  await prisma.addonCategory.createMany({
    data: dumbData.addonCategories.map((item) => {
      return {
        name: item.name,
      };
    }),
  });
  await prisma.menuAddonCategory.createMany({
    data: dumbData.menuAddonCategories.map((item) => {
      return {
        menuId: item.menuId + 1,
        addonCategoryId: item.addonCategoryId + 1,
      };
    }),
  });

  await prisma.addon.createMany({
    data: dumbData.addons.map((item) => {
      return {
        name: item.name,
        price: item.price,
        addonCategoryId: item.addonCategoryId + 1,
      };
    }),
  });
  res.status(200).json({ name: "John Doe" });
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

// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// console.log(fruits.splice(-3), fruits);
// const a = "0" + day;
//splice makes the array into two and changes in original array,and it can't use on string

// console.log(a.slice(-2));
// console.log(a);
//slice does not change the original array and it returns a new array

// const notes = [
//   { id: 1, date: "2000-05-15", name: "a" },
//   { id: 4, date: "2000-05-16", name: "d" },
//   { id: 3, date: "2000-06-15", name: "e" },
//   { id: 5, date: "2001-05-15", name: "f" },
//   { id: 6, date: "2000-05-15", name: "b" },
//   // { id: 2, date: "2000-05-15", name: "c" },
// ]; // Step 1: Sort the array based on date
// const sortedNotes = notes.sort((a, b) => a.date.localeCompare(b.date));

// // Step 2: Group notes by date
// const groupedNotes = {};
// sortedNotes.forEach((note) => {
//   const { date, name } = note;
//   if (!groupedNotes[date]) {
//     groupedNotes[date] = [name];
//   } else {
//     groupedNotes[date].push(name);
//   }
// });

// for (const date in groupedNotes) {
//   const names = groupedNotes[date].join(",");
//   console.log(`date: ${date}\n${names}\n`);
// }
