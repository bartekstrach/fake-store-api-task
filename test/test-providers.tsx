import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CartProvider } from '@/contexts';

interface TestProvidersProps {
    children: ReactNode;
    queryClient?: QueryClient;
}

export const TestProviders = ({ children, queryClient }: TestProvidersProps) => {
    const client =
        queryClient ??
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
                mutations: {
                    retry: false,
                },
            },
        });

    return (
        <QueryClientProvider client={client}>
            <CartProvider>{children}</CartProvider>
        </QueryClientProvider>
    );
};
