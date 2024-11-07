// Components/Generic/Tabs/index.jsx
import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue, className = "" }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <div className={className}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        activeTab,
                        setActiveTab
                    });
                }
                return child;
            })}
        </div>
    );
};

export const TabsList = ({ children, className = "", activeTab, setActiveTab }) => {
    return (
        <div className={`grid grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-800 p-1 ${className}`}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        isActive: child.props.value === activeTab,
                        onClick: () => setActiveTab(child.props.value)
                    });
                }
                return child;
            })}
        </div>
    );
};

export const TabsTrigger = ({
    children,
    value,
    isActive,
    onClick,
    className = ""
}) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-md
        ${isActive
                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                } 
        ${className}`}
        >
            {children}
        </button>
    );
};

export const TabsContent = ({ children, value, activeTab, className = "" }) => {
    if (value !== activeTab) return null;

    return (
        <div className={className}>
            {children}
        </div>
    );
};