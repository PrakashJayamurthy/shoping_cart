import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../src/context/CartContext';
import useCart from '../src/hooks/UseCart';
import Header from '../src/components/layout/Header';

function AddItemButton({ product }) {
  const { addToCart } = useCart();
  return <button onClick={() => addToCart(product)}>add</button>;
}

const product = {
  id: 1,
  title: 'Test Product',
  price: 10,
};

describe('Header', () => {
  it('shows cart count badge when items are added', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <CartProvider>
          <Header />
          <AddItemButton product={product} />
        </CartProvider>
      </BrowserRouter>
    );

    // initially no badge
    expect(screen.queryByText('1')).not.toBeInTheDocument();

    await user.click(screen.getByText('add'));

    // now badge should appear with quantity
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('has a link to /cart', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </BrowserRouter>
    );

    const cartLink = screen.getByRole('link', { name: /view cart/i });
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
});
