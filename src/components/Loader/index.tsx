import styles from './Loader.module.scss';

export default function Loader() {
	return (
		<div className={styles.container}>
			<span className={styles.loader}></span>
		</div>
	);
}