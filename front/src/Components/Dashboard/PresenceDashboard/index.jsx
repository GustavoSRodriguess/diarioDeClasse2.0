import React, { useState } from 'react';
import { Calendar, Clock, Users, FileText, Search, Eye } from 'lucide-react';
import { SubCard, CardContent, CardHeader, CardTitle } from "../../Generic/Card/SubCard";

export const PreviousClasses = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    //mock
    const classes = [
        {
            date: "2024-03-15",
            time: "07:30 - 09:10",
            class: "7º Ano A",
            subject: "Matemática",
            content: "Equações do 1º grau",
            totalStudents: 32,
            presentStudents: 30,
            observations: "Atividade avaliativa realizada"
        },
        {
            date: "2024-03-14",
            time: "09:30 - 11:10",
            class: "8º Ano B",
            subject: "Matemática",
            content: "Geometria - Áreas",
            totalStudents: 30,
            presentStudents: 28,
            observations: "Exercícios em grupo"
        },
    ];

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Consulta de Aulas Anteriores
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Visualize o histórico de aulas e presenças
                </p>
            </div>

            <SubCard className="mb-6">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Filtros
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Mês
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 text-gray-700 dark:text-gray-300"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    <option value="03">Março</option>
                                    <option value="02">Fevereiro</option>
                                    <option value="01">Janeiro</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Turma
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 text-gray-700 dark:text-gray-300"
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                >
                                    <option value="">Todas</option>
                                    <option value="7A">7º Ano A</option>
                                    <option value="8B">8º Ano B</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </SubCard>

            <div className="space-y-4">
                {classes.map((classItem, index) => (
                    <SubCard key={index}>
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 flex-grow">
                                    {/* Data e Hora */}
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-purple-600 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                {new Date(classItem.date).toLocaleDateString('pt-BR')}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <Clock className="w-4 h-4" />
                                                {classItem.time}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <FileText className="w-5 h-5 text-purple-600 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                {classItem.class} - {classItem.subject}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {classItem.content}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users className="w-5 h-5 text-purple-600 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                Presenças: {classItem.presentStudents}/{classItem.totalStudents}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {classItem.observations}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-6 md:mt-0 ml-0 md:ml-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Ver Detalhes
                                </button>
                            </div>
                        </CardContent>
                    </SubCard>
                ))}
            </div>
        </div>
    );
};