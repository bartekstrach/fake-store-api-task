import { useQuery } from '@tanstack/react-query';

import { getProducts } from './api';
import { PRODUCT_QUERY_KEYS } from '../constants';

/**
 * React Query hook for fetching products
 *
 * Provides a cached, reactive query for fetching all products from the Fake Store API.
 * Handles loading states, error states, and automatic refetching based on React Query's
 * default configuration.
 *
 * @returns {UseQueryResult<Product[], Error>} React Query result object containing:
 *   - data: array of Product objects (undefined while loading)
 *   - isLoading: boolean indicating if the initial fetch is in progress
 *   - isError: boolean indicating if an error occurred
 *   - error: Error object if the request failed
 *   - refetch: function to manually trigger a refetch
 *   - and other React Query result properties
 *
 * @example
 * ```typescript
 * function ProductList() {
 *   const { data: products, isLoading, isError, error } = useProducts();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (isError) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <ul>
 *       {products?.map(product => (
 *         <li key={product.id}>{product.title}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export const useProducts = () =>
    useQuery({
        queryKey: PRODUCT_QUERY_KEYS.PRODUCTS,
        queryFn: () => getProducts(),
    });
