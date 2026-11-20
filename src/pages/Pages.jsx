import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { CarsCatalog } from '../components/CarsCatalog/CarsCatalog';
import { QuickViewModal } from '../components/QuickViewModal/QuickViewModal';
import { Container } from '../components/Container/Container';
import { useAuth, useCart } from '../context/useContexts';
import { currentUser, initialCars, categoriesList } from '../data/mockData';
import './Pages.css';

const sortOptions = ['price-asc', 'price-desc', 'rating-desc'];
const carsPerPage = 6;

function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | DriveSelect`;
  }, [title]);
}

function updateQuery(setSearchParams, searchParams, updates) {
  const nextParams = new URLSearchParams(searchParams);

  Object.entries(updates).forEach(([key, value]) => {
    if (!value || value === 'All') nextParams.delete(key);
    else nextParams.set(key, String(value));
  });

  setSearchParams(nextParams, { replace: true });
}

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalState, setModalState] = useState({ isOpen: false, car: null, days: 1 });
  const categoryParam = searchParams.get('category') || 'All';
  const selectedCategory = categoriesList.includes(categoryParam) ? categoryParam : 'All';
  const searchQuery = searchParams.get('search') || '';
  const requestedSort = searchParams.get('sort') || sortOptions[0];
  const sortBy = sortOptions.includes(requestedSort) ? requestedSort : sortOptions[0];
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);
  usePageTitle('Fleet Catalog');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  let filteredCars = initialCars.filter((car) => {
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    const matchesSearch = car.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-asc') filteredCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
  if (sortBy === 'price-desc') filteredCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
  if (sortBy === 'rating-desc') filteredCars.sort((a, b) => b.rating - a.rating);

  const totalPages = Math.max(1, Math.ceil(filteredCars.length / carsPerPage));
  const visiblePage = Math.min(currentPage, totalPages);
  const displayedCars = filteredCars.slice((visiblePage - 1) * carsPerPage, visiblePage * carsPerPage);

  const updateFilters = (updates) => {
    updateQuery(setSearchParams, searchParams, { ...updates, page: null });
  };

  return (
    <main className="page-shell">
      <Container>
        <div className="page-heading">
          <p className="page-eyebrow">DRIVESELECT FLEET</p>
          <h1>Choose your car</h1>
          <p>Explore available cars and find the right one for your next trip.</p>
        </div>
        <CarsCatalog
          cars={displayedCars}
          categories={categoriesList}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => updateFilters({ category })}
          searchQuery={searchQuery}
          setSearchQuery={(search) => updateFilters({ search })}
          sortBy={sortBy}
          setSortBy={(sort) => updateFilters({ sort })}
          onOpenQuickView={(car, days) => setModalState({ isOpen: true, car, days })}
          currentPage={visiblePage}
          totalPages={totalPages}
          setCurrentPage={(page) => updateQuery(setSearchParams, searchParams, { page })}
        />
      </Container>
      <QuickViewModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, car: null, days: 1 })}
        car={modalState.car}
        days={modalState.days}
      />
    </main>
  );
}

export function CarDetailsPage() {
  const { id } = useParams();
  const car = initialCars.find((item) => item.id === Number(id));
  const { addToCart } = useCart();
  usePageTitle(car?.title || 'Car not found');

  if (!car) {
    return (
      <main className="page-shell"><Container>
        <div className="empty-state"><h1>Car not found</h1><Link to="/catalog">Back to fleet catalog</Link></div>
      </Container></main>
    );
  }

  return (
    <main className="page-shell"><Container>
      <article className="car-details">
        <img src={car.imageUrl} alt={car.title} />
        <div className="car-details-copy">
          <p className="page-eyebrow">{car.category} · {car.isAvailable ? 'AVAILABLE' : 'CURRENTLY RENTED'}</p>
          <h1>{car.title}</h1>
          <p>{car.description}</p>
          <p className="detail-rating">{car.rating} / 5 · {car.reviewsCount} reviews</p>
          <p className="detail-price">${car.pricePerDay}<span> / day</span></p>
          <p>Available colors: {car.colors.join(', ')}</p>
          <div className="page-actions">
            <button
              className="page-button"
              type="button"
              disabled={!car.isAvailable}
              onClick={() => addToCart({ ...car, quantity: 1 })}
            >
              Add to bookings
            </button>
            <Link className="page-secondary-link" to="/catalog">Back to fleet</Link>
          </div>
        </div>
      </article>
    </Container></main>
  );
}

export function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useCart();
  const favoriteCars = initialCars.filter((car) => favorites.includes(car.id));
  usePageTitle('Favorite Cars');

  return (
    <main className="page-shell"><Container>
      <div className="page-heading">
        <p className="page-eyebrow">YOUR SHORTLIST</p>
        <h1>Favorite cars</h1>
      </div>
      {favoriteCars.length ? (
        <div className="page-car-grid">
          {favoriteCars.map((car) => (
            <article className="page-car-card" key={car.id}>
              <Link to={`/cars/${car.id}`}><img src={car.imageUrl} alt={car.title} /></Link>
              <div>
                <p className="page-eyebrow">{car.category}</p>
                <h2><Link to={`/cars/${car.id}`}>{car.title}</Link></h2>
                <p>${car.pricePerDay} / day</p>
                <div className="page-actions">
                  <button className="page-button" type="button" disabled={!car.isAvailable} onClick={() => addToCart({ ...car, quantity: 1 })}>Add to bookings</button>
                  <button className="page-text-button" type="button" onClick={() => toggleFavorite(car.id)}>Remove</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state"><p>Your favorites list is empty.</p><Link className="page-button" to="/catalog">Browse the fleet</Link></div>
      )}
    </Container></main>
  );
}

export function LoginPage() {
  const [name, setName] = useState('');
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = location.state?.from?.pathname || '/bookings';
  usePageTitle('Sign In');

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ ...currentUser, name: name.trim() || currentUser.name });
    navigate(returnTo, { replace: true });
  };

  if (isAuthenticated) {
    return <main className="page-shell"><Container><div className="empty-state"><h1>You are signed in</h1><Link to="/bookings">Open bookings</Link></div></Container></main>;
  }

  return (
    <main className="page-shell"><Container>
      <form className="page-form" onSubmit={handleSubmit}>
        <p className="page-eyebrow">DRIVESELECT ACCOUNT</p>
        <h1>Sign in</h1>
        <label htmlFor="login-name">Name</label>
        <input id="login-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
        <button className="page-button" type="submit">Continue</button>
      </form>
      <div className="login-prompt">
        <p>New to DriveSelect?</p>
        <Link className="page-button login-register-button" to="/register">Create an account</Link>
      </div>
    </Container></main>
  );
}

export function BookingsPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  usePageTitle('Your Bookings');

  const handleSubmit = (event) => {
    event.preventDefault();
    clearCart();
    navigate('/booking-confirmed', { replace: true });
  };

  return (
    <main className="page-shell"><Container>
      <div className="page-heading">
        <p className="page-eyebrow">SECURE CHECKOUT</p>
        <h1>Your bookings</h1>
      </div>
      {cartItems.length ? (
        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="booking-list">
            {cartItems.map((car, index) => (
              <div className="booking-row" key={car.cartItemId || `${car.id}-${index}`}>
                <img src={car.imageUrl} alt="" />
                <div>
                  <strong>{car.title}</strong>
                  <span>{car.quantity} day(s) · ${car.bookingPricePerDay ?? car.pricePerDay} / day</span>
                  {car.selectedColor && <span>Color: {car.selectedColor}</span>}
                  {car.customerName && <span>Renter: {car.customerName} · {car.customerPhone}</span>}
                </div>
                <strong>${(car.quantity * (car.bookingPricePerDay ?? car.pricePerDay)).toFixed(2)}</strong>
              </div>
            ))}
            <p className="booking-total">Total <strong>${totalPrice.toFixed(2)}</strong></p>
          </div>
          <div className="checkout-fields">
            <label htmlFor="pickup-date">Pickup date</label>
            <input id="pickup-date" type="date" required min={new Date().toISOString().slice(0, 10)} />
            <button className="page-button" type="submit">Confirm booking</button>
          </div>
        </form>
      ) : (
        <div className="empty-state"><p>You have no cars in your bookings yet.</p><Link className="page-button" to="/catalog">Browse the fleet</Link></div>
      )}
    </Container></main>
  );
}

export function BookingConfirmedPage() {
  usePageTitle('Booking Confirmed');

  return (
    <main className="page-shell"><Container>
      <div className="empty-state confirmation-state">
        <p className="page-eyebrow">BOOKING RECEIVED</p>
        <h1>Your trip is taking shape.</h1>
        <p>Your booking request has been recorded.</p>
        <Link className="page-button" to="/catalog">Explore more cars</Link>
      </div>
    </Container></main>
  );
}

export function AboutPage() {
  usePageTitle('About DriveSelect');

  return (
    <main className="page-shell"><Container>
      <section className="about-content">
        <p className="page-eyebrow">ABOUT DRIVESELECT</p>
        <h1>Good cars. Clear choices.</h1>
        <p>DriveSelect brings a carefully selected fleet together in one place, with transparent daily rates and the details you need to choose confidently.</p>
        <Link className="page-button" to="/catalog">View the fleet</Link>
      </section>
    </Container></main>
  );
}

export function NotFoundPage() {
  usePageTitle('Page Not Found');

  return (
    <main className="page-shell"><Container>
      <div className="empty-state not-found-state">
        <p className="page-eyebrow">404 · ROUTE NOT FOUND</p>
        <h1>This road ends here.</h1>
        <p>The page you requested could not be found.</p>
        <Link className="page-button" to="/">Return home</Link>
      </div>
    </Container></main>
  );
}