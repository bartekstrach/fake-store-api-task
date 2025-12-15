import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import { setupVitestCanvasMock } from 'vitest-canvas-mock';

import { server } from '@test/utils';

expect.extend(matchers);

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});

beforeEach(() => {
    setupVitestCanvasMock();
});

afterEach(() => {
    server.resetHandlers();
    cleanup();
});

afterAll(() => {
    server.close();
});
