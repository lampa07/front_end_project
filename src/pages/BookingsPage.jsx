import { Link } from 'react-router-dom';
import { Container } from '../components/Container/Container';
import { useCart } from '../context/useContexts';

export function BookingsPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalCount, totalPrice } = useCart();

  return (
    <Container>
      <section className="page-section">
        <h1>My bookings</h1>
        <p className="page-intro">Review your selected vehicles and rental periods.</p>
        {cartItems.length === 0 ? (
          <div className="status-card empty-state">
            <h2>No bookings yet</h2>
            <p>Choose a vehicle from the fleet to start a booking.</p>
            <Link className="primary-action" to="/">Browse vehicles</Link>
          </div>
        ) : (
          <>
            <ul className="booking-list">
              {cartItems.map((item) => {
                const price = item.bookingPricePerDay ?? item.pricePerDay ?? item.price ?? 0;
                const itemId = item.cartItemId ?? item.id;
                return (
                  <li className="booking-row" key={itemId}>
                    <img src={item.imageUrl} alt="" />
                    <div className="booking-info">
                      <h2>{item.title}</h2>
                      <p>${price.toFixed(2)} per day · {item.rentalDays} rental day(s) per car</p>
                    </div>
                    <div className="booking-quantity">
                      <button
                        type="button"
                        aria-label={`Remove one ${item.title} from bookings`}
                        onClick={() => updateQuantity(itemId, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{item.quantity} {item.quantity === 1 ? 'car' : 'cars'}</span>
                      <button
                        type="button"
                        aria-label={`Add one ${item.title} to bookings`}
                        onClick={() => updateQuantity(itemId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <strong>${(price * item.rentalDays * item.quantity).toFixed(2)}</strong>
                    <button className="text-button" type="button" onClick={() => removeFromCart(itemId)}>
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="booking-summary">
              <span>{totalCount} {totalCount === 1 ? 'booked car' : 'booked cars'}</span>
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
              <button className="text-button" type="button" onClick={clearCart}>Clear bookings</button>
            </div>
          </>
        )}
      </section>
    </Container>
  );
}
