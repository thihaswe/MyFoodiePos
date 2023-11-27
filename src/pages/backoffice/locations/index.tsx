import ItemCard from "@/components/ItemCard";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Box, Button, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NewLocation from "@/components/NewLocation";
import { setSelectedLocation } from "@/store/slices/locationSlice";

const Locations = () => {
  const dispatch = useAppDispatch();
  const locations = useAppSelector((store) => store.location.items);
  const [open, setOpen] = useState<boolean>(false);
  const locationSelected = useAppSelector(
    (store) => store.location.selectedLocation
  );
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
            <Box sx={{ m: 2 }} key={location.id}>
              <ItemCard
                label={location.name}
                icon={<LocationOnIcon sx={{ fontSize: 30 }} />}
                selected={location.id === locationSelected?.id}
                onClick={() => {
                  dispatch(setSelectedLocation(location));
                  localStorage.setItem("helloWorld", String(location.id));
                }}
              ></ItemCard>
              <Link
                key={location.id}
                href={`/backoffice/locations/${location.id}`}
              >
                <Button variant="contained">Edit</Button>
              </Link>
            </Box>
          );
        })}
      </Box>
      <NewLocation open={open} setOpen={setOpen}></NewLocation>
    </Box>
  );
};

export default Locations;
