import { useState, Dispatch, SetStateAction, useEffect } from 'react';

/**
 * A generic hook for syncing state with localStorage
 *
 * @param key - localStorage key
 * @param initialValue - default value if key doesn't exist
 * @returns [storedValue, setValue, removeValue] - enhanced state management
 *
 * @example
 * ```typescript
 *  const [
 *      products, // list of records of type Products
 *      setValue, // adds a new item or updates the existing one in the local storage
 *      removeValue // removes that key from the given Storage object if it exists
 *  ] = useLocalStorage<Products>(PRODUCTS_KEY, []);
 * ```
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>, () => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Cross-tab synchronization
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.storageArea === window.localStorage) {
                const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
                setStoredValue(newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, initialValue]);

    const setValue: Dispatch<SetStateAction<T>> = value => {
        setStoredValue(prev => {
            const newValue = value instanceof Function ? value(prev) : value;

            try {
                localStorage.setItem(key, JSON.stringify(newValue));
            } catch (error) {
                console.error(`Error setting localStorage key "${key}":`, error);
            }

            return newValue;
        });
    };

    const removeValue = () => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue, removeValue];
}
