export const SubCard = ({ children, className = "" }) => {
    return (
        <div className={`rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = "" }) => {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
};

export const CardTitle = ({ children, className = "" }) => {
    return (
        <h3 className={`text-lg font-semibold text-gray-900 dark:text-gray-100 ${className}`}>
            {children}
        </h3>
    );
};

export const CardContent = ({ children, className = "" }) => {
    return (
        <div className={`p-6 pt-0 ${className}`}>
            {children}
        </div>
    );
};

// Components/ui/tabs.jsx
export const Tabs = ({ defaultValue, className = "", children }) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {children}
        </div>
    );
};

export const TabsList = ({ className = "", children }) => {
    return (
        <div className={`grid grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg ${className}`}>
            {children}
        </div>
    );
};

export const TabsTrigger = ({ value, active, children, className = "" }) => {
    return (
        <button
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-md
        ${active
                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                } 
        ${className}`}
        >
            {children}
        </button>
    );
};

export const TabsContent = ({ value, active, children, className = "" }) => {
    if (!active) return null;
    return (
        <div className={`space-y-4 ${className}`}>
            {children}
        </div>
    );
};