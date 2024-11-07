import React from 'react';

export const Toggle = ({ enabled, onChange }) => {
    return (
        <button
            onClick={() => onChange(!enabled)}
            className={`w-10 h-5 rounded-full relative transition-colors ${enabled ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
        >
            <span
                className={`
          block w-4 h-4 bg-white rounded-full absolute top-0.5
          transition-transform duration-200 ease-in-out
          ${enabled ? 'translate-x-5' : 'translate-x-0.5'}
        `}
            />
        </button>
    );
};