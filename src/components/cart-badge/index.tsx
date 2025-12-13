import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useCart } from '@/hooks';

export const CartBadge = () => {
    const { getTotalItemsCount } = useCart();

    const itemCount = getTotalItemsCount();

    return (
        <div className="relative inline-flex items-center">
            <ShoppingCartIcon className="icon icon-lg" />

            {itemCount > 0 && (
                <span className="absolute bottom-4 left-4 inline-flex size-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                    {itemCount}
                </span>
            )}
        </div>
    );
};
