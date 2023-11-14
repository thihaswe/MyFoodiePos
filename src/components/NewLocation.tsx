import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createLocationThunk } from "@/store/slices/locationSlice";
import { CreateLocationOptions } from "@/types/location";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (para: boolean) => void;
}

const defaultValue = {
  name: "",
  companyId: 0,
};
const NewLocation = ({ open, setOpen }: Prop) => {
  const company = useAppSelector((store) => store.company.items);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<CreateLocationOptions>({
    ...defaultValue,
  });

  const handleCreate = () => {
    const companyId = company[0].id;
    dispatch(
      createLocationThunk({
        ...data,
        companyId,
        onSuccess: () => {
          setOpen(false);
        },
      })
    );
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add New Location</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
          }}
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={data.name === ""}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewLocation;
