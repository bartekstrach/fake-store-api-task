// Size
export type Size = 'sm' | 'md';

export const sizeClasses: Record<Size, string> = {
    sm: 'p-1 text-sm',
    md: 'p-2 text-base',
};

// Variant
export type Variant =
    | 'primary'
    | 'primary-outlined'
    | 'secondary'
    | 'secondary-outlined'
    | 'error-outlined';

export const variantClasses: Record<Variant, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    'primary-outlined':
        'border border-indigo-600 bg-indigo-100 text-indigo-600 hover:bg-indigo-200',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    'secondary-outlined': 'border border-gray-600 bg-gray-100 text-gray-800 hover:bg-gray-200',
    'error-outlined': 'border border-red-600 bg-red-100 text-gray-800 hover:bg-red-200',
};
