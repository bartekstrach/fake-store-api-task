import { Link, Outlet } from 'react-router';

import { CartBadge } from '@/components';

export const GlobalLayout = () => (
    <>
        <header className="flex items-center justify-between border-b border-indigo-700 p-8">
            <Link aria-label="Go to main page" className="flex items-center space-x-4" to="/">
                <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                    Fake Store API task
                </h1>
            </Link>

            <Link aria-label="View Shopping Cart" to="/cart">
                <CartBadge />
            </Link>
        </header>

        <main className="flex-1 p-8 md:px-16 lg:px-32 xl:px-48">
            <Outlet />
        </main>

        <footer className="border-t border-indigo-700 p-8 text-right text-black md:px-16 lg:px-32 xl:px-48">
            © Bartek Strach
        </footer>
    </>
);
