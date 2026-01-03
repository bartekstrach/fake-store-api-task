import { act } from '@testing-library/react';

import { CART_STORAGE_KEY } from '@/constants';

import { mockProduct } from '@test/mocks';
import { renderHook } from '@test/test-utils';

import { useCart } from './hook';

beforeEach(() => {
    localStorage.clear();
});

describe('useCart', () => {
    it('starts with empty cart if no local storage data', () => {
        const { result } = renderHook(() => useCart());

        expect(result.current.cart).toEqual([]);
    });

    it('adds a product to the cart and persists it', () => {
        const { result, rerender } = renderHook(() => useCart());
        const product = mockProduct();

        act(() => {
            result.current.addToCart({ product, quantity: 3 });
        });

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0].product.id).toBe(product.id);
        expect(result.current.cart[0].quantity).toBe(3);

        // local storage should contain serialized cart
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        expect(stored).not.toBeNull();

        const parsed = stored ? JSON.parse(stored) : null;
        expect(parsed).toHaveLength(1);
        expect(parsed[0].product.id).toBe(product.id);
        expect(parsed[0].quantity).toBe(3);

        // rerender hook to simulate component remount, cart should persist
        rerender();

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0].product.id).toBe(product.id);
    });

    it('increments and decrements item quantity correctly', () => {
        const { result } = renderHook(() => useCart());
        const product = mockProduct();

        act(() => {
            result.current.addToCart({ product, quantity: 1 });
        });

        expect(result.current.getItemQuantity({ productId: product.id })).toBe(1);

        act(() => {
            result.current.incrementQuantity({ productId: product.id });
        });
        expect(result.current.getItemQuantity({ productId: product.id })).toBe(2);

        act(() => {
            result.current.decrementQuantity({ productId: product.id });
        });
        expect(result.current.getItemQuantity({ productId: product.id })).toBe(1);

        // decrementing from 1 should remove the item
        act(() => {
            result.current.decrementQuantity({ productId: product.id });
        });
        expect(result.current.getItemQuantity({ productId: product.id })).toBe(0);
        expect(result.current.cart).toHaveLength(0);
    });

    it('updates item quantity directly', () => {
        const { result } = renderHook(() => useCart());
        const product = mockProduct();

        act(() => {
            result.current.addToCart({ product, quantity: 5 });
        });

        act(() => {
            result.current.updateQuantity({ productId: product.id, quantity: 10 });
        });

        expect(result.current.getItemQuantity({ productId: product.id })).toBe(10);
    });

    it('removes item from cart', () => {
        const { result } = renderHook(() => useCart());
        const product = mockProduct();

        act(() => {
            result.current.addToCart({ product, quantity: 2 });
        });

        act(() => {
            result.current.removeFromCart({ productId: product.id });
        });

        expect(result.current.getItemQuantity({ productId: product.id })).toBe(0);
        expect(result.current.cart).toHaveLength(0);
    });

    it('clears the cart', () => {
        const { result } = renderHook(() => useCart());
        const product1 = mockProduct();
        const product2 = mockProduct();

        act(() => {
            result.current.addToCart({ product: product1 });
            result.current.addToCart({ product: product2 });
        });

        expect(result.current.cart.length).toBe(2);

        act(() => {
            result.current.clearCart();
        });

        expect(result.current.cart).toHaveLength(0);
        expect(localStorage.getItem(CART_STORAGE_KEY)).toBeNull();
    });

    it('calculates total price correctly', () => {
        const { result } = renderHook(() => useCart());
        const product1 = mockProduct({ price: 10 });
        const product2 = mockProduct({ price: 20 });

        act(() => {
            result.current.addToCart({ product: product1, quantity: 2 }); // 20
            result.current.addToCart({ product: product2, quantity: 3 }); // 60
        });

        expect(result.current.getTotalPrice()).toBeCloseTo(80, 2);
    });

    it('calculates total items count correctly', () => {
        const { result } = renderHook(() => useCart());
        const product1 = mockProduct();
        const product2 = mockProduct();

        act(() => {
            result.current.addToCart({ product: product1, quantity: 2 });
            result.current.addToCart({ product: product2, quantity: 3 });
        });

        expect(result.current.getTotalItemsCount()).toBe(5);
    });
});
