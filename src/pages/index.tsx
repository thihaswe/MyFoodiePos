import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography variant="h1" sx={{ mb: 5 }} color="error.light">
        Welcome to My POS system app
      </Typography>
      <Box width={500} justifyContent={"space-between"} display={"flex"}>
        <Button
          onClick={() => router.push("/orderapp?tableId=1")}
          variant="contained"
        >
          to orderApp
        </Button>
        <Button onClick={() => router.push("/backoffice")} variant="contained">
          to backoffice
        </Button>
      </Box>
    </Box>
  );
}
