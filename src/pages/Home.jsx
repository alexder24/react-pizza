import { useState, useEffect, useCallback } from 'react';
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
  });
  const pizzaApi = 'https://67270754302d03037e6f186e.mockapi.io/items';

  const getPizzas = useCallback(async () => {
    try {
      setIsLoading(true);
      const queryCategory = activeCategory > 0 ? `category=${activeCategory}` : '';
      const querySort = `sortBy=${activeSort.sortPropery}&order=desc`;
      const response = await fetch(`${pizzaApi}?${queryCategory}&${querySort}`);

      if (response.ok) {
        const pizzaArr = await response.json();
        setPizzaItems(pizzaArr);
        setIsLoading(false);
      }
    } catch (error) {
      alert(`Ошибка при загрузке данных: ${error}`);
    }
  }, [activeCategory, activeSort, pizzaApi]);

  useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [activeCategory, activeSort]);

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
