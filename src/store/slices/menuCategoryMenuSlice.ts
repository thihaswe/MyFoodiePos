import { MenuCategoryMenuInitialState } from "@/types/menuCategoryMenu";
import { MenuCategoryMenu } from "@prisma/client";
import { Action } from "@prisma/client/runtime/library";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    createMenuCategoryMenu: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    updateMenuCategoryMenu: (
      state,
      action: PayloadAction<MenuCategoryMenu[]>
    ) => {
      const menuId = action.payload[0].menuId;
      const rest = state.items.filter((item) => item.menuId !== menuId);
      state.items = [...rest, ...action.payload];
    },
    deleteMenuCategoryMenu: (state, action: PayloadAction<number[]>) => {
      state.items = state.items.filter(
        (item) => !action.payload.includes(item.id)
      );
    },
  },
});

export const {
  setMenuCategoryMenu,
  createMenuCategoryMenu,
  updateMenuCategoryMenu,
  deleteMenuCategoryMenu,
} = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
