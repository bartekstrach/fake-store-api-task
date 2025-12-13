import { createContext } from 'react';

import { useCart } from '@/hooks';

type CartContextType = ReturnType<typeof useCart>;

export const CartContext = createContext<CartContextType | null>(null);
