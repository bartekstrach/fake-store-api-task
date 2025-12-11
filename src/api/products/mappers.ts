import { Product, ProductAPI } from '@/types';

import { PRODUCT_DEFAULTS } from './constants';

/**
 * Maps a ProductAPI object to a Product object
 *
 * Transforms the raw API response into the application's internal Product type,
 * applying default values where necessary and normalizing the rating structure.
 *
 * @param {ProductAPI} productAPI - the raw product data from the API
 * @returns {Product} the mapped Product object with normalized fields
 *
 * @example
 * ```typescript
 * const apiProduct = {
 *   id: 1,
 *   title: 'Product Name',
 *   price: 29.99,
 *   category: 'electronics',
 *   description: 'Description',
 *   image: 'https://...',
 *   rating: { rate: 4.5, count: 120 }
 * };
 *
 * const product = mapProductAPItoProduct(apiProduct);
 * // { id: 1, title: 'Product Name', price: 29.99, ... }
 * ```
 */
export const mapProductAPItoProduct = (productAPI: ProductAPI): Product => ({
    id: productAPI.id,
    category: productAPI.category,
    description: productAPI.description,
    image: productAPI.image,
    price: productAPI.price,
    rating: productAPI.rating
        ? {
              count: productAPI.rating.count ?? PRODUCT_DEFAULTS.RATING_COUNT,
              rate: productAPI.rating.rate ?? PRODUCT_DEFAULTS.RATING_RATE,
          }
        : undefined,
    title: productAPI.title || PRODUCT_DEFAULTS.TITLE,
});
