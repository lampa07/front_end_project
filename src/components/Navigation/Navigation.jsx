import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const navItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Fleet Catalog', to: '/catalog' },
  { label: 'About', to: '/about' },
];

export const Navigation = ({ onNavigate }) => {
  return (
    <nav className={styles.nav}>
      {navItems.map(({ label, to, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          onClick={onNavigate}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};