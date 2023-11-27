import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createAddonCategoryThunk } from "@/store/slices/addonCategorySlice";
import { CreateAddonCategoryOptions } from "@/types/addonCategory";
import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import MultiSelect from "./MultiSelect";

interface Prop {
  open: boolean;
  setOpen: (para: boolean) => void;
}

const defaultValue = {
  name: "",
  menuIds: [],
  isRequired: true,
};

const NewAddonCategoryPage = ({ open, setOpen }: Prop) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menus = useAppSelector((store) => store.menu.items);

  const [data, setData] = useState<CreateAddonCategoryOptions>(defaultValue);
  const handleOnChange = (e: SelectChangeEvent<number[]>) => {
    const ids = e.target.value as number[];
    setData({ ...data, menuIds: ids });
  };

  const handleCreate = () => {
    dispatch(
      createAddonCategoryThunk({
        ...data,
        onSuccess: () => {
          setOpen(false);
          setData(defaultValue);
          router.push("/backoffice/addon-categories");
        },
      })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle>Create Addon Category</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
        }}
      >
        <TextField
          placeholder="name"
          sx={{ mb: 2 }}
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        ></TextField>
        <br />
        <MultiSelect
          label={"Menu"}
          selectedIds={data.menuIds}
          handleOnChange={handleOnChange}
          practical={menus}
        ></MultiSelect>
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              onChange={(event, value) => {
                setData({ ...data, isRequired: value });
              }}
            />
          }
          label="isRequired"
        />
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
          disabled={data.name === "" || data.menuIds.length === 0}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAddonCategoryPage;
