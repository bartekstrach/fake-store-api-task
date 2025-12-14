import { DEFAULT_CURRENCY, PRICE_DECIMAL_PLACES } from '@/constants';

/**
 * Formats a price number with fixed decimal places and appends a currency symbol:
 * - if the price is undefined, returns a placeholder with the currency
 * - if the price is zero, returns "0.00" with the currency
 * - otherwise, formats the price with a fixed number of decimals
 *
 * Examples:
 *  - undefined, 'USD' => '- USD'
 *  - 0, 'EUR' => '0.00 EUR'
 *  - 12.3456, 'USD' => '12.35 USD' (assuming 2 decimal places)
 *
 * @param {number | undefined} price - price value to format
 * @param {string} currency - currency symbol to append
 *
 * @returns {string} the formatted price string
 */
export const formatPrice = (
    price: number | undefined,
    currency: string = DEFAULT_CURRENCY
): string => {
    if (price === undefined) {
        return `- ${currency}`;
    }

    if (price === 0) {
        return `0.00 ${currency}`;
    }

    return `${price.toFixed(PRICE_DECIMAL_PLACES)} ${currency}`;
};
