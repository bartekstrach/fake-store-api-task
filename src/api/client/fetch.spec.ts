import { Product } from '@/types';
import { normalizePath } from '@/utils';

import { mockProductList } from '@test/mocks';
import { mockGet, mockGetEmpty, mockGetError } from '@test/utils';

import { fakeStoreAPIFetch } from './fetch';

vi.mock('@/utils');

describe('fakeStoreAPIFetch', () => {
    const path = '/path/to/products';

    beforeEach(() => {
        vi.mocked(normalizePath).mockImplementation(path => path);
    });

    it('returns products', async () => {
        const products = mockProductList(3);
        mockGet({ data: products, path });

        const result = await fakeStoreAPIFetch<Product[]>({ path });

        expect(result).toHaveLength(3);
        expect(result).toEqual(products);
    });

    it('handles error response', async () => {
        mockGetError({
            error: 'Service Unavailable',
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
        mockGetError({
            error: 'Products Not Found',
            options: {
                status: 404,
            },
            path,
        });

        await expect(fakeStoreAPIFetch<Product>({ path })).rejects.toThrow(
            '[API Error] 404: Products Not Found'
        );
    });

    it('handles error response with a default error message when the custom one is not provided', async () => {
        mockGetError({
            error: '',
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
        mockGetEmpty({ path });

        const result = await fakeStoreAPIFetch<Product[]>({ path });

        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
    });

    it('handles slow response', async () => {
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
        const products = mockProductList(3);
        mockGet({ data: products, options: { status: 201 }, path });

        const result = await fakeStoreAPIFetch<Product>({ path });

        expect(result).toHaveLength(3);
        expect(result).toEqual(products);
    });

    it('handles invalid JSON response', async () => {
        mockGetError({
            error: 'Not a JSON',
            options: { status: 200 },
            path,
        });

        await expect(fakeStoreAPIFetch<Product>({ path })).rejects.toThrow(
            '[Parse] Invalid JSON: Unexpected token \'N\', "Not a JSON" is not valid JSON'
        );
    });

    it('handles network errors', async () => {
        const typeError = new TypeError('Failed to fetch');
        mockGetError({
            error: typeError,
            path,
        });

        await expect(fakeStoreAPIFetch<Product[]>({ path })).rejects.toThrow(
            '[Fetch] Failed to fetch'
        );
    });
});
