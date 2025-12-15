import React, { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './style.css';
import AppRoutes from './pages/routes.tsx';

// Ref: https://vite.dev/guide/env-and-mode#node-env-and-modes
if (import.meta.env.DEV) {
    import('@axe-core/react').then(axe => {
        // @axe-core/react needs the legacy ReactDOM
        import('react-dom').then(ReactDOM => {
            axe.default(React, ReactDOM, 1000);
        });
    });
}

// Ref: https://tanstack.com/query/latest/docs/reference/QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
            {import.meta.env.DEV && <ReactQueryDevtools />}
        </QueryClientProvider>
    </StrictMode>
);
