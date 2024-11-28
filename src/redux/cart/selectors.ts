import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart;

export const selectItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((obj) => obj.id === id);

export const selectTotalCount = (state: RootState) => state.cart.totalCount;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;