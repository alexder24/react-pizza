import styles from './Pagination.module.scss';

export default function Pagination({ onPageChange, total, current }) {
  const isFirstPage = current === 1;
  const isLastPage = current === total;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(current - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(current + 1);
    }
  };
  
  return (
    <ul className={styles.root}>
      <li className={styles.item}>
        <button
          className={`${styles.page} ${isFirstPage ? styles.disabled : ''}`}
          onClick={handlePrevious}
          disabled={isFirstPage}
        >
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={styles.arrow}>
            <g>
              <path d="M15.12,15.53,25,5.66a1,1,0,0,1,1.41,1.41l-9.06,9.06,8.8,8.8a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.42,0l-9.61-9.61A.85.85,0,0,1,15.12,15.53Z"/>
              <path d="M5.54,15.53l9.88-9.87a1,1,0,1,1,1.41,1.41L7.77,16.13l8.8,8.8a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L5.54,16.73A.85.85,0,0,1,5.54,15.53Z"/>
            </g>
          </svg>
        </button>
      </li>
      {[...Array(total)].map((_, index) => (
        <li key={index} className={styles.item}>
          <button
            className={`${styles.page} ${index + 1 === current ? styles.active : ''}`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}
      <li className={styles.item}>
        <button
          className={`${styles.page} ${isLastPage ? styles.disabled : ''}`}
          onClick={handleNext}
          disabled={isLastPage}
        >
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={styles.arrow}>
            <g>
              <path d="M16.88,15.53,7,5.66A1,1,0,0,0,5.59,7.07l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.42,0l9.61-9.61A.85.85,0,0,0,16.88,15.53Z"/>
              <path d="M26.46,15.53,16.58,5.66a1,1,0,0,0-1.41,1.41l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.41,0l9.62-9.61A.85.85,0,0,0,26.46,15.53Z"/>
            </g>
          </svg>
        </button>
      </li>
    </ul>  )
}