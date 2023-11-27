import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import TableBarIcon from "@mui/icons-material/TableBar";
import NewTablePage from "@/components/NewTable";

const Tables = () => {
  const tables = useAppSelector((store) => store.table.items);

  const [open, setOpen] = React.useState<boolean>(false);
  const handleQRImagePrint = (assetUrl: string) => {
    const imageWindow = window.open("");
    imageWindow?.document.write(
      `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print();window.close()" /></body></html>`
    );
    imageWindow?.document.close();
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography>Table Page</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create
        </Button>
      </Box>
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
                imgUrl={item.assetUrl}
                icon={<TableBarIcon sx={{ fontSize: 50 }} />}
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
      <NewTablePage open={open} setOpen={setOpen}></NewTablePage>
    </Box>
  );
};

export default Tables;
