export const Card = ({
    title,
    description,
    icon,
    metrics,
    action,
    onClick
}) => {
    return (
        <div className="dark:bg-gray-800 dark:text-gray-300 rounded-lg border dark:border-gray-600 border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-[300px]">
            <div className="p-6 flex-1">
                <div className="flex items-start justify-between">
                    {icon}
                    <h3 className="text-2xl font-bold">{title}</h3>
                </div>
                <p className="dark:text-gray-400 mt-2 text-sm text-gray-600 min-h-[40px]">
                    {description}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="space-y-1">
                            <p className="dark:text-gray-400 text-sm text-gray-500">{metric.label}</p>
                            <p className="text-2xl font-semibold text-purple-600">{metric.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 pt-0">
                <button
                    onClick={onClick}
                    className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200"
                >
                    {action}
                </button>
            </div>
        </div>
    );
};