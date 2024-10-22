import React from 'react';
import ReusableForm from '../../Components/Generic/Form';

export default function Login() {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };

  const fields = [
    { name: 'username', label: 'Username', type: 'text', required: true },
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
