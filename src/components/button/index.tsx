import { ButtonHTMLAttributes } from 'react';

import { sizeClasses, Size, variantClasses, Variant } from './options';

export const Button = ({
    children,
    className = '',
    size = 'md',
    variant = 'primary',
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    size?: Size;
    variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const sizeClass = sizeClasses[size];
    const variantClass = variantClasses[variant];

    const buttonClass = `btn ${sizeClass} ${variantClass} ${className}`;

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
};
