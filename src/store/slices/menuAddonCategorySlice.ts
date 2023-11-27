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
    updateMenuAddonCategorybyMenu: (state, action) => {
      const menuId = action.payload[0].menuId;
      const rest = state.items.filter((item) => item.menuId !== menuId);
      state.items = [...rest, ...action.payload];
    },
    updateMenuAddonCategorybyAddonCategory: (state, action) => {
      const addonCategoryId = action.payload[0].addonCategoryId;
      const rest = state.items.filter(
        (item) => item.addonCategoryId !== addonCategoryId
      );
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
  updateMenuAddonCategorybyMenu,
  updateMenuAddonCategorybyAddonCategory,
  deleteMenuAddonCategory,
} = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;
