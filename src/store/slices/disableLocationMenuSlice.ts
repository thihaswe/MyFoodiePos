import { disableLocationMenuInitialState } from "@/types/disableLocationMenu";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    addLocationMenuSLice: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    removeDisabledLocationMenu: (
      state,
      action: PayloadAction<{ locationId: number; menuId: number }>
    ) => {
      const { locationId, menuId } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.locationId === locationId && item.menuId === menuId)
      );
    },
  },
});

export const {
  setDisableLocationMenu,
  addLocationMenuSLice,
  removeDisabledLocationMenu,
} = disableLocationMenuSlice.actions;
export default disableLocationMenuSlice.reducer;
