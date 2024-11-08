import React, { useEffect} from 'react';
import { X } from 'lucide-react';

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    className = "",
    showClose = true,
    size = "md" // sm, md, lg, xl
}) => {
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-4xl'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div
                className={`
          w-full ${sizeClasses[size]} 
          bg-white dark:bg-gray-800 
          rounded-lg shadow-lg 
          relative 
          ${className}
        `}
            >
                {/* Cabeçalho da Modal */}
                {title && (
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {title}
                        </h2>
                        {showClose && (
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        )}
                    </div>
                )}

                {/* Conteúdo da Modal */}
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};