import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ReusableForm = ({ 
  onSubmit, 
  title,
  fields = [
    { name: 'inputName', label: 'inputLabel', type: 'inputType', required: true },
  ]
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const newData = { ...prev, [name]: value };
        return newData;
    });
    
    if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    }
};

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === 'email' && formData[field.name] && 
          !/\S+@\S+\.\S+/.test(formData[field.name])) {
        newErrors[field.name] = 'Please enter a valid email';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const location = useLocation();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <label 
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
              {field.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            
            {field.customInput ? (
              field.customInput({
                value: formData[field.name] || '',
                onChange: handleChange,
                name: field.name
              })
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[field.name] 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300'
                }`}
              />
            )}
            
            {errors[field.name] && (
              <p className="text-sm text-red-500 mt-1">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
        <button 
          type="submit"
          className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit
        </button>
        {location.pathname === '/login' && (
            <div className="mt-4 flex justify-between text-sm text-gray-600">
            <Link to="/register" className="hover:underline">
              Não tem uma conta? Cadastre-se
            </Link>
            <Link to="/forgot-password" className="hover:underline">
              Esqueceu sua senha?
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReusableForm;