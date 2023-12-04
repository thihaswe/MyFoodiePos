import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import NewMenuPage from "@/components/NewMenu";

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const menus = useAppSelector((store) => store.menu.items);
  const disableLocationMenus = useAppSelector(
    (store) => store.disableLocationMenu.items
  );
  const selectedLocation = useAppSelector(
    (store) => store.location.selectedLocation
  );
  const disabledLocationMenusIds = disableLocationMenus.map(
    (item) => item.locationId === selectedLocation?.id && item.menuId
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Menu Page</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create
        </Button>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"}>
        {menus.map((item) => {
          const isDisabled = disabledLocationMenusIds.includes(item.id);

          return (
            <Box
              key={item.id}
              display={"flex"}
              sx={{
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              <Box width={259} m={2} height={250}>
                {isDisabled ? (
                  <ItemCard
                    href={`/backoffice/menus/${item.id}`}
                    label={item.name + " (is unavailable)"}
                    subtitle={item.price}
                    icon={<DoNotDisturbOffIcon sx={{ fontSize: 50 }} />}
                  ></ItemCard>
                ) : (
                  <ItemCard
                    href={`/backoffice/menus/${item.id}`}
                    label={item.name}
                    subtitle={item.price}
                    imgUrl={item.assetUrl || "/default-menu.png"}
                    icon={
                      isDisabled ? (
                        <DoNotDisturbOffIcon sx={{ fontSize: 50 }} />
                      ) : (
                        <LocalDiningIcon sx={{ fontSize: 50 }} />
                      )
                    }
                  ></ItemCard>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      <NewMenuPage open={open} setOpen={setOpen}></NewMenuPage>
    </Box>
  );
};

export default Menu;
