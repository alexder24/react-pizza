export default function Categories({ value, onСhangeCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
