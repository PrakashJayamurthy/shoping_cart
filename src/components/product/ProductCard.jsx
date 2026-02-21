import React, { useState } from "react";
import useCart from '../../hooks/UseCart';

function ProductCard({ product }) {
  const { cart, addToCart, removeOneFromCart, isPending } = useCart();
  const quantity = cart[product.id]?.quantity || 0;
  const [showFullDesc, setShowFullDesc] = useState(false);

  const MAX_DESC_LENGTH = 120;
  const isLong = product.description.length > MAX_DESC_LENGTH;

  return (
    <article className="product-card" aria-label={product.title}>
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p
          className={`product-description${
            showFullDesc ? " expanded" : ""
          }`}
        >
          {showFullDesc || !isLong
            ? product.description
            : product.description.slice(0, MAX_DESC_LENGTH) + "..."}
        </p>
        {isLong && (
          <button
            className="desc-toggle"
            onClick={() => setShowFullDesc((v) => !v)}
            aria-label={showFullDesc ? "Show less" : "Show more"}
          >
            {showFullDesc ? "Show less" : "Show more"}
          </button>
        )}
      </div>
      <div className="product-card-footer">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            aria-label={`Remove one ${product.title}`}
            onClick={() => removeOneFromCart(product.id)}
            disabled={quantity === 0 || isPending}
          >
            -
          </button>
          <span className="quantity-value" aria-label="Quantity">
            {quantity}
          </span>
          <button
            className="quantity-btn"
            aria-label={`Add one ${product.title}`}
            onClick={() => addToCart(product)}
            disabled={isPending}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
