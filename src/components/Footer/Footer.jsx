import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = ({ copyrightText, socialLinks }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>{copyrightText}</p>
        <div className={styles.footerNavigation}>
          <Link className="page-button" to="/catalog">Fleet catalog</Link>
          <Link className="page-button" to="/about">About DriveSelect</Link>
        </div>
        <div className={styles.socialLinks}>
          {socialLinks.map((item) => (
            <a className="page-button" key={item.platform} href={item.url} target="_blank" rel="noreferrer">
              {item.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};