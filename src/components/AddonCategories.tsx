import { useAppSelector } from "@/store/hook";
import { Box, Chip, Typography } from "@mui/material";
import { Addon, AddonCategory } from "@prisma/client";
import AddonComponent from "./AddOnComponent";

interface Prop {
  addonCategories: AddonCategory[];
  selectedAddon: Addon[];
  setSelectedAddon: (para?: any) => void;
}
const AddonCategories = ({
  addonCategories,
  selectedAddon,
  setSelectedAddon,
}: Prop) => {
  const addons = useAppSelector((store) => store.addon.items);
  return (
    <Box>
      {addonCategories.map((addonCategory) => {
        const addonToDisplay = addons.filter(
          (addon) => addonCategory.id === addon.addonCategoryId
        );
        return (
          <Box key={addonCategory.id} marginBottom={5}>
            <Box
              sx={{
                display: "flex",
                width: "300px",
                justifyContent: "space-between",
              }}
            >
              <Typography>{addonCategory.name}</Typography>
              <Chip
                label={addonCategory.isRequired ? "Required" : "Optional"}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 2 }}>
              <AddonComponent
                selectedAddon={selectedAddon}
                setSelectedAddon={setSelectedAddon}
                addons={addonToDisplay}
                addonCategory={addonCategory}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddonCategories;
