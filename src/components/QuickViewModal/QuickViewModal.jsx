import { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { useCart } from '../../context/useContexts';
import { formatTenge } from '../../utils/formatTenge';
import styles from './QuickViewModal.module.css';

export const QuickViewModal = ({ car, days = 1, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(car?.colors?.[0] || '');
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 минут в секундах
  const { addToCart } = useCart();

  useEffect(() => {
    if (!car) return;
    setSelectedColor(car.colors?.[0] || '');
    setPromo('');
    setDiscount(0);
    setPromoMessage('');
    setCustomerName('');
    setCustomerPhone('');
    setTimeLeft(600);
  }, [car]);

  // 6. Таймер обратного отсчета для акции
  useEffect(() => {
    if (!car) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [car]);

  useEffect(() => {
    if (!car) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [car, onClose]);


  useEffect(() => {
    if (!car) return;

    const handleClickOutside = (e) => {
      if (e.target.classList.contains(styles.modalOverlay)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [car, onClose]);

  if (!car) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };


  const handleApplyPromo = () => {
    if (promo.trim().toUpperCase() === 'DRIVE10') {
      setDiscount(0.1);
      setPromoMessage('10% discount applied.');
      return;
    }

    setDiscount(0);
    setPromoMessage('That promo code is not valid.');
  };

  const totalPrice = car.pricePerDay * days * (1 - discount);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Book {car.title}</h3>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>

                <div className={styles.modalBody}>
          <div style={{ backgroundColor: '#b91c1c', color: '#fff', padding: '10px', marginBottom: '15px', borderRadius: '4px', textAlign: 'center' }}>
            🔥 Special Offer! Discount expires in: <strong>{formatTime(timeLeft)}</strong>
          </div>
          <div className={styles.quickviewSummary}>

            <img src={car.imageUrl} alt={car.title} className={styles.previewImg} />
            <div>
              <h4>{car.title}</h4>
              <p>Period: {days} day(s)</p>
              <div className={styles.colorOptions}>
                {car.colors?.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={selectedColor === c ? styles.colorChipSelected : styles.colorChip}
                    onClick={() => setSelectedColor(c)}
                    aria-pressed={selectedColor === c}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.promoGroup}>
            <input
              type="text" 
              placeholder="Promo code (DRIVE10)" 
              value={promo} 
              onChange={(e) => {
                setPromo(e.target.value);
                setPromoMessage('');
              }}
            />
            <Button text="Apply" variant="outline" onClick={handleApplyPromo} />
          </div>
          {promoMessage && <p className={styles.promoMessage} role="status">{promoMessage}</p>}

          <div className={styles.totalPriceBox}>
            Total: <strong>{formatTenge(totalPrice)}</strong>
          </div>

          <form
            className={styles.bookingForm}
            onSubmit={(e) => {
              e.preventDefault();
              addToCart({
                ...car,
                days,
                selectedColor,
                customerName: customerName.trim(),
                customerPhone: customerPhone.trim(),
                bookingPricePerDay: car.pricePerDay * (1 - discount),
                quantity: 1,
              });
              onClose();
            }}
          >
            <input
              type="text"
              placeholder="Full Name"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              autoComplete="name"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              autoComplete="tel"
              required
            />
            <Button type="submit" text="Confirm Booking" variant="primary" />
          </form>
        </div>
      </div>
    </div>
  );
};