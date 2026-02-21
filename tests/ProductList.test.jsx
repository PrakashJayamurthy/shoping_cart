import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../src/context/CartContext';
import ProductList from '../src/components/product/ProductList';

const products = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  price: 10,
  description: 'desc',
  image: 'https://example.com/img.png',
}));

describe('ProductList', () => {
  it('shows first page products', () => {
    render(
      <CartProvider>
        <ProductList products={products} />
      </CartProvider>
    );

    // PAGE_SIZE=8 → first 8 products
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 8')).toBeInTheDocument();
    expect(screen.queryByText('Product 9')).not.toBeInTheDocument();
  });

  it('navigates to next page', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <ProductList products={products} />
      </CartProvider>
    );

    const nextBtn = screen.getByRole('button', { name: /next page/i });
    await user.click(nextBtn);

    // Now page 2 (products 7-10)
    expect(screen.getByText('Product 9')).toBeInTheDocument();
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });

  it('shows page buttons and highlights active page', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <ProductList products={products} />
      </CartProvider>
    );

    // totalPages = 2 for 10 items with PAGE_SIZE=6
    const page2 = screen.getByRole('button', { name: '2' });
    await user.click(page2);
    expect(page2).toHaveClass('active');
  });
});
