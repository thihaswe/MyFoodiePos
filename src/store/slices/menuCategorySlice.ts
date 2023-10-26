import { MenuCategoryInitialState } from "@/types/menuCategory";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategoryInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategory: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenuCategory } = menuCategorySlice.actions;

export default menuCategorySlice.reducer;
