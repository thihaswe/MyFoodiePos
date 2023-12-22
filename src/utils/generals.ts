import { CartItem } from "@/types/cart";
import { OrderAddon, OrderItem } from "@/types/order";
import { Addon, Menu, Order, Table } from "@prisma/client";

export const getCartTotalPrice = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((prev, curr) => {
    const menuPrice = curr.menu.price;
    const addonPrice = curr.addons.reduce(
      (addonPrice, addon) => (addonPrice += addon.price),
      0
    );
    return (prev += (menuPrice + addonPrice) * curr.quantity);
  }, 0);
  return totalPrice;
};

export const formatOrder = (
  orders: Order[],
  addons: Addon[],
  menus: Menu[],
  tables: Table[]
): OrderItem[] => {
  const orderItemIds: string[] = [];

  orders.forEach((item) => {
    const itemId = item.itemId;
    const exist = orderItemIds.find((orderItemId) => orderItemId === itemId);
    if (!exist) orderItemIds.push(itemId);
  });
  const orderItemToShows: OrderItem[] = orderItemIds.map((orderItemId) => {
    const currentOrders = orders.filter(
      (order) => order.itemId === orderItemId
    );

    const addonIds = currentOrders.map((item) => item.addonId);
    let orderAddon: OrderAddon[] = [];

    if (addonIds.length) {
      addonIds.forEach((addonId) => {
        const addon = addons.find((item) => item.id === addonId);
        if (!addon) return;
        const exist = orderAddon.find(
          (item) => item.addonCategoryId === addon.addonCategoryId
        );
        if (exist) {
          orderAddon = orderAddon.map((item) => {
            const isSameParent = item.addonCategoryId === addon.addonCategoryId;
            if (isSameParent) {
              return {
                addonCategoryId: addon.addonCategoryId,
                addons: [...item.addons, addon].sort((a, b) =>
                  a.name.localeCompare(b.name)
                ),
              };
            } else {
              return item;
            }
          });
        } else {
          orderAddon = [
            ...orderAddon,
            {
              addonCategoryId: addon.addonCategoryId,
              addons: [addon].sort((a, b) => a.name.localeCompare(b.name)),
            },
          ];
        }
      });
    }
    return {
      itemId: orderItemId,
      status: currentOrders[0].status,
      orderAddons: addonIds.length
        ? orderAddon.sort((a, b) => a.addonCategoryId - b.addonCategoryId)
        : [],
      menu: menus.find((item) => item.id === currentOrders[0].menuId) as Menu,
      table: tables.find(
        (item) => item.id === currentOrders[0].tableId
      ) as Table,
    };
  });

  return orderItemToShows.sort((a, b) => a.itemId.localeCompare(b.itemId));
};

// export const formatOrder= (orders: Order[], addons: Addon[]):OrderItem[] => {
//   let orderItemIds: string[] = [];
//   orders.map((order) => {
//     const exist = orderItemIds.find((item) => item === order.itemId);
//     if (!exist) orderItemIds.push(order.itemId);
//   });
//   const orderItems: OrderItem[] = orderItemIds.map((orderItemId) => {
//     const currentOrders = orders.filter(
//       (order) => order.itemId === orderItemId
//     );
//     const addonIds = currentOrders.map((item) => item.addonId);
//     let orderAddons: OrderAddon[] = [];
//     if (addonIds.length) {
//       addonIds.map((addonId) => {
//         const addon = addons.find((item) => item.id === addonId) as Addon;
//         if (!addon) return;
//         const exist = orderAddons.find(
//           (item) => item.addonCategoryId === addon.addonCategoryId
//         );
//         if (exist) {
//           orderAddons.map((item) => {
//             const isSameParent = item.addonCategoryId === addon.addonCategoryId;
//             if (isSameParent) {
//               return (
//                 (item.addonCategoryId = addon.addonCategoryId),
//                 (item.addons = [...item.addons, addon]).sort((a, b) =>
//                   a.name.localeCompare(b.name)
//                 )
//               );
//             } else {
//               return item;
//             }
//           });
//         } else {
//           orderAddons = [
//             ...orderAddons,
//             {
//               addonCategoryId: addon.addonCategoryId,
//               addons: [addon].sort((a, b) => a.name.localeCompare(b.name)),
//             },
//           ];
//         }
//       });
//     }
//     return {
//       itemId: orderItemId,
//       status: orderItems[0].status,
//       orderAddon: addonIds.length
//         ? orderAddons.sort((a, b) => a.addonCategoryId - b.addonCategoryId)
//         : [],
//     };
//   });
//   return orderItems.sort((a, b) => a.itemId.localeCompare(b.itemId));
// };
