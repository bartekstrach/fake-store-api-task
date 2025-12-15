import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';

import { render } from '@test/test-utils';

import { QuantityControl } from '.';

vi.mock('@/constants', () => ({
    CART_STORAGE_KEY: 'test-key',
    DEFAULT_MIN_QUANTITY: 1,
    DEFAULT_MAX_QUANTITY: 999,
}));

describe('<QuantityControl>', () => {
    const defaultProps = {
        id: 'test-product',
        onDecrementQuantity: vi.fn(),
        onIncrementQuantity: vi.fn(),
        onRemoveItem: vi.fn(),
        quantity: 5,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('rendering', () => {
        it('renders all control buttons and quantity display', () => {
            render(<QuantityControl {...defaultProps} />);

            expect(screen.getByRole('button', { name: /remove item/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /increase quantity/i })).toBeInTheDocument();
            expect(screen.getByText('5')).toBeInTheDocument();
        });

        it('renders different quantity values correctly', () => {
            const { rerender } = render(<QuantityControl {...defaultProps} quantity={1} />);
            expect(screen.getByText('1')).toBeInTheDocument();

            rerender(<QuantityControl {...defaultProps} quantity={42} />);
            expect(screen.getByText('42')).toBeInTheDocument();

            rerender(<QuantityControl {...defaultProps} quantity={999} />);
            expect(screen.getByText('999')).toBeInTheDocument();
        });
    });

    describe('actions', () => {
        it('calls onIncrementQuantity when plus button is clicked', async () => {
            const user = userEvent.setup();

            render(<QuantityControl {...defaultProps} />);

            const incrementButton = screen.getByRole('button', { name: /increase quantity/i });

            await user.click(incrementButton);

            expect(defaultProps.onIncrementQuantity).toHaveBeenCalledTimes(1);
        });

        it('calls onDecrementQuantity when minus button is clicked', async () => {
            const user = userEvent.setup();

            render(<QuantityControl {...defaultProps} />);

            const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });

            await user.click(decrementButton);

            expect(defaultProps.onDecrementQuantity).toHaveBeenCalledTimes(1);
        });

        it('calls onRemoveItem when trash button is clicked', async () => {
            const user = userEvent.setup();
            render(<QuantityControl {...defaultProps} />);

            const removeButton = screen.getByRole('button', { name: /remove item/i });

            await user.click(removeButton);

            expect(defaultProps.onRemoveItem).toHaveBeenCalledTimes(1);
        });

        it('allows multiple increment clicks', async () => {
            const user = userEvent.setup();
            render(<QuantityControl {...defaultProps} />);

            const incrementButton = screen.getByRole('button', { name: /increase quantity/i });

            await user.click(incrementButton);
            await user.click(incrementButton);
            await user.click(incrementButton);

            expect(defaultProps.onIncrementQuantity).toHaveBeenCalledTimes(3);
        });

        it('allows multiple decrement clicks', async () => {
            const user = userEvent.setup();
            render(<QuantityControl {...defaultProps} />);

            const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });

            await user.click(decrementButton);
            await user.click(decrementButton);

            expect(defaultProps.onDecrementQuantity).toHaveBeenCalledTimes(2);
        });
    });

    describe('minimum quantity behavior', () => {
        it('disables decrement button when quantity is at minimum (default min: 1)', () => {
            render(<QuantityControl {...defaultProps} quantity={1} />);

            const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });

            expect(decrementButton).toBeDisabled();
        });

        it('enables decrement button when quantity is above minimum', () => {
            render(<QuantityControl {...defaultProps} quantity={2} />);

            const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });

            expect(decrementButton).not.toBeDisabled();
        });

        it('respects custom min prop', () => {
            render(<QuantityControl {...defaultProps} quantity={5} min={5} />);

            const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });

            expect(decrementButton).toBeDisabled();
        });

        it('does not call onDecrementQuantity when at minimum', async () => {
            const user = userEvent.setup();
            render(<QuantityControl {...defaultProps} quantity={1} />);

            const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });
            await user.click(decrementButton);

            expect(defaultProps.onDecrementQuantity).not.toHaveBeenCalled();
        });
    });

    describe('maximum quantity behavior', () => {
        it('disables increment button when quantity is at maximum (default max: 999)', () => {
            render(<QuantityControl {...defaultProps} quantity={999} />);

            const incrementButton = screen.getByRole('button', { name: /increase quantity/i });

            expect(incrementButton).toBeDisabled();
        });

        it('enables increment button when quantity is below maximum', () => {
            render(<QuantityControl {...defaultProps} quantity={998} />);

            const incrementButton = screen.getByRole('button', { name: /increase quantity/i });

            expect(incrementButton).not.toBeDisabled();
        });

        it('respects custom max prop', () => {
            render(<QuantityControl {...defaultProps} quantity={10} max={10} />);

            const incrementButton = screen.getByRole('button', { name: /increase quantity/i });

            expect(incrementButton).toBeDisabled();
        });

        it('does not call onIncrementQuantity when at maximum', async () => {
            const user = userEvent.setup();
            render(<QuantityControl {...defaultProps} quantity={999} />);

            const incrementButton = screen.getByRole('button', { name: /increase quantity/i });
            await user.click(incrementButton);

            expect(defaultProps.onIncrementQuantity).not.toHaveBeenCalled();
        });
    });

    describe('disabled state', () => {
        it('disables all buttons when disabled prop is true', () => {
            render(<QuantityControl {...defaultProps} disabled={true} />);

            const removeButton = screen.getByRole('button', { name: /remove item/i });
            const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });
            const incrementButton = screen.getByRole('button', { name: /increase quantity/i });

            expect(removeButton).toBeDisabled();
            expect(decrementButton).toBeDisabled();
            expect(incrementButton).toBeDisabled();
        });

        it('does not call any handlers when disabled', async () => {
            const user = userEvent.setup();
            render(<QuantityControl {...defaultProps} disabled={true} />);

            const removeButton = screen.getByRole('button', { name: /remove item/i });
            const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });
            const incrementButton = screen.getByRole('button', { name: /increase quantity/i });

            await user.click(removeButton);
            await user.click(decrementButton);
            await user.click(incrementButton);

            expect(defaultProps.onRemoveItem).not.toHaveBeenCalled();
            expect(defaultProps.onDecrementQuantity).not.toHaveBeenCalled();
            expect(defaultProps.onIncrementQuantity).not.toHaveBeenCalled();
        });
    });

    describe('accessibility', () => {
        it('does not have any accessibility violations', async () => {
            const { container } = render(<QuantityControl {...defaultProps} />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
