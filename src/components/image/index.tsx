import { useState } from 'react';

interface Props {
    alt: string;
    src?: string;
}

export const Image = ({ alt, src }: Props) => {
    const [hasError, setHasError] = useState<boolean>(false);

    const handleError = () => {
        setHasError(true);
    };

    return (
        <div className="aspect-square w-full rounded-md bg-gray-200 sm:h-full sm:w-auto">
            {hasError || !src ? (
                <div className="flex h-full w-full items-center justify-center">
                    <span className="text-lg font-semibold text-gray-500">No image</span>
                </div>
            ) : (
                <img
                    alt={alt}
                    className="h-full w-full object-scale-down p-2"
                    loading="lazy"
                    onError={handleError}
                    src={src}
                />
            )}
        </div>
    );
};
