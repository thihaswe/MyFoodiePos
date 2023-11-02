import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import NewMenuPage from "@/components/NewMenu";

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const menus = useAppSelector((store) => store.menu.items);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Menu Page</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create
        </Button>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"}>
        {menus.map((item) => (
          <Box key={item.id} display={"flex"}>
            <Box width={259} m={2} height={250}>
              <ItemCard
                href={`/backoffice/menus/${item.id}`}
                label={item.name}
                imgUrl=""
                subtitle={item.price}
                icon={<LocalDiningIcon />}
              ></ItemCard>
            </Box>
          </Box>
        ))}
      </Box>

      <NewMenuPage open={open} setOpen={setOpen}></NewMenuPage>
    </Box>
  );
};

export default Menu;
