import { formatPrice } from './price';

describe('formatPrice', () => {
    it('returns "-" when price is undefined', () => {
        expect(formatPrice(undefined, 'CNY')).toBe('- CNY');
    });

    it('returns "0.00" when price is 0', () => {
        expect(formatPrice(0, 'PLN')).toBe('0.00 PLN');
    });

    it('returns the price formatted with 2 decimal places and currency when price is a positive number', () => {
        expect(formatPrice(100, 'AUD')).toBe('100.00 AUD');
        expect(formatPrice(100.5, 'EUR')).toBe('100.50 EUR');
        expect(formatPrice(100.123, 'USD')).toBe('100.12 USD'); // it should round to two decimals
    });

    it('returns the price formatted with 2 decimal places and currency when price is a negative number', () => {
        expect(formatPrice(-100, 'AUD')).toBe('-100.00 AUD');
        expect(formatPrice(-100.5, 'EUR')).toBe('-100.50 EUR');
        expect(formatPrice(-100.123, 'USD')).toBe('-100.12 USD'); // it should round to two decimals
    });

    it('returns PLN currency as a default when none provided', () => {
        expect(formatPrice(100)).toBe('100.00 PLN');
    });
});
