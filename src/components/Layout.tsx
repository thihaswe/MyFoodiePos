import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import OrderLayout from "./OrderLayout";
import BackofficeLayout from "./BackofficeLayout";

interface Prop {
  children: ReactNode;
}

const Layout = ({ children }: Prop) => {
  const router = useRouter();
  const { tableId } = router.query;
  const isOrderApp = tableId;
  const isBackofficeApp = router.pathname.includes("/backoffice");
  if (isOrderApp) {
    return (
      <Box sx={{ height: "100%" }}>
        <OrderLayout>{children}</OrderLayout>
      </Box>
    );
  }

  if (isBackofficeApp) {
    return (
      <Box sx={{ height: "100%" }}>
        <BackofficeLayout>{children}</BackofficeLayout>
      </Box>
    );
  }

  return <Box>{children}</Box>;
};

export default Layout;
