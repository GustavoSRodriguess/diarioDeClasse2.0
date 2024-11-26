import React, { useState, useEffect } from 'react';
import { Modal } from '../../Generic/Modal';
import { User } from 'lucide-react';

export const NewStudentModal = ({ isOpen, onClose, classData, onSave }) => {
    const [formData, setFormData] = useState({
        nome: '',
        turmaId: 1,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Atualiza turmaId sempre que classData mudar e estiver disponível
    useEffect(() => {
        if (classData && classData.id) {
            setFormData((prev) => ({
                ...prev,
                turmaId: classData.id,
            }));
        }
    }, [classData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        // Validação dos dados necessários
        if (!formData.nome || !formData.turmaId) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            setIsSubmitting(false);
            return;
        }

        // Extrair apenas os campos necessários para o cadastro
        const cadastroData = {
            nome: formData.nome,
            numFaltas: 0, // Valor padrão
            status: 1, // Valor padrão (Ex: 1 para ativo, ajuste conforme necessário)
            turmaId: formData.turmaId,
        };

        try {
            // Fazendo uma requisição POST para adicionar o aluno ao banco de dados
            const response = await fetch(`/turmas/${cadastroData.turmaId}/alunos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cadastroData),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar aluno');
            }

            const data = await response.json();

            onSave(data); // Passa o aluno salvo ao componente pai para atualizar a lista
            onClose();
        } catch (err) {
            console.error('Erro ao cadastrar aluno:', err);
            setError('Erro ao cadastrar aluno. Tente novamente mais tarde.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Novo Aluno"
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg space-y-4">
                    <div className="flex items-center gap-2 text-purple-600">
                        <User className="w-5 h-5" />
                        <h3 className="font-medium">Informações Básicas</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-4 py-2 ${isSubmitting ? 'bg-purple-400' : 'bg-purple-600'} text-white rounded-md hover:bg-purple-700`}
                    >
                        {isSubmitting ? 'Cadastrando...' : 'Cadastrar Aluno'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};
