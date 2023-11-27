import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import LogIn from "./LogIn";
import LogOutPage from "./LogOut";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface Prop {
  children: ReactNode;
}

const BackofficeLayout = ({ children }: Prop) => {
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
      dispatch(
        fetchAppData({
          onSuccess: () => {},
        })
      );
    }
    // const locationStored = localStorage.getItem("helloWorld");
    // if (locations.length) {
    //   if (locationStored) return;
    //   else {
    //     localStorage.setItem("helloWorld", String(locations[0].id));
    //   }
    // }
  }, [session, company]);

  if (!session) {
    return <LogIn></LogIn>;
  }

  if (!company.length) return null;
  return (
    <Box>
      <TopBar setOpen={setOpen} company={company[0]}></TopBar>
      <Box sx={{ display: "flex", position: "relative", zIndex: 5, flex: 1 }}>
        <SideBar />
        <Box>
          <LogOutPage open={open} setOpen={setOpen} />
        </Box>

        <Box sx={{ p: 2, width: "100%", height: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
