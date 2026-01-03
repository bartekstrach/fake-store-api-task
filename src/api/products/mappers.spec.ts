import { mockProductAPI } from '@test/mocks';

import { PRODUCT_DEFAULTS } from './constants';
import { mapProductAPItoProduct } from './mappers';

describe('mapProductAPItoProduct', () => {
    describe('complete data', () => {
        it('maps all fields correctly when provided', () => {
            const productAPI = mockProductAPI({
                id: 1,
                category: 'Electronics',
                description: 'A high-quality product',
                image: 'https://imag.es/product-name.png',
                price: 299.99,
                rating: { count: 100, rate: 4.5 },
                title: 'Product Name',
            });

            const result = mapProductAPItoProduct(productAPI);

            expect(result).toEqual({
                id: 1,
                category: 'Electronics',
                description: 'A high-quality product',
                image: 'https://imag.es/product-name.png',
                price: 299.99,
                rating: { count: 100, rate: 4.5 },
                title: 'Product Name',
            });
        });
    });

    describe('missing optional fields', () => {
        it('preserves undefined for category, description, image, price and rating', () => {
            const productAPI = mockProductAPI({
                id: 1,
                category: undefined,
                description: undefined,
                image: undefined,
                price: undefined,
                rating: undefined,
                title: 'Product Name',
            });

            const result = mapProductAPItoProduct(productAPI);

            expect(result).toEqual({
                id: 1,
                category: undefined,
                description: undefined,
                image: undefined,
                price: undefined,
                rating: undefined,
                title: 'Product Name',
            });
        });
    });

    describe('rating defaults', () => {
        it('applies default count when rating exists but count is missing', () => {
            const productAPI = mockProductAPI({
                id: 1,
                title: 'Product Name',
                rating: { rate: 4.5 },
            });

            const result = mapProductAPItoProduct(productAPI);

            expect(result.rating?.count).toBe(PRODUCT_DEFAULTS.RATING_COUNT);
            expect(result.rating?.rate).toBe(4.5);
        });

        it('applies default rate when rating exists but rate is missing', () => {
            const productAPI = mockProductAPI({
                id: 1,
                title: 'Product Name',
                rating: { count: 100 },
            });

            const result = mapProductAPItoProduct(productAPI);

            expect(result.rating?.count).toBe(100);
            expect(result.rating?.rate).toBe(PRODUCT_DEFAULTS.RATING_RATE);
        });
    });

    describe('edge cases', () => {
        it('applies default title when missing', () => {
            const productAPI = mockProductAPI({
                id: 1,
                title: undefined,
            });

            const result = mapProductAPItoProduct(productAPI);

            expect(result.title).toBe(PRODUCT_DEFAULTS.TITLE);
        });

        it('applies default title when empty string is provided', () => {
            const productAPI = mockProductAPI({
                id: 1,
                title: '',
            });

            const result = mapProductAPItoProduct(productAPI);

            expect(result.title).toBe(PRODUCT_DEFAULTS.TITLE);
        });

        it('handles zero values in rating correctly', () => {
            const productAPI = mockProductAPI({
                id: 1,
                rating: { count: 0, rate: 0 },
                title: 'Product Name',
            });

            const result = mapProductAPItoProduct(productAPI);

            expect(result.rating).toEqual({ count: 0, rate: 0 });
        });

        it('capitalizes first character of category and keeps remaining characters lowercased', () => {
            const productAPI = mockProductAPI({
                id: 1,
                category: 'clothing & ELECTROnics',
            });

            const result = mapProductAPItoProduct(productAPI);

            expect(result.category).toBe('Clothing & electronics');
        });
    });
});
