import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) findItem.count++;
      else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const selectTotalCount = (state) => state.cart.totalCount;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export const { clearItems, addItem } = cartSlice.actions;

export default cartSlice.reducer;
