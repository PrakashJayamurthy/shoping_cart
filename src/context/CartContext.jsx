import React, { createContext, useState, useCallback, useTransition } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [isPending, startTransition] = useTransition();

    const addToCart = useCallback((product) => {
    startTransition(() => {
      setCart(prevCart => {
        const quantity = prevCart[product.id]?.quantity || 0;
        return {
          ...prevCart,
          [product.id]: {
            ...product,
            quantity: quantity + 1
          }
        };
      });
    });
  }, []);
  // Remove one item from cart
  const removeOneFromCart = useCallback((productId) => {
    setCart(prevCart => {
      const item = prevCart[productId];
      if (!item) return prevCart;
      if (item.quantity <= 1) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      }
      return {
        ...prevCart,
        [productId]: {
          ...item,
          quantity: item.quantity - 1
        }
      };
    });
  }, []);
  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  }, []);
  const value = {
    cart,
    addToCart,
    removeFromCart,
    removeOneFromCart,
    isPending
  };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export {CartContext, CartProvider}
