import { Box } from "@mui/material";
import { ReactNode, use, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import LogIn from "./LogIn";
import LogOutPage from "./LogOut";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAppData } from "@/store/slices/appSlice";
import { Router, useRouter } from "next/router";
import TopBar from "./TopBar";

interface Prop {
  children: ReactNode;
}

const Layout = ({ children }: Prop) => {
  const router = useRouter();
  const init = useAppSelector((store) => store.app.init);
  const dispatch = useAppDispatch();
  const locations = useAppSelector((store) => store.location.items);
  const company = useAppSelector((store) => store.company.items);

  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  // const [progress, setProgress] = useState(false);
  // Router.events.on("routeChangeStart", () => {
  //   setProgress(true);
  // });
  // Router.events.off("routeChangeComplete", () => {
  //   setProgress(false);
  // });

  useEffect(() => {
    if (session && !init) {
      console.log(init);
      dispatch(
        fetchAppData({
          onSuccess: () => {
            const locationStored = localStorage.getItem("helloWorld");
            if (locations.length) {
              if (locationStored) return;
              else {
                localStorage.setItem("helloWorld", locations[0].name);
              }
            }
            router.push("/backoffice/orders");
          },
        })
      );
    }
  }, [session]);

  // useEffect(() => {
  //   const locationStored = localStorage.getItem("helloWorld");

  //   if (locations.length) {
  //     if (locationStored) {
  //     } else {
  //       localStorage.setItem("helloWorld", locations[0].name);
  //     }
  //   }
  // }, [locations]);

  if (!session) {
    console.log("session");
    return <LogIn></LogIn>;
  } else if (company.length && session) {
    return (
      <Box>
        <TopBar setOpen={setOpen} company={company[0]}></TopBar>
        <Box sx={{ display: "flex", position: "relative", zIndex: 5, flex: 1 }}>
          <SideBar />
          <Box>
            <LogOutPage open={open} setOpen={setOpen} />
          </Box>

          <Box sx={{ p: 3, width: "100%", height: "100%" }}>{children}</Box>
        </Box>
      </Box>
    );
  }
  return null;
};

export default Layout;
