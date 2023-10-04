import { useRouter } from "next/router";

const UpdateDeleteMenu = () => {
  const router = useRouter();
  const menuId = router.query.id;
  return <h1>update and deleteMenu {menuId}</h1>;
};

export default UpdateDeleteMenu;
