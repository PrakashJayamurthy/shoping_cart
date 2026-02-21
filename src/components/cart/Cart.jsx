import React, { useMemo } from 'react';
import useCart from '../../hooks/UseCart'; // Update the import path

function Cart() {
  const { cart, addToCart, removeOneFromCart, removeFromCart } = useCart();
  const cartItems = Object.values(cart);

  // Memoize total calculation
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <aside className="cart" aria-label="Shopping Cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 500 }}>{item.title}</span>
                <div style={{ fontSize: '0.95em', color: '#666' }}>
                  ${item.price.toFixed(2)} each
                </div>
              </div>
              <div className="cart-quantity-controls">
                <button
                  className="quantity-btn"
                  aria-label={`Remove one ${item.title}`}
                  onClick={() => removeOneFromCart(item.id)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  aria-label={`Add one ${item.title}`}
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <button
                  className="remove-btn"
                  aria-label={`Remove ${item.title} from cart`}
                  onClick={() => removeFromCart(item.id)}
                  title="Remove from cart"
                >
                  🗑️
                </button>
              </div>
              <span style={{ minWidth: 60, textAlign: 'right', fontWeight: 500 }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </aside>
  );
}

export default React.memo(Cart);
