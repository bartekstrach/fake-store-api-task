export const Pill = ({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span
            className={`line-block cursor-default rounded-md border border-gray-400 bg-gray-50 px-2 py-1 text-xs text-gray-800 ${className}`}
        >
            {children}
        </span>
    );
};
