import { ReactElement } from 'react';

import { QueryClient } from '@tanstack/react-query';
import {
    render as rtlRender,
    RenderOptions,
    renderHook as rtlRenderHook,
    RenderHookOptions,
} from '@testing-library/react';

import { TestProviders } from './test-providers';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    queryClient?: QueryClient;
}

export const render = (ui: ReactElement, options?: CustomRenderOptions) => {
    const { queryClient, ...renderOptions } = options || {};

    return rtlRender(ui, {
        wrapper: ({ children }) => (
            <TestProviders queryClient={queryClient}>{children}</TestProviders>
        ),
        ...renderOptions,
    });
};

interface CustomRenderHookOptions<Props> extends Omit<RenderHookOptions<Props>, 'wrapper'> {
    queryClient?: QueryClient;
}

export const renderHook = <Result, Props>(
    hook: (props: Props) => Result,
    options?: CustomRenderHookOptions<Props>
) => {
    const { queryClient, ...renderOptions } = options || {};

    return rtlRenderHook(hook, {
        wrapper: ({ children }) => (
            <TestProviders queryClient={queryClient}>{children}</TestProviders>
        ),
        ...renderOptions,
    });
};
