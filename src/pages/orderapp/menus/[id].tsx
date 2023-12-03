import AddonCategories from "@/components/AddonCategories";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import { Addon } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MenuDetail = () => {
  const { isReady, ...router } = useRouter();
  const menuId = Number(router.query.id);

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

  const [selectedAddon, setSelectedAddon] = useState<Addon[]>([]);
  const [disabled, setIsDisable] = useState(true);

  useEffect(() => {
    const requiredAddonCategories = addonCategories.filter(
      (item) => item.isRequired === true
    );

    const selectedAddoncat = selectedAddon.map((item) => item.addonCategoryId);
    const selectedRequiredAddonCat = selectedAddoncat.filter((addonCat) => {
      const addonCategory = addonCategories.find(
        (item) => item.id === addonCat
      );
      return addonCategory?.isRequired;
    });

    const disabledButton =
      requiredAddonCategories.length === selectedRequiredAddonCat.length
        ? false
        : true;
    setIsDisable(disabledButton);
  }, [selectedAddon, addonCategories]);
  if (!isReady || !menu) return null;

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
          <Button
            disabled={disabled}
            variant="contained"
            sx={{ width: "fit-content" }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuDetail;
