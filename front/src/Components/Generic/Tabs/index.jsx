import React from 'react';

export const Tabs = ({ children, value, onChange }) => {
    return (
        <div className="space-y-4">
            {children}
        </div>
    );
};

export const TabsList = ({ children }) => {
    return (
        <div className="flex space-x-2 border-b dark:border-gray-700">
            {children}
        </div>
    );
};

export const TabsTrigger = ({ children, value, selected, onClick }) => {
    return (
        <button
            onClick={() => onClick(value)}
            className={`px-4 py-2 text-sm font-medium transition-colors
        ${selected
                    ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
        >
            {children}
        </button>
    );
};

export const TabsContent = ({ children, value, selected }) => {
    if (!selected) return null;
    return <div className="py-4">{children}</div>;
};