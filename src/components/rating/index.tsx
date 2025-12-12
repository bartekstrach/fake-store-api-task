import { StarIcon } from '@heroicons/react/24/solid';

export const Rating = ({ rate, count }: { rate: number; count: number }) => {
    return (
        <div className="flex items-center gap-1 text-sm">
            <StarIcon className="icon icon-sm fill-yellow-500" />
            <span className="font-medium">{rate.toFixed(2)}</span>
            <span className="text-gray-500">({count})</span>
        </div>
    );
};
