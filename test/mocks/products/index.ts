import { faker } from '@faker-js/faker';

// TODO: update once types are known
type Product = { id: string };
export const mockProduct = (overrides?: Partial<Product>): Product => ({
    id: faker.string.uuid(),
    ...overrides,
});
