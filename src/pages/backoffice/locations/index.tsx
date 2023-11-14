import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NewLocation from "@/components/NewLocation";

const Locations = () => {
  const locations = useAppSelector((store) => store.location.items);
  const [open, setOpen] = useState<boolean>(false);

  if (!locations.length) return null;

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography>Location Page</Typography>
        <Box>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add
          </Button>
        </Box>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"}>
        {locations.map((location) => {
          return (
            <ItemCard
              href={`/backoffice/locations/${location.id}`}
              label={location.name}
              icon={<LocationOnIcon />}
            ></ItemCard>
          );
        })}
      </Box>
      <NewLocation open={open} setOpen={setOpen}></NewLocation>
    </Box>
  );
};

export default Locations;
