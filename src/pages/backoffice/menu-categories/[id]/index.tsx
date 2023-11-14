import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  deleteMenuCategoryThunk,
  updateMenuCategoryThunk,
} from "@/store/slices/menuCategorySlice";
import { UpdateMenuCategoryOptions } from "@/types/menuCategory";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetail = () => {
  const router = useRouter();
  const menuCategoryId = Number(router.query.id);

  const dispatch = useAppDispatch();
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );
  const disableLocationMenuCategories = useAppSelector(
    (store) => store.disableLocationMenuCategory.items
  );

  const [data, setData] = useState<UpdateMenuCategoryOptions>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (menuCategory) {
      const location = window.localStorage.getItem("helloWorld");
      const locationId = Number(location);
      const diabledExist = disableLocationMenuCategories.find(
        (item) => item.menuCategoryId === menuCategory.id
      );
      setData({
        ...menuCategory,
        id: menuCategory.id,
        locationId,
        isAvailable: diabledExist ? false : true,
      });
    }
  }, [menuCategory, disableLocationMenuCategories]);

  const handleDelete = () => {
    dispatch(
      deleteMenuCategoryThunk({
        id: menuCategoryId,
        onSuccess: () => router.push("/backoffice/menu-categories"),
      })
    );
  };

  if (!menuCategory || !data) return null;

  const handleUpdate = () => {
    dispatch(
      updateMenuCategoryThunk({
        ...data,
        onSuccess: () => router.push("/backoffice/menu-categories"),
      })
    );
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <TextField
            defaultValue={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          ></TextField>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={data.isAvailable}
                onChange={(e, v) => setData({ ...data, isAvailable: v })}
              />
            }
            label="Available"
          />
          <div style={{ width: "200px", marginTop: 10 }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/backoffice/menu-categories");
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
            sx={{ color: "red" }}
            variant="outlined"
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

export default MenuCategoryDetail;
