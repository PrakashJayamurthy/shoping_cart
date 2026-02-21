import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import { CartProvider } from '../src/context/CartContext';
import { BrowserRouter } from 'react-router-dom';

const mockProducts = [
  { id: 1, title: 'API Product 1', price: 10, description: 'desc', image: 'x' },
];

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading, then products after fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    render(
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    );

    // Initially shows loading
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();

    // After fetch resolves
    await waitFor(() => {
      expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument();
      expect(screen.getByText('API Product 1')).toBeInTheDocument();
    });
  });

  it('shows error on failed fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: () => Promise.resolve([]),
    });

    render(
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Error: Network response was not ok/i)
      ).toBeInTheDocument();
    });
  });
});
