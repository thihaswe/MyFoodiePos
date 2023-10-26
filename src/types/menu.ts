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
