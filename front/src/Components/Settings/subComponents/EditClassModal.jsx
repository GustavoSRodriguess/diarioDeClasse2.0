import React, { useState, useEffect } from 'react';
import { Modal } from '../../Generic/Modal';
import { School } from 'lucide-react';

export const EditClassModal = ({ isOpen, onClose, classData, onSave }) => {
    const [formData, setFormData] = useState({
        name: classData?.name || '',
        period: classData?.period || '',
        year: classData?.year || new Date().getFullYear()
    });

    useEffect(() => {
        if (classData) {
            setFormData({
                name: classData.name,
                period: classData.period,
                year: classData.year
            });
        }
    }, [classData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: classData.id });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Editar Turma"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nome da Turma
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        placeholder="Ex: 7º Ano A"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Período
                    </label>
                    <select
                        name="period"
                        value={formData.period}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        required
                    >
                        <option value="">Selecione um período</option>
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noite">Noite</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ano Letivo
                    </label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        min={2024}
                        max={2100}
                        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        required
                    />
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg space-y-2">
                    <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300">
                        Preview da Turma
                    </h4>
                    <div className="flex items-center gap-2">
                        <School className="w-5 h-5 text-purple-600" />
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                {formData.name || 'Nome da Turma'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {formData.period ? `${formData.period} • ${formData.year}` : 'Período e Ano'}
                            </p>
                        </div>
                    </div>
                </div>

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
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </Modal>
    );
};