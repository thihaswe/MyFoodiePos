import {
  CreateLocationOptions,
  DeleteLocationOptions,
  LocationInitialState,
  UpdateLocationOptions,
} from "@/types/location";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: LocationInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const createLocationThunk = createAsyncThunk(
  "location/createLocationThunk",
  async (options: CreateLocationOptions, thunkAPI) => {
    const { onSuccess, onError, ...location } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/locations`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(location),
      });
      const data = await response.json();
      thunkAPI.dispatch(addLocation(data));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const updateLocationThunk = createAsyncThunk(
  "locationSlice/updateLocationThunk",
  async (options: UpdateLocationOptions, thunkAPI) => {
    const { onSuccess, onError, ...location } = options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/locations`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(location),
      });
      const data = await respone.json();

      thunkAPI.dispatch(updateLocation(data));

      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const deleteLocationThunk = createAsyncThunk(
  "locationSlice/deleteLocationThunk",
  async (options: DeleteLocationOptions, thunkAPI) => {
    const { onSuccess, onError, id } = options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/locations?id=${id}`, {
        method: "DELETE",
      });
      const data = await respone.json();

      thunkAPI.dispatch(deleteLocation(id));

      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

const loacationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.items = action.payload;
    },
    addLocation: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateLocation: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteLocation: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setLocation, addLocation, updateLocation, deleteLocation } =
  loacationSlice.actions;
export default loacationSlice.reducer;
