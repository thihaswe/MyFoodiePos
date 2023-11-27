import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  deleteAddonCategoryThunk,
  updateAddonCategoryThunk,
} from "@/store/slices/addonCategorySlice";
import { UpdateAddonCategoryOptions } from "@/types/addonCategory";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AddonCategryDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const addonCategoryId = Number(router.query.id);
  const menuAddonCategories = useAppSelector(
    (store) => store.menuAddonCategory.items
  );
  const addonCategories = useAppSelector((store) => store.addonCategory.items);
  const menus = useAppSelector((store) => store.menu.items);

  const [data, setData] = useState<UpdateAddonCategoryOptions>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const addonCategory = addonCategories.find(
      (item) => item.id === addonCategoryId
    );

    if (addonCategory) {
      const menuIds = menuAddonCategories
        .filter(
          (menuAddonCategory) =>
            menuAddonCategory.addonCategoryId === addonCategory.id
        )
        .map((item) => item.menuId);
      setData({ ...addonCategory, menuIds });
    }
  }, [addonCategories, menuAddonCategories]);

  if (!data) return null;
  const handleOnChange = (e: SelectChangeEvent<number[]>) => {
    const ids = e.target.value as number[];
    setData({ ...data, menuIds: ids });
  };
  const handleUpdate = () => {
    dispatch(
      updateAddonCategoryThunk({
        ...data,
        onSuccess: () => {
          router.push("/backoffice/addon-categories");
        },
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      deleteAddonCategoryThunk({
        id: data.id,
        onSuccess: () => {
          setOpen(false);
          router.push("/backoffice/addon-categories");
        },
      })
    );
  };
  return (
    <Box>
      <Box display={"Flex"} justifyContent={"space-between"}>
        <Box>
          <TextField defaultValue={data.name} sx={{ mb: 2 }}></TextField>
          <br />
          <FormControl sx={{ mb: 2, width: 500 }}>
            <InputLabel>Menu</InputLabel>
            <Select
              fullWidth
              multiple
              label="Menu"
              value={data.menuIds}
              onChange={handleOnChange}
              renderValue={(selectedMenuIds) => {
                return menus
                  .filter((menu) => {
                    return selectedMenuIds.find((id) => id === menu.id);
                  })
                  .map((item) => <Chip key={item.id} label={item.name}></Chip>);
              }}
            >
              {menus.map((item) => {
                return (
                  <MenuItem value={item.id} key={item.id}>
                    <Checkbox checked={data.menuIds.includes(item.id)} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <FormControlLabel
            control={
              <Switch
                defaultChecked={data.isRequired}
                onChange={(event, value) => {
                  setData({ ...data, isRequired: value });
                }}
              />
            }
            label="isRequired"
          />
          <div style={{ width: "200px", marginTop: 10 }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/backoffice/addon-categories");
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
            sx={{ color: "red" }}
            onClick={() => {
              setOpen(true);
            }}
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

export default AddonCategryDetail;
