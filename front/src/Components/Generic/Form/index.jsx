import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ReusableForm = ({
  onSubmit,
  title,
  fields = [
    { name: 'inputName', label: 'inputLabel', type: 'inputType', required: true },
  ],
  error = '',
  isLoading = false,
  submitText = 'Submit'
}) => {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      return newData;
    });

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} é obrigatório`;
      }
      if (field.type === 'email' && formData[field.name] &&
        !/\S+@\S+\.\S+/.test(formData[field.name])) {
        newErrors[field.name] = 'Por favor, insira um email válido';
      }
    });
    setValidationErrors(newErrors);
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
    <div className="w-full max-w-md">
      <div className="bg-white py-8 px-6 shadow-2xl rounded-lg">
        <h2 className="text-center text-2xl font-bold text-purple-700 mb-8">{title}</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
                  name: field.name,
                  disabled: isLoading
                })
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                    ${validationErrors[field.name]
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300'
                    }`}
                />
              )}

              {validationErrors[field.name] && (
                <p className="text-sm text-red-500 mt-1">
                  {validationErrors[field.name]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium
              ${isLoading
                ? 'bg-purple-400 cursor-not-allowed'
                : 'bg-purple-700 hover:bg-purple-800'
              }
              transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
          >
            {isLoading ? 'Carregando...' : submitText}
          </button>

          {location.pathname === '/login' && (
            <div className="mt-6 flex flex-col space-y-2">
              <Link
                to="/register"
                className="text-sm text-center text-purple-700 hover:text-purple-900 hover:underline"
              >
                Não tem uma conta? Cadastre-se
              </Link>
              <Link
                to="/forgot-password"
                className="text-sm text-center text-purple-700 hover:text-purple-900 hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReusableForm;