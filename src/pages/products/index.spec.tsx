import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';

import { useCartContext } from '@/hooks';
import { Product } from '@/types';

import { addProductToCart } from '@test/helpers';
import { mockProduct } from '@test/mocks';
import { render } from '@test/test-utils';
import { mockGet, mockGetEmpty, mockGetError } from '@test/utils';

import { ProductsPage } from '.';

const expectCartCount = async (count: number) => {
    await waitFor(() => {
        expect(screen.getByTestId('cart-count')).toHaveTextContent(String(count));
    });
};

const expectCartItems = async (ids: number[]) => {
    await waitFor(() => {
        ids.forEach(id => {
            expect(screen.getByTestId(`cart-item-${id}`)).toBeInTheDocument();
        });
    });
};

const CartComponent = () => {
    const { cart, getTotalItemsCount } = useCartContext();
    return (
        <>
            <div data-testid="cart-count">{getTotalItemsCount()}</div>
            <ul data-testid="cart-list">
                {cart.map(({ product: { id } }) => (
                    <li key={id} data-testid={`cart-item-${id}`}>
                        {id}
                    </li>
                ))}
            </ul>
        </>
    );
};

describe('<ProductsPage>', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('completes adding products to cart workflow', async () => {
        const user = userEvent.setup();

        const mockProducts: Product[] = [
            mockProduct({ id: 111, title: 'First Item' }),
            mockProduct({ id: 222, title: 'Second Item' }),
            mockProduct({ id: 333, title: 'Third Item' }),
        ];

        mockGet({
            path: '/products',
            data: mockProducts,
        });

        render(
            <>
                <CartComponent />
                <ProductsPage />
            </>
        );

        // on products load
        expect(await screen.findByText('First Item')).toBeInTheDocument();
        expect(screen.getByText('3 products')).toBeInTheDocument();

        // cart is empty
        await expectCartCount(0);

        // add first product
        await addProductToCart(user, 0);

        // cart is updated → 1 product : 1 quantity
        await expectCartCount(1);
        await expectCartItems([111]);

        // add third product
        await addProductToCart(user, 2);

        // cart is updated → 2 products : 2 quantity
        await expectCartCount(2);
        await expectCartItems([111, 333]);

        // add third product again
        await addProductToCart(user, 2);

        // cart updated → 2 products : 3 quantity
        await expectCartCount(3);
        await expectCartItems([111, 333]);
    });

    it('displays "No products available!" message when API returns an empty list', async () => {
        mockGetEmpty({
            path: '/products',
        });

        render(<ProductsPage />);

        expect(await screen.findByText('No products available!')).toBeInTheDocument();
    });

    it('displays "Oops, something went wrong!" message when API returns an error', async () => {
        mockGetError({
            error: 'There is something wrong with API...',
            options: {
                status: 503,
            },
            path: '/products',
        });

        render(<ProductsPage />);

        expect(await screen.findByText('Oops, something went wrong!')).toBeInTheDocument();
        expect(
            screen.getByText('[API Error] 503: There is something wrong with API...')
        ).toBeInTheDocument();
    });

    describe('accessibility', () => {
        it('does not have any accessibility violations', async () => {
            const mockProducts: Product[] = [
                mockProduct({ id: 111, title: 'First Item' }),
                mockProduct({ id: 222, title: 'Second Item' }),
                mockProduct({ id: 333, title: 'Third Item' }),
            ];

            mockGet({
                path: '/products',
                data: mockProducts,
            });

            const { container } = render(<ProductsPage />);

            // on products load
            expect(await screen.findByText('First Item')).toBeInTheDocument();
            expect(screen.getByText('3 products')).toBeInTheDocument();

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
