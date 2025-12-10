import { Routes, Route } from 'react-router';

import { GlobalLayout } from './layout';

const AppRoutes = () => (
    <Routes>
        <Route element={<GlobalLayout />}>
            {/* <Route index element={<MainPage />} /> */}
            {/* <Route path="/products" element={<ProductsPage />} /> */}
            {/* <Route path="/cart" element={<CartPage />} /> */}
        </Route>
    </Routes>
);

export default AppRoutes;
