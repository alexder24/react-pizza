import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";
import pickBy from 'lodash.pickby';
import identity from 'lodash.identity';

const pizzaApi = 'https://67270754302d03037e6f186e.mockapi.io/items';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzaStatus',
	async (params) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<Pizza[]>(pizzaApi, {
			params: pickBy({
				page: currentPage,
				limit: 4,
				category,
				sortBy,
				order,
				search,
			}, identity)
		});
		return data;
	}
);