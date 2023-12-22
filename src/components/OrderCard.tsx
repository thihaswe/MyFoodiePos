import { useAppSelector } from "@/store/hook";
import { OrderItem } from "@/types/order";
import { Box, Card, MenuItem, Select, Typography } from "@mui/material";
import { AddonCategory, ORDERSTATUS } from "@prisma/client";
import React, { useState } from "react";

interface Prop {
  orderItem: OrderItem;
  isAdmin: boolean;
  handleOrderStatuUpdate?: (itemId: string, status: ORDERSTATUS) => void;
}

const OrderCard = ({ orderItem, isAdmin, handleOrderStatuUpdate }: Prop) => {
  const addonCategories = useAppSelector((state) => state.addonCategory.items);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: 250,
        height: 250,
        m: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.main",
          maxWidth: "100%",
          p: 0.3,
        }}
      >
        <Typography>{orderItem.table.name}</Typography>
        <Typography>{orderItem.menu.name}</Typography>
      </Box>
      <Box
        sx={{
          p: 0.3,
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "space-between",
          height: 200 * 0.2,
          borderBottom: "1px solid grey",
          alignItems: "center",
        }}
      >
        <Typography>Your ItemId is</Typography>
        <Typography>{orderItem.itemId}</Typography>
      </Box>
      <Box sx={{ height: 200 * 0.7, mt: 1, p: 0.3 }}>
        {orderItem.orderAddons.map((item) => (
          <Box
            display={"flex"}
            flexDirection={"column"}
            key={item.addonCategoryId}
          >
            <Typography sx={{ fontSize: 15 }}>
              {
                (
                  addonCategories.find(
                    (addonCat) => addonCat.id === item.addonCategoryId
                  ) as AddonCategory
                ).name
              }
            </Typography>

            {item.addons.map((addon) => (
              <Typography
                key={addon.id}
                sx={{
                  fontStyle: "italic",
                  fontSize: 13,
                  paddingLeft: 2,
                }}
              >
                {addon.name}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          p: 0.3,
          height: 200 * 0.2,
          borderTop: "1px solid grey",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Your Status is</Typography>
        <Box>
          {!isAdmin ? (
            orderItem.status
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Select
                value={orderItem.status}
                onChange={(evt) => {
                  handleOrderStatuUpdate &&
                    handleOrderStatuUpdate(
                      orderItem.itemId,
                      evt.target.value as ORDERSTATUS
                    );
                }}
                sx={{ maxHeight: 30 }}
              >
                <MenuItem value={ORDERSTATUS.PENDING}>
                  {ORDERSTATUS.PENDING}
                </MenuItem>
                <MenuItem value={ORDERSTATUS.COOKING}>
                  {ORDERSTATUS.COOKING}
                </MenuItem>
                <MenuItem value={ORDERSTATUS.COMPLETE}>
                  {ORDERSTATUS.COMPLETE}
                </MenuItem>
              </Select>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default OrderCard;
