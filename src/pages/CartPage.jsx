import React from "react";
import Cart from "../components/cart/Cart";
import { Link } from "react-router-dom";

export default function CartPage() {
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <Cart />
      <Link to="/" className="back-to-shop">
        ← Back to Shop
      </Link>
    </div>
  );
}
