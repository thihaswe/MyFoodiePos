import OrderCard from "@/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { refreshOrderThunk } from "@/store/slices/orderSlice";
import { OrderItem } from "@/types/order";
import { formatOrder } from "@/utils/generals";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ActiveOrder = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const orderSeq = router.query.id;
  const orders = useAppSelector((store) => store.order.items);
  const addons = useAppSelector((store) => store.addon.items);
  const menus = useAppSelector((store) => store.menu.items);
  const tables = useAppSelector((store) => store.table.items);

  const orderItems: OrderItem[] = formatOrder(orders, addons, menus, tables);

  let intervalId: number;

  useEffect(() => {
    if (orderSeq) {
      intervalId = window.setInterval(() => {
        handleRefreshOrder();
      }, 5000);
    }

    return () => {
      window.clearInterval(intervalId);
    };
  }, [orderSeq]);

  const handleRefreshOrder = () => {
    dispatch(refreshOrderThunk({ orderSeq: String(orderSeq) }));
  };

  if (!orders.length) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 3,
        borderRadius: 15,
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        top: -150,
      }}
    >
      <Box display={"flex"} flexWrap={"wrap"} flexDirection={"row"}>
        {orderItems.map((orderItem) => {
          return (
            <OrderCard
              key={orderItem.itemId}
              orderItem={orderItem}
              isAdmin={false}
            />
          );
        })}
      </Box>
    </Box>
  );

  //   i finished adding order in data base and i need to write the page for active-order
  //  and i have to fix
  // scroable problem in cart page i hope the electricity will not off in next day
  //  (current day cuz )
  // it is 12:41 am 17/12/2023 i want to take rest and sleep
};
export default ActiveOrder;
