import styles from './component.module.css';

const Banner = ({ title }) => {
  return (
    <header className={styles.banner}>
      <div className={styles.bannerTitle}>
        <h1>{title}</h1>
      </div>
      <nav className={styles.navButtons}>
        <button aria-label="Notifications">🔔</button>
        <button aria-label="Messages">📧</button>
        <button aria-label="Menu">☰</button>
      </nav>
    </header>
  );
};

export default Banner;
