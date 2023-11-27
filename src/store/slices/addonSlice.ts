import {
  AddonInitialState,
  CreateAddonOptions,
  DeleteAddonOptions,
  UpdateAddonOptions,
} from "@/types/addon";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AddonInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const createAddonThunk = createAsyncThunk(
  "addon/createAddonThunk",
  async (options: CreateAddonOptions, thunkAPI) => {
    const { onSuccess, onError, ...addon } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addons`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addon),
      });
      const data = await response.json();
      thunkAPI.dispatch(addAddon(data));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const updateAddonThunk = createAsyncThunk(
  "addon/updateAddonThunk",
  async (options: UpdateAddonOptions, thunkAPI) => {
    const { onSuccess, onError, ...addon } = options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/addons`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(addon),
      });
      const data = await respone.json();
      thunkAPI.dispatch(updateAddon(data));

      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const deleteAddonThunk = createAsyncThunk(
  "addon/deleteAddonThunk",
  async (options: DeleteAddonOptions, thunkAPI) => {
    const { onSuccess, onError, id } = options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/addons?id=${id}`, {
        method: "DELETE",
      });
      const data = await respone.json();

      thunkAPI.dispatch(deleteAddon(id));

      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddon: (state, action) => {
      state.items = action.payload;
    },
    addAddon: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateAddon: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteAddon: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setAddon, addAddon, updateAddon, deleteAddon } =
  addonSlice.actions;
export default addonSlice.reducer;
