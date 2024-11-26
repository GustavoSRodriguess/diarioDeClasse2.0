import React, { useState } from 'react';
import ReusableForm from '../../Components/Generic/Form';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        setError('');

        try {
            const professorData = {
                nome: formData.username,    // usando username como nome
                email: formData.email,
                turmas: []                  // iniciando com array vazio
            };

            const response = await fetch('https://diariodeclasse2-0.onrender.com/professores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(professorData)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar professor');
            }

            navigate('/login');
        } catch (err) {
            setError(err.message || 'Erro ao realizar cadastro');
        } finally {
            setIsLoading(false);
        }
    };

    const fields = [
        { name: 'username', label: 'Nome', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        {
            name: 'cpf', 
            label: 'CPF', 
            type: 'text', 
            customInput: (props) => (
                <InputMask
                    mask="999.999.999-99"
                    value={props.value || ''}
                    onChange={props.onChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name={props.name}
                />
            )
        },
        { name: 'endereco', label: 'Endereço', type: 'text' },
        { name: 'password', label: 'Senha', type: 'password' }
    ];

    return (
        <div>
            <ReusableForm 
                title="Cadastro de Professor"
                fields={fields}
                onSubmit={handleSubmit}
                error={error}
                isLoading={isLoading}
                submitText={isLoading ? "Cadastrando..." : "Cadastrar"}
            />
        </div>
    );
}