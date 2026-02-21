import React from "react";
import useCart from '../../hooks/UseCart';
import { Link } from "react-router-dom";

export default function Header() {
  const { cart } = useCart();
  const cartCount = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__logo">
          <Link to="/" aria-label="Home">
            <img
              width="149"
              height="39"
              src="https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg"
              alt="Equal Experts"
              decoding="async"
            />
          </Link>
        </div>
        <div className="header__right">
          <Link
            to="/cart"
            className="header__cart-link"
            aria-label="View cart"
          >
            <span className="cart-icon" role="img" aria-label="cart">
              🛒
            </span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
