import React, { useState } from 'react';
import { Modal } from '../../Generic/Modal';
import { Users, Search, UserPlus, X } from 'lucide-react';
import { Badge } from '../../Generic/Table';
import { NewStudentModal } from './NewStudentModal';

export const ClassStudentsModal = ({ isOpen, onClose, classData, onSave }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewStudentModal, setShowNewStudentModal] = useState(false);

    const [allStudents] = useState([
        { id: 1, name: "Ana Silva", email: "ana@escola.com" },
        { id: 2, name: "João Pedro", email: "joao@escola.com" },
        { id: 3, name: "Maria Santos", email: "maria@escola.com" },
    ]);

    // Mock de alunos já na turma
    const [selectedStudents, setSelectedStudents] = useState(
        classData?.students || []
    );

    // Filtrar alunos baseado na busca
    const filteredStudents = allStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Verificar se um aluno já está selecionado
    const isStudentSelected = (studentId) => {
        return selectedStudents.some(s => s.id === studentId);
    };

    // Adicionar aluno
    const handleAddStudent = (student) => {
        if (!isStudentSelected(student.id)) {
            setSelectedStudents([...selectedStudents, student]);
        }
    };

    // Remover aluno
    const handleRemoveStudent = (studentId) => {
        setSelectedStudents(selectedStudents.filter(s => s.id !== studentId));
    };

    // Salvar alterações
    const handleSave = () => {
        onSave(selectedStudents);
        onClose();
    };

    const handleNewStudent = (newStudent) => {
        allStudents.push(newStudent);
        handleAddStudent(newStudent);
        setShowNewStudentModal(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Gerenciar Alunos - ${classData?.name}`}
            size="lg"
        >
            <div className="space-y-6">
                {/* Header com informações da turma */}
                <div className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-600" />
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                {classData?.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {selectedStudents.length} alunos matriculados
                            </p>
                        </div>
                    </div>
                    <Badge variant="default">
                        {classData?.period} • {classData?.year}
                    </Badge>
                </div>

                {/* Área de busca e adição de alunos */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Adicionar Alunos
                    </h4>
                    <button
                        onClick={() => setShowNewStudentModal(true)}
                        className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                        <UserPlus className="w-4 h-4" />
                        Novo Aluno
                    </button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar alunos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                        />
                    </div>
                </div>

                {/* Lista de alunos disponíveis */}
                {searchTerm && (
                    <div className="border rounded-lg dark:border-gray-700">
                        <div className="p-2 space-y-1 max-h-40 overflow-y-auto">
                            {filteredStudents.map(student => (
                                <div
                                    key={student.id}
                                    className={`flex items-center justify-between p-2 rounded-md ${
                                        isStudentSelected(student.id) 
                                            ? 'bg-purple-50 dark:bg-purple-900/20' 
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <div>
                                        <p className="font-medium">{student.name}</p>
                                        <p className="text-sm text-gray-500">{student.email}</p>
                                    </div>
                                    {!isStudentSelected(student.id) && (
                                        <button
                                            onClick={() => handleAddStudent(student)}
                                            className="p-1 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-full"
                                        >
                                            <UserPlus className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Lista de alunos selecionados */}
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
                                            <p className="font-medium">{student.name}</p>
                                            <p className="text-sm text-gray-500">{student.email}</p>
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

                {/* Botões de ação */}
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