import { disableLocationMenuInitialState } from "@/types/disableLocationMenu";
import { createSlice } from "@reduxjs/toolkit";

const initialState: disableLocationMenuInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const disableLocationMenuSlice = createSlice({
  name: "disableLocationMenu",
  initialState,
  reducers: {
    setdisableLocationMenu: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setdisableLocationMenu } = disableLocationMenuSlice.actions;
export default disableLocationMenuSlice.reducer;
