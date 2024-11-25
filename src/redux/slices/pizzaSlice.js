import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
 items: [],
 status: 'loading',
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (fetchQuery) => {
    const { data } = await axios.get(fetchQuery);
    return data;
  }
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
  }
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;