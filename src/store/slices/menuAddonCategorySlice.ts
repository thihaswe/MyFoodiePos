import { MenuAddonCategoryInitialState } from "@/types/menuAddonCategory";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuAddonCategoryInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategory",
  initialState,
  reducers: {
    setMenuAddonCategory: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenuAddonCategory } = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;
