import { Box } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useSession } from "next-auth/react";
import LogIn from "../LogIn";
import LogOutPage from "../LogOut";
import TopBar from "../TopBar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAppData } from "@/store/slices/appSlice";
import { useRouter } from "next/router";

interface Prop {
  children: ReactNode;
}

const Layout = ({ children }: Prop) => {
  const router = useRouter();
  const init = useAppSelector((store) => store.app.init);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (session && !init) {
      dispatch(
        fetchAppData({
          onSuccess: () => {
            router.push("/backoffice/orders");
          },
        })
      );
    }
  }, [session]);

  if (!session) return <LogIn></LogIn>;

  return (
    <Box>
      <TopBar setOpen={setOpen}></TopBar>

      <Box sx={{ display: "flex", position: "relative", zIndex: 5, flex: 1 }}>
        <SideBar />
        <Box>
          <LogOutPage open={open} setOpen={setOpen} />
        </Box>

        <Box sx={{ p: 3, width: "100%", height: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
