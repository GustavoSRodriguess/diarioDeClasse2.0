import React from 'react';

export const Table = ({ children, className = "" }) => {
    return (
        <div className={`mt-6 opoverflow-x-auto rounded-lg border border-gray-200 bg-white ${className}`}>
            <table className="min-w-full divide-y divide-gray-200">
                {children}
            </table>
        </div>
    );
};

export const TableHeader = ({ children, className = "" }) => {
    return (
        <thead className={`bg-gray-50 ${className}`}>
            {children}
        </thead>
    );
};

export const TableBody = ({ children, className = "" }) => {
    return (
        <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
            {children}
        </tbody>
    );
};

export const TableRow = ({ children, className = "" }) => {
    return (
        <tr className={`hover:bg-gray-50 ${className}`}>
            {children}
        </tr>
    );
};

export const TableHead = ({ children, className = "", align = "left" }) => {
    return (
        <th className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
            {children}
        </th>
    );
};

export const TableCell = ({ children, className = "", align = "left" }) => {
    return (
        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-${align} ${className}`}>
            {children}
        </td>
    );
};

export const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
        default: "bg-gray-100 text-gray-800",
        success: "bg-purple-100 text-purple-800",
        warning: "bg-yellow-100 text-yellow-800",
        danger: "bg-red-100 text-red-800"
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
            className={`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer ${className}`}
            {...props}
        />
    );
};