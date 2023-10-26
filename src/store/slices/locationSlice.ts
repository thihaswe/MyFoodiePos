import { LocationInitialState } from "@/types/location";
import { createSlice } from "@reduxjs/toolkit";

const initialState: LocationInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const loacationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setLocation } = loacationSlice.actions;
export default loacationSlice.reducer;
