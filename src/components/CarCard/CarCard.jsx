import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RatingStars } from '../RatingStars/RatingStars';
import { Button } from '../Button/Button';
import { useCart } from '../../context/useContexts';
import { formatTenge } from '../../utils/formatTenge';
import styles from './CarCard.module.css';

export const CarCard = ({ car, onOpenQuickView }) => {
  const [days, setDays] = useState(1);
  const { favorites, toggleFavorite, cartItems } = useCart();
  const isFav = favorites.includes(car.id);
  const bookedCars = cartItems.reduce(
    (total, item) => total + (item.id === car.id ? item.quantity : 0),
    0
  );
  const specs = Object.entries(car.specs || {}).slice(0, 3);
  const dailyPrice = Number(car.pricePerDay) || 0;

  const incrementDays = (event) => {
    event.stopPropagation();
    setDays((previous) => previous + 1);
  };

  const decrementDays = (event) => {
    event.stopPropagation();
    setDays((previous) => (previous > 1 ? previous - 1 : 1));
  };

  return (
    <article className={styles.carCard}>
      <div className={styles.imageWrap}>
        <img src={car.imageUrl} alt={car.title} className={styles.carImage} />
        <span className={`${styles.availability} ${car.isAvailable ? styles.available : styles.unavailable}`}>
          {car.isAvailable ? 'Available' : 'Unavailable'}
        </span>
        <button
          className={`${styles.favBtn} ${isFav ? styles.active : ''}`}
          type="button"
          onClick={() => toggleFavorite(car.id)}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFav}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>

      <div className={styles.carCardBody}>
        <div className={styles.productMeta}>
          {car.brand && <span className={styles.brand}>{car.brand}</span>}
          <span className={styles.carCategory}>{car.category}</span>
        </div>
        <h3 className={styles.productTitle}>
          <Link to={`/cars/${car.id}`}>{car.title}</Link>
        </h3>
        <p className={styles.description}>{car.description}</p>

        {specs.length > 0 && (
          <ul className={styles.specList} aria-label="Key specifications">
            {specs.map(([name, value]) => (
              <li className={styles.specItem} key={name}>
                <span>{name.replace(/([A-Z])/g, ' $1')}</span>
                <strong>{String(value)}</strong>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.rating}>
          <RatingStars score={car.rating} reviewsCount={car.reviewsCount} />
        </div>

        <div className={styles.rentalControls}>
          <span>Rental period</span>
          <div className={styles.counterControls}>
            <button type="button" onClick={decrementDays} aria-label="Decrease rental period">−</button>
            <span>{days} {days === 1 ? 'day' : 'days'}</span>
            <button type="button" onClick={incrementDays} aria-label="Increase rental period">+</button>
          </div>
        </div>

        <div className={styles.priceBlock}>
          <strong className={styles.priceAmount}>{formatTenge(dailyPrice)} <span>/ day</span></strong>
          {days > 1 && (
            <small>Estimated total: {formatTenge(dailyPrice * days)}</small>
          )}
        </div>
        {bookedCars > 0 && (
          <small className={styles.bookingCount}>
            In bookings: {bookedCars} {bookedCars === 1 ? 'item' : 'items'}
          </small>
        )}
      </div>

      <div className={styles.carCardFooter}>
        <Link className={styles.detailsLink} to={`/cars/${car.id}`}>
          View Details
        </Link>
        <Button
          text={!car.isAvailable ? 'Unavailable' : bookedCars > 0 ? 'Book Another' : 'Book Now'}
          variant="primary"
          isDisabled={!car.isAvailable}
          onClick={() => car.isAvailable && onOpenQuickView(car, days)}
        />
      </div>
    </article>
  );
};
