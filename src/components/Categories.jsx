import { useState } from "react";

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return <li
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? "active" : ""}
          >{value}</li>
        })}
      </ul>
    </div>
  );
}
