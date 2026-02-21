import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

import './styles/index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://equalexperts.github.io/frontend-take-home-test-data/products.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-bg">
      <Header />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <ProductPage products={products} loading={loading} error={error} />
            }
          />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
