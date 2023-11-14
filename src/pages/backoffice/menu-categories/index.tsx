import ItemCard from "@/components/ItemCard";
import NewMenuCategory from "@/components/NewMenuCategory";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
const MenuCategories = () => {
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  const menuCategoryMenus = useAppSelector(
    (store) => store.menuCategoryMenu.items
  );

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography>Menu-Category Page</Typography>
        </Box>
        <Box>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create
          </Button>
        </Box>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"}>
        {/* <Typography>MenuCategory Page</Typography> */}
        {menuCategories.map((item) => (
          <Box key={item.id} width={259} m={2} height={250}>
            <ItemCard
              href={`/backoffice/menu-categories/${item.id}`}
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
      <NewMenuCategory open={open} setOpen={setOpen}></NewMenuCategory>
    </Box>
  );
};

export default MenuCategories;
