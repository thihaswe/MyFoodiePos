import { CartInitialState, CartItem } from "@/types/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CartInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { onSuccess, onError, ...cartItem } = action.payload;
      try {
        const exist = state.items.find((item) => item.id === cartItem.id);
        if (exist) {
          state.items = state.items.map((item) =>
            item.id === cartItem.id ? cartItem : item
          );
        } else {
          state.items = [...state.items, cartItem];
        }
        onSuccess && onSuccess();
      } catch (error) {
        onError && onError();
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
