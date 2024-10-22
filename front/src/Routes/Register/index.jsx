import React from 'react';
import ReusableForm from '../../Components/Generic/Form';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        navigate('/login');
    };

    const fields = [
        { name: 'username', label: 'Username', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        {
            name: 'cpf', 
            label: 'CPF', 
            type: 'text', 
            required: true,
            customInput: (props) => (
                <InputMask
                    mask="999.999.999-99"
                    value={props.value || ''}
                    onChange={(e) => {
                        props.onChange(e);
                    }}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name={props.name}
                />
            )
            
        },
        { name: 'endereco', label: 'Endereço', type: 'text', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true }
    ];

    return (
        <div>
            <ReusableForm 
                title="Sign Up"
                fields={fields}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
