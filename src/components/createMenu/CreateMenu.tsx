import config from "@/config";
import { useAppDispatch } from "@/store/hook";
import { setMenu } from "@/store/slices/menuSlice";
import { Menu } from "@/types/menu";
import { TextFields } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (param: boolean) => void;
}

const CreateMenu = ({ open, setOpen }: Prop) => {
  const dispatch = useAppDispatch();
  const [newMenu, setNewMenu] = useState({ name: "", price: 0 });

  const handleCreateMenu = async () => {
    const response = await fetch(`${config.apiBaseUrl}/api/menu`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newMenu),
    });
    const data = await response.json();
    console.log(data);
    dispatch(setMenu(data));

    setOpen(false);
  };

  const updatePrice = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    return setNewMenu({
      name: newMenu.name,
      price: Number(event.target.value),
    });
  };

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Menu</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="name"
            onChange={(event) => {
              setNewMenu({ ...newMenu, name: event.target.value });
            }}
          ></TextField>
          <br></br>
          <TextField placeholder="price" onChange={updatePrice}></TextField>
          <br></br>
          <Button variant="contained" onClick={handleCreateMenu}>
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateMenu;
