import { Product } from '@/types';
import { normalizePath } from '@/utils';

import { mockProductList } from '@test/mocks';
import { mockGet, mockGetEmpty, mockGetError } from '@test/utils';

import { fakeStoreAPIFetch } from './fetch';

vi.mock('@/utils');

describe('fakeStoreAPIFetch', () => {
    it('returns products', async () => {
        const path = '/path/to/products';
        vi.mocked(normalizePath).mockReturnValue(path);

        const products = mockProductList(3);
        mockGet({ data: products, path });

        const result = await fakeStoreAPIFetch<Product[]>({ path });

        expect(result).toHaveLength(3);
        expect(result).toEqual(products);
    });

    it('handles error response', async () => {
        const path = '/path/to/products';
        vi.mocked(normalizePath).mockReturnValue(path);

        mockGetError({
            message: 'Service Unavailable',
            options: {
                status: 503,
            },
            path,
        });

        await expect(fakeStoreAPIFetch<Product[]>({ path })).rejects.toThrow(
            '[API Error] 503: Service Unavailable'
        );
    });

    it('handles not found error', async () => {
        const path = '/path/to/products';
        vi.mocked(normalizePath).mockReturnValue(path);

        mockGetError({
            message: 'Products Not Found',
            options: {
                status: 404,
            },
            path,
        });

        await expect(fakeStoreAPIFetch<Product>({ path })).rejects.toThrow(
            '[API Error] 404: Products Not Found'
        );
    });

    it('handles error response with a standard status code error message when the custom one is not provided', async () => {
        const path = '/path/to/products';
        vi.mocked(normalizePath).mockReturnValue(path);

        mockGetError({
            message: '',
            options: {
                status: 401,
            },
            path,
        });

        await expect(fakeStoreAPIFetch<Product>({ path })).rejects.toThrow(
            '[API Error] 401: Unauthorized'
        );
    });

    it('handles empty response', async () => {
        const path = '/path/to/products';
        vi.mocked(normalizePath).mockReturnValue(path);

        mockGetEmpty({ path });

        const result = await fakeStoreAPIFetch<Product[]>({ path });

        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
    });

    it('handles slow response', async () => {
        const path = '/path/to/products';
        vi.mocked(normalizePath).mockReturnValue(path);

        const products = mockProductList(3);
        mockGet({
            data: products,
            options: { delay: 2000 },
            path,
        });

        const result = await fakeStoreAPIFetch<Product[]>({ path });

        expect(result).toHaveLength(3);
        expect(result).toEqual(products);
    });

    it('handles custom status code', async () => {
        const path = '/path/to/products';
        vi.mocked(normalizePath).mockReturnValue(path);

        const products = mockProductList(3);
        mockGet({ data: products, options: { status: 201 }, path });

        const result = await fakeStoreAPIFetch<Product>({ path });

        expect(result).toHaveLength(3);
        expect(result).toEqual(products);
    });

    it('handles invalid JSON response', async () => {
        const path = '/path/to/products';
        vi.mocked(normalizePath).mockReturnValue(path);

        mockGetError({
            message: 'Not a JSON',
            options: { status: 200 },
            path,
        });

        await expect(fakeStoreAPIFetch<Product>({ path })).rejects.toThrow(
            'Failed to parse JSON response: SyntaxError: Unexpected token \'N\', "Not a JSON" is not valid JSON'
        );
    });
});
