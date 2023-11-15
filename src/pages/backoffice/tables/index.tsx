import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { Box, Button } from "@mui/material";
import React from "react";
import TableBarIcon from "@mui/icons-material/TableBar";
const Tables = () => {
  const tables = useAppSelector((store) => store.table.items);
  const handleQRImagePrint = (assetUrl: string) => {
    const imageWindow = window.open("");
    imageWindow?.document.write(
      `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print();window.close()" /></body></html>`
    );
    imageWindow?.document.close();
  };

  console.log(tables[0].assetUrl);
  return (
    <Box>
      <Box display={"flex"} flexWrap={"wrap"}>
        {tables.map((item) => {
          return (
            <Box
              width={259}
              m={2}
              height={250}
              key={item.id}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <ItemCard
                href={`/backoffice/tables/${item.id}`}
                label={item.name}
                imgUrl={item.assetUrl || ""}
                icon={<TableBarIcon />}
              ></ItemCard>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  variant="contained"
                  onClick={() => handleQRImagePrint(item.assetUrl)}
                >
                  Print QR
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Tables;
