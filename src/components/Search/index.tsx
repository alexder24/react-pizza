import { useCallback, useRef, useState, ChangeEvent } from 'react';
import { useAppDispatch } from '@/redux/store';
import { setSearchValue } from '@/redux/filter/slice';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';

export default function Search() {
  const [searchInputValue, setSearchInputValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onSearchClear = () => {
    dispatch(setSearchValue(''));
    setSearchInputValue('');
    searchInputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    [dispatch],
  );

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={searchInputRef}
        onChange={onChangeSearchValue}
        value={searchInputValue}
        className={styles.input}
        placeholder="Поиск..."
      />
      <svg
        onClick={onSearchClear}
        className={styles.clear}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <g id="cross">
          <line x1="7" x2="25" y1="7" y2="25" />
          <line x1="7" x2="25" y1="25" y2="7" />
        </g>
      </svg>
    </div>
  );
}
