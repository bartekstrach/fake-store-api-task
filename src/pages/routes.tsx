import { Navigate, Routes, Route } from 'react-router';

import { CartPage } from './cart';
import { GlobalLayout } from './layout';
import { ProductsPage } from './products';

const AppRoutes = () => (
    <Routes>
        <Route element={<GlobalLayout />}>
            <Route index element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
        </Route>
    </Routes>
);

export default AppRoutes;
