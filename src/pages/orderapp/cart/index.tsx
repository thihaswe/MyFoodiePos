import { useAppDispatch, useAppSelector } from "@/store/hook";
import { emptyCart, removeFromCart } from "@/store/slices/cartSlice";
import { createOrderThunk } from "@/store/slices/orderSlice";
import { CartItem } from "@/types/cart";
import { getCartTotalPrice } from "@/utils/generals";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { Addon, Order } from "@prisma/client";
import { useRouter } from "next/router";

const Cart = () => {
  const { isReady, ...router } = useRouter();
  const tableId = Number(router.query.tableId);
  const cartItems = useAppSelector((store) => store.cart.items);

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (a: CartItem) => {
    dispatch(removeFromCart(a));
  };

  const confirmOrder = () => {
    const isValid = tableId;
    if (!isValid) return alert("Table Id");

    dispatch(
      createOrderThunk({
        tableId,
        cartItems,
        onSuccess: (orders: Order[]) => {
          router.push({
            pathname: `/orderapp/active-order/${orders[0].orderSeq}`,
            query: { tableId },
          });
          dispatch(emptyCart());
        },
      })
    );
  };
  const renderAddons = (addons: Addon[]) => {
    if (!addons.length) return;
    return addons.map((item) => {
      return (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
            {item.name}
          </Typography>
          <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
            {item.price}
          </Typography>
        </Box>
      );
    });
  };

  return (
    <Box>
      <Typography
        color={"info.main"}
        variant="h4"
        sx={{
          position: "relative",
          top: -230,
          zIndex: 5,
          textAlign: "center",
          fontSize: { md: 30, lg: 40 },
        }}
      >
        Review your order
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          zIndex: 5,

          p: 3,
          bgcolor: "#E8F6EF",
          borderRadius: 15,
          position: "relative",
          top: -150,
        }}
      >
        {!cartItems.length ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <Box
            sx={{
              width: { xs: "100%", md: "500px" },
            }}
          >
            {cartItems.map((cartItem) => {
              const { menu, addons, quantity } = cartItem;
              return (
                <Box key={cartItem.id} zIndex={5}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        width: 25,
                        height: 25,
                        mr: 1,
                        backgroundColor: "#1B9C85",
                      }}
                    >
                      {quantity}
                    </Avatar>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography color={"primary"}>{menu.name}</Typography>
                      <Typography color={"primary"}>{menu.price}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pl: 6 }}>{renderAddons(addons)}</Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mb: 3,
                      mt: 1,
                    }}
                  >
                    <DeleteIcon
                      color="primary"
                      sx={{ mr: 2, cursor: "pointer" }}
                      onClick={() => handleRemoveFromCart(cartItem)}
                    />
                    <EditIcon
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push({
                          pathname: `menus/${menu.id}`,
                          query: { ...router.query, cartItemId: cartItem.id },
                        })
                      }
                    />
                  </Box>
                </Box>
              );
            })}
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Typography color="primary" sx={{ fontSize: { sm: 22 } }}>
                Total: {getCartTotalPrice(cartItems)}
              </Typography>
            </Box>
            <Box
              sx={{ mt: 3, textAlign: "center" }}
              onClick={() => {
                confirmOrder();
              }}
            >
              <Button variant="contained">Confirm order</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
