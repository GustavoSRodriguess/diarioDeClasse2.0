import React, { useState } from 'react';
import { SubCard, CardContent } from "../../Generic/Card/SubCard";
import { BookOpen, Plus, Edit2, Trash2 } from 'lucide-react';
import { Modal } from '../../Generic/Modal';

export const SubjectsSettings = () => {
    const [showNewSubjectModal, setShowNewSubjectModal] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null);

    const [subjects, setSubjects] = useState([
        { id: 1, name: "Matemática", code: "MAT" },
        { id: 2, name: "Português", code: "PORT" },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Disciplinas Cadastradas
                </h2>
                <button
                    onClick={() => setShowNewSubjectModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 mt-5 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Nova Disciplina
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject) => (
                    <SubCard key={subject.id}>
                        <CardContent className='pt-6'>
                            <div className="flex justify-between items-center">
                                <div className="flex items-start gap-3">
                                    <BookOpen className="w-5 h-5 text-purple-600 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                            {subject.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Código: {subject.code}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center text-purple-600">
                                    <button
                                        onClick={() => setEditingSubject(subject)}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => {/* aqui fica a logica do delete */}}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </SubCard>
                ))}
            </div>

            <Modal
                isOpen={showNewSubjectModal}
                onClose={() => setShowNewSubjectModal(false)}
                title="Nova Disciplina"
            >
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nome da Disciplina
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                            placeholder="Ex: Matemática"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Código
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                            placeholder="Ex: MAT"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setShowNewSubjectModal(false)}
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

            <Modal
                isOpen={!!editingSubject}
                onClose={() => setEditingSubject(null)}
                title="Editar Disciplina"
            >
            </Modal>
        </div>
    );
};