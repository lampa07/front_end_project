import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container } from '../components/Container/Container';
import { useCart } from '../context/useContexts';
import { initialCars } from '../data/mockData';

export function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const car = initialCars.find((item) => item.id === Number(id));

  if (!car) {
    return (
      <Container>
        <section className="status-card">
          <h1>Vehicle not found</h1>
          <Link className="text-link" to="/">Return to fleet</Link>
        </section>
      </Container>
    );
  }

  const handleBooking = () => {
    if (!car.isAvailable) return;
    addToCart({ ...car, quantity: 1, rentalDays: 1, bookingPricePerDay: car.pricePerDay });
    navigate('/bookings');
  };

  return (
    <Container>
      <article className="detail-card">
        <Link className="text-link" to="/">← Back to fleet</Link>
        <img className="detail-image" src={car.imageUrl} alt={car.title} />
        <div className="detail-content">
          <span className="eyebrow">{car.category}</span>
          <h1>{car.title}</h1>
          <p>{car.description}</p>
          <p className="detail-rating">★ {car.rating} · {car.reviewsCount} reviews</p>
          <p className="detail-price">${car.pricePerDay} <span>/ day</span></p>
          <p>{car.isAvailable ? 'Available for booking' : 'Currently rented'}</p>
          <button
            className="primary-action"
            type="button"
            disabled={!car.isAvailable}
            onClick={handleBooking}
          >
            {car.isAvailable ? 'Book this car' : 'Unavailable'}
          </button>
        </div>
      </article>
    </Container>
  );
}
