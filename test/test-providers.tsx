import { ReactNode } from 'react';

interface TestProvidersProps {
    children: ReactNode;
}

export const TestProviders = ({ children }: TestProvidersProps) => {
    return <>{children}</>;
};
