import { CART_STORAGE_KEY } from '@/constants';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CartItem, Product } from '@/types';

import useCartHelpers from './helpers';

export function useCart() {
    const [cart, setCart, removeCart] = useLocalStorage<CartItem[]>(CART_STORAGE_KEY, []);

    const addToCart = ({ product, quantity = 1 }: { product: Product; quantity?: number }) => {
        setCart(prev => useCartHelpers.addOrUpdateItem({ cart: prev, product, quantity }));
    };

    const updateQuantity = ({ productId, quantity }: { productId: number; quantity: number }) => {
        setCart(prev => useCartHelpers.updateItemQuantity({ cart: prev, productId, quantity }));
    };

    const incrementQuantity = ({ productId }: { productId: number }) => {
        setCart(prev => useCartHelpers.incrementItemQuantity({ cart: prev, productId }));
    };

    const decrementQuantity = ({ productId }: { productId: number }) => {
        setCart(prev => useCartHelpers.decrementItemQuantity({ cart: prev, productId }));
    };

    const removeFromCart = ({ productId }: { productId: number }) => {
        setCart(prev => useCartHelpers.removeItem({ cart: prev, productId }));
    };

    const clearCart = () => {
        removeCart();
    };

    const getItemQuantity = ({ productId }: { productId: number }): number =>
        useCartHelpers.getItemQuantity({ cart, productId });

    const getTotalItemsCount = (): number => useCartHelpers.getTotalItemsCount({ cart });

    const getTotalPrice = (): number => useCartHelpers.getTotalPrice({ cart });

    return {
        cart,
        addToCart,
        clearCart,
        decrementQuantity,
        getItemQuantity,
        getTotalItemsCount,
        getTotalPrice,
        incrementQuantity,
        removeFromCart,
        updateQuantity,
    };
}
