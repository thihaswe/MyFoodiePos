import { RemoveCircle, AddCircle } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

interface Prop {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}
const QuantitySelector = ({ value, onIncrease, onDecrease }: Prop) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "100px",
        mt: 5,
      }}
    >
      <IconButton color="primary" onClick={onDecrease}>
        <RemoveCircle />
      </IconButton>
      <Typography variant="h5">{value}</Typography>
      <IconButton color="primary" onClick={onIncrease}>
        <AddCircle />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
