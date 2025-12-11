import { fakeStoreAPIFetch } from '@/api/client/fetch';
import { Product, ProductAPI } from '@/types';

import { mapProductAPItoProduct } from './mappers';

/**
 * Fetches all products from the Fake Store API
 *
 * @returns {Promise<Product[]>} a promise that resolves to an array of mapped Product objects
 * @throws {Error} throws an error if the API request fails or if data mapping fails
 *
 * @example
 * ```typescript
 * const products = await getProducts();
 * console.log(products); // [{ id: 1, title: '...', price: 109.95, ... }, ...]
 * ```
 */
export const getProducts = async (): Promise<Product[]> => {
    const products = await fakeStoreAPIFetch<ProductAPI[]>({ path: '/products' });
    return products.map(mapProductAPItoProduct);
};
