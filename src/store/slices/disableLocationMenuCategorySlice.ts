import { disableLocationMenuCategoryInitialState } from "@/types/disableLocationMenuCategory";
import { createSlice } from "@reduxjs/toolkit";

const initialState: disableLocationMenuCategoryInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const disableLocationMenuCategorySlice = createSlice({
  name: "disableLocationMenuCategory",
  initialState,
  reducers: {
    setDisableLocationMenuCategory: (state, action) => {
      state.items = action.payload;
    },
    addDisableLocationMenuCategory: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    deleteDisableLocationMenuCategory: (state, action) => {
      state.items = state.items.filter(
        (item) => item.menuCategoryId !== action.payload.id
      );
    },
  },
});

export const {
  setDisableLocationMenuCategory,
  addDisableLocationMenuCategory,
  deleteDisableLocationMenuCategory,
} = disableLocationMenuCategorySlice.actions;
export default disableLocationMenuCategorySlice.reducer;
