import { describe, it, expect } from 'vitest';

import { mockProduct, mockCartItem } from '@test/mocks';

import useCartHelpers from './helpers';

describe('useCart helpers', () => {
    describe('addOrUpdateItem', () => {
        it('adds a new item when product is not in cart', () => {
            const cart = [mockCartItem({ product: mockProduct({ id: 123 }) })];
            const newProduct = mockProduct({ id: 999999 });

            const newCart = useCartHelpers.addOrUpdateItem({
                cart,
                product: newProduct,
                quantity: 2,
            });

            expect(newCart).toHaveLength(2);
            expect(newCart.find(i => i.product.id === newProduct.id)?.quantity).toBe(2);
        });

        it('updates quantity when product already exists', () => {
            const product = mockProduct({ id: 123 });
            const cart = [mockCartItem({ product, quantity: 5 })];

            const newCart = useCartHelpers.addOrUpdateItem({ cart, product, quantity: 3 });

            expect(newCart).toHaveLength(1);
            expect(newCart[0].quantity).toBe(8);
        });
    });

    describe('removeItem', () => {
        it('removes an item by productId', () => {
            const product = mockProduct({ id: 10 });
            const cart = [mockCartItem({ product }), mockCartItem(), mockCartItem()];

            const newCart = useCartHelpers.removeItem({ cart, productId: 10 });

            expect(newCart).toHaveLength(2);
            expect(newCart.some(i => i.product.id === 10)).toBe(false);
        });

        it('returns the same array if product does not exist', () => {
            const cart = [mockCartItem({ product: mockProduct({ id: 123 }) })];

            const newCart = useCartHelpers.removeItem({ cart, productId: 999999 });

            expect(newCart).toHaveLength(1);
        });
    });

    describe('updateItemQuantity', () => {
        it('updates the quantity of an existing item', () => {
            const product = mockProduct({ id: 1 });
            const cart = [mockCartItem({ product, quantity: 3 })];

            const newCart = useCartHelpers.updateItemQuantity({ cart, productId: 1, quantity: 10 });

            expect(newCart[0].quantity).toBe(10);
        });

        it('removes the item when quantity < 1', () => {
            const product = mockProduct({ id: 5 });
            const cart = [mockCartItem({ product })];

            const newCart = useCartHelpers.updateItemQuantity({ cart, productId: 5, quantity: 0 });

            expect(newCart).toHaveLength(0);
        });

        it('returns same cart if product not found', () => {
            const cart = [mockCartItem({ product: mockProduct({ id: 123 }) })];

            const result = useCartHelpers.updateItemQuantity({
                cart,
                productId: 999999,
                quantity: 5,
            });

            expect(result).toHaveLength(1);
            expect(result).toEqual(cart);
        });
    });

    describe('incrementItemQuantity', () => {
        it('increments the quantity of an existing item', () => {
            const product = mockProduct({ id: 2 });
            const cart = [mockCartItem({ product, quantity: 5 })];

            const newCart = useCartHelpers.incrementItemQuantity({ cart, productId: 2 });

            expect(newCart[0].quantity).toBe(6);
        });

        it('returns same cart when item not found', () => {
            const cart = [mockCartItem({ product: mockProduct({ id: 123 }) })];

            const result = useCartHelpers.incrementItemQuantity({ cart, productId: 999999 });

            expect(result).toEqual(cart);
        });
    });

    describe('decrementItemQuantity', () => {
        it('decrements the quantity of an existing item', () => {
            const product = mockProduct({ id: 3 });
            const cart = [mockCartItem({ product, quantity: 5 })];

            const newCart = useCartHelpers.decrementItemQuantity({ cart, productId: 3 });

            expect(newCart[0].quantity).toBe(4);
        });

        it('removes the item when quantity is 1', () => {
            const product = mockProduct({ id: 4 });
            const cart = [mockCartItem({ product, quantity: 1 })];

            const newCart = useCartHelpers.decrementItemQuantity({ cart, productId: 4 });

            expect(newCart).toHaveLength(0);
        });

        it('returns same cart if item does not exist', () => {
            const cart = [mockCartItem({ product: mockProduct({ id: 123 }) })];

            const newCart = useCartHelpers.decrementItemQuantity({ cart, productId: 99999 });

            expect(newCart).toEqual(cart);
        });
    });

    describe('getItemQuantity', () => {
        it('returns quantity when item exists', () => {
            const product = mockProduct({ id: 77 });
            const cart = [mockCartItem({ product, quantity: 15 })];

            expect(useCartHelpers.getItemQuantity({ cart, productId: 77 })).toBe(15);
        });

        it('returns 0 for missing item', () => {
            const cart = [mockCartItem({ product: mockProduct({ id: 123 }) })];

            expect(useCartHelpers.getItemQuantity({ cart, productId: 999999 })).toBe(0);
        });
    });

    describe('getTotalPrice', () => {
        it('calculates total price correctly', () => {
            const productA = mockProduct({ price: 10 });
            const productB = mockProduct({ price: 5 });

            const cart = [
                mockCartItem({ product: productA, quantity: 3 }), // 30
                mockCartItem({ product: productB, quantity: 4 }), // 20
            ];

            expect(useCartHelpers.getTotalPrice({ cart })).toBe(50);
        });

        it('uses price 0 when product has no price', () => {
            const product = mockProduct({ price: undefined });
            const cart = [mockCartItem({ product, quantity: 10 })];

            expect(useCartHelpers.getTotalPrice({ cart })).toBe(0);
        });

        it('returns 0 for empty cart', () => {
            expect(useCartHelpers.getTotalPrice({ cart: [] })).toBe(0);
        });
    });
});
