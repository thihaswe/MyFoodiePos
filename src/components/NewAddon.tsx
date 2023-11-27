import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createAddonThunk } from "@/store/slices/addonSlice";
import { CreateAddonOptions } from "@/types/addon";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
interface Prop {
  open: boolean;
  setOpen: (para: boolean) => void;
}
const defaultValue: CreateAddonOptions = {
  name: "",
  price: 0,
  addonCategoryId: "",
};

const NewAddon = ({ open, setOpen }: Prop) => {
  const dispatch = useAppDispatch();
  const addonCategories = useAppSelector((store) => store.addonCategory.items);
  const [data, setData] = useState<CreateAddonOptions>(defaultValue);

  const handleCreate = () => {
    dispatch(createAddonThunk(data));
  };

  const handleOnChange = (e: SelectChangeEvent<number>) => {
    const id = e.target.value as number;
    setData({ ...data, addonCategoryId: id });
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Addon</DialogTitle>
      <DialogContent sx={{ width: 500 }}>
        <TextField
          sx={{ width: 300, mb: 2 }}
          placeholder="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        ></TextField>
        <br />
        <TextField
          sx={{ width: 300 }}
          placeholder="price"
          onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
        ></TextField>
        <br />
        <FormControl sx={{ my: 2, width: 500 }}>
          <InputLabel>AddonCategory</InputLabel>
          <Select
            fullWidth
            label="AddonCategory"
            value={data.addonCategoryId}
            onChange={handleOnChange}
            // renderValue={(selectedAddonCategoryId) => {
            //   return addonCategories
            //     .filter((item) => {
            //       return item.id === selectedAddonCategoryId;
            //     })
            //     .map((item) => <Chip key={item.id} label={item.name}></Chip>);
            // }}
          >
            {addonCategories.map((item) => {
              return (
                <MenuItem value={item.id} key={item.id}>
                  {/* <Checkbox checked={data.addonCategoryId === item.id} /> */}
                  <ListItemText primary={item.name} />
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
          onClick={handleCreate}
          disabled={
            data.name === "" ||
            data.price === undefined ||
            data.addonCategoryId === ""
          }
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAddon;
