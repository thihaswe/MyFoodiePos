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
    setdisableLocationMenuCategory: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setdisableLocationMenuCategory } =
  disableLocationMenuCategorySlice.actions;
export default disableLocationMenuCategorySlice.reducer;
