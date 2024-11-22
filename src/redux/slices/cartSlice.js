import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	totalPrice: 0,
}

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

			if (findItem) findItem.count++
			else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
	}
});

export const selectCart = (state) => state.cart;
export const selectItemById = (id) => (state) => {
	if (!Array.isArray(state.items)) return undefined;
	return state.items.find((obj) => obj.id === id);
};

export const { clearItems, addItem } = cartSlice.actions;

export default cartSlice.reducer;
