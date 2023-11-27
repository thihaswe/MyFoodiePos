import { useAppDispatch } from "@/store/hook";
import { createTableThunk } from "@/store/slices/tableSlice";
import { CreateTableOptions } from "@/types/table";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (para: boolean) => void;
}
const defaultValue = {
  name: "",
  locationId: 0,
};

const NewTablePage = ({ open, setOpen }: Prop) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedLocationId = localStorage.getItem("helloWorld");

  const [data, setData] = useState<CreateTableOptions>(defaultValue);
  useEffect(() => {
    if (selectedLocationId) {
      setData({ ...data, locationId: Number(selectedLocationId) });
    }
  }, [selectedLocationId]);

  const handleCreate = () => {
    dispatch(
      createTableThunk({
        ...data,
        onSuccess: () => {
          setData(defaultValue);
          setOpen(false);
          router.push("/backoffice/tables");
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Table</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="name"
          onChange={(evt) => setData({ ...data, name: evt.target.value })}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTablePage;
