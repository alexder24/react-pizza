import { useContext, useRef } from 'react';
import { SearchContext } from '@/layouts/Root';
import styles from './Search.module.scss';

export default function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const searchInputRef = useRef();

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
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
        className={styles.input}
        placeholder="Поиск..."
      />
      <svg
        onClick={() => {
          setSearchValue('');
          searchInputRef.current.focus();
        }}
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
