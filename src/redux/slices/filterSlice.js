import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
    order: 'desc',
  },
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
	}
});

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;

export default filterSlice.reducer;

export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions;