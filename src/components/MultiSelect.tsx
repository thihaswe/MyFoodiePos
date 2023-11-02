import {
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
  Box,
  Select,
} from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import React from "react";

interface Prop {
  label: string;
  selectedIds: number[];
  handleOnChange: (data?: any) => void;
  practical: Menu[] | MenuCategory[];
}

const MultiSelect = ({
  label,
  selectedIds,
  handleOnChange,
  practical,
}: Prop) => {
  return (
    <Box>
      <FormControl sx={{ width: 500 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          label={label}
          value={selectedIds}
          onChange={handleOnChange}
          renderValue={(selectedIds) => {
            return practical
              .filter((menuCategory) => selectedIds.includes(menuCategory.id))
              .map((item) => (
                <Chip key={item.id} label={item.name} sx={{ mr: 2 }}></Chip>
              ));
          }}
        >
          {practical.map((item) => {
            return (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultiSelect;
