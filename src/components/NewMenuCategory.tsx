import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createMenuCategoryThunk } from "@/store/slices/menuCategorySlice";
import { CreateMenuCategoryOptions } from "@/types/menuCategory";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { copyFile } from "fs";
import React, { useEffect, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (para: boolean) => void;
}

const defaultData = {
  name: "",
  companyId: 0,
  locationId: 0,
};

const NewMenuCategory = ({ open, setOpen }: Prop) => {
  const dispatch = useAppDispatch();
  const company = useAppSelector((store) => store.company.items);

  const [data, SetData] = useState<CreateMenuCategoryOptions>(defaultData);

  useEffect(() => {
    SetData({
      ...data,
      companyId: company[0].id,
    });
  }, [company]);

  const handleCreate = () => {
    const locationId = window.localStorage.getItem("helloWorld");
    dispatch(
      createMenuCategoryThunk({
        ...data,
        locationId: Number(locationId),
        onSuccess: () => {
          setOpen(false);
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Menu-Category</DialogTitle>
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
          onChange={(e) => {
            SetData({ ...data, name: e.target.value });
          }}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={data.name === "" || data.companyId === undefined}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMenuCategory;
