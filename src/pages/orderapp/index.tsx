import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hook";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderAppPage = () => {
  const router = useRouter();
  const { isReady, query } = router;
  const tableId = Number(router.query.tableId);
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  const menuCategoryMenus = useAppSelector(
    (store) => store.menuCategoryMenu.items
  );
  const menus = useAppSelector((store) => store.menu.items);
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();

  useEffect(() => {
    if (isReady && !tableId) {
      router.push("/");
    }
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories, isReady, tableId]);

  const renderMenus = () => {
    // const validMenuIds = menuCategoryMenus
    //   .filter((item) => item.menuCategoryId === selectedMenuCategory?.id)
    //   .map((item) => item.menuId);
    // const validMenus = menus.filter((item) => validMenuIds.includes(item.id));
    const validMenus = menus.filter((menu) =>
      menuCategoryMenus
        .filter((item) => item.menuCategoryId === selectedMenuCategory?.id)
        .map((item) => item.menuId)
        .includes(menu.id)
    );
    return validMenus.map((item) => {
      const href = { pathname: `/orderapp/menus/${item.id}`, query };
      return <MenuCard key={item.id} menu={item} href={href} />;
    });
  };

  if (!menuCategories) return null;

  return (
    <Box position={"relative"} zIndex={5}>
      <Tabs
        TabIndicatorProps={{
          style: { background: "#1B9C85" },
        }}
        value={value}
        onChange={(evt, value) => setValue(value)}
        variant="scrollable"
        sx={{
          ".Mui-selected": {
            color: "#1B9C85",
            fontWeight: "bold",
          },
        }}
      >
        {menuCategories.map((item) => {
          const menusLength = menuCategoryMenus.filter(
            (mCm) => mCm.menuCategoryId === item.id
          );
          if (menusLength.length === 0) return;
          return (
            <Tab
              key={item.id}
              label={item.name}
              sx={{ color: "#4C4C6D" }}
              onClick={() => setSelectedMenuCategory(item)}
            />
          );
        })}
      </Tabs>
      <Box
        sx={{
          pt: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {renderMenus()}
      </Box>
    </Box>
  );
};

export default OrderAppPage;
