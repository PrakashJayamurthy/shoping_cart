import React from "react";
import ProductList from "../components/product/ProductList";

export default function ProductPage({ products, loading, error }) {
  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return <ProductList products={products} />;
}
