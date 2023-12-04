import { Order } from "@prisma/client";

export interface OrderInitialState {
  items: Order[];
  isLoading: boolean;
  error: Error | null;
}
