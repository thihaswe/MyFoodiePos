import {
  CreateTableOptions,
  DeleteTableOptions,
  TableInitialState,
  UpdateTableOptions,
} from "@/types/table";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "next-auth/client/_utils";

const initialState: TableInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const createTableThunk = createAsyncThunk(
  "table/createTableThunk",
  async (options: CreateTableOptions, thunkAPI) => {
    const { name, locationId, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/tables`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, locationId }),
      });
      const data = await response.json();
      thunkAPI.dispatch(addTable(data));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const updateTableThunk = createAsyncThunk(
  "table/updateTableThunk",
  async (options: UpdateTableOptions, thunkAPI) => {
    const { onSuccess, onError, ...table } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/tables`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(table),
      });
      const data = await response.json();

      thunkAPI.dispatch(updateTable(data));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const deleteTableThunk = createAsyncThunk(
  "table/deleteTableThunk",
  async (options: DeleteTableOptions, thunkAPI) => {
    const { id, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/tables?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      thunkAPI.dispatch(deleteTable(id));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.items = action.payload;
    },
    addTable: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateTable: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteTable: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setTable, addTable, updateTable, deleteTable } =
  tableSlice.actions;
export default tableSlice.reducer;
