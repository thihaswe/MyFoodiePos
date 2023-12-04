import { useAppDispatch, useAppSelector } from "@/store/hook";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Home from "@mui/icons-material/Home";
import { useRouter } from "next/router";

interface Props {
  cartItemCount: number;
}

const OrderAppHeader = ({ cartItemCount }: Props) => {
  const company = useAppSelector((store) => store.company.items);
  const location = useAppSelector((store) => store.location.selectedLocation);
  const router = useRouter();
  const isHome = router.pathname === "/orderapp";
  const isCart = router.pathname === "/orderapp/cart";
  const isActiveOrder = router.pathname.includes("/orderapp/activeOrder");
  const showCartIcon = !isCart && !isActiveOrder;

  if (!company.length) return null;

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        zIndex: 5,
        top: 0,
      }}
    >
      {!showCartIcon && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 200,
            cursor: "pointer",
          }}
          onClick={() =>
            router.push({
              pathname: "/orderapp",
              query: { tableId: router.query.tableId },
            })
          }
        >
          <Home />
        </Box>
      )}
      {showCartIcon && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 200,
            cursor: "pointer",
          }}
          onClick={() =>
            router.push({ pathname: "/orderapp/cart", query: router.query })
          }
        >
          <ShoppingCartCheckoutIcon
            sx={{
              fontSize: "40px",
              color: "#FFE194",
            }}
          />
          {cartItemCount > 0 && (
            <Typography
              variant="h5"
              sx={{
                textAlign: "right",
                color: "#E8F6EF",
                position: "absolute",
                top: -10,
                right: -10,
              }}
            >
              {cartItemCount}
            </Typography>
          )}
        </Box>
      )}
      <Image
        src="/order-app-header.svg"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt="header-image"
      />
      {isHome && (
        <Box sx={{ position: "absolute" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#4C4C6D",
                mt: 15,
              }}
            >
              {company[0].name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", lineHeight: 1.2 }}
            >
              {company[0].address}
              <br /> {location?.name}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OrderAppHeader;
