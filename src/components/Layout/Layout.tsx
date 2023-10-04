import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

const Layout = ({ children }: Prop) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 80,
          bgcolor: "#4C4C6D",
        }}
      >
        <Typography variant="h4" sx={{ color: "#E8F6EF" }}>
          Foodie App
        </Typography>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "200px",
            backgroundColor: "aquamarine",
            minHeight: "100vh",
            borderTopRightRadius: "15px",
          }}
        >
          <Link href={"/backoffice/menu"}>Menu page</Link>
          <br></br>
          <Link href={"/backoffice/menu-category"}>MenuCategory</Link>
        </Box>

        <Box sx={{ width: "100%", pl: 3, pt: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
