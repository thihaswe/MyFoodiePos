import {
  AddonCategoryInitialState,
  CreateAddonCategoryOptions,
  DeleteAddonCategoryOptions,
  UpdateAddonCategoryOptions,
} from "@/types/addonCategory";
import { config } from "@/utils/config";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createMenuAddonCategory,
  deleteMenuAddonCategory,
  updateMenuAddonCategorybyAddonCategory,
} from "./menuAddonCategorySlice";

const initialState: AddonCategoryInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const createAddonCategoryThunk = createAsyncThunk(
  "addonCategory/createAddonCategoryThunk",
  async (options: CreateAddonCategoryOptions, thunkAPI) => {
    const { onSuccess, onError, ...addonCategoryToCreate } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addon-categories`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(addonCategoryToCreate),
      });
      const { addonCategory, menuAddonCategory } = await response.json();
      thunkAPI.dispatch(addAddonCategory(addonCategory));
      thunkAPI.dispatch(createMenuAddonCategory(menuAddonCategory));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const updateAddonCategoryThunk = createAsyncThunk(
  "addonCategory/updateAddonCategoryThunk",
  async (options: UpdateAddonCategoryOptions, thunkAPI) => {
    const { onSuccess, onError, ...addonCategoryToUpdate } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addon-categories`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(addonCategoryToUpdate),
      });
      const { addonCategory, menuAddonCategory } = await response.json();

      thunkAPI.dispatch(updateAddonCategory(addonCategory));
      thunkAPI.dispatch(
        updateMenuAddonCategorybyAddonCategory(menuAddonCategory)
      );
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const deleteAddonCategoryThunk = createAsyncThunk(
  "addonCategory/deleteAddomnCategoryThunk",
  async (options: DeleteAddonCategoryOptions, thunkAPI) => {
    const { onSuccess, onError, id } = options;
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/addon-categories?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const menuAddonCategoryIds = await response.json();
      thunkAPI.dispatch(deleteAddonCategory(id));
      thunkAPI.dispatch(deleteMenuAddonCategory(menuAddonCategoryIds));

      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

const addonCategorySlice = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {
    setAddonCategory: (state, action) => {
      state.items = action.payload;
    },
    addAddonCategory: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateAddonCategory: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteAddonCategory: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setAddonCategory,
  addAddonCategory,
  updateAddonCategory,
  deleteAddonCategory,
} = addonCategorySlice.actions;

export default addonCategorySlice.reducer;
