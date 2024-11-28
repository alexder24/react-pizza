import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';

const initialState: CartSliceState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const recalculateTotals = (state: CartSliceState) => {
  state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
  state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) findItem.count++;
      else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      recalculateTotals(state);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem && findItem.count > 1) findItem.count--;
      recalculateTotals(state);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      recalculateTotals(state);
    },
  },
});

export const { clearItems, addItem, minusItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
