import { AddonCategory } from "@prisma/client";
import { BaseOptions } from "./app";

export interface AddonCategoryInitialState {
  items: AddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface CreateAddonCategoryOptions extends BaseOptions {
  name: string;
  menuIds: number[];
  isRequired: boolean;
}
export interface UpdateAddonCategoryOptions extends BaseOptions {
  id: number;
  name: string;
  menuIds: number[];
  isRequired: boolean;
}
export interface DeleteAddonCategoryOptions extends BaseOptions {
  id: number;
}
