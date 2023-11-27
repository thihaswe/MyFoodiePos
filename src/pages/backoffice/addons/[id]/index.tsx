import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  deleteAddonCategoryThunk,
  updateAddonCategoryThunk,
} from "@/store/slices/addonCategorySlice";
import { deleteAddonThunk, updateAddonThunk } from "@/store/slices/addonSlice";
import { CreateAddonOptions, UpdateAddonOptions } from "@/types/addon";
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

const AddonDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const addonId = Number(router.query.id);
  const addonCategories = useAppSelector((store) => store.addonCategory.items);
  const addons = useAppSelector((store) => store.addon.items);
  const addon = addons.find((item) => item.id === addonId);

  const [data, setData] = useState<UpdateAddonOptions>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setData(addon);
  }, [addons]);

  if (!data) return null;
  const handleOnChange = (e: SelectChangeEvent<number>) => {
    const id = e.target.value as number;
    setData({ ...data, addonCategoryId: id });
  };
  const handleUpdate = () => {
    dispatch(
      updateAddonThunk({
        ...data,
        onSuccess: () => {
          router.push("/backoffice/addons");
        },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteAddonThunk({
        id: data.id,
        onSuccess: () => {
          setOpen(false);
          router.push("/backoffice/addons");
        },
      })
    );
  };
  return (
    <Box>
      <Box display={"Flex"} justifyContent={"space-between"}>
        <Box>
          <TextField
            defaultValue={data.name}
            sx={{ mb: 2 }}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          ></TextField>
          <TextField
            defaultValue={data.price}
            sx={{ mb: 2 }}
            onChange={(e) =>
              setData({ ...data, price: Number(e.target.value) })
            }
          ></TextField>
          <br />
          <FormControl sx={{ mb: 2, width: 500 }}>
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

          <div style={{ width: "200px", marginTop: 10 }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/backoffice/addons");
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

export default AddonDetail;
