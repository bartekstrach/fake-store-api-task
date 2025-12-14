import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useCartContext } from '@/hooks';
import { Product } from '@/types';

import { addProductToCart } from '@test/helpers';
import { mockProduct } from '@test/mocks';
import { render } from '@test/test-utils';
import { mockGet } from '@test/utils';

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

describe('ProductsPage', () => {
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

        // Products load
        expect(await screen.findByText('First Item')).toBeInTheDocument();
        expect(screen.getByText('3 products')).toBeInTheDocument();

        // Cart empty
        await expectCartCount(0);

        // Add first product
        await addProductToCart(user, 0);

        // Cart updated → 1 product : 1 quantity
        await expectCartCount(1);
        await expectCartItems([111]);

        // Add third product
        await addProductToCart(user, 2);

        // Cart updated → 2 products : 2 quantity
        await expectCartCount(2);
        await expectCartItems([111, 333]);

        // Add third product again
        await addProductToCart(user, 2);

        // Cart updated → 2 products : 3 quantity
        await expectCartCount(3);
        await expectCartItems([111, 333]);
    });
});
