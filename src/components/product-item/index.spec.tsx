import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';

import { mockProduct } from '@test/mocks';
import { render } from '@test/test-utils';

import { CartProductItem, ProductItem } from '.';

describe('<ProductItem>', () => {
    const product = mockProduct({
        id: 1,
        title: 'Test Product',
        description: 'This is a test product description',
        price: 99.99,
        category: 'Electronics',
        image: 'https://example.com/image.jpg',
        rating: {
            rate: 4.5,
            count: 100,
        },
    });

    const mockOnAddToCart = vi.fn();

    beforeEach(() => {
        mockOnAddToCart.mockClear();
    });

    describe('rendering', () => {
        it('renders product information correctly', () => {
            render(<ProductItem onAddToCart={mockOnAddToCart} product={product} />);

            expect(screen.getByText('Test Product')).toBeInTheDocument();
            expect(screen.getByText(/This is a test product description/)).toBeInTheDocument();
            expect(screen.getByText(/99.99/)).toBeInTheDocument();
            expect(screen.getByText('Electronics')).toBeInTheDocument();
        });

        it('renders rating when available', () => {
            render(<ProductItem onAddToCart={mockOnAddToCart} product={product} />);

            expect(screen.getByText('4.50')).toBeInTheDocument();
            expect(screen.getByText('(100)')).toBeInTheDocument();
        });

        it('does not render rating when unavailable', () => {
            const productWithoutRating = mockProduct({ ...product, rating: undefined });

            render(<ProductItem onAddToCart={mockOnAddToCart} product={productWithoutRating} />);

            expect(screen.queryByText('4.50')).not.toBeInTheDocument();
        });

        it('renders product image with correct alt text', () => {
            render(<ProductItem onAddToCart={mockOnAddToCart} product={product} />);

            const image = screen.getByAltText('Image of Test Product product');
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', product.image);
        });

        it('does not render when product is undefined', () => {
            const { container } = render(
                <ProductItem product={undefined!} onAddToCart={mockOnAddToCart} />
            );

            expect(container.firstChild).toBeNull();
        });
    });

    describe('actions', () => {
        it('calls onAddToCart when button is clicked', async () => {
            const user = userEvent.setup();

            render(<ProductItem onAddToCart={mockOnAddToCart} product={product} />);

            const button = screen.getByText('Add to cart');
            await user.click(button);

            await waitFor(() => {
                expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('accessibility', () => {
        it('does not have any accessibility violations', async () => {
            const { container } = render(
                <ProductItem onAddToCart={mockOnAddToCart} product={product} />
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});

describe('<CartProductItem>', () => {
    const product = mockProduct({
        id: 1,
        title: 'Test Product',
        description: 'This is a test product description',
        price: 99.99,
        category: 'Electronics',
        image: 'https://example.com/image.jpg',
        rating: {
            rate: 4.5,
            count: 100,
        },
    });

    const mockOnDecrementQuantity = vi.fn();
    const mockOnIncrementQuantity = vi.fn();
    const mockOnRemoveItem = vi.fn();

    beforeEach(() => {
        mockOnDecrementQuantity.mockClear();
        mockOnIncrementQuantity.mockClear();
        mockOnRemoveItem.mockClear();
    });

    describe('rendering', () => {
        it('renders product information correctly', () => {
            render(
                <CartProductItem
                    onDecrementQuantity={mockOnDecrementQuantity}
                    onIncrementQuantity={mockOnIncrementQuantity}
                    onRemoveItem={mockOnRemoveItem}
                    product={product}
                    quantity={2}
                />
            );

            expect(screen.getByText('Test Product')).toBeInTheDocument();
            expect(screen.getByText(/This is a test product description/)).toBeInTheDocument();
            expect(screen.getByText(/99.99/)).toBeInTheDocument();
            expect(screen.getByText('Electronics')).toBeInTheDocument();
        });

        it('renders rating when available', () => {
            render(
                <CartProductItem
                    onDecrementQuantity={mockOnDecrementQuantity}
                    onIncrementQuantity={mockOnIncrementQuantity}
                    onRemoveItem={mockOnRemoveItem}
                    product={product}
                    quantity={2}
                />
            );

            expect(screen.getByText('4.50')).toBeInTheDocument();
            expect(screen.getByText('(100)')).toBeInTheDocument();
        });

        it('does not render rating when unavailable', () => {
            const productWithoutRating = mockProduct({ ...product, rating: undefined });

            render(
                <CartProductItem
                    onDecrementQuantity={mockOnDecrementQuantity}
                    onIncrementQuantity={mockOnIncrementQuantity}
                    onRemoveItem={mockOnRemoveItem}
                    product={productWithoutRating}
                    quantity={2}
                />
            );

            expect(screen.queryByText('4.50')).not.toBeInTheDocument();
        });

        it('renders quantity control instead of add button', () => {
            render(
                <CartProductItem
                    onDecrementQuantity={mockOnDecrementQuantity}
                    onIncrementQuantity={mockOnIncrementQuantity}
                    onRemoveItem={mockOnRemoveItem}
                    product={product}
                    quantity={2}
                />
            );

            expect(screen.queryByRole('button', { name: 'Add to cart' })).not.toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
        });

        it('renders correct quantity', () => {
            render(
                <CartProductItem
                    onDecrementQuantity={mockOnDecrementQuantity}
                    onIncrementQuantity={mockOnIncrementQuantity}
                    onRemoveItem={mockOnRemoveItem}
                    product={product}
                    quantity={4435}
                />
            );

            expect(screen.getByText('4435')).toBeInTheDocument();
        });

        it('does not render when cart product is undefined', () => {
            const { container } = render(
                <CartProductItem
                    onDecrementQuantity={mockOnDecrementQuantity}
                    onIncrementQuantity={mockOnIncrementQuantity}
                    onRemoveItem={mockOnRemoveItem}
                    product={undefined!}
                    quantity={5}
                />
            );

            expect(container.firstChild).toBeNull();
        });
    });

    describe('actions', () => {
        it('calls quantity control callbacks correctly', async () => {
            const user = userEvent.setup();

            render(
                <CartProductItem
                    onDecrementQuantity={mockOnDecrementQuantity}
                    onIncrementQuantity={mockOnIncrementQuantity}
                    onRemoveItem={mockOnRemoveItem}
                    product={product}
                    quantity={2}
                />
            );

            const incrementButton = screen.getByTitle('Increase quantity');
            await user.click(incrementButton);
            expect(mockOnIncrementQuantity).toHaveBeenCalledTimes(1);

            const decrementButton = screen.getByTitle('Decrease quantity');
            await user.click(decrementButton);
            expect(mockOnDecrementQuantity).toHaveBeenCalledTimes(1);
        });
    });

    describe('accessibility', () => {
        it('does not have any accessibility violations', async () => {
            const { container } = render(
                <CartProductItem
                    onDecrementQuantity={mockOnDecrementQuantity}
                    onIncrementQuantity={mockOnIncrementQuantity}
                    onRemoveItem={mockOnRemoveItem}
                    product={product}
                    quantity={2}
                />
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
