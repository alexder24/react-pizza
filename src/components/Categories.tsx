import { memo } from 'react';

type CategoriesProps = {
  value: number;
  onСhangeCategory: (id: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories({ value, onСhangeCategory }: CategoriesProps) {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              onClick={() => onСhangeCategory(index)}
              className={value === index ? 'active' : ''}
              key={index}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(Categories);
