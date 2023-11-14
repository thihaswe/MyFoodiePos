import { MenuCategory } from "@prisma/client";
import { BaseOptions } from "./menu";

export interface MenuCategoryInitialState {
  items: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateMenuCategoryOptions extends BaseOptions {
  name: string;
  companyId: number;
  locationId: number;
}
export interface UpdateMenuCategoryOptions extends BaseOptions {
  id: number;
  name: string;
  isAvailable: boolean;
  locationId: number;
}

export interface DeleteMenuCategoryOptions extends BaseOptions {
  id: number;
}
