import React, { useState } from 'react';
import { SubCard, CardContent, CardHeader, CardTitle } from "../Generic/Card/SubCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../Generic/Tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from '../Generic/Table';
import { Modal } from '../Generic/Modal';
import {
    GraduationCap,
    Plus,
    FileText,
    BarChart2,
    Users,
    Search,
    ExternalLink,
    ClipboardList,
    Calculator,
    BookOpen,
    School
} from 'lucide-react';

// Mock de dados de exemplo
const mockStudents = [
    {
        id: 1,
        name: "Ana Silva",
        evaluations: {
            prova1: 8.5,
            trabalho1: 9.0,
            participacao: 8.0,
            prova2: 7.5
        }
    },
    {
        id: 2,
        name: "João Pedro",
        evaluations: {
            prova1: 7.0,
            trabalho1: 8.5,
            participacao: 9.0,
            prova2: 8.0
        }
    }
];

const mockEvaluationTypes = [
    {
        id: 'prova1',
        name: 'Prova 1',
        weight: 0.3,
        type: 'prova',
        maxScore: 10
    },
    {
        id: 'trabalho1',
        name: 'Trabalho 1',
        weight: 0.2,
        type: 'trabalho',
        maxScore: 10
    },
    {
        id: 'participacao',
        name: 'Participação',
        weight: 0.2,
        type: 'participacao',
        maxScore: 10
    },
    {
        id: 'prova2',
        name: 'Prova 2',
        weight: 0.3,
        type: 'prova',
        maxScore: 10
    }
];

const mockClasses = [
    { id: 1, name: "7º Ano A", period: "Manhã" },
    { id: 2, name: "7º Ano B", period: "Manhã" },
    { id: 3, name: "8º Ano A", period: "Tarde" },
];

const mockSubjects = [
    { id: 1, name: "Matemática" },
    { id: 2, name: "Português" },
    { id: 3, name: "História" },
];

const mockTeacherSubjects = [
    { classId: 1, subjectId: 1 }, // 7º A - Matemática
    { classId: 1, subjectId: 2 }, // 7º A - Português
    { classId: 2, subjectId: 1 }, // 7º B - Matemática
    { classId: 3, subjectId: 2 }, // 8º A - Português
];

