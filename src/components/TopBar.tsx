import { Box, Button, Typography } from "@mui/material";
import { Company } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface Prop {
  setOpen: (data: boolean) => void;
  company: Company;
}

const TopBar = ({ setOpen, company }: Prop) => {
  return (
    <Box
      sx={{
        mx: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "success.main",
      }}
    >
      <Image
        width={70}
        height={70}
        src={"https://shorturl.at/gmwE8"}
        alt={"Image is Unavaible"}
      ></Image>

      <Typography sx={{ fontFamily: "fantasy", fontSize: 35 }}>
        {company.name ? company.name : ""}
      </Typography>
      <Typography>
        <Button
          sx={{ mx: 5 }}
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          LOG OUT
        </Button>
      </Typography>
    </Box>
  );
};

export default TopBar;
