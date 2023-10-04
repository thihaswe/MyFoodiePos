import Layout from "@/components/Layout/Layout";
import CreateMenu from "@/components/createMenu/CreateMenu";
import MenuCard from "@/components/menuCard/MenuCard";
import { useAppSelector } from "@/store/hook";
import { Menu } from "@/types/menu";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const MenuPage = () => {
  const menus: Menu[] = useAppSelector((store) => store.menuStore.items);
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create menu
        </Button>
        <CreateMenu open={open} setOpen={setOpen}></CreateMenu>
      </Box>
      <Box display={"flex"}>
        {menus.map((item) => (
          <Link href={`/backoffice/menu/${String(item.id)}`} key={item.id}>
            <MenuCard superman={item}></MenuCard>
          </Link>
        ))}
      </Box>
    </Layout>
  );
};

export default MenuPage;
