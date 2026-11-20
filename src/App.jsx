import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { HeroSection } from './components/HeroSection/HeroSection';
import { SectionHeader } from './components/SectionHeader/SectionHeader';
import { CarCard } from './components/CarCard/CarCard';
import { StatCard } from './components/StatCard/StatCard';
import { TestimonialCard } from './components/TestimonialCard/TestimonialCard';
import { QuickViewModal } from './components/QuickViewModal/QuickViewModal';
import { Container } from './components/Container/Container';
import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RegisterForm } from './components/RegisterForm';
import {
  AboutPage,
  BookingConfirmedPage,
  BookingsPage,
  CarDetailsPage,
  CatalogPage,
  FavoritesPage,
  LoginPage,
  NotFoundPage,
} from './pages/Pages';

import {
  initialCars,
  statsList,
  initialReviews,
} from './data/mockData';

import './App.css';
import catalogStyles from './components/CarsCatalog/CarsCatalog.module.css';

function HomePage() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({ isOpen: false, car: null, days: 1 });

  useEffect(() => {
    document.title = 'DriveSelect — Premium Car Rental';
  }, []);

  const handleCloseModal = () => {
    setModalState({ isOpen: false, car: null, days: 1 });
  };

  return (
    <main>
      <Container>
        <HeroSection
          heading="Drive the Extraordinary"
          subheading="Choose from luxury sports cars, comfortable electric sedans, and rugged SUVs."
          buttonText="Explore Catalog"
          onAction={() => navigate('/catalog')}
        />

        <section id="cars" className="section-padding">
          <SectionHeader
            title="Featured Vehicles"
            subtitle="A few standouts from the DriveSelect fleet"
          />
          <div className={catalogStyles.carsGrid}>
            {initialCars.slice(0, 3).map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onOpenQuickView={(selectedCar, days) =>
                  setModalState({ isOpen: true, car: selectedCar, days })
                }
              />
            ))}
          </div>
          <div className="featured-catalog-link">
            <Link className="page-button" to="/catalog">View All Vehicles →</Link>
          </div>
        </section>

        <section id="stats" className="section-padding" style={{ marginTop: '40px' }}>
          <SectionHeader title="Platform Analytics" subtitle="Live updates on our service performance" />
          <div className="stats-grid">
            {statsList.map((st) => (
              <StatCard key={st.id} {...st} />
            ))}
          </div>
        </section>

        <section id="reviews" className="section-padding" style={{ marginTop: '40px' }}>
          <SectionHeader title="Customer Testimonials" subtitle="Read what our clients say about us" />
          <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {initialReviews.map((rev) => (
              <TestimonialCard key={rev.id} {...rev} />
            ))}
          </div>
        </section>
      </Container>

      <QuickViewModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        car={modalState.car}
        days={modalState.days}
      />

    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="cars/:id" element={<CarDetailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="booking-confirmed" element={<BookingConfirmedPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
