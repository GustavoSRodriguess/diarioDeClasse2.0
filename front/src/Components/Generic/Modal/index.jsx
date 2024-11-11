import React, { useEffect } from 'react';
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

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50"
            onClick={handleBackdropClick}
        >
            <div
                className={`
                    relative w-full ${sizeClasses[size]} 
                    bg-[#1a1f2d] border border-gray-700
                    rounded-lg shadow-lg 
                    my-8 mx-auto
                    max-h-[90vh] overflow-hidden
                    ${className}
                `}
            >
                {/* Header com fundo escuro que cobre toda a largura */}
                {title && (
                    <div className="sticky top-0 z-10">
                        <div className="absolute inset-0 bg-[#1a1f2d] border-b border-gray-700" />
                        <div className="relative flex items-center justify-between p-4">
                            <h2 className="text-lg font-semibold text-gray-100">
                                {title}
                            </h2>
                            {showClose && (
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Conteúdo com scroll independente */}
                <div className="overflow-y-auto max-h-[calc(90vh-5rem)] scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
                    <div className="p-4">
                        {children}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }

                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #1f2937;
                }

                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background-color: #9333EA;
                    border-radius: 3px;
                }

                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background-color: #a855f7;
                }
            `}</style>
        </div>
    );
};