import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from "../Logo/Logo";
import { Navigation } from '../Navigation/Navigation';
import { UserProfile } from '../UserProfile/UserProfile';
import { Button } from '../Button/Button';
import { useTheme, useAuth, useCart } from '../../context/useContexts';
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
                <Link to="/" aria-label="DriveSelect home">
                    <Logo altText="DriveSelect Logo" width={200} />
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
                        <Link className={styles['favorites-indicator']} to="/favorites" title="Favorite cars">
                           ❤️ <span className={styles['fav-badge']}>{favorites.length}</span>
                        </Link>
                        <button className={styles.bookingsButton} type="button" onClick={() => navigate('/bookings')}>
                            Bookings: {totalCount} · ${totalPrice.toFixed(2)}
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
