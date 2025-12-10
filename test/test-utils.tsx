import { ReactElement } from 'react';

import { render, RenderOptions } from '@testing-library/react';

import { TestProviders } from './test-providers';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: TestProviders, ...options });

export { customRender as render };
