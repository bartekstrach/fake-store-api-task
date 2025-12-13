import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components';

import { DEFAULT_MAX_QUANTITY, DEFAULT_MIN_QUANTITY } from './constants';

interface Props {
    disabled?: boolean;
    id: string;
    onDecrementQuantity: () => void;
    onIncrementQuantity: () => void;
    onRemoveItem: () => void;
    max?: number;
    min?: number;
    quantity: number;
}

export const QuantityControl = ({
    disabled = false,
    id,
    max = DEFAULT_MAX_QUANTITY,
    min = DEFAULT_MIN_QUANTITY,
    onDecrementQuantity,
    onIncrementQuantity,
    onRemoveItem,
    quantity,
}: Props) => {
    const canDecrement = quantity > min;
    const canIncrement = quantity < max;

    return (
        <div className="flex items-center gap-1" aria-label="Quantity control">
            <Button
                aria-label="Remove item from cart"
                disabled={disabled}
                id={`button--remove-item--${id}`}
                onClick={onRemoveItem}
                size="sm"
                title="Remove item"
                variant="error-outlined"
            >
                <TrashIcon className="icon icon-md" />
            </Button>

            <Button
                aria-label="Decrease quantity by 1"
                disabled={!canDecrement || disabled}
                id={`button--decrement-quantity--${id}`}
                onClick={onDecrementQuantity}
                size="sm"
                title={canDecrement ? 'Decrease quantity' : 'Minimum quantity reached'}
                variant="primary-outlined"
            >
                <MinusIcon className="icon icon-md" />
            </Button>

            <span
                aria-label={`Current quantity: ${quantity}`}
                className="min-w-[2rem] text-center font-semibold"
                id={`quantity-display--${id}`}
            >
                {quantity}
            </span>

            <Button
                aria-label="Increase quantity by 1"
                disabled={!canIncrement || disabled}
                id={`button--increment-quantity--${id}`}
                onClick={onIncrementQuantity}
                size="sm"
                title={canIncrement ? 'Increase quantity' : 'Maximum quantity reached'}
                variant="primary-outlined"
            >
                <PlusIcon className="icon icon-md" />
            </Button>
        </div>
    );
};
