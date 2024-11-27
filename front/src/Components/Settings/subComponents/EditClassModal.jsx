import React, { useState, useEffect } from 'react';
import { Modal } from '../../Generic/Modal';
import { School } from 'lucide-react';

export const EditClassModal = ({ isOpen, onClose, classData, onSave }) => {
    const [formData, setFormData] = useState({
        nome: '',
        codigo: '',
        professorId: 1
    });

    useEffect(() => {
        if (classData) {
            setFormData({
                nome: classData.nome || '',
                codigo: classData.codigo || '',
                professorId: classData.professorId || 1,
                id: classData.id
            });
        }
    }, [classData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            professor: {
                id: 0,
                nome: "",
                email: "",
                turmas: null
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={classData?.id ? "Editar Turma" : "Nova Turma"}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Nome da Turma
                    </label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: Matemática Avançada"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Código da Turma
                    </label>
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        placeholder="Ex: MAT-ADV-2024"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400"
                        required
                    />
                </div>

                {/* Preview section */}
                <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Preview da Turma
                    </h4>
                    <div className="flex items-start gap-3">
                        <School className="w-5 h-5 text-purple-500 mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-200">
                                {formData.nome || 'Nome da Turma'}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {formData.codigo || 'Código da Turma'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        {classData?.id ? "Salvar Alterações" : "Criar"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};