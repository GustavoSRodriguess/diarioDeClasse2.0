import React, { useState } from 'react';
import { SubCard, CardContent } from "../../Generic/Card/SubCard";
import { School, Plus, Edit2, Trash2, Users } from 'lucide-react';
import { EditClassModal } from './EditClassModal';
import { ClassStudentsModal } from './ClassStudentsModal';

export const ClassSettings = () => {
    const [editingClass, setEditingClass] = useState(null);
    const [managingStudentsFor, setManagingStudentsFor] = useState(null);
    const [classes, setClasses] = useState([
        { id: 1, name: "7º Ano A", period: "Manhã", year: 2024, students: [] },
        { id: 2, name: "7º Ano B", period: "Tarde", year: 2024, students: [] },
    ]);

    const handleSaveEdit = (updatedClass) => {
        setClasses(prev => 
            prev.map(classItem => 
                classItem.id === updatedClass.id ? updatedClass : classItem
            )
        );
        setEditingClass(null);
    };

    const handleSaveStudents = (students) => {
        setClasses(prev => 
            prev.map(classItem => 
                classItem.id === managingStudentsFor?.id 
                    ? { ...classItem, students } 
                    : classItem
            )
        );
        setManagingStudentsFor(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Turmas Cadastradas
                </h2>
                <button
                    onClick={() => setEditingClass({})}
                    className="bg-purple-600 text-white px-4 mt-5 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Nova Turma
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classes.map((classItem) => (
                    <SubCard key={classItem.id}>
                        <CardContent className='pt-6'>
                            <div className="flex justify-between items-center">
                                <div className="flex items-start gap-3">
                                    <School className="w-5 h-5 text-purple-600 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                            {classItem.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {classItem.period} • {classItem.year}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {classItem.students?.length || 0} alunos
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-purple-600">
                                    <button
                                        onClick={() => setManagingStudentsFor(classItem)}
                                        className="p-1 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-full "
                                        title="Gerenciar Alunos"
                                    >
                                        <Users className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setEditingClass(classItem)}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                        title="Editar Turma"
                                    >
                                        <Edit2 className="w-4 h-4 " />
                                    </button>
                                    <button
                                        onClick={() => {/* Implementar delete */}}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                        title="Excluir Turma"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </SubCard>
                ))}
            </div>

            {/* Modais */}
            <EditClassModal
                isOpen={!!editingClass}
                onClose={() => setEditingClass(null)}
                classData={editingClass}
                onSave={handleSaveEdit}
            />

            <ClassStudentsModal
                isOpen={!!managingStudentsFor}
                onClose={() => setManagingStudentsFor(null)}
                classData={managingStudentsFor}
                onSave={handleSaveStudents}
            />
        </div>
    );
};