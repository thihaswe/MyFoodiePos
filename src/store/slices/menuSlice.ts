import { MenuState } from "@/types/menu";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuState = {
  items: [],
  isLoading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: "menu",
  // `createSlice` will infer the state type fromS the `initialState` argument
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
