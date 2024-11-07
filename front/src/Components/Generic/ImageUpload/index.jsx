import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

export const ImageUpload = ({ currentImage, onImageUpload, className = "" }) => {
    const [previewUrl, setPreviewUrl] = useState(currentImage);
    const [isHovering, setIsHovering] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                onImageUpload(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsHovering(true);
    };

    const handleDragLeave = () => {
        setIsHovering(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsHovering(false);

        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                onImageUpload(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        onImageUpload(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="relative">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            <div
                className={`relative ${className}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {previewUrl ? (
                    <div className="relative group">
                        <img
                            src={previewUrl}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-2 border-purple-200"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Upload className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center
                            ${isHovering
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-purple-200 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                            }
                            transition-colors
                        `}
                    >
                        <Upload className="w-6 h-6 text-purple-500" />
                    </button>
                )}
            </div>
        </div>
    );
};