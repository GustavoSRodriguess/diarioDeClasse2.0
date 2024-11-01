import React from 'react';

export const Card = ({
    title,
    description,
    icon,
    metrics,
    action,
    onClick
}) => {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    {icon}
                    <h3 className="text-2xl font-bold">{title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                    {description}
                </p>
            </div>

            <div className="p-6 pt-0">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="space-y-1">
                            <p className="text-sm text-gray-500">{metric.label}</p>
                            <p className="text-2xl font-semibold text-purple-600">{metric.value}</p>
                        </div>
                    ))}
                </div>
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