import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Dropdown = ({
    trigger,
    items,
    header,
    className = "",
    itemClassName = "",
    headerClassName = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            {isOpen && (
                <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${className}`}>
                    <div className="py-1">
                        {header && (
                            <div className={`px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-200 ${headerClassName}`}>
                                {header}
                            </div>
                        )}

                        {items.map((item, index) => {
                            if (item.type === 'separator') {
                                return <div key={index} className="border-t border-gray-200" />;
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => {
                                        item.onClick?.();
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm flex items-center
                                        ${item.danger
                                            ? 'text-red-600 hover:bg-red-50'
                                            : 'text-gray-700 hover:bg-purple-50'
                                        }
                                        ${itemClassName}
                                        ${item.className || ''}
                                    `}
                                    disabled={item.disabled}
                                >
                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

Dropdown.propTypes = {
    trigger: PropTypes.node.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                label: PropTypes.string,
                icon: PropTypes.node,
                onClick: PropTypes.func,
                danger: PropTypes.bool,
                disabled: PropTypes.bool,
                className: PropTypes.string,
            }),
            PropTypes.shape({
                type: PropTypes.oneOf(['separator']),
            }),
        ])
    ).isRequired,
    header: PropTypes.string,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    headerClassName: PropTypes.string,
};