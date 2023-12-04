import { Addon, Menu } from "@prisma/client";
import { BaseOptions } from "./app";

export interface CartInitialState {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}

export interface CartItem extends BaseOptions {
  id: string;
  menu: Menu;
  addons: Addon[];
  quantity: number;
}
