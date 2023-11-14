import {
  CreateMenuCategoryOptions,
  DeleteMenuCategoryOptions,
  MenuCategoryInitialState,
  UpdateMenuCategoryOptions,
} from "@/types/menuCategory";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteMenuCategoryMenu } from "./menuCategoryMenuSlice";
import {
  addDisableLocationMenuCategory,
  deleteDisableLocationMenuCategory,
} from "./disableLocationMenuCategorySlice";

const initialState: MenuCategoryInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const createMenuCategoryThunk = createAsyncThunk(
  "menuCategory/createMenuCategoryThunk",
  async (options: CreateMenuCategoryOptions, ThunkAPI) => {
    const { onSuccess, onError, ...menuCategory } = options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/menu-categories`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(menuCategory),
      });
      const data = await respone.json();
      ThunkAPI.dispatch(addMenuCategory(data));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const updateMenuCategoryThunk = createAsyncThunk(
  "menuCategory/updateMenuCategoryThunk",
  async (options: UpdateMenuCategoryOptions, ThunkAPI) => {
    const {
      onSuccess,
      onError,
      locationId,
      isAvailable,
      ...menuCategoryUpdate
    } = options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/menu-categories`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...menuCategoryUpdate,
          locationId,
          isAvailable,
        }),
      });
      const { menuCategory, disableLocationMenuCategories } =
        await respone.json();
      console.log(menuCategory, disableLocationMenuCategories);
      ThunkAPI.dispatch(updateMenuCategory(menuCategory));
      if (isAvailable === false) {
        ThunkAPI.dispatch(
          addDisableLocationMenuCategory(disableLocationMenuCategories)
        );
      } else {
        ThunkAPI.dispatch(
          deleteDisableLocationMenuCategory(menuCategoryUpdate)
        );
      }
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const deleteMenuCategoryThunk = createAsyncThunk(
  "menuCategory/deleteMenuCategoryThunk",
  async (options: DeleteMenuCategoryOptions, ThunkAPI) => {
    const { onSuccess, onError, id } = options;
    try {
      const respone = await fetch(
        `${config.apiBaseUrl}/menu-categories?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await respone.json();
      ThunkAPI.dispatch(deleteMenuCategory(id));
      ThunkAPI.dispatch(deleteMenuCategoryMenu(data));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategory: (state, action) => {
      state.items = action.payload;
    },
    addMenuCategory: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateMenuCategory: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteMenuCategory: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setMenuCategory,
  addMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} = menuCategorySlice.actions;

export default menuCategorySlice.reducer;
