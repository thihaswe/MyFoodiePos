import ItemCard from "@/components/ItemCard";
import NewMenuCategory from "@/components/NewMenuCategory";
import CategoryIcon from "@mui/icons-material/Category";
import { useAppSelector } from "@/store/hook";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
const MenuCategories = () => {
  const menuCategories = useAppSelector((store) => store.menuCategory.items);

  const menuCategoryMenus = useAppSelector(
    (store) => store.menuCategoryMenu.items
  );

  const selectedLocationId = Number(localStorage.getItem("helloWorld"));

  const disableLocationMenuCategories = useAppSelector(
    (store) => store.disableLocationMenuCategory.items
  );

  const disableLocationMenuCategoryIds = disableLocationMenuCategories
    .filter((item) => item.locationId === selectedLocationId)
    .map((item) => item.menuCategoryId);
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
          <Box
            key={item.id}
            m={2}
            sx={{
              opacity: disableLocationMenuCategoryIds.includes(item.id)
                ? 0.5
                : 1,
            }}
          >
            <ItemCard
              href={`/backoffice/menu-categories/${item.id}`}
              label={
                disableLocationMenuCategoryIds.includes(item.id)
                  ? item.name + " (is unavialable)"
                  : item.name
              }
              subtitle={
                menuCategoryMenus.filter(
                  (mCm) => mCm.menuCategoryId === item.id
                ).length
              }
              icon={
                disableLocationMenuCategoryIds.includes(item.id) ? (
                  <DoNotDisturbOffIcon sx={{ fontSize: 50 }} />
                ) : (
                  <CategoryIcon sx={{ fontSize: 50 }} />
                )
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
