import ItemCard from "@/components/ItemCard";
import NewMenuCategory from "@/components/NewMenuCategory";
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
  TextField,
  Typography,
} from "@mui/material";
import { wrap } from "module";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MenuCategoryDetail = () => {
  const router = useRouter();
  const menuCategoryId = Number(router.query.id);

  const dispatch = useAppDispatch();
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );
  const [data, setData] = useState<UpdateMenuCategoryOptions>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (menuCategory) {
      setData(menuCategory);
    }
  }, [menuCategory]);

  const handleDelete = () => {
    dispatch(
      deleteMenuCategoryThunk({
        menuCategoryId,
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
