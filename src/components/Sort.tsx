import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { setSort } from '@/redux/filter/slice';
import { selectSort } from '@/redux/filter/selectors'
import { TSort, SortOrderEnum, SortPropertyEnum } from '@/redux/filter/types';

type PopupClick = MouseEvent & { 
  path: Node[];
};

export const sortVariants: TSort[] = [
  { name: 'популярности', sortProperty: SortPropertyEnum.RATING, order: SortOrderEnum.ASC },
  { name: 'популярности', sortProperty: SortPropertyEnum.RATING, order: SortOrderEnum.DESC },
  { name: 'цене', sortProperty: SortPropertyEnum.PRICE, order: SortOrderEnum.ASC },
  { name: 'цене', sortProperty: SortPropertyEnum.PRICE, order: SortOrderEnum.DESC },
  { name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE, order: SortOrderEnum.ASC },
  { name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE, order: SortOrderEnum.DESC },
];

export default function Sort() {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useAppDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      const path = _event.composedPath ? _event.composedPath() : _event.path;
      if (sortRef.current && !path.includes(sortRef.current)) {
        setShowPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setShowPopup(!showPopup)}>{sort.name}</span>
      </div>
      {showPopup && (
        <div className="sort__popup">
          <ul>
            {sortVariants.map((obj, index) => {
              return (
                <li
                  onClick={() => {
                    dispatch(setSort(obj));
                    setShowPopup(false);
                  }}
                  className={
                    sort.sortProperty === obj.sortProperty && sort.order === obj.order
                      ? 'active'
                      : ''
                  }
                  key={index}>
                  {obj.name + ' ' + (obj.order === 'asc' ? '↑' : '↓')}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
