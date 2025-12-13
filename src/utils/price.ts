import { DEFAULT_CURRENCY, PRICE_DECIMAL_PLACES } from '@/constants';

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