export const EvaluationSystem = () => {
    // Estados
    const [selectedTab, setSelectedTab] = useState('grades');
    const [showNewEvalModal, setShowNewEvalModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [newEvaluation, setNewEvaluation] = useState({
        title: '',
        type: '',
        weight: '',
        maxScore: ''
    });

    // Funções auxiliares
    const calculateAverage = (evaluations) => {
        let totalWeight = 0;
        let totalScore = 0;

        mockEvaluationTypes.forEach(evalType => {
            if (evaluations[evalType.id]) {
                totalWeight += evalType.weight;
                totalScore += evaluations[evalType.id] * evalType.weight;
            }
        });

        return totalWeight > 0 ? (totalScore / totalWeight).toFixed(1) : '-';
    };

    const getStatusBadge = (average) => {
        if (average === '-') return <Badge variant="default">Sem notas</Badge>;
        const numAverage = parseFloat(average);
        if (numAverage >= 7) return <Badge variant="success">Aprovado</Badge>;
        if (numAverage >= 5) return <Badge variant="warning">Recuperação</Badge>;
        return <Badge variant="danger">Reprovado</Badge>;
    };

    // Filtragem de dados
    const availableSubjects = selectedClass
        ? mockTeacherSubjects
            .filter(ts => ts.classId === selectedClass)
            .map(ts => mockSubjects.find(s => s.id === ts.subjectId))
        : [];

    const filteredStudents = mockStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handler para nova avaliação
    const handleNewEvaluation = () => {
        // Implementar lógica de adicionar avaliação
        setShowNewEvalModal(false);
        setNewEvaluation({
            title: '',
            type: '',
            weight: '',
            maxScore: ''
        });
    };

    // Componente de seleção de turma e disciplina
    const ClassAndSubjectSelector = () => {
        return (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Seletor de Turma */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Turma
                        </label>
                        <select
                            value={selectedClass || ''}
                            onChange={(e) => {
                                const value = e.target.value ? Number(e.target.value) : null;
                                setSelectedClass(value);
                                setSelectedSubject(null);
                            }}
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="">Selecione uma turma</option>
                            {mockClasses.map(classItem => (
                                <option key={classItem.id} value={classItem.id}>
                                    {classItem.name} - {classItem.period}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Seletor de Disciplina */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Disciplina
                        </label>
                        <select
                            value={selectedSubject || ''}
                            onChange={(e) => setSelectedSubject(e.target.value ? Number(e.target.value) : null)}
                            disabled={!selectedClass}
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50"
                        >
                            <option value="">Selecione uma disciplina</option>
                            {availableSubjects.map(subject => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Cards informativos */}
                {selectedClass && selectedSubject && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                            <div className="flex items-center gap-2">
                                <School className="w-5 h-5 text-purple-600" />
                                <span className="text-sm font-medium">
                                    {mockClasses.find(c => c.id === selectedClass)?.name}
                                </span>
                            </div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                                <span className="text-sm font-medium">
                                    {mockSubjects.find(s => s.id === selectedSubject)?.name}
                                </span>
                            </div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-600" />
                                <span className="text-sm font-medium">{filteredStudents.length} alunos</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <GraduationCap className="w-8 h-8" />
                    Avaliações e Notas
                </h1>
                <button
                    onClick={() => setShowNewEvalModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    disabled={!selectedClass || !selectedSubject}
                >
                    <Plus className="w-4 h-4" />
                    Nova Avaliação
                </button>
            </div>

            <ClassAndSubjectSelector />

            {selectedClass && selectedSubject ? (
                <>
                    <Tabs defaultValue="grades">
                        <TabsList>
                            <TabsTrigger
                                value="grades"
                                active={selectedTab === 'grades'}
                                onClick={() => setSelectedTab('grades')}
                            >
                                <ClipboardList className="w-4 h-4 mr-2" />
                                Notas
                            </TabsTrigger>
                            <TabsTrigger
                                value="stats"
                                active={selectedTab === 'stats'}
                                onClick={() => setSelectedTab('stats')}
                            >
                                <BarChart2 className="w-4 h-4 mr-2" />
                                Estatísticas
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="grades" active={selectedTab === 'grades'}>
                            <SubCard>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>Notas da Turma</CardTitle>
                                        <div className="relative w-64">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                placeholder="Buscar aluno..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-9 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {filteredStudents.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Aluno</TableHead>
                                                    {mockEvaluationTypes.map(evalType => (
                                                        <TableHead key={evalType.id}>
                                                            {evalType.name}
                                                            <span className="text-xs text-gray-500 block">
                                                                Peso: {evalType.weight}
                                                            </span>
                                                        </TableHead>
                                                    ))}
                                                    <TableHead>Média</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredStudents.map((student) => {
                                                    const average = calculateAverage(student.evaluations);
                                                    return (
                                                        <TableRow key={student.id}>
                                                            <TableCell>{student.name}</TableCell>
                                                            {mockEvaluationTypes.map(evalType => (
                                                                <TableCell key={evalType.id}>
                                                                    {student.evaluations[evalType.id]?.toFixed(1) || '-'}
                                                                </TableCell>
                                                            ))}
                                                            <TableCell className="font-bold">
                                                                {average}
                                                            </TableCell>
                                                            <TableCell>
                                                                {getStatusBadge(average)}
                                                            </TableCell>
                                                            <TableCell>
                                                                <button
                                                                    onClick={() => setSelectedStudent(student)}
                                                                    className="text-purple-600 hover:text-purple-700"
                                                                >
                                                                    <ExternalLink className="w-4 h-4" />
                                                                </button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            <p>Nenhum aluno encontrado</p>
                                        </div>
                                    )}
                                </CardContent>
                            </SubCard>
                        </TabsContent>

                        <TabsContent value="stats" active={selectedTab === 'stats'}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <SubCard>
                                    <CardContent>
                                        <div className="flex flex-col items-center justify-center h-32">
                                            <Calculator className="w-8 h-8 text-purple-600 mb-2" />
                                            <p className="text-2xl font-bold">
                                                {(filteredStudents.reduce((acc, student) =>
                                                    acc + parseFloat(calculateAverage(student.evaluations)), 0) /
                                                    filteredStudents.length).toFixed(1)}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Média da Turma
                                            </p>
                                        </div>
                                    </CardContent>
                                </SubCard>

                                <SubCard>
                                    <CardContent>
                                        <div className="flex flex-col items-center justify-center h-32">
                                            <Users className="w-8 h-8 text-purple-600 mb-2" />
                                            <p className="text-2xl font-bold">
                                                {filteredStudents.filter(student =>
                                                    parseFloat(calculateAverage(student.evaluations)) >= 7
                                                ).length}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Alunos Aprovados
                                            </p>
                                        </div>
                                    </CardContent>
                                </SubCard>

                                <SubCard>
                                    <CardContent>
                                        <div className="flex flex-col items-center justify-center h-32">
                                            <BarChart2 className="w-8 h-8 text-purple-600 mb-2" />
                                            <p className="text-2xl font-bold">
                                                {Math.max(...mockEvaluationTypes.map(evalType =>
                                                    filteredStudents.reduce((acc, student) =>
                                                        acc + (student.evaluations[evalType.id] || 0), 0) /
                                                    filteredStudents.length
                                                )).toFixed(1)}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Melhor Média por Avaliação
                                            </p>
                                        </div>
                                    </CardContent>
                                </SubCard>

                                <SubCard className="col-span-full">
                                    <CardHeader>
                                        <CardTitle>Distribuição de Notas</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-64">
                                            {/* Aqui você pode adicionar um gráfico usando recharts */}
                                            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                                                Gráfico de distribuição de notas
                                            </div>
                                        </div>
                                    </CardContent>
                                </SubCard>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Modal de Nova Avaliação */}
                    <Modal
                        isOpen={showNewEvalModal}
                        onClose={() => setShowNewEvalModal(false)}
                        title="Nova Avaliação"
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Título</label>
                                <input
                                    type="text"
                                    value={newEvaluation.title}
                                    onChange={(e) => setNewEvaluation(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="Ex: Prova 1, Trabalho em Grupo..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tipo</label>
                                <select
                                    value={newEvaluation.type}
                                    onChange={(e) => setNewEvaluation(prev => ({ ...prev, type: e.target.value }))}
                                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                >
                                    <option value="">Selecione o tipo</option>
                                    <option value="prova">Prova</option>
                                    <option value="trabalho">Trabalho</option>
                                    <option value="participacao">Participação</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Peso</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={newEvaluation.weight}
                                    onChange={(e) => setNewEvaluation(prev => ({ ...prev, weight: e.target.value }))}
                                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="Ex: 0.3 (30%)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nota Máxima</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={newEvaluation.maxScore}
                                    onChange={(e) => setNewEvaluation(prev => ({ ...prev, maxScore: e.target.value }))}
                                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="Ex: 10"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setShowNewEvalModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleNewEvaluation}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </Modal>

                    {/* Modal de Detalhes do Aluno */}
                    <Modal
                        isOpen={!!selectedStudent}
                        onClose={() => setSelectedStudent(null)}
                        title="Detalhes do Aluno"
                    >
                        {selectedStudent && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-4 border-b dark:border-gray-700">
                                    <Users className="w-6 h-6" />
                                    <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(selectedStudent.evaluations).map(([key, value]) => (
                                        <div key={key} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {mockEvaluationTypes.find(e => e.id === key)?.name}
                                            </p>
                                            <p className="text-lg font-semibold">{value.toFixed(1)}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Média Final</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-bold">
                                            {calculateAverage(selectedStudent.evaluations)}
                                        </p>
                                        {getStatusBadge(calculateAverage(selectedStudent.evaluations))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Modal>
                </>
            ) : (
                <SubCard>
                    <CardContent>
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">
                                Selecione uma turma e disciplina para gerenciar as avaliações
                            </p>
                        </div>
                    </CardContent>
                </SubCard>
            )}
        </div>
    );
};