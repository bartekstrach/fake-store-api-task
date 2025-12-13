interface StateCardProps {
    className?: string;
    description?: string;
    fullPageCenter?: boolean;
    title: string;
}

export const StateCard = ({
    className = '',
    description = '',
    fullPageCenter = false,
    title,
}: StateCardProps) => {
    const fullPageCenterClass = fullPageCenter ? 'h-full w-full' : '';
    const stateCardClass = `flex items-center justify-center ${fullPageCenterClass} ${className}`;

    return (
        <div className={stateCardClass}>
            <div className="card">
                <div className="space-y-4 p-4 text-center xs:p-8 sm:p-16 md:p-24">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-gray-700">{description}</p>
                </div>
            </div>
        </div>
    );
};
