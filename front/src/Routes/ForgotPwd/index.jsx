import React from 'react';
import ReusableForm from '../../Components/Generic/Form';
import { useNavigate } from 'react-router-dom';


export default function ForgotPwd() {
    const handleSubmit = (formData) => {
        navigate('/login');
    };
    
  const navigate = useNavigate();
  const fields = [
    { name: 'email', label: 'Email To Retrieve Your Account', type: 'email', required: true },
  ];

  return (
    <div>
      <ReusableForm 
        title="Forgot Your Password?"
        fields={fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
