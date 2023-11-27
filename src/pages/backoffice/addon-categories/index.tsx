import ItemCard from "@/components/ItemCard";
import NewAddonCategory from "@/components/NewAddonCategory";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import { useState } from "react";

const AddonCategories = () => {
  const AddonCategories = useAppSelector((store) => store.addonCategory.items);
  const addons = useAppSelector((store) => store.addon.items);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography>Addon-Category Page</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create
        </Button>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"}>
        {AddonCategories.map((addonCategory) => {
          return (
            <Box key={addonCategory.id} sx={{ m: 2 }}>
              <ItemCard
                href={`/backoffice/addon-categories/${addonCategory.id}`}
                label={addonCategory.name}
                icon={<ClassIcon sx={{ fontSize: 30 }} />}
                subtitle={
                  addons.filter(
                    (addon) => addon.addonCategoryId === addonCategory.id
                  ).length
                }
              ></ItemCard>
            </Box>
          );
        })}
      </Box>
      <NewAddonCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AddonCategories;
