import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../src/context/CartContext';
import useCart from '../src/hooks/UseCart';
import Cart from '../src/components/cart/Cart';

const product = {
  id: 1,
  title: 'Test Product',
  price: 10,
  description: 'desc',
  image: 'https://example.com',
};

function AddPresetItem() {
  const { addToCart } = useCart();
  return <button onClick={() => addToCart(product)}>add</button>;
}

describe('Cart component', () => {
  it('shows "Your cart is empty" when no items', () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('shows items and total when items are present', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <AddPresetItem />
        <Cart />
      </CartProvider>
    );

    await user.click(screen.getByText('add'));

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    // total: 10.00
    expect(screen.getByText(/total: \$10\.00/i)).toBeInTheDocument();
  });

  it('removes item via remove button', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <AddPresetItem />
        <Cart />
      </CartProvider>
    );

    await user.click(screen.getByText('add'));

    const removeBtn = screen.getByRole('button', {
      name: /remove test product from cart/i,
    });

    await user.click(removeBtn);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
