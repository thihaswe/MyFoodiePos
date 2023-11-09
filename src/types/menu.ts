import { Menu } from "@prisma/client";

export interface MenuInitialState {
  items: Menu[];
  isLoading: boolean;
  error: Error | null;
}

export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface FetchMenu extends BaseOptions {
  menus: Menu[];
}

export interface CreateMenuOptions extends BaseOptions {
  name: string;
  price: number;
  menuCategoryIds: number[];
  assetUrl?: string;
}

export interface UpdateMenuOptions extends BaseOptions {
  id: number;
  name: string;
  price: number;
  menuCategoryIds: number[];
}

export interface DeleteMenuOptions extends BaseOptions {
  id: number;
}
