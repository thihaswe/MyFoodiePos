import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createMenu, createMenuThunk } from "@/store/slices/menuSlice";
import { CreateMenuOptions } from "@/types/menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Chip,
  DialogActions,
  Button,
} from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (data: boolean) => void;
}

const defaultData: CreateMenuOptions = {
  name: "",
  price: 0,
  menuCategoryIds: [],
};

const NewMenuPage = ({ open, setOpen }: Prop) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  const [data, setData] = useState<CreateMenuOptions>(defaultData);

  const handleOnChange = (e: SelectChangeEvent<number[]>) => {
    const ids = e.target.value as number[];
    setData({ ...data, menuCategoryIds: ids });
  };
  const handleCreateMenu = () => {
    dispatch(
      createMenuThunk({
        ...data,
        onSuccess: () => {
          setOpen(false);
          setData(defaultData);
        },
      })
    );
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        router.push("/backoffice/menus");
      }}
    >
      <DialogTitle>Create New Menu</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
        }}
      >
        <TextField
          placeholder="Name"
          sx={{ width: "300px", mb: 2 }}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        ></TextField>
        <TextField
          placeholder="Price"
          sx={{ width: "300px", mb: 2 }}
          onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
        ></TextField>
        <FormControl>
          <InputLabel>MenuCategory</InputLabel>
          <Select
            multiple
            label="MenuCategory"
            value={data.menuCategoryIds}
            onChange={handleOnChange}
            renderValue={(selectedMenuCategoryIds) => {
              return menuCategories
                .filter((menuCategory) => {
                  return selectedMenuCategoryIds.find(
                    (id) => id === menuCategory.id
                  );
                })
                .map((item) => <Chip key={item.id} label={item.name}></Chip>);
            }}
          >
            {menuCategories.map((item) => {
              return (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
          onClick={handleCreateMenu}
          disabled={
            data.name === "" ||
            data.price === undefined ||
            data.menuCategoryIds.length === 0
          }
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMenuPage;
