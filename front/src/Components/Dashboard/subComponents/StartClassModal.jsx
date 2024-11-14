import React, { useState } from 'react';
import { Modal } from '../../Generic/Modal';
import { BookOpen, Clock } from 'lucide-react';

export const StartClassModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        class: '',
        subject: '',
        content: '',
        duration: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Dados da aula:', formData);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // mock
    const classes = [
        { id: 1, name: "7º Ano A" },
        { id: 2, name: "7º Ano B" },
        { id: 3, name: "8º Ano A" }
    ];

    const subjects = [
        { id: 1, name: "Matemática" },
        { id: 2, name: "Português" },
        { id: 3, name: "História" }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Iniciar Nova Aula"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Turma
                        </label>
                        <select
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        >
                            <option value="">Selecione a turma</option>
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Disciplina
                        </label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        >
                            <option value="">Selecione a disciplina</option>
                            {subjects.map(subject => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Conteúdo
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <input
                            type="text"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Ex: Equações do 1º grau"
                            required
                            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Duração
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="Ex: 07:30 - 09:10"
                            required
                            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Observações (opcional)
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                        placeholder="Adicione observações sobre a aula..."
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        Iniciar Aula
                    </button>
                </div>
            </form>
        </Modal>
    );
};