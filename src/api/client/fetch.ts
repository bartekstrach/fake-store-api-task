import { normalizePath } from '@/utils';

const BASE_URL = import.meta.env.VITE_STORE_API_URL;

/**
 * Fetches data from the Fake Store API
 *
 * @template T - expected response type
 * @param {Object} params - fetch parameters
 * @param {string} params.path - API endpoint path (e.g., '/products', '/products/1')
 * @returns {Promise<T>} a promise that resolves to the parsed JSON response
 * @throws {Error} throws an error if the HTTP request fails or if JSON parsing fails
 *
 * @example
 * ```typescript
 *  // Fetch all products
 *  const products = await fakeStoreAPIFetch<Product[]>({ path: '/products' });
 *
 *  // Fetch a single product
 *  const product = await fakeStoreAPIFetch<Product>({ path: '/products/1' });
 * ```
 */
export const fakeStoreAPIFetch = async <T>({ path }: { path: string }): Promise<T> => {
    const normalizedPath = normalizePath(path);

    const res = await fetch(`${BASE_URL}${normalizedPath}`);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`[API Error] ${res.status}: ${text || res.statusText}`);
    }

    try {
        return await res.json();
    } catch (error) {
        throw new Error(`Failed to parse JSON response: ${error}`);
    }
};
