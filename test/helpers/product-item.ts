import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const getAddToCartButtons = () => screen.getAllByText('Add to cart');

const getAddToCartButton = (index: number) => getAddToCartButtons()[index];

const waitForAddToCartEnabled = async (index = 0) => {
    await waitFor(() => {
        expect(getAddToCartButton(index)).toBeEnabled();
    });
};
const waitUntilUIIdle = async () => {
    await waitFor(() => {
        expect(screen.queryByText('Adding...')).not.toBeInTheDocument();
        expect(screen.queryByText('Added!')).not.toBeInTheDocument();
    });
};

const addProductToCart = async (user: ReturnType<typeof userEvent.setup>, index: number) => {
    await waitForAddToCartEnabled(index);
    await user.click(getAddToCartButton(index));
    await screen.findByText('Added!');
    await waitUntilUIIdle();
};

export { addProductToCart };
