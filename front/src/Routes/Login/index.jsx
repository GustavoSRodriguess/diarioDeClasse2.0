import React from 'react';
import ReusableForm from '../../Components/Generic/Form';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();
  const handleSubmit = (formData) => {
    navigate('/');
  };

  const fields = [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true }
  ];

  return (
    <div>
      <ReusableForm 
        title="Sign In"
        fields={fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
