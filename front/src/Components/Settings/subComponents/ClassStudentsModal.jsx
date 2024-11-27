import React, { useState, useEffect } from 'react';
import { Modal } from '../../Generic/Modal';
import { Users, Search, UserPlus, X } from 'lucide-react';
import { Badge } from '../../Generic/Table';
import { NewStudentModal } from './NewStudentModal';

export const ClassStudentsModal = ({ isOpen, onClose, classData, onSave }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewStudentModal, setShowNewStudentModal] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (classData?.alunos) {
            setSelectedStudents(classData.alunos);
        }
    }, [classData]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('https://diariodeclasse2-0.onrender.com/alunos');
                const data = await response.json();
                setAllStudents(data);
            } catch (error) {
                console.error('Erro ao carregar alunos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Filtrar alunos baseado na busca e que não estão na turma atual
    const filteredStudents = allStudents.filter(student =>
        student.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedStudents.some(s => s.id === student.id) &&
        student.status === 1 && // Apenas alunos ativos
        student.nome.trim() !== '' // Excluir alunos sem nome
    );

    const handleAddStudent = (student) => {
        const newStudent = {
            id: student.id,
            nome: student.nome,
            numFaltas: student.numFaltas || 0,
            status: student.status,
            turmaId: classData?.id
        };
        setSelectedStudents([...selectedStudents, newStudent]);
        setSearchTerm('');
    };

    const handleRemoveStudent = (studentId) => {
        setSelectedStudents(selectedStudents.filter(s => s.id !== studentId));
    };

    const handleNewStudent = async (newStudent) => {
        try {
            const response = await fetch('https://diariodeclasse2-0.onrender.com/alunos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: newStudent.name,
                    numFaltas: 0,
                    status: 1,
                    turmaId: classData?.id
                })
            });

            if (response.ok) {
                const createdStudent = await response.json();
                setSelectedStudents([...selectedStudents, createdStudent]);
                setShowNewStudentModal(false);

                // Atualizar a lista completa de alunos
                const updatedResponse = await fetch('https://diariodeclasse2-0.onrender.com/alunos');
                const updatedData = await updatedResponse.json();
                setAllStudents(updatedData);
            }
        } catch (error) {
            console.error('Erro ao criar novo aluno:', error);
        }
    };

    if (loading) {
        return <div>Carregando alunos...</div>;
    }

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
                    <div className="flex gap-2 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar alunos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
                            />
                        </div>
                        <button
                            onClick={() => setShowNewStudentModal(true)}
                            className="flex items-center gap-1 px-3 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-100/10 rounded-lg"
                        >
                            <UserPlus className="w-4 h-4" />
                            Novo Aluno
                        </button>
                    </div>

                    {searchTerm && (
                        <div className="border border-gray-700 rounded-lg mb-4">
                            <div className="p-2 space-y-1 max-h-40 overflow-y-auto">
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map(student => (
                                        <div
                                            key={student.id}
                                            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700"
                                        >
                                            <span className="text-gray-200">{student.nome}</span>
                                            <button
                                                onClick={() => handleAddStudent(student)}
                                                className="p-1 text-purple-500 hover:bg-purple-100/10 rounded-full"
                                                title="Adicionar aluno"
                                            >
                                                <UserPlus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-gray-400">
                                        Nenhum aluno encontrado
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
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
                                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-200">{student.nome}</p>
                                            <p className="text-sm text-gray-400">
                                                Faltas: {student.numFaltas}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveStudent(student.id)}
                                            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-100/10 rounded-full"
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
                        className="px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onSave(selectedStudents)}
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