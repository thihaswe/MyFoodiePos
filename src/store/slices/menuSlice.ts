import {
  CreateMenuOptions,
  DeleteMenuOptions,
  MenuInitialState,
  UpdateMenuOptions,
} from "@/types/menu";
import { config } from "@/utils/config";
import { Menu, MenuCategoryMenu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createMenuCategoryMenu,
  deleteMenuCategoryMenu,
  updateMenuCategoryMenu,
} from "./menuCategoryMenuSlice";
import {
  addLocationMenuSLice,
  removeDisabledLocationMenu,
} from "./disableLocationMenuSlice";
import { deleteMenuAddonCategory } from "./menuAddonCategorySlice";

const initialState: MenuInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const createMenuThunk = createAsyncThunk(
  "menu/createMenu",
  async (options: CreateMenuOptions, thunkAPI) => {
    const { onSuccess, onError, ...menu } = options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(menu),
      });
      const data = await respone.json();

      const menus = data.menus as Menu;
      const menuCategoryMenus = data.menuCategoryMenus as MenuCategoryMenu;

      thunkAPI.dispatch(createMenu(menus));
      thunkAPI.dispatch(createMenuCategoryMenu(menuCategoryMenus));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

export const updateMenuThunk = createAsyncThunk(
  "menu/updateMenu",
  async (options: UpdateMenuOptions, thunkAPI) => {
    const { onSuccess, onError, isAvailable, locationId, id, ...menu } =
      options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...menu, id, isAvailable, locationId }),
      });
      const data = await respone.json();
      const { menus, menuCategoryMenus, disabledLocationMenus } = data;
      thunkAPI.dispatch(updateMenu(menus));
      thunkAPI.dispatch(updateMenuCategoryMenu(menuCategoryMenus));
      if (isAvailable === false) {
        thunkAPI.dispatch(addLocationMenuSLice(disabledLocationMenus));
      } else {
        thunkAPI.dispatch(
          removeDisabledLocationMenu({ locationId, menuId: id })
        );
      }
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);
export const deleteMenuThunk = createAsyncThunk(
  "menu/deleteMenu",
  async (options: DeleteMenuOptions, thunkAPI) => {
    const { onSuccess, onError, id } = options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/menus?id=${id}`, {
        method: "DELETE",
      });
      const data = await respone.json();

      const { name, menuAddonCategoryIds, menuCategoryMenusIds } = data;

      thunkAPI.dispatch(deleteMenu(id));
      thunkAPI.dispatch(deleteMenuAddonCategory(menuAddonCategoryIds));
      thunkAPI.dispatch(deleteMenuCategoryMenu(menuCategoryMenusIds));
      onSuccess && onSuccess();
    } catch (error) {
      console.error(error);
      onError && onError();
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.items = action.payload;
    },
    createMenu: (state, action: PayloadAction<Menu>) => {
      state.items = [...state.items, action.payload];
    },
    updateMenu: (state, action: PayloadAction<Menu>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteMenu: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setMenu, createMenu, updateMenu, deleteMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
