import { CartProductItem, CartSummary, StateCard } from '@/components';
import { useCartContext } from '@/hooks';
import { Product } from '@/types';

export const CartPage = () => {
    const {
        cart,
        decrementQuantity,
        getTotalItemsCount,
        getTotalPrice,
        incrementQuantity,
        removeFromCart,
    } = useCartContext();

    const handleDecrementQuantity = (product: Product) => {
        decrementQuantity({ productId: product.id });
    };

    const handleIncrementQuantity = (product: Product) => {
        incrementQuantity({ productId: product.id });
    };

    const handleRemoveItem = (product: Product) => {
        removeFromCart({ productId: product.id });
    };

    const totalItems = getTotalItemsCount();
    const totalPrice = getTotalPrice();

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
        <div className="flex flex-col gap-8 lg:flex-row">
            <div className="w-full space-y-4 lg:w-fit">
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
            </div>
            <div className="flex w-full flex-col space-y-4 lg:w-128">
                <h2 className="text-2xl font-bold">Order Summary</h2>
                <CartSummary itemCount={totalItems} totalPrice={totalPrice} />
            </div>
        </div>
    );
};
