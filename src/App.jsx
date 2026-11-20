import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { HeroSection } from './components/HeroSection/HeroSection';
import { SectionHeader } from './components/SectionHeader/SectionHeader';
import { CarCard } from './components/CarCard/CarCard';
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
import { UsersPage } from './pages/UsersPage';
import { UserDetailsPage } from './pages/UserDetailsPage';

import {
  initialCars,
  initialReviews,
  statsList,
} from './data/mockData';

import './App.css';
import catalogStyles from './components/CarsCatalog/CarsCatalog.module.css';

function HomePage() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({ isOpen: false, car: null, days: 1 });

  useEffect(() => {
    document.title = 'GearRent — Gaming Equipment Rentals';
  }, []);

  const handleCloseModal = () => {
    setModalState({ isOpen: false, car: null, days: 1 });
  };

  return (
    <main className="gear-home">
      <Container>
        <HeroSection
          variant="gear"
          brand="GearRent"
          heading="RENT YOUR DREAM SETUP"
          subheading="Premium gaming gear. Flexible rentals. Better gaming experience."
          buttonText="Explore Equipment"
          onAction={() => navigate('/catalog')}
          imageUrl={initialCars[0].imageUrl}
          imageAlt={initialCars[0].title}
          benefits={[
            { title: 'Flexible Rentals', description: 'Choose a rental period that works for you.' },
            { title: 'Premium Equipment', description: 'Game with quality gear from trusted brands.' },
            { title: 'Easy Booking', description: 'Reserve your equipment in just a few steps.' },
          ]}
        />
      </Container>

      <section id="cars" className="gear-home-section">
        <Container>
          <SectionHeader
            title="Featured Equipment"
            subtitle="Explore popular gaming gear, ready for your next session."
          />
          <div className={catalogStyles.carsGrid}>
            {initialCars.slice(0, 6).map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onOpenQuickView={(selectedCar, days) =>
                  setModalState({ isOpen: true, car: selectedCar, days })
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section id="reviews" className="gear-home-section gear-reviews">
        <Container>
          <div className="gear-rating-summary" aria-label={`GearRent average rating: ${statsList[2].value}`}>
            <span aria-hidden="true">★★★★★</span>
            <strong>{statsList[2].value}</strong>
            <span>average customer rating</span>
          </div>
          <SectionHeader
            title="What Our Customers Say"
            subtitle="Real experiences from gamers and creators in the GearRent community."
          />
          <div className="gear-reviews-grid">
            {initialReviews.map((rev) => (
              <TestimonialCard key={rev.id} {...rev} />
            ))}
          </div>
        </Container>
      </section>

      <section className="gear-cta-section">
        <Container>
          <div className="gear-cta">
            <p className="gear-cta-eyebrow">LEVEL UP YOUR NEXT SESSION</p>
            <h2>Ready to Upgrade Your Gaming Setup?</h2>
            <p>Find the gaming equipment you need and rent it on your schedule.</p>
            <Link className="page-button" to="/catalog">Browse Equipment</Link>
          </div>
        </Container>
      </section>

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
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserDetailsPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="booking-confirmed" element={<BookingConfirmedPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
