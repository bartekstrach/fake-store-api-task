import { faker } from '@faker-js/faker';

import { Product, ProductAPI } from '@/types';

export const mockProduct = (overrides?: Partial<Product>): Product => ({
    id: faker.number.int({ min: 1, max: 10_000 }),
    category: faker.word.noun(),
    description: faker.word.words({ count: { min: 7, max: 10 } }),
    image: faker.image.url(),
    price: faker.number.float({ min: 1, max: 10_000, fractionDigits: 2 }),
    rating: {
        count: faker.number.int({ min: 1, max: 10_000 }),
        rate: faker.number.float({ min: 0, max: 5, fractionDigits: 2 }),
    },
    title: faker.word.words({ count: { min: 3, max: 5 } }),
    ...overrides,
});

export const mockProductList = (count: number = 10): Product[] =>
    Array.from({ length: count }, () => mockProduct());

export const mockProductAPI = (overrides?: Partial<ProductAPI>): ProductAPI => ({
    id: faker.number.int({ min: 1, max: 10_000 }),
    category: faker.word.noun(),
    description: faker.word.words({ count: { min: 7, max: 10 } }),
    image: faker.image.url(),
    price: faker.number.float({ min: 1, max: 10_000, fractionDigits: 2 }),
    rating: {
        count: faker.number.int({ min: 1, max: 10_000 }),
        rate: faker.number.float({ min: 0, max: 5, fractionDigits: 2 }),
    },
    title: faker.word.words({ count: { min: 3, max: 5 } }),
    ...overrides,
});

export const mockProductAPIList = (count: number = 10): ProductAPI[] =>
    Array.from({ length: count }, () => mockProductAPI());
