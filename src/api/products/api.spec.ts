import { mockProductAPI } from '@test/mocks';
import { mockGet } from '@test/utils';

import { getProducts } from './api';

describe('getProducts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetches and maps products', async () => {
        const mockAPIResponse = [
            mockProductAPI({
                id: 1,
                category: 'Electronics',
                description: 'A high-quality product',
                image: 'https://imag.es/product-name.png',
                price: 999.99,
                rating: { count: 150, rate: 4.5 },
                title: 'Product Name',
            }),
            mockProductAPI({
                id: 2,
                category: undefined,
                description: undefined,
                image: undefined,
                price: undefined,
                rating: undefined,
                title: 'Product with multiple undefined fields',
            }),
        ];

        mockGet({
            path: '/products',
            data: mockAPIResponse,
        });

        const result = await getProducts();

        expect(result).toHaveLength(2);

        expect(result[0]).toEqual({
            id: 1,
            category: 'Electronics',
            description: 'A high-quality product',
            image: 'https://imag.es/product-name.png',
            price: 999.99,
            rating: { count: 150, rate: 4.5 },
            title: 'Product Name',
        });

        expect(result[1]).toEqual({
            id: 2,
            category: undefined,
            description: undefined,
            image: undefined,
            price: undefined,
            rating: undefined,
            title: 'Product with multiple undefined fields',
        });
    });
});
