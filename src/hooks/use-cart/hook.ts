import { useContext } from 'react';

import { CART_STORAGE_KEY } from '@/constants';
import { CartContext } from '@/contexts';
import { useLocalStorage } from '@/hooks';
import { CartItem, Product } from '@/types';

import useCartHelpers from './helpers';

export const useCart = () => {
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
};

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider');
    }

    return context;
};
