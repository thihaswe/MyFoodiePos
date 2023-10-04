import config from "@/config";
import { Menu, MenuPayload, MenuState } from "@/types/menu";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MenuState = {
  items: [],
  isLoading: false,
  error: null,
};

export const CreateMenu = createAsyncThunk(
  "menu/createMenu",
  async (payload: MenuPayload, ThunkAPI) => {
    const response = await fetch(`${config.apiBaseUrl}/api/menu`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    ThunkAPI.dispatch(setMenu(data));
  }
);

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
