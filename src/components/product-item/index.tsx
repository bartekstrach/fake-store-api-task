import { useEffect, useMemo, useRef, useState } from 'react';

import { Button, Image, Pill, QuantityControl, Rating } from '@/components';
import { DEFAULT_CURRENCY } from '@/constants';
import { Product } from '@/types';
import { capitalizeWord, formatPrice } from '@/utils';

interface BaseProductItemProps {
    product: Product;
}

interface ProductListItemProps extends BaseProductItemProps {
    onAddToCart: () => void;
}

interface CartProductItemProps extends BaseProductItemProps {
    quantity: number;
    onDecrementQuantity: () => void;
    onIncrementQuantity: () => void;
    onRemoveItem: () => void;
}

interface ProductDetailsProps {
    priceActionSection: React.ReactNode;
    product: Product;
}

const ProductDetails = ({ priceActionSection, product }: ProductDetailsProps) => {
    const { category, description, image, rating, title } = product;

    const hasRating = useMemo(
        () => rating?.count !== undefined && rating?.rate !== undefined,
        [rating]
    );

    return (
        <>
            <div className="mb-4 sm:mb-0 sm:h-full sm:w-48">
                <Image alt={`Image of ${title} product`} src={image} />
            </div>

            <div className="flex flex-1 flex-col gap-2">
                <h3 className="text-xl font-bold">{title}</h3>

                <p className="line-clamp-4 text-sm text-gray-600 sm:line-clamp-2 md:line-clamp-3">
                    {description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-start">
                    <Pill>{capitalizeWord(category)}</Pill>
                    {hasRating && rating && <Rating rate={rating.rate} count={rating.count} />}
                </div>

                {priceActionSection}
            </div>
        </>
    );
};

type ButtonState = 'idle' | 'loading' | 'added';

const ASYNC_OPERATION_DELAY = 500;
const BUTTON_STATE_RESET_DELAY = 1000;

const BUTTON_CONFIG: Record<ButtonState, { disabled: boolean; text: string }> = {
    added: { disabled: true, text: 'Added!' },
    idle: { disabled: false, text: 'Add to cart' },
    loading: { disabled: true, text: 'Adding...' },
};

export const ProductItem = ({ onAddToCart, product }: ProductListItemProps) => {
    const [buttonState, setButtonState] = useState<ButtonState>('idle');
    const timeoutRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (!product) {
        return null;
    }

    const { disabled, text } = BUTTON_CONFIG[buttonState];

    /* Simulating asynchronous operation for "onAddToCart"
     * as updating local storage is synchronous
     *
     * Workflow:
     *   1. Click on "Add to cart" button
     *   2. Display "Adding..." label
     *   3. Add item to local storage
     *   4. Pause for `ASYNC_OPERATION_DELAY` to simulate real-world delay
     *   5. Display "Added!" label
     *   6. Pause for `BUTTON_STATE_RESET_DELAY` to prevent user from multiple clicks
     *   7. Display "Add to cart" label again and enable button
     */
    const handleAddToCart = () => {
        if (disabled) return;

        setButtonState('loading');

        timeoutRef.current = setTimeout(() => {
            onAddToCart();
            setButtonState('added');

            timeoutRef.current = setTimeout(() => {
                setButtonState('idle');
            }, BUTTON_STATE_RESET_DELAY);
        }, ASYNC_OPERATION_DELAY);
    };

    const priceActionSection = (
        <div className="mt-auto flex flex-col items-center justify-between gap-2 sm:flex-row">
            <div className="text-xl font-bold">{formatPrice(product.price, DEFAULT_CURRENCY)}</div>

            <Button
                aria-label={`Add ${product.title} to cart`}
                className="w-full min-w-32 sm:w-auto"
                disabled={disabled}
                id={`button--add-to-cart--${product.id}`}
                onClick={handleAddToCart}
                variant="primary"
            >
                {text}
            </Button>
        </div>
    );

    return (
        <div className="card card-hover flex h-full flex-col sm:flex-row sm:gap-4">
            <ProductDetails priceActionSection={priceActionSection} product={product} />
        </div>
    );
};

export const CartProductItem = ({
    onDecrementQuantity,
    onIncrementQuantity,
    onRemoveItem,
    quantity,
    product,
}: CartProductItemProps) => {
    if (!product) {
        return null;
    }

    const priceActionSection = (
        <div className="mt-auto flex items-center justify-between gap-2 2xs:flex-row">
            <div className="text-xl font-bold">{formatPrice(product.price, DEFAULT_CURRENCY)}</div>

            <QuantityControl
                id={`${product.id}`}
                onDecrementQuantity={onDecrementQuantity}
                onIncrementQuantity={onIncrementQuantity}
                onRemoveItem={onRemoveItem}
                quantity={quantity}
            />
        </div>
    );

    return (
        <div className="card card-hover flex h-full flex-col sm:flex-row sm:gap-4">
            <ProductDetails priceActionSection={priceActionSection} product={product} />
        </div>
    );
};

export const ProductItemSkeleton = () => (
    <div className="card flex h-56 animate-pulse flex-col sm:flex-row sm:gap-4">
        <div className="h-48 w-full bg-gray-200 sm:mb-0 sm:h-full sm:w-48" />
        <div className="flex flex-1 flex-col gap-2">
            <div className="h-6 w-3/5 bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-3/4 bg-gray-200" />
        </div>
    </div>
);
