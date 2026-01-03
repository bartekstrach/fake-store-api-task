import { faker } from '@faker-js/faker';

import { CartItem } from '@/types';

import { mockProduct } from './products';

export const mockCartItem = (overrides?: Partial<CartItem>): CartItem => ({
    product: mockProduct(),
    quantity: faker.number.int({ min: 1, max: 10_000 }),
    ...overrides,
});

export const mockCartItemList = (count: number = 10): CartItem[] =>
    Array.from({ length: count }, () => mockCartItem());
