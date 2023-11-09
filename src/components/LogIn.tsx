import { Box, Button } from "@mui/material";

import { signIn, useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";

const LogIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session)
    return (
      <Box>
        <Button
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          LOG IN
        </Button>
      </Box>
    );
  else {
    router.push("/backoffice/orders");
  }
};

export default LogIn;
