import styles from './NotFoundBlock.module.scss';
import nfImg from '@/assets/img/sad-face.svg';

export default function NotFoundBlock() {
  return (
    <div className={styles.nfblock}>
      <img className={styles.image} src={nfImg} alt="Not Found" />
      <h2>Ничего не найдено</h2>
      <p>К сожалению, запрашиваемая страница отсутствует</p>
    </div>
  )
}