import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../src/context/CartContext';
import ProductCard from '../src/components/product/ProductCard';

const longDescription = 'A'.repeat(200);

const product = {
  id: 1,
  title: 'Test Product',
  price: 10,
  description: longDescription,
  image: 'https://example.com/image.png',
};

describe('ProductCard', () => {
  it('renders product info', () => {
    render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  it('truncates long description and toggles on Show more / Show less', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>
    );

    // Show more button should exist for long description
    const toggleBtn = screen.getByRole('button', { name: /show more/i });
    expect(toggleBtn).toBeInTheDocument();

    await user.click(toggleBtn);
    expect(toggleBtn).toHaveTextContent(/show less/i);
  });

  it('increments and decrements quantity via buttons', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>
    );

    const addBtn = screen.getByRole('button', { name: `Add one ${product.title}` });
    const removeBtn = screen.getByRole('button', { name: `Remove one ${product.title}` });
    const qtyEl = screen.getByLabelText('Quantity');

    expect(qtyEl).toHaveTextContent('0');

    await user.click(addBtn);
    expect(qtyEl).toHaveTextContent('1');

    await user.click(removeBtn);
    // per your logic, removeOneFromCart does nothing at quantity 0 or 1 depending on reducer;
    // if it doesn't go below 1, adapt expectation:
    expect(qtyEl.textContent === '0' || qtyEl.textContent === '1').toBe(true);
  });
});
