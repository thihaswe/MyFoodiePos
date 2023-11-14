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
    createMenuAddonCategory: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    updateMenuAddonCategory: (state, action) => {
      const menuId = action.payload[0].menuId;
      const rest = state.items.filter((item) => item.menuId !== menuId);
      state.items = [...rest, ...action.payload];
    },
    deleteMenuAddonCategory: (state, action) => {
      state.items = state.items.filter(
        (item) => !action.payload.includes(item.id)
      );
    },
  },
});

export const {
  setMenuAddonCategory,
  createMenuAddonCategory,
  updateMenuAddonCategory,
  deleteMenuAddonCategory,
} = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;
