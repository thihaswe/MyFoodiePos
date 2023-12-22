import { Addon, Menu, ORDERSTATUS, Order, Table } from "@prisma/client";
import { BaseOptions } from "./menu";
import { CartItem } from "./cart";

export interface OrderInitialState {
  items: Order[];
  isLoading: boolean;
  error: Error | null;
}

export interface GetOrderOption extends BaseOptions {
  orderSeq: string;
}

export interface CreateOrderOption extends BaseOptions {
  tableId: number;
  cartItems: CartItem[];
}
export interface UpdateOrderOption extends BaseOptions {
  itemId: string;
  status: ORDERSTATUS;
}
export interface OrderAddon {
  addonCategoryId: number;
  addons: Addon[];
}
export interface OrderItem {
  itemId: string;
  status: ORDERSTATUS;
  orderAddons: OrderAddon[];
  menu: Menu;
  table: Table;
}
