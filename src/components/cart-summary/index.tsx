import { Button } from '@/components';
import { DEFAULT_CURRENCY } from '@/constants';
import { formatPrice } from '@/utils';

interface CartSummaryProps {
    itemCount: number;
    totalPrice: number;
}

export const CartSummary = ({ itemCount, totalPrice }: CartSummaryProps) => (
    <>
        <div className="card sticky space-y-4">
            <div className="space-y-2">
                <div className="text-md flex justify-between">
                    <span className="text-gray-700">
                        {itemCount === 1 ? 'Item (1)' : `Items (${itemCount})`}
                    </span>
                    <span className="font-medium">{formatPrice(totalPrice, DEFAULT_CURRENCY)}</span>
                </div>
                <div className="text-md flex justify-between">
                    <span className="text-gray-700">Shipping</span>
                    <span className="font-medium text-green-700">Free</span>
                </div>
            </div>

            <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(totalPrice, DEFAULT_CURRENCY)}</span>
            </div>

            <Button
                className="w-full"
                disabled={itemCount === 0}
                onClick={() => alert('Proceeding to Checkout...')}
                variant="primary"
            >
                Proceed to Checkout
            </Button>
        </div>
    </>
);
