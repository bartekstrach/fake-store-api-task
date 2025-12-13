import { useMemo, useState } from 'react';

import { Button, Image, Pill, QuantityControl, Rating } from '@/components';
import { CURRENCY } from '@/constants';
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

const ProductDetails = ({ children, product }: { children: React.ReactNode; product: Product }) => {
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

                {children}
            </div>
        </>
    );
};

type ButtonState = 'idle' | 'loading' | 'added';

const ASYNC_OPERATION_DELAY = 500;
const BUTTON_STATE_RESET_DELAY = 1500;

export const ProductItem = ({ onAddToCart, product }: ProductListItemProps) => {
    const [buttonState, setButtonState] = useState<ButtonState>('idle');

    if (!product) {
        return null;
    }

    const buttonConfig: Record<ButtonState, { disabled: boolean; text: string }> = {
        added: { disabled: true, text: 'Added!' },
        idle: { disabled: false, text: 'Add to cart' },
        loading: { disabled: true, text: 'Adding...' },
    };

    const { disabled, text } = buttonConfig[buttonState];

    const handleAddToCart = () => {
        if (disabled) return;

        setButtonState('loading');

        // simulating async operation
        setTimeout(() => {
            onAddToCart();
            setButtonState('added');
        }, ASYNC_OPERATION_DELAY);

        setTimeout(() => {
            setButtonState('idle');
        }, BUTTON_STATE_RESET_DELAY);
    };

    return (
        <div className="card card-hover flex h-full flex-col sm:flex-row sm:gap-4">
            <ProductDetails product={product}>
                <div className="mt-auto flex flex-col items-center justify-between gap-2 sm:flex-row">
                    <div className="text-xl font-bold">{formatPrice(product.price, CURRENCY)}</div>

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
            </ProductDetails>
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

    return (
        <div className="card card-hover flex h-full flex-col sm:flex-row sm:gap-4">
            <ProductDetails product={product}>
                <div className="mt-auto flex items-center justify-between gap-2 2xs:flex-row">
                    <div className="text-xl font-bold">{formatPrice(product.price, CURRENCY)}</div>

                    <QuantityControl
                        id={`${product.id}`}
                        onDecrementQuantity={onDecrementQuantity}
                        onIncrementQuantity={onIncrementQuantity}
                        onRemoveItem={onRemoveItem}
                        quantity={quantity}
                    />
                </div>
            </ProductDetails>
        </div>
    );
};

export const ProductItemSkeleton = ({ key }: { key: number }) => (
    <div key={key} className="card flex h-56 animate-pulse flex-col sm:flex-row sm:gap-4">
        <div className="h-48 w-full bg-gray-200 sm:mb-0 sm:h-full sm:w-48" />
        <div className="flex flex-1 flex-col gap-2">
            <div className="h-6 w-3/5 bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-3/4 bg-gray-200" />
        </div>
    </div>
);
