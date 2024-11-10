import { useState, useEffect, useCallback, useContext } from 'react';
import { SearchContext } from '@/layouts/Root';
import Categories from '@/components/Categories';
import Sort from '@/components/Sort';
import PizzaBlock from '@/components/PizzaBlock';
import Skeleton from '@/components/PizzaBlock/Skeleton';

export default function Home() {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState({
    name: 'популярности',
    sortPropery: 'rating',
    order: 'desc',
  });
  const { searchValue } = useContext(SearchContext);
  const pizzaApi = 'https://67270754302d03037e6f186e.mockapi.io/items';

  const getPizzas = useCallback(async () => {
    try {
      setIsLoading(true);
      const queryCategory = activeCategory > 0 ? `&category=${activeCategory}` : '';
      const querySort = `sortBy=${activeSort.sortPropery}&order=${activeSort.order}`;
      const querySearch = searchValue ? `search=${searchValue.toLocaleLowerCase()}` : '';
      const response = await fetch(`${pizzaApi}?${querySearch}${queryCategory}&${querySort}`);

      if (response.ok) {
        const pizzaArr = await response.json();
        setPizzaItems(pizzaArr);
        setIsLoading(false);
      }
    } catch (error) {
      alert(`Ошибка при загрузке данных: ${error}`);
    }
  }, [activeCategory, activeSort, searchValue, pizzaApi]);

  useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, searchValue, getPizzas]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} onСhangeCategory={(index) => setActiveCategory(index)} />
        <Sort value={activeSort} onСhangeSort={(index) => setActiveSort(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzaItems.map((pizzaItem) => {
              return <PizzaBlock {...pizzaItem} key={pizzaItem.id} />;
            })}
      </div>
    </div>
  );
}
