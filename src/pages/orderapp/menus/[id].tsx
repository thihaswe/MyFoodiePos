import AddonCategories from "@/components/AddonCategories";
import QuantitySelector from "@/components/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addToCart } from "@/store/slices/cartSlice";
import { CartItem } from "@/types/cart";
import { Box, Button, Typography } from "@mui/material";
import { Addon } from "@prisma/client";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MenuDetail = () => {
  const { isReady, ...router } = useRouter();
  const menuId = Number(router.query.id);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((store) => store.cart.items);
  const cartItemId = router.query.cartItemId;
  const cartItem = cartItems.find((item) => item.id === cartItemId);
  const menus = useAppSelector((state) => state.menu.items);
  const menu = menus.find((item) => item.id === menuId);
  const menuAddonCategoies = useAppSelector(
    (store) => store.menuAddonCategory.items
  );
  const addonCategories = useAppSelector((store) => store.addonCategory.items);
  const AddonCategoyIds = menuAddonCategoies
    .filter((item) => item.menuId === menuId)
    .map((item) => item.addonCategoryId);

  const addonCategoriesToDisplay = addonCategories.filter((item) =>
    AddonCategoyIds.includes(item.id)
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedAddon, setSelectedAddon] = useState<Addon[]>([]);
  const [isdisabled, setIsDisabled] = useState(true);

  // useEffect(() => {
  //   const requiredAddonCategories = addonCategories.filter(
  //     (item) => item.isRequired === true
  //   );

  //   const selectedAddoncat = selectedAddon.map((item) => item.addonCategoryId);
  //   const selectedRequiredAddonCat = selectedAddoncat.filter((addonCat) => {
  //     const addonCategory = addonCategories.find(
  //       (item) => item.id === addonCat
  //     );
  //     return addonCategory?.isRequired ? true : false;
  //   });

  //   const disabledButton =
  //     requiredAddonCategories.length !== selectedRequiredAddonCat.length;

  //   setIsDisable(disabledButton);
  // }, [selectedAddon, addonCategories]);

  useEffect(() => {
    const requiredAddonCategories = addonCategoriesToDisplay.filter(
      (item) => item.isRequired
    );
    const selectedRequiredAddons = selectedAddon.filter((selected) => {
      const addonCategory = addonCategories.find(
        (item) => item.id === selected.addonCategoryId
      );
      return addonCategory?.isRequired ? true : false;
    });
    const isDisabled =
      requiredAddonCategories.length !== selectedRequiredAddons.length
        ? true
        : false;
    setIsDisabled(isDisabled);
  }, [selectedAddon, addonCategories]);

  useEffect(() => {
    if (cartItem) {
      setSelectedAddon(cartItem.addons);
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);
  if (!isReady || !menu) return null;

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  const handleAddToCart = () => {
    const newCartItem: CartItem = {
      id: cartItem ? cartItem.id : nanoid(7),
      menu,
      addons: selectedAddon,
      quantity,
    };
    dispatch(
      addToCart({
        ...newCartItem,
      })
    );
    const pathname = cartItem ? "/orderapp/cart" : "/orderapp";
    router.push({ pathname, query: router.query });
  };

  return (
    <Box sx={{ position: "relative", zIndex: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
          position: "relative",
          top: -250,
        }}
      >
        <Image
          src={menu.assetUrl || "/default-menu.png"}
          alt="menu-image"
          width={150}
          height={150}
          style={{
            borderRadius: "50%",
            margin: "0 auto",
          }}
        />
        <Typography sx={{ margin: "0 auto" }}>{menu.name}</Typography>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AddonCategories
            selectedAddon={selectedAddon}
            setSelectedAddon={setSelectedAddon}
            addonCategories={addonCategoriesToDisplay}
          />
          <QuantitySelector
            value={quantity}
            onIncrease={handleQuantityIncrease}
            onDecrease={handleQuantityDecrease}
          ></QuantitySelector>
          <Button
            disabled={isdisabled}
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={() => {
              handleAddToCart();
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuDetail;
