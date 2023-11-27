import { useAppDispatch, useAppSelector } from "@/store/hook";

import { deleteTableThunk, updateTableThunk } from "@/store/slices/tableSlice";
import { UpdateTableOptions } from "@/types/table";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableDetail = () => {
  const router = useRouter();
  const tableId = Number(router.query.id);
  const dispatch = useAppDispatch();
  const tables = useAppSelector((store) => store.table.items);
  const table = tables.find((item) => item.id === tableId);

  const [data, setData] = useState<UpdateTableOptions>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setData(table);
  }, [table]);

  if (!data) return null;
  const handleUpdate = () => {
    dispatch(
      updateTableThunk({
        ...data,
        onSuccess: () => {
          router.push("/backoffice/tables");
        },
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      deleteTableThunk({
        id: data.id,
        onSuccess: () => {
          setOpen(false);
          router.push("/backoffice/tables");
        },
      })
    );
  };
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <TextField
            defaultValue={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          ></TextField>
        </Box>
        <Button
          sx={{ color: "red" }}
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete
        </Button>
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
      <div style={{ width: "200px", marginTop: 10 }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            variant="contained"
            onClick={() => router.push("/backoffice/tables")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={data.name === ""}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default TableDetail;
