import { MenuCategoryMenuInitialState } from "@/types/menuCategoryMenu";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategoryMenuInitialState = {
  items: [],
  isLoading: false,
  error: null,
};
const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenu: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenuCategoryMenu } = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
