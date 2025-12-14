import { CartItem, Product } from '@/types';

/**
 * Adds a product to the cart or updates its quantity if it already exists:
 * - if the product is not in the cart, it is added with the specified quantity
 * - if the product exists, its quantity is incremented by the specified quantity
 *
 * @param {CartItem[]} cart - current shopping cart array
 * @param {Product} product - product to add or update
 * @param {number} quantity - quantity to add
 *
 * @returns {CartItem[]} the updated cart array
 */
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

/**
 * Removes a product from the cart by its product ID.
 *
 * @param {CartItem[]} cart - current shopping cart array
 * @param {number} productId - product ID to remove
 *
 * @returns {CartItem[]} the updated cart array without the specified product
 */
const removeItem = ({ cart, productId }: { cart: CartItem[]; productId: number }) =>
    cart.filter(i => i.product.id !== productId);

/**
 * Updates the quantity of a product in the cart:
 * - if the quantity is less than 1, the product is removed from the cart
 * - otherwise, the product quantity is set to the new value
 *
 * @param {CartItem[]} cart - current shopping cart array
 * @param {number} productId - product ID to update
 * @param {number} quantity - new quantity to set
 *
 * @returns {CartItem[]} the updated cart array
 */
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

/**
 * Increments the quantity of a product in the cart by 1.
 *
 * @param {CartItem[]} cart - current shopping cart array
 * @param {number} productId - product ID to increment
 *
 * @returns {CartItem[]} the updated cart array
 */
const incrementItemQuantity = ({ cart, productId }: { cart: CartItem[]; productId: number }) =>
    updateByProductId({
        cart,
        productId,
        updateFn: item => ({
            ...item,
            quantity: item.quantity + 1,
        }),
    });

/**
 * Decrements the quantity of a product in the cart by 1:
 * - if the product quantity becomes less than 1, the product is removed from the cart
 * - if the product does not exist, returns the original cart
 *
 * @param {CartItem[]} cart - current shopping cart array
 * @param {number} productId - product ID to decrement
 *
 * @returns {CartItem[]} the updated cart array
 */
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

/**
 * Gets the current quantity of a product in the cart, returns 0 if the product is not found.
 *
 * @param {CartItem[]} cart - current shopping cart array
 * @param {number} productId - product ID to query
 *
 * @returns {number} the quantity of the product in the cart
 */
const getItemQuantity = ({ cart, productId }: { cart: CartItem[]; productId: number }): number =>
    cart.find(i => i.product.id === productId)?.quantity ?? 0;

/**
 * Calculates the total price of all items in the cart.
 *
 * @param {CartItem[]} cart - current shopping cart array
 *
 * @returns {number} the total price of all cart items
 */
const getTotalPrice = ({ cart }: { cart: CartItem[] }): number =>
    cart.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0);

/**
 * Calculates the total number of items in the cart (sum of all quantities).
 *
 * @param {CartItem[]} cart - current shopping cart array
 *
 * @returns {number} the total count of all items
 */
const getTotalItemsCount = ({ cart }: { cart: CartItem[] }): number =>
    cart.reduce((total, item) => total + item.quantity, 0);

/**
 * Finds the index of a product in the cart by product ID.
 *
 * @param {CartItem[]} cart - The current shopping cart array
 * @param {number} productId - The product ID to find
 *
 * @returns {number} the index of the product in the cart, or -1 if not found
 */
const findIndexByProductId = ({ cart, productId }: { cart: CartItem[]; productId: number }) =>
    cart.findIndex(i => i.product.id === productId);

/**
 * Updates a cart item by product ID using a custom update function.
 *
 * @param {CartItem[]} cart - current shopping cart array
 * @param {number} productId - product ID to update
 * @param {(item: CartItem) => CartItem} updateFn - function that receives the current item and returns an updated item
 *
 * @returns {CartItem[]} the updated cart array
 */
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
