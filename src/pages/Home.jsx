import { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId } from '@/redux/slices/filterSlice';
import { SearchContext } from '@/layouts/Root';
import Categories from '@/components/Categories';
import Sort from '@/components/Sort';
import PizzaBlock from '@/components/PizzaBlock';
import Skeleton from '@/components/PizzaBlock/Skeleton';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSort, setActiveSort] = useState({
    name: 'популярности',
    sortPropery: 'rating',
    order: 'desc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  
  const dispatch = useDispatch();
  const { categoryId } = useSelector(selectFilter);
  console.log('categoryId:', categoryId);

  const totalItems = 10;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const { searchValue } = useContext(SearchContext);
  const pizzaApi = 'https://67270754302d03037e6f186e.mockapi.io/items';

  const getPizzas = useCallback(async () => {
    try {
      setIsLoading(true);
      const queryCategory = categoryId > 0 ? `&category=${categoryId}` : '';
      const querySort = `sortBy=${activeSort.sortPropery}&order=${activeSort.order}`;
      const querySearch = searchValue ? `search=${searchValue.toLocaleLowerCase()}` : '';
      const queryPage = `page=${currentPage}&limit=${itemsPerPage}`;
      const response = await fetch(`${pizzaApi}?${querySearch}${queryCategory}&${querySort}&${queryPage}`);

      if (response.ok) {
        const pizzaArr = await response.json();
        setPizzaItems(pizzaArr);
        setIsLoading(false);
      }
    } catch (error) {
      alert(`Ошибка при загрузке данных: ${error}`);
    }
  }, [categoryId, activeSort, searchValue, pizzaApi, currentPage]);

  useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, activeSort, searchValue, currentPage, getPizzas]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onСhangeCategory={(index) => dispatch(setCategoryId(index))} />
        <Sort value={activeSort} onСhangeSort={(index) => setActiveSort(index)} />
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
