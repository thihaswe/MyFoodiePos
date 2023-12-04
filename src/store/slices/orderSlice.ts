import Orders from "@/pages/backoffice/orders";
import { OrderInitialState } from "@/types/order";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OrderInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
