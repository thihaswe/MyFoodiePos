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
import { setMenuAddonCategory } from "./menuAddonCategorySlice";
import { setDisableLocationMenu } from "./disableLocationMenuSlice";
import { setDisableLocationMenuCategory } from "./disableLocationMenuCategorySlice";
import { setCompany } from "./companySlice";
import { setOrder } from "./orderSlice";

const initialState: AppInitialState = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (options: FetchDataOptions, ThunkAPI) => {
    const { tableId, onSuccess, onError } = options;

    const appDataUrl = tableId
      ? `${config.apiBaseUrl}/app?tableId=${tableId}`
      : `${config.apiBaseUrl}/app`;

    try {
      const response = await fetch(appDataUrl);
      const data = await response.json();
      const {
        company,
        menuCategories,
        menus,
        disableLocationMenus,
        disableLocationMenuCategories,
        menuCategoryMenus,
        addonCategories,
        menuAddonCategories,
        addons,
        locations,
        tables,
        orders,
      } = data;

      ThunkAPI.dispatch(setApp(true));
      ThunkAPI.dispatch(setCompany(company));
      ThunkAPI.dispatch(setMenuCategory(menuCategories));

      ThunkAPI.dispatch(setMenuCategoryMenu(menuCategoryMenus));
      ThunkAPI.dispatch(setMenu(menus));
      ThunkAPI.dispatch(setMenuAddonCategory(menuAddonCategories));
      ThunkAPI.dispatch(setAddonCategory(addonCategories));
      ThunkAPI.dispatch(setAddon(addons));
      ThunkAPI.dispatch(setDisableLocationMenu(disableLocationMenus));
      ThunkAPI.dispatch(
        setDisableLocationMenuCategory(disableLocationMenuCategories)
      );
      ThunkAPI.dispatch(setLocation(locations));
      ThunkAPI.dispatch(setOrder(orders));
      ThunkAPI.dispatch(setTable(tables));
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
