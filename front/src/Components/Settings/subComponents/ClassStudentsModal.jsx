import React, { useState, useEffect } from 'react';
import { Modal } from '../../Generic/Modal';
import { Users, Search, UserPlus, X } from 'lucide-react';
import { Badge } from '../../Generic/Table';
import { NewStudentModal } from './NewStudentModal';

export const ClassStudentsModal = ({ isOpen, onClose, classData, onSave }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewStudentModal, setShowNewStudentModal] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        if (classData?.alunos) {
            setSelectedStudents(classData.alunos);
        }
    }, [classData]);

    const handleAddStudent = (student) => {
        const newStudent = {
            id: Date.now(), // Temporary ID for new students
            nome: student.name,
            numFaltas: 0,
            status: 1,
            turmaId: classData?.id
        };
        setSelectedStudents([...selectedStudents, newStudent]);
    };

    const handleRemoveStudent = (studentId) => {
        setSelectedStudents(selectedStudents.filter(s => s.id !== studentId));
    };

    const handleNewStudent = (newStudent) => {
        const studentData = {
            id: Date.now(),
            nome: newStudent.name,
            numFaltas: 0,
            status: 1,
            turmaId: classData?.id
        };
        setSelectedStudents([...selectedStudents, studentData]);
        setShowNewStudentModal(false);
    };

    const handleSave = () => {
        onSave(selectedStudents);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Gerenciar Alunos - ${classData?.nome}`}
            size="lg"
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-600" />
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                {classData?.nome}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {selectedStudents.length} alunos matriculados
                            </p>
                        </div>
                    </div>
                    <Badge variant="default">
                        Código: {classData?.codigo}
                    </Badge>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Adicionar Alunos
                    </h4>
                    <button
                        onClick={() => setShowNewStudentModal(true)}
                        className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1 mb-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        Novo Aluno
                    </button>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Alunos Matriculados
                    </h4>
                    <div className="border rounded-lg dark:border-gray-700">
                        {selectedStudents.length > 0 ? (
                            <div className="p-2 space-y-1 max-h-60 overflow-y-auto">
                                {selectedStudents.map(student => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <div>
                                            <p className="font-medium">{student.nome}</p>
                                            <p className="text-sm text-gray-500">
                                                Faltas: {student.numFaltas}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveStudent(student.id)}
                                            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>Nenhum aluno matriculado</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        Salvar Alterações
                    </button>
                </div>

                <NewStudentModal
                    isOpen={showNewStudentModal}
                    onClose={() => setShowNewStudentModal(false)}
                    onSave={handleNewStudent}
                />
            </div>
        </Modal>
    );
};