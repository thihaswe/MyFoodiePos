import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  deleteLocationThunk,
  updateLocationThunk,
} from "@/store/slices/locationSlice";
import { UpdateLocationOptions } from "@/types/location";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LocationDetailPage = () => {
  const locations = useAppSelector((store) => store.location.items);
  const router = useRouter();
  const locationId = Number(router.query.id);
  const location = locations.find((item) => item.id === locationId);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<UpdateLocationOptions>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (location) {
      setData({ ...location, id: location.id });
    }
  }, [location]);

  if (!data) return null;

  const handleUpdate = () => {
    dispatch(
      updateLocationThunk({
        ...data,
        onSuccess: () => router.push("/backoffice/locations"),
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      deleteLocationThunk({
        id: data.id,
        onSuccess: () => router.push("/backoffice/locations"),
      })
    );
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <TextField
            defaultValue={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          ></TextField>
          <div style={{ width: "200px", marginTop: 10 }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/backoffice/locations");
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            </Box>
          </div>
        </Box>
        <Box>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(true)}
          >
            DELETE
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogContent>
          <Typography>
            are you sure to <span style={{ color: "red" }}>delete</span>?
          </Typography>
          <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
              }}
            >
              no
            </Button>
            <Button variant="contained" onClick={handleDelete}>
              yes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LocationDetailPage;
