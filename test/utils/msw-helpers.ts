import { delay, http, HttpResponse, JsonBodyType } from 'msw';

import { server } from '@test/utils';

const BASE_URL = import.meta.env.VITE_STORE_API_URL;
const DEFAULT_DELAY = 100;

type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

interface MockOptions {
    delay?: number;
    status?: number;
}

/**
 * Mock a successful Fake Store API response
 *
 * @param data - response data
 * @param method - HTTP method
 * @param options - additional options
 * @param options.delay - delays the response by the given duration in miliseconds, default = 100ms
 * @param options.status - response status code
 * @param path - API path
 */
export const mockApiSuccess = <T extends JsonBodyType>({
    data,
    method,
    options = {},
    path,
}: {
    data: T;
    method: HttpMethod;
    options?: MockOptions;
    path: string;
}) => {
    const { delay: delayMs = DEFAULT_DELAY, status = 200 } = options;

    server.use(
        http[method](`${BASE_URL}${path}`, async () => {
            await delay(delayMs);
            return HttpResponse.json(data, { status });
        })
    );
};

/**
 * Mock a Fake Store API error response
 *
 * @param error - error to throw (Error or string message for HTTP error)
 * @param method - HTTP method
 * @param options - additional options
 * @param options.delay - delays the response by the given duration in miliseconds, default = 100ms
 * @param options.status - response status code (only used when error is string)
 * @param path - API path
 */
export const mockApiError = ({
    error,
    method,
    options = {},
    path,
}: {
    error: string | Error;
    method: HttpMethod;
    options?: MockOptions;
    path: string;
}) => {
    const { delay: delayMs = DEFAULT_DELAY, status = 500 } = options;

    server.use(
        http[method](`${BASE_URL}${path}`, async () => {
            await delay(delayMs);

            // Return generic network error ("Failed to fetch")
            if (error instanceof Error) {
                return HttpResponse.error();
            }

            // Return HTTP error response
            return HttpResponse.text(error ?? 'Internal Server Error', { status });
        })
    );
};

/**
 * Mock an empty Fake Store API response
 *
 * @param method - HTTP method
 * @param options - additional options
 * @param options.delay - delays the response by the given duration in miliseconds, default = 100ms
 * @param options.status - response status code
 * @param path - API path
 */
export const mockApiEmpty = ({
    method,
    options = {},
    path,
}: {
    method: HttpMethod;
    options?: MockOptions;
    path: string;
}) => {
    const { delay: delayMs = DEFAULT_DELAY } = options;

    server.use(
        http[method](`${BASE_URL}${path}`, async () => {
            await delay(delayMs);
            return HttpResponse.json([], { status: 200 });
        })
    );
};

// Wrappers for GET method

/**
 * Mock a successful GET Fake Store API response
 *
 * @param data - response data
 * @param options - additional options
 * @param options.delay - delays the response by the given duration in miliseconds, default = 100ms
 * @param options.status - response status code
 * @param path - API path
 */
export const mockGet = <T>({
    data,
    options,
    path,
}: {
    data: T & JsonBodyType;
    path: string;
    options?: MockOptions;
}) =>
    mockApiSuccess({
        data,
        method: 'get',
        options,
        path,
    });

/**
 * Mock a GET Fake Store API error response
 *
 * @param error - error to throw (Error or string message for HTTP error)
 * @param options - additional options
 * @param options.delay - delays the response by the given duration in miliseconds, default = 100ms
 * @param options.status - response status code (only used when error is string)
 * @param path - API path
 */
export const mockGetError = ({
    error,
    options,
    path,
}: {
    error: string | Error;
    options?: MockOptions;
    path: string;
}) =>
    mockApiError({
        error,
        method: 'get',
        options,
        path,
    });

/**
 * Mock an empty GET Fake Store API response
 *
 * @param options - additional options
 * @param options.delay - delays the response by the given duration in miliseconds, default = 100ms
 * @param options.status - response status code
 * @param path - API path
 */
export const mockGetEmpty = ({ options, path }: { options?: MockOptions; path: string }) =>
    mockApiEmpty({
        method: 'get',
        options,
        path,
    });
