import { StarIcon } from '@heroicons/react/24/solid';

import { RATING_DECIMAL_PLACES } from '@/constants';

export const Rating = ({ rate, count }: { rate: number; count: number }) => {
    return (
        <div className="flex items-center gap-1 text-sm">
            <StarIcon className="icon icon-sm fill-yellow-500" />
            <span className="font-medium">{rate.toFixed(RATING_DECIMAL_PLACES)}</span>
            <span className="text-gray-500">({count})</span>
        </div>
    );
};
