import { useProducts } from '@/api/products';
import { ProductItem, ProductItemSkeleton, StateCard } from '@/components';
import { SKELETON_ITEMS_COUNT } from '@/constants';
import { useCart } from '@/hooks';
import { Product } from '@/types';

export const ProductsPage = () => {
    const { data, error, isFetching } = useProducts();
    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        addToCart({ product, quantity: 1 });
    };

    if (isFetching) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Products</h2>
                </div>
                <div className="space-y-4">
                    {[...Array(SKELETON_ITEMS_COUNT)].map((_, i) => (
                        <ProductItemSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <StateCard
                title="Oops, something went wrong!"
                description={error.message}
                fullPageCenter
            />
        );
    }

    if (!data || data.length === 0) {
        return (
            <StateCard
                title="No products available!"
                description="Check back later for new products"
                fullPageCenter
            />
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Products</h2>
                {!isFetching && (
                    <span className="text-sm text-gray-700">
                        {data.length} {data.length === 1 ? 'product' : 'products'}
                    </span>
                )}
            </div>
            <div className="space-y-4">
                {data.map(product => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        onAddToCart={() => handleAddToCart(product)}
                    />
                ))}
            </div>
        </div>
    );
};
