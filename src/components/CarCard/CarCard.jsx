import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../Badge/Badge';
import { RatingStars } from '../RatingStars/RatingStars';
import { Button } from '../Button/Button';
import { useCart } from '../../context/useContexts';
import styles from './CarCard.module.css';

export const CarCard = ({ car, onOpenQuickView }) => {
  const [days, setDays] = useState(1);
  const { favorites, toggleFavorite, cartItems } = useCart();
  const isFav = favorites.includes(car.id);
  const bookedCars = cartItems.reduce(
    (total, item) => total + (item.id === car.id ? item.quantity : 0),
    0
  );

  const incrementDays = (e) => {
    e.stopPropagation();
    setDays((prev) => prev + 1);
  };

  const decrementDays = (e) => {
    e.stopPropagation();
    setDays((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className={styles.carCard}>
      <div className={styles.carCardHeader}>
        <Badge 
          label={car.isAvailable ? 'Available' : 'Rented'} 
          colorScheme={car.isAvailable ? 'green' : 'red'} 
        />
        <button 
          className={`${styles.favBtn} ${isFav ? styles.active : ''}`}
          onClick={() => toggleFavorite(car.id)}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>

      <img src={car.imageUrl} alt={car.title} className={styles.carImage} />

      <div className={styles.carCardBody}>
        <span className={styles.carCategory}>{car.category}</span>
        <h3><Link to={`/cars/${car.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{car.title}</Link></h3>
        <p className="car-desc">{car.description}</p>
        
        <RatingStars score={car.rating} reviewsCount={car.reviewsCount} />

        <div className={styles.daysSelector}>
          <span>Rental Period:</span>
          <div className={styles.counterControls}>
            <button type="button" onClick={decrementDays}>-</button>
            <span>{days} day(s)</span>
            <button type="button" onClick={incrementDays}>+</button>
          </div>
        </div>

        <div className={styles.priceTag}>
          <span>Total: </span>
          <span className={styles.priceAmount}>${car.pricePerDay * days}</span>
          <small> (${car.pricePerDay}/day)</small>
        </div>
        {bookedCars > 0 && (
          <small>In bookings: {bookedCars} {bookedCars === 1 ? 'car' : 'cars'}</small>
        )}
      </div>

      <div className={styles.carCardFooter}>
        <Link className={styles.detailsLink} to={`/cars/${car.id}`}>
          View details
        </Link>
        <Button 
          text={!car.isAvailable ? "Currently Unavailable" : bookedCars > 0 ? "Book Another" : "Book Now"}
          variant="primary" 
          isDisabled={!car.isAvailable} 
          onClick={() => car.isAvailable && onOpenQuickView(car, days)}
        />
      </div>
    </div>
  );
};