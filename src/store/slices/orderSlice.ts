import Orders from "@/pages/backoffice/orders";
import {
  CreateOrderOption,
  GetOrderOption,
  OrderInitialState,
  UpdateOrderOption,
} from "@/types/order";
import { config } from "@/utils/config";
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: OrderInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrderThunk = createAsyncThunk(
  "cart/createOrderThunk",
  async (payload: CreateOrderOption, thunkAPI) => {
    const { onSuccess, onError, tableId, cartItems } = payload;
    try {
      const response = await fetch(`${config.apiBaseUrl}/orders`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tableId, cartItems }),
      });
      const data = await response.json();

      thunkAPI.dispatch(setOrder(data));
      onSuccess && onSuccess(data);
    } catch (error) {
      onError && onError();
    }
  }
);

export const updateOrderThunk = createAsyncThunk(
  "order/updateOrder",
  async (options: UpdateOrderOption, thunkApi) => {
    const { itemId, status, onSuccess, onError } = options;
    try {
      thunkApi.dispatch(setIsLoading(true));
      const response = await fetch(
        `${config.apiBaseUrl}/orders?itemId=${itemId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const { orders } = await response.json();
      thunkApi.dispatch(setOrder(orders));
      thunkApi.dispatch(setIsLoading(false));
      onSuccess && onSuccess(orders);
    } catch (err) {
      onError && onError();
    }
  }
);

export const refreshOrderThunk = createAsyncThunk(
  "cart/refreshOrderThunk",
  async (payload: GetOrderOption, thunkAPI) => {
    const { onSuccess, onError, orderSeq } = payload;
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/orders?orderSeq=${orderSeq}`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();

      thunkAPI.dispatch(setOrder(data));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError();
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrder: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setIsLoading, setOrder } = orderSlice.actions;
export default orderSlice.reducer;
