import { delay, http, HttpResponse } from 'msw';

const BASE_URL = import.meta.env.VITE_STORE_API_URL;
const NETWORK_DELAY = 100;

export const handlers = [
    // Products
    http.get(`${BASE_URL}/products`, async () => {
        await delay(NETWORK_DELAY);

        // TODO: replace with mocks
        return HttpResponse.json({
            id: 'abc-123',
        });
    }),

    // Error simulation endpoint
    http.get(`${BASE_URL}/error`, async () => {
        return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
    }),
];
