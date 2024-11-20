import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId } from '@/redux/slices/filterSlice';
import axios from 'axios';
import Categories from '@/components/Categories';
import Sort from '@/components/Sort';
import PizzaBlock from '@/components/PizzaBlock';
import Skeleton from '@/components/PizzaBlock/Skeleton';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  
  const [currentPage, setCurrentPage] = useState(1);
  
  const dispatch = useDispatch();
  const { categoryId, sort, searchValue } = useSelector(selectFilter);
  
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
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage, getPizzas]);

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
        onPageChange={page => setCurrentPage(page)}
        total={totalPages}
        current={currentPage}
      />
    </div>
  );
}
