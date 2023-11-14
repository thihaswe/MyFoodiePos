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
    setDisableLocationMenu: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setDisableLocationMenu } = disableLocationMenuSlice.actions;
export default disableLocationMenuSlice.reducer;
