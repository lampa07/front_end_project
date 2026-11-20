import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { UserProfile } from '../UserProfile/UserProfile';
import { Button } from '../Button/Button';
import { useTheme, useAuth, useCart } from '../../context/useContexts';
import { formatTenge } from '../../utils/formatTenge';
import styles from './Header.module.css'; 

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { isDarkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const { favorites, totalCount, totalPrice } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const closeMenuOnDesktop = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setIsMenuOpen(false);
        };

        window.addEventListener('resize', closeMenuOnDesktop);
        return () => window.removeEventListener('resize', closeMenuOnDesktop);
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles['header-container']}>
                <Link className={styles.brandLink} to="/" aria-label="GearRent home">
                    <svg className={styles.brandIcon} viewBox="0 0 32 24" aria-hidden="true">
                        <path d="M9 6h14a6 6 0 0 1 5.7 4.1l1.5 4.6a3.7 3.7 0 0 1-6.1 3.8l-3.1-2.7H11l-3.1 2.7a3.7 3.7 0 0 1-6.1-3.8l1.5-4.6A6 6 0 0 1 9 6Z" />
                        <path d="M9 10v6m-3-3h6m8-1h.01M23 14h.01" />
                    </svg>
                    <span>Gear<span className={styles.brandAccent}>Rent</span></span>
                </Link>

                {isMobile && (
                    <button
                        className={styles.mobileMenuToggle}
                        type="button"
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((open) => !open)}
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                )}
                
                {(!isMobile || isMenuOpen) && (
                    <div className={`${styles['header-right-side']} ${isMobile ? styles.mobileMenuPanel : ''}`}>
                        {(!isMobile || isMenuOpen) && (
                        <Navigation
                            onNavigate={() => setIsMenuOpen(false)}
                        />
                        )}
                    
                    <div className={styles['header-actions']}>
                        <Link className={styles['favorites-indicator']} to="/favorites" title="Favorite equipment">
                           ❤️ <span className={styles['fav-badge']}>{favorites.length}</span>
                        </Link>
                        <button className={styles.bookingsButton} type="button" onClick={() => navigate('/bookings')}>
                            Bookings: {totalCount} · {formatTenge(totalPrice)}
                        </button>

                        <Button 
                            text={isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                            variant="outline"
                            onClick={toggleTheme}
                        />

                        <UserProfile user={user} onLogin={() => navigate('/login')} onLogout={logout} />
                    </div>
                    </div>
                )}
            </div>
        </header>
    );
};
