import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAppData } from "@/store/slices/appSlice";

interface Prop {
  children: ReactNode | JSX.Element;
}
const OrderLayout = ({ children }: Prop) => {
  const router = useRouter();
  const isHome = router.pathname === "/orderapp";
  const tableId = Number(router.query.tableId);
  const dispatch = useAppDispatch();
  const tables = useAppSelector((store) => store.table.items);

  useEffect(() => {
    try {
      if (tableId) {
        dispatch(fetchAppData({ tableId }));
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [tableId]);

  if (!tables.length) return <Typography>Your table does not exist</Typography>;

  return (
    <Box>
      <OrderAppHeader cartItemCount={1} />
      <Box
        sx={{
          position: "relative",
          top: 250,
          mb: 10,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "80%", lg: "55%" },
            m: "0 auto",
          }}
        >
          {children}
        </Box>
      </Box>
      {/* {showActiveOrderFooterBar && (
        <Box
          sx={{
            height: 50,
            width: "100vw",
            bgcolor: "primary.main",
            position: "fixed",
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            cursor: "pointer",
            zIndex: 5,
          }}
          onClick={() =>
            router.push({
              pathname: `/order/active-order/${orders[0].orderSeq}`,
              query: router.query,
            })
          }
        >
          <Typography sx={{ color: "secondary.main", userSelect: "none" }}>
            You have active order. Click here to view.
          </Typography>
        </Box>
      )} */}
    </Box>
  );
};

export default OrderLayout;
