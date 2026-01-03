import { waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Product } from '@/types';

import { mockProductList } from '@test/mocks';
import { renderHook } from '@test/test-utils';

import { getProducts } from './api';
import { useProducts } from './queries';

vi.mock('./api');

describe('useProducts', () => {
    it('successfully fetches and returns products', async () => {
        const mockProducts: Product[] = mockProductList();
        vi.mocked(getProducts).mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(mockProducts);
    });

    it('handles errors correctly', async () => {
        const mockError = new Error('Failed to fetch');
        vi.mocked(getProducts).mockRejectedValue(mockError);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(mockError);
    });
});
