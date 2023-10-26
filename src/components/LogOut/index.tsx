import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import React from "react";

interface Prop {
  open: boolean;
  setOpen: (para: boolean) => void;
}

const LogOutPage = ({ open, setOpen }: Prop) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogContent>
        <Typography>are you sure to log out?</Typography>
        <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            no
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/" });
            }}
          >
            yes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LogOutPage;
