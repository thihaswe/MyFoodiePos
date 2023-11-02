import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../store/slices/appSlice";
import companyReducer from "../store/slices/companySlice";
import menuCategoryReducer from "../store/slices/menuCategorySlice";
import menuCategoryMenuReducer from "../store/slices/menuCategoryMenuSlice";
import menuReducer from "../store/slices/menuSlice";
import menuAddonCategoryReducer from "./slices/menuAddonCategorySlice";
import addonCategoryReducer from "../store/slices/addonCategorySlice";
import addonReducer from "../store/slices/addonSlice";
import locationReducer from "../store/slices/locationSlice";
import tableReducer from "../store/slices/tableSlice";
import disableLocationMenuCategoryReducer from "./slices/disableLocationMenuCategorySlice";
import disableLocationMenuReducer from "../store/slices/disableLocationMenuSlice";

// ...

export const store = configureStore({
  reducer: {
    app: appReducer,
    company: companyReducer,
    menuCategory: menuCategoryReducer,
    menuCategoryMenu: menuCategoryMenuReducer,
    menu: menuReducer,
    menuAddonCategory: menuAddonCategoryReducer,
    addonCategory: addonCategoryReducer,
    addon: addonReducer,
    location: locationReducer,
    disableLocationMenuCategory: disableLocationMenuCategoryReducer,
    disableLocationMenu: disableLocationMenuReducer,
    table: tableReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
