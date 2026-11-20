import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = ({ copyrightText, socialLinks }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          <strong>GearRent</strong>
          <p>Gaming equipment rentals for your next great session.</p>
          <a href="mailto:support@gearrent.example">Contact support</a>
        </div>
        <div className={styles.footerNavigation}>
          <span className={styles.footerLabel}>Navigation</span>
          <Link className="page-button" to="/catalog">Equipment catalog</Link>
          <Link className="page-button" to="/about">About GearRent</Link>
        </div>
        <div className={styles.socialLinks}>
          <span className={styles.footerLabel}>Follow GearRent</span>
          {socialLinks.map((item) => (
            <a className="page-button" key={item.platform} href={item.url} target="_blank" rel="noreferrer">
              {item.platform}
            </a>
          ))}
        </div>
        <p className={styles.copyright}>{copyrightText}</p>
      </div>
    </footer>
  );
};