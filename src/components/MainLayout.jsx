import { Outlet } from 'react-router-dom';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { Toast } from './Toast/Toast';
import { useFavorites } from '../context/useContexts';

export function MainLayout() {
  const { toastMessage, clearToast } = useFavorites();

  return (
    <div className="app-root">
      <ProgressBar />
      <Header />
      <Outlet />
      <Footer
        copyrightText="© 2026 GearRent. All rights reserved."
        socialLinks={[
          { platform: 'GitHub', url: 'https://github.com' },
          { platform: 'Twitter', url: 'https://twitter.com' },
        ]}
      />
      {toastMessage && <Toast message={toastMessage} onClose={clearToast} />}
    </div>
  );
}