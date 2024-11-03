import { useState, useEffect } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const [pizzaItems, setPizzaItems] = useState([]);
  const pizzaApi = 'https://67270754302d03037e6f186e.mockapi.io/items';

  const getPizzas = async () => {
    try {
      const response = await fetch(pizzaApi);

      if (response.ok) {
        const pizzaArr = await response.json();
        setPizzaItems(pizzaArr);
      }
    } catch (error) {
      alert(`Ошибка при загрузке данных: ${error}`);
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzaItems.map((pizzaItem) => {
                return <PizzaBlock {...pizzaItem} key={pizzaItem.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
