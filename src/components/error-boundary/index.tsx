import { Component, ReactNode } from 'react';

import { StateCard } from '@/components';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: unknown) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <StateCard
                    title="Something went wrong :("
                    description="Please refresh the page and try again"
                    fullPageCenter
                />
            );
        }

        return this.props.children;
    }
}
