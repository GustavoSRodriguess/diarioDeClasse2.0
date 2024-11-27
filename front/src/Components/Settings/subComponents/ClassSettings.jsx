import React, { useState, useEffect } from 'react';
import { SubCard, CardContent } from "../../Generic/Card/SubCard";
import { School, Plus, Edit2, Trash2, Users } from 'lucide-react';
import { EditClassModal } from './EditClassModal';
import { ClassStudentsModal } from './ClassStudentsModal';

export const ClassSettings = () => {
    const [editingClass, setEditingClass] = useState(null);
    const [managingStudentsFor, setManagingStudentsFor] = useState(null);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchClasses = async () => {
        try {
            const response = await fetch('https://diariodeclasse2-0.onrender.com/turmas');
            const data = await response.json();
            setClasses(data);
        } catch (error) {
            console.error('Erro ao carregar turmas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleSaveEdit = async (updatedClass) => {
        try {
            const classData = {
                nome: updatedClass.nome,
                codigo: updatedClass.codigo,
                professorId: updatedClass.professorId || 1, // Using 1 as default professorId
                professor: {
                    id: 0,
                    nome: "",
                    email: "",
                    turmas: null
                },
                alunos: updatedClass.alunos || []
            };

            if (updatedClass.id) {
                // Update existing class
                await fetch(`https://diariodeclasse2-0.onrender.com/turmas/${updatedClass.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...classData,
                        id: updatedClass.id
                    })
                });
            } else {
                // Create new class
                await fetch('https://diariodeclasse2-0.onrender.com/turmas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(classData)
                });
            }
            fetchClasses(); // Refresh the list
            setEditingClass(null);
        } catch (error) {
            console.error('Erro ao salvar turma:', error);
        }
    };

    const handleDelete = async (classId) => {
        if (window.confirm('Tem certeza que deseja excluir esta turma?')) {
            try {
                await fetch(`https://diariodeclasse2-0.onrender.com/turmas/${classId}`, {
                    method: 'DELETE'
                });
                fetchClasses(); // Refresh the list
            } catch (error) {
                console.error('Erro ao excluir turma:', error);
            }
        }
    };

    const handleSaveStudents = async (classId, students) => {
        try {
            const currentClass = classes.find(c => c.id === classId);
            if (currentClass) {
                await fetch(`https://diariodeclasse2-0.onrender.com/turmas/${classId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...currentClass,
                        alunos: students.map(student => ({
                            ...student,
                            turmaId: classId
                        }))
                    })
                });
                fetchClasses(); // Refresh the list
            }
            setManagingStudentsFor(null);
        } catch (error) {
            console.error('Erro ao salvar alunos:', error);
        }
    };

    if (loading) {
        return <div>Carregando turmas...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Turmas Cadastradas
                </h2>
                <button
                    onClick={() => setEditingClass({
                        nome: '',
                        codigo: '',
                        professorId: 1,
                        professor: {
                            id: 0,
                            nome: "",
                            email: "",
                            turmas: null
                        },
                        alunos: []
                    })}
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
                                            {classItem.nome}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Código: {classItem.codigo}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {classItem.alunos?.length || 0} alunos
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-purple-600">
                                    <button
                                        onClick={() => setManagingStudentsFor(classItem)}
                                        className="p-1 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-full"
                                        title="Gerenciar Alunos"
                                    >
                                        <Users className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setEditingClass(classItem)}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                        title="Editar Turma"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(classItem.id)}
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
                onSave={(students) => handleSaveStudents(managingStudentsFor?.id, students)}
            />
        </div>
    );
};