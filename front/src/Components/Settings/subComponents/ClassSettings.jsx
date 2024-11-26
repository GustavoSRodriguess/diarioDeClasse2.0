import React, { useState } from 'react';
import { SubCard, CardContent, CardHeader, CardTitle } from "../../Generic/Card/SubCard";
import { School, Plus, Edit2, Trash2 } from 'lucide-react';
import { Modal } from '../../Generic/Modal';
import { EditClassModal } from './EditClassModal';

export const ClassSettings = () => {
    const [showNewClassModal, setShowNewClassModal] = useState(false);
    const [editingClass, setEditingClass] = useState(null);

    const [classes, setClasses] = useState([
        { id: 1, name: "7º Ano A", period: "Manhã", year: 2024 },
        { id: 2, name: "7º Ano B", period: "Tarde", year: 2024 },
    ]);

    const handleSaveEdit = (updatedClass) => {
        setClasses(prev => 
            prev.map(classItem => 
                classItem.id === updatedClass.id ? updatedClass : classItem
            )
        );
        setEditingClass(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Turmas Cadastradas
                </h2>
                <button
                    onClick={() => setShowNewClassModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 mt-5 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Nova Turma
                </button>

                <EditClassModal
                isOpen={!!editingClass}
                onClose={() => setEditingClass(null)}
                classData={editingClass}
                onSave={handleSaveEdit}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classes.map((classItem) => (
                    <SubCard key={classItem.id}>
                        <CardContent className='pt-6'>
                            <div className="flex justify-between items-cednter">
                                <div className="flex items-start gap-3">
                                    <School className="w-5 h-5 text-purple-600 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                            {classItem.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {classItem.period} • {classItem.year}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingClass(classItem)}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                    >
                                        <Edit2 className="w-4 h-4 text-gray-500" />
                                    </button>
                                    <button
                                        onClick={() => {/* Implementar delete */}}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </SubCard>
                ))}
            </div>

            <Modal
                isOpen={showNewClassModal}
                onClose={() => setShowNewClassModal(false)}
                title="Nova Turma"
            >
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nome da Turma
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                            placeholder="Ex: 7º Ano A"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Período
                        </label>
                        <select className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700">
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Ano Letivo
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                            placeholder="Ex: 2024"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setShowNewClassModal(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};