import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Cart = () => {
  const { isReady, ...router } = useRouter();
  const tableId = Number(router.query.tableId);
  const cartItems = useAppSelector((store) => store.cart.items);
  const dispatch = useAppDispatch();

  if (!isReady) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 3,
        bgcolor: "#E8F6EF",
        borderRadius: 15,
        mx: 3,
        position: "relative",
        top: { xs: 30, sm: 150 },
        zIndex: 5,
      }}
    >
      {cartItems.length ? (
        <Box>
          {cartItems.map((item) => (
            <h1 key={item.id}>{item.id}</h1>
          ))}
        </Box>
      ) : (
        <Typography>Your Cart is Empty</Typography>
      )}
    </Box>
  );
};
export default Cart;
