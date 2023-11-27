import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createMenuThunk } from "@/store/slices/menuSlice";
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
  Checkbox,
  ListItemText,
} from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";
import FileDropZone from "./FileDropZone";
import { on } from "events";
import { config } from "@/utils/config";

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
  const [menuImage, setMenuImage] = useState<File>();

  const handleOnChange = (e: SelectChangeEvent<number[]>) => {
    const ids = e.target.value as number[];
    setData({ ...data, menuCategoryIds: ids });
  };
  const onselected = (acceptedFiles: File[]) => {
    setMenuImage(acceptedFiles[0]);
  };

  const handleCreateMenu = async () => {
    const newMenuPayload = { ...data };
    if (menuImage) {
      const formData = new FormData();
      formData.append("files", menuImage);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const { assetUrl } = await response.json();

      newMenuPayload.assetUrl = assetUrl;
    }
    dispatch(
      createMenuThunk({
        ...newMenuPayload,
        onSuccess: () => {
          setOpen(false);
          setData(defaultData);
          setMenuImage(undefined);
          router.push("/backoffice/menus");
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
        <FormControl sx={{ mb: 2 }}>
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
                  <Checkbox checked={data.menuCategoryIds.includes(item.id)} />
                  <ListItemText primary={item.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FileDropZone onSelected={onselected}></FileDropZone>
        {menuImage && (
          <Chip
            sx={{ mt: 2 }}
            label={menuImage.name}
            onDelete={() => setMenuImage(undefined)}
          />
        )}
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
