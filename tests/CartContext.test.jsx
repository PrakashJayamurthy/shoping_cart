import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../src/context/CartContext';
import useCart from '../src/hooks/UseCart';

function TestComponent({ product }) {
  const { cart, addToCart, removeOneFromCart, removeFromCart } = useCart();
  const item = cart[product.id];

  return (
    <div>
      <button onClick={() => addToCart(product)}>add</button>
      <button onClick={() => removeOneFromCart(product.id)}>removeOne</button>
      <button onClick={() => removeFromCart(product.id)}>removeAll</button>
      <div data-testid="quantity">{item?.quantity ?? 0}</div>
    </div>
  );
}

const sampleProduct = {
  id: 1,
  title: 'Test Product',
  price: 10,
};

describe('CartContext', () => {
  it('adds an item to the cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent product={sampleProduct} />
      </CartProvider>
    );

    const qtyEl = screen.getByTestId('quantity');

    expect(qtyEl).toHaveTextContent('0');
    await user.click(screen.getByText('add'));
    expect(qtyEl).toHaveTextContent('1');
  });

  it('increments quantity when adding same item again', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent product={sampleProduct} />
      </CartProvider>
    );

    const qtyEl = screen.getByTestId('quantity');

    await user.click(screen.getByText('add'));
    await user.click(screen.getByText('add'));
    expect(qtyEl).toHaveTextContent('2');
  });

  it('removes one from cart but not below 1', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent product={sampleProduct} />
      </CartProvider>
    );

    const qtyEl = screen.getByTestId('quantity');

    await user.click(screen.getByText('add'));
    await user.click(screen.getByText('add')); // quantity = 2
    await user.click(screen.getByText('removeOne'));
    expect(qtyEl).toHaveTextContent('1');

    // removing one more should keep at -1 to 0 
    await user.click(screen.getByText('removeOne'));
    await user.click(screen.getByText('removeOne'));
    expect(qtyEl).toHaveTextContent('0');
  });

  it('removes item from cart completely', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent product={sampleProduct} />
      </CartProvider>
    );

    const qtyEl = screen.getByTestId('quantity');

    await user.click(screen.getByText('add'));
    await user.click(screen.getByText('removeAll'));
    expect(qtyEl).toHaveTextContent('0');
  });
});
