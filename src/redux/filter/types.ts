export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price', 
}

export enum SortOrderEnum {
	ASC = 'asc',
	DESC = 'desc'
}

export type TSort = {
  name: string;
  sortProperty: SortPropertyEnum;
	order: SortOrderEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: TSort;
}