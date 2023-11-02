import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { Box, Typography } from "@mui/material";
import React from "react";

const MenuCategories = () => {
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  const menuCategoryMenus = useAppSelector(
    (store) => store.menuCategoryMenu.items
  );

  const menus = useAppSelector((store) => store.menu.items);

  return (
    <Box>
      <Box display={"flex"}>
        {/* <Typography>MenuCategory Page</Typography> */}
        {menuCategories.map((item) => (
          <Box width={259} m={2} height={250}>
            <ItemCard
              href={`backoffice/menu-categories/${item.id}`}
              label={item.name}
              subtitle={
                menuCategoryMenus.filter(
                  (mCm) => mCm.menuCategoryId === item.id
                ).length
              }
            ></ItemCard>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MenuCategories;
