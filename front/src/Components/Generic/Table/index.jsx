import React from 'react';

export const Table = ({ children, className = "" }) => {
    return (
        <div className={`mt-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${className}`}>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                {children}
            </table>
        </div>
    );
};

export const TableHeader = ({ children, className = "" }) => {
    return (
        <thead className={`bg-gray-50 dark:bg-gray-900 ${className}`}>
            {children}
        </thead>
    );
};

export const TableBody = ({ children, className = "" }) => {
    return (
        <tbody className={`bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 ${className}`}>
            {children}
        </tbody>
    );
};

export const TableRow = ({ children, className = "", onClick, ...props }) => {
    return (
        <tr
            className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </tr>
    );
};

export const TableHead = ({ children, className = "", align = "left" }) => {
    return (
        <th className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${className}`}>
            {children}
        </th>
    );
};

export const TableCell = ({ children, className = "", align = "left" }) => {
    return (
        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-${align} ${className}`}>
            {children}
        </td>
    );
};

export const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
        default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        success: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export const Checkbox = ({ className = "", ...props }) => {
    return (
        <input
            type="checkbox"
            className={`h-4 w-4 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 border-gray-300 dark:border-gray-600 rounded cursor-pointer dark:bg-gray-700 dark:checked:bg-purple-600 ${className}`}
            {...props}
        />
    );
};