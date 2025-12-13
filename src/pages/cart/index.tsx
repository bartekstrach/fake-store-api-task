import { useMemo } from 'react';

import { CartProductItem, CartSummary, StateCard } from '@/components';
import { useCart } from '@/hooks';
import { Product } from '@/types';

export const CartPage = () => {
    const { cart, decrementQuantity, incrementQuantity, removeFromCart } = useCart();

    const handleDecrementQuantity = (product: Product) => {
        decrementQuantity({ productId: product.id });
    };

    const handleIncrementQuantity = (product: Product) => {
        incrementQuantity({ productId: product.id });
    };

    const handleRemoveItem = (product: Product) => {
        removeFromCart({ productId: product.id });
    };

    const { totalPrice, totalItems } = useMemo(() => {
        const total = cart.reduce(
            (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
            0
        );
        const items = cart.reduce((sum, item) => sum + item.quantity, 0);
        return { totalPrice: total, totalItems: items };
    }, [cart]);

    if (!cart || cart.length === 0) {
        return (
            <StateCard
                title="Your cart is empty!"
                description="Add some products to get started"
                fullPageCenter
            />
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <div className="space-y-4">
                {cart.map(({ product, quantity }) => (
                    <CartProductItem
                        key={product.id}
                        onDecrementQuantity={() => handleDecrementQuantity(product)}
                        onIncrementQuantity={() => handleIncrementQuantity(product)}
                        onRemoveItem={() => handleRemoveItem(product)}
                        product={product}
                        quantity={quantity}
                    />
                ))}
            </div>

            <h2 className="text-2xl font-bold">Order Summary</h2>
            <CartSummary itemCount={totalItems} totalPrice={totalPrice} />
        </div>
    );
};
