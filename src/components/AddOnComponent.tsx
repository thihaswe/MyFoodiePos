import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { Addon, AddonCategory } from "@prisma/client";

import React from "react";

interface Prop {
  addons: Addon[];
  addonCategory: AddonCategory;
  selectedAddon: Addon[];
  setSelectedAddon: (para?: any) => void;
}
const AddonComponent = ({
  addons,
  addonCategory,
  selectedAddon,
  setSelectedAddon,
}: Prop) => {
  return (
    <Box>
      {addons.map((addon) => (
        <Box
          key={addon.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <FormControlLabel
            key={addon.id}
            control={
              addonCategory.isRequired ? (
                <Radio
                  checked={selectedAddon.includes(addon) ? true : false}
                  onChange={() => {
                    const others = selectedAddon.filter(
                      (item) =>
                        !addons.map((addon) => addon.id).includes(item.id)
                    );
                    setSelectedAddon([...others, addon]);
                  }}
                ></Radio>
              ) : (
                <Checkbox
                  checked={selectedAddon.includes(addon)}
                  onChange={() =>
                    setSelectedAddon(
                      selectedAddon.includes(addon)
                        ? selectedAddon.filter((item) => item.id !== addon.id)
                        : [...selectedAddon, addon]
                    )
                  }
                ></Checkbox>
              )
            }
            label={addon.name}
          ></FormControlLabel>
          <Typography sx={{ fontStyle: "italic" }}>{addon.price}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default AddonComponent;
