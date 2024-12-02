import { useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setCurrentPage } from '@/redux/filter/slice';
import { selectFilter } from '@/redux/filter/selectors';
import { selectPizzaData } from '@/redux/pizza/selectors';
import { fetchPizzas } from '@/redux/pizza/asyncActions';
import { useAppDispatch } from '@/redux/store';
import { Categories, Sort, PizzaBlock, Skeleton, Pagination, PizzaError } from '@/components';
import { PizzaBlockProps } from '@/components/PizzaBlock';
import qs from 'qs';

export default function Home() {
  const dispatch = useAppDispatch();
  const { categoryId, sort, searchValue, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const navigate = useNavigate();
  const isMounted = useRef(false);

  const totalItems = 10;
  const totalPages = Math.ceil(totalItems / 4);

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, [dispatch]);

  const getPizzas = useCallback(async () => {
    const category = categoryId > 0 ? `${categoryId}` : '';
    const sortBy = `${sort.sortProperty}`;
    const order = `${sort.order}`;
    const search = searchValue ? `${searchValue.toLocaleLowerCase()}` : '';
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
  }, [dispatch, categoryId, currentPage, sort, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        order: sort.order,
        currentPage,
      };

      const queryString = qs.stringify(params, { skipNulls: true });
      navigate(`/?${queryString}`);
    }

    if (!window.location.search) getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage, getPizzas, navigate, sort.order]);

  useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage, getPizzas]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onСhangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <PizzaError />
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : items.map((pizzaItem: PizzaBlockProps) => {
                return <PizzaBlock {...pizzaItem} key={pizzaItem.id} />;
              })}
        </div>
      )}
      <Pagination
        onPageChange={(page) => dispatch(setCurrentPage(page))}
        total={totalPages}
        current={currentPage}
      />
    </div>
  );
}
