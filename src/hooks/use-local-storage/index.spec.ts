import { act } from '@testing-library/react';

import { renderHook } from '@test/test-utils';

import { useLocalStorage } from '.';

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('getting value', () => {
        it('returns initial value when no local storage entry exists', () => {
            const { result } = renderHook(() => useLocalStorage('test-key', 'hello'));

            expect(result.current[0]).toBe('hello');
        });

        it('returns value already in local storage', () => {
            localStorage.setItem('test-key', JSON.stringify('stored value'));

            const { result } = renderHook(() => useLocalStorage('test-key', 'new default value'));

            expect(result.current[0]).toBe('stored value');
        });

        it('returns initial value and logs warning when localStorage.getItem throws', () => {
            localStorage.setItem('test-key', JSON.stringify('stored value'));

            vi.stubGlobal('localStorage', {
                getItem: () => {
                    throw new Error('Read error');
                },
            });
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));

            expect(result.current[0]).toBe('fallback');
            expect(warnSpy).toHaveBeenCalledWith(
                'Error reading localStorage key "test-key":',
                expect.any(Error)
            );

            warnSpy.mockRestore();
            vi.unstubAllGlobals();
        });
    });

    describe('setting value', () => {
        it('sets a new value and writes to local storage', () => {
            const { result } = renderHook(() => useLocalStorage('test-key', 'stored value'));

            act(() => {
                result.current[1]('updated value');
            });

            expect(result.current[0]).toBe('updated value');
            expect(JSON.parse(localStorage.getItem('test-key')!)).toBe('updated value');
        });

        it('supports functional updates', () => {
            localStorage.setItem('test-key', JSON.stringify(1));

            const { result } = renderHook(() => useLocalStorage('test-key', 0));

            act(() => {
                result.current[1](prev => prev + 1);
            });

            expect(result.current[0]).toBe(2);
            expect(JSON.parse(localStorage.getItem('test-key')!)).toBe(2);
        });

        it('does not affect stored value when writing to a different local storage key', () => {
            localStorage.setItem('other-key', JSON.stringify('other value'));
            const { result: resultTestKey } = renderHook(() =>
                useLocalStorage('test-key', 'initial value')
            );

            expect(resultTestKey.current[0]).toBe('initial value');

            act(() => {
                resultTestKey.current[1]('updated value');
            });

            expect(resultTestKey.current[0]).toBe('updated value');
            expect(JSON.parse(localStorage.getItem('other-key')!)).toBe('other value');
        });

        it('updates state but logs error when localStorage.setItem throws', () => {
            vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
                throw new Error('Write error');
            });

            const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            const { result } = renderHook(() => useLocalStorage('test-key', 'initial value'));

            act(() => {
                result.current[1]('updated value');
            });

            // react state updates normally
            expect(result.current[0]).toBe('updated value');

            // error logged
            expect(errorSpy).toHaveBeenCalledWith(
                'Error setting localStorage key "test-key":',
                expect.any(Error)
            );

            errorSpy.mockRestore();
            vi.restoreAllMocks();
        });
    });

    describe('removing value', () => {
        it('removes the key from local storage and resets value', () => {
            localStorage.setItem('test-key', JSON.stringify('to be removed'));

            const { result } = renderHook(() => useLocalStorage('test-key', 'initial value'));

            act(() => {
                result.current[2]();
            });

            expect(localStorage.getItem('test-key')).toBeNull();
        });

        it('logs error when localStorage.removeItem throws', () => {
            vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
                throw new Error('Remove error');
            });

            const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            const { result } = renderHook(() => useLocalStorage('test-key', 'initial value'));

            expect(result.current[0]).toBe('initial value');

            act(() => {
                result.current[2]();
            });

            // shouldn't reset because removeItem threw
            expect(result.current[0]).toBe('initial value');

            expect(errorSpy).toHaveBeenCalledWith(
                'Error removing localStorage key "test-key":',
                expect.any(Error)
            );

            errorSpy.mockRestore();
            vi.restoreAllMocks();
        });
    });
});
