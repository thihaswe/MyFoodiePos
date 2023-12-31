import OrderCard from "@/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { refreshOrderThunk, updateOrderThunk } from "@/store/slices/orderSlice";
import { OrderItem } from "@/types/order";
import { formatOrder } from "@/utils/generals";
import { Box } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";

import { useRouter } from "next/router";
import { useEffect } from "react";

const Orders = () => {
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
  }, [orders]);

  const handleRefreshOrder = () => {
    dispatch(refreshOrderThunk({ orderSeq: String(orderSeq) }));
  };
  const handleOrderStatuUpdate = (itemId: string, status: ORDERSTATUS) => {
    dispatch(updateOrderThunk({ itemId, status }));
  };

  return (
    <Box>
      {orderItems.map((orderItem) => {
        return (
          <OrderCard
            key={orderItem.itemId}
            isAdmin
            orderItem={orderItem}
            handleOrderStatuUpdate={handleOrderStatuUpdate}
          ></OrderCard>
        );
      })}
    </Box>
  );
};

export default Orders;
