import { ReactNode } from 'react';

import { useCart } from '@/hooks';

import { CartContext } from './context';

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const cart = useCart();

    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};
