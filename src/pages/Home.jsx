import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters
} from '@/redux/slices/filterSlice';
import { sortVariants } from '@/components/Sort';
import axios from 'axios';
import qs from 'qs';
import Categories from '@/components/Categories';
import Sort from '@/components/Sort';
import PizzaBlock from '@/components/PizzaBlock';
import Skeleton from '@/components/PizzaBlock/Skeleton';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const dispatch = useDispatch();
  const { categoryId, sort, searchValue, currentPage } = useSelector(selectFilter);

  const navigate = useNavigate();
  const isMounted = useRef(false);
  
  const totalItems = 10;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pizzaApi = 'https://67270754302d03037e6f186e.mockapi.io/items';

  const getPizzas = useCallback(async () => {
    try {
      setIsLoading(true);
      const queryCategory = categoryId > 0 ? `&category=${categoryId}` : '';
      const querySort = `sortBy=${sort.sortProperty}&order=${sort.order}`;
      const querySearch = searchValue ? `search=${searchValue.toLocaleLowerCase()}` : '';
      const queryPage = `page=${currentPage}&limit=${itemsPerPage}`;
      const fetchQuery = `${pizzaApi}?${querySearch}${queryCategory}&${querySort}&${queryPage}`;
      const fetchedPizzas = await axios.get(fetchQuery);
      
      if (fetchedPizzas.status === 200) {
        setPizzaItems(fetchedPizzas.data);
        setIsLoading(false);
      }
    } catch (error) {
      alert(`Ошибка при загрузке данных: ${error}`);
      //status 404 ничего не найдено
    }
  }, [categoryId, sort, searchValue, pizzaApi, currentPage]);

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
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage, getPizzas]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortVariants.find((obj) => (obj.sortProperty === params.sortProperty && obj.order === params.order));
      if (sort) params.sort = sort;
      dispatch(setFilters(params));
    }
    isMounted.current = true;
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onСhangeCategory={(index) => dispatch(setCategoryId(index))} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzaItems.map((pizzaItem) => {
              return <PizzaBlock {...pizzaItem} key={pizzaItem.id} />;
            })}
      </div>
      <Pagination
        onPageChange={page => dispatch(setCurrentPage(page))}
        total={totalPages}
        current={currentPage}
      />
    </div>
  );
}
