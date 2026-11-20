import { useCallback, useEffect, useMemo, useState } from 'react';
import { FavoritesContext } from './contexts';

function readSavedArray(key) {
  try {
    const savedValue = localStorage.getItem(key);
    const parsedValue = savedValue ? JSON.parse(savedValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

function readSavedCart() {
  return readSavedArray('cartItems').map((item) => {
    const legacyDays = item.rentalDays ?? item.days ?? item.quantity ?? 1;
    return {
      ...item,
      quantity: item.rentalDays === undefined ? 1 : Math.max(1, Number(item.quantity) || 1),
      rentalDays: Math.max(1, Math.floor(Number(legacyDays)) || 1),
    };
  });
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readSavedArray('favorites'));
  const [cartItems, setCartItems] = useState(readSavedCart);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleFavorite = useCallback((carId) => {
    const isRemoving = favorites.includes(carId);
    setToastMessage(isRemoving ? 'Removed from favorites' : 'Added to favorites!');
    setFavorites((previous) =>
      previous.includes(carId)
        ? previous.filter((id) => id !== carId)
        : [...previous, carId]
    );
  }, [favorites]);

  const addToCart = useCallback((item) => {
    const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
    const rentalDays = Math.max(1, Math.floor(Number(item.rentalDays ?? item.days ?? 1)) || 1);
    const bookingPricePerDay = Number(
      item.bookingPricePerDay ?? item.pricePerDay ?? item.price ?? 0
    );
    setCartItems((previous) => {
      const existingItem = previous.find((cartItem) =>
        cartItem.id === item.id &&
        cartItem.rentalDays === rentalDays &&
        Number(cartItem.bookingPricePerDay ?? cartItem.pricePerDay ?? cartItem.price ?? 0) === bookingPricePerDay
      );
      if (existingItem) {
        return previous.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.rentalDays === rentalDays &&
          Number(cartItem.bookingPricePerDay ?? cartItem.pricePerDay ?? cartItem.price ?? 0) === bookingPricePerDay
            ? {
              ...cartItem,
              cartItemId: cartItem.cartItemId ?? `${item.id}:${bookingPricePerDay}:${rentalDays}`,
              quantity: cartItem.quantity + quantity,
            }
            : cartItem
        );
      }
      return [...previous, {
        ...item,
        cartItemId: `${item.id}:${bookingPricePerDay}:${rentalDays}`,
        bookingPricePerDay,
        quantity,
        rentalDays,
      }];
    });
    setToastMessage('Booking added');
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((previous) => previous.filter((item) =>
      item.cartItemId ? item.cartItemId !== itemId : item.id !== itemId
    ));
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    const quantity = Math.floor(Number(newQuantity));
    setCartItems((previous) => quantity > 0
      ? previous.map((item) =>
        (item.cartItemId ? item.cartItemId === itemId : item.id === itemId)
          ? { ...item, quantity }
          : item
      )
      : previous.filter((item) => item.cartItemId ? item.cartItemId !== itemId : item.id !== itemId)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);
  const clearToast = useCallback(() => setToastMessage(null), []);
  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + (
      (item.bookingPricePerDay ?? item.pricePerDay ?? item.price ?? 0) *
      item.rentalDays *
      item.quantity
    ),
    0
  );
  const contextValue = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalCount,
      totalPrice,
      toastMessage,
      clearToast,
    }),
    [
      favorites,
      toggleFavorite,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalCount,
      totalPrice,
      toastMessage,
      clearToast,
    ]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}
