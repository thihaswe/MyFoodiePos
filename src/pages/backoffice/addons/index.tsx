import ItemCard from "@/components/ItemCard";
import NewAddon from "@/components/NewAddon";
import { useAppSelector } from "@/store/hook";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Addons = () => {
  const addons = useAppSelector((store) => store.addon.items);

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography>Addon Page</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create
        </Button>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"}>
        {addons.map((addon) => {
          return (
            <Box sx={{ m: 2 }} key={addon.id}>
              <ItemCard
                href={`/backoffice/addons/${addon.id}`}
                label={addon.name}
                subtitle={addon.price}
                icon={<EggIcon sx={{ fontSize: 30 }}></EggIcon>}
              ></ItemCard>
            </Box>
          );
        })}
      </Box>
      <NewAddon open={open} setOpen={setOpen}></NewAddon>
    </Box>
  );
};

export default Addons;
