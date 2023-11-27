import { Addon } from "@prisma/client";
import { BaseOptions } from "./menu";

export interface AddonInitialState {
  items: Addon[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateAddonOptions extends BaseOptions {
  name: string;
  price: number;
  addonCategoryId: number | "";
}
export interface UpdateAddonOptions extends BaseOptions {
  id: number;
  name: string;
  price: number;
  addonCategoryId: number;
}
export interface DeleteAddonOptions extends BaseOptions {
  id: number;
}
