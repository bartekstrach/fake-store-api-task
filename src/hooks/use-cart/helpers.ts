import { CartItem, Product } from '@/types';

// Add or update
const addOrUpdateItem = ({
    cart,
    product,
    quantity,
}: {
    cart: CartItem[];
    product: Product;
    quantity: number;
}) => {
    const index = findIndexByProductId({ cart, productId: product.id });

    if (index === -1) {
        return [...cart, { product, quantity }];
    }

    return updateByProductId({
        cart,
        productId: product.id,
        updateFn: item => ({
            ...item,
            quantity: item.quantity + quantity,
        }),
    });
};

// Remove
const removeItem = ({ cart, productId }: { cart: CartItem[]; productId: number }) =>
    cart.filter(i => i.product.id !== productId);

// Quantity
const updateItemQuantity = ({
    cart,
    productId,
    quantity,
}: {
    cart: CartItem[];
    productId: number;
    quantity: number;
}) => {
    if (quantity < 1) {
        return removeItem({ cart, productId });
    }

    return updateByProductId({ cart, productId, updateFn: item => ({ ...item, quantity }) });
};

const incrementItemQuantity = ({ cart, productId }: { cart: CartItem[]; productId: number }) =>
    updateByProductId({
        cart,
        productId,
        updateFn: item => ({
            ...item,
            quantity: item.quantity + 1,
        }),
    });

const decrementItemQuantity = ({
    cart,
    productId,
}: {
    cart: CartItem[];
    productId: number;
}): CartItem[] => {
    const current = cart.find(i => i.product.id === productId);

    if (!current) {
        return cart;
    }

    return current.quantity <= 1
        ? removeItem({ cart, productId })
        : updateByProductId({
              cart,
              productId,
              updateFn: i => ({ ...i, quantity: i.quantity - 1 }),
          });
};

const getItemQuantity = ({ cart, productId }: { cart: CartItem[]; productId: number }): number =>
    cart.find(i => i.product.id === productId)?.quantity ?? 0;

// Summary
const getTotalPrice = ({ cart }: { cart: CartItem[] }): number =>
    cart.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0);

const getTotalItemsCount = ({ cart }: { cart: CartItem[] }): number =>
    cart.reduce((total, item) => total + item.quantity, 0);

// Helpers
const findIndexByProductId = ({ cart, productId }: { cart: CartItem[]; productId: number }) =>
    cart.findIndex(i => i.product.id === productId);

const updateByProductId = ({
    cart,
    productId,
    updateFn,
}: {
    cart: CartItem[];
    productId: number;
    updateFn: (item: CartItem) => CartItem;
}) => cart.map(i => (i.product.id === productId ? updateFn(i) : i));

export default {
    addOrUpdateItem,
    removeItem,
    updateItemQuantity,
    incrementItemQuantity,
    decrementItemQuantity,
    getItemQuantity,
    getTotalItemsCount,
    getTotalPrice,
};
