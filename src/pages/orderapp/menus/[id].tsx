import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/router";
import React from "react";

const MenuDetail = () => {
  const { isReady } = useRouter();
  const menus = useAppSelector((state) => state.menu.items);

  if (!isReady) return null;
  return <div>MenuDetail</div>;
};

export default MenuDetail;
