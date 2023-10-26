import { AppInitialState, FetchDataOptions } from "@/types/app";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenuCategory } from "./menuCategorySlice";
import { setMenu } from "./menuSlice";
import { setAddonCategory } from "./addonCategorySlice";
import { setLocation } from "./locationSlice";
import { setTable } from "./tableSlice";
import { setMenuCategoryMenu } from "./menuCategoryMenuSlice";
import { setAddon } from "./addonSlice";
import { setMenuAddonCategory } from "./menuAddonCategory";

const initialState: AppInitialState = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (options: FetchDataOptions, ThunkAPI) => {
    const { onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/app`);
      const data = response.json();
      const {} = data;
      ThunkAPI.dispatch(setApp(true));
      // ThunkAPI.dispatch(setMenuCategory());
      // ThunkAPI.dispatch(setMenuCategoryMenu());
      // ThunkAPI.dispatch(setMenu());
      // ThunkAPI.dispatch(setMenuAddonCategor());
      // ThunkAPI.dispatch(setAddonCategory());
      // ThunkAPI.dispatch(setAddon());
      // ThunkAPI.dispatch(setLocation());
      // ThunkAPI.dispatch(setTable());
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError;
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setApp: (state, action) => {
      state.init = action.payload;
    },
  },
});

export const { setApp } = appSlice.actions;
export default appSlice.reducer;
