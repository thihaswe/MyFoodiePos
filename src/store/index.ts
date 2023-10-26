import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../store/slices/appSlice";
import menuCategoryReducer from "../store/slices/menuCategorySlice";
import menuCategoryMenuReducer from "../store/slices/menuCategoryMenuSlice";
import menuReducer from "../store/slices/menuSlice";
import menuAddonCategoryReducer from "../store/slices/menuAddonCategory";
import addonCategoryReducer from "../store/slices/addonCategorySlice";
import addonReducer from "../store/slices/addonSlice";
import locationReducer from "../store/slices/locationSlice";
import tableReducer from "../store/slices/tableSlice";

// ...

export const store = configureStore({
  reducer: {
    app: appReducer,
    menuCategory: menuCategoryReducer,
    menuCategoryMenu: menuCategoryMenuReducer,
    menu: menuReducer,
    menuAddonCategory: menuAddonCategoryReducer,
    addonCategory: addonCategoryReducer,
    addon: addonReducer,
    location: locationReducer,
    table: tableReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
