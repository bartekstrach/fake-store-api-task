export const formatPrice = (price: number | undefined, currency: string = 'PLN'): string => {
    if (price === undefined) {
        return `- ${currency}`;
    }

    if (price === 0) {
        return `0.00 ${currency}`;
    }

    return `${price.toFixed(2)} ${currency}`;
};
