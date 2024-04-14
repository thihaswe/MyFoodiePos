import { Box, Button, TextField, Typography } from "@mui/material";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { Router, useRouter } from "next/router";

const LogIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "100px",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Image
          src={"/logo.png"}
          alt="log in"
          width={100}
          height={100}
          style={{ width: "350px", height: "200px" }}
        ></Image>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "25px" }}>
            LOG IN TO THE BACKOFFICE
          </Typography>
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
          >
            LOG IN
          </Button>
        </Box>
      </Box>
    );
};

export default LogIn;
