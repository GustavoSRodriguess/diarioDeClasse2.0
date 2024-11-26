import React, { useState } from 'react';
import ReusableForm from '../../Components/Generic/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    if (!formData.email) {
      setError('Por favor, insira seu email');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await login(formData.email);

      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Email não encontrado');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Seu email'
    },
    {
      name: 'pwd',
      label: 'Senha',
      type: 'password',
      required: true,
      placeholder: 'Sua Senha'
    }
  ];

  return (
    <ReusableForm
      title="Entrar no Sistema"
      fields={fields}
      onSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
      submitText={isLoading ? "Entrando..." : "Entrar"}
    />
  );
}