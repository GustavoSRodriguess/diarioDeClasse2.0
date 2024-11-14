import React, { useState } from 'react';
import { Calendar, Clock, Users, FileText, Search, Eye } from 'lucide-react';
import { SubCard, CardContent, CardHeader, CardTitle } from "../../Generic/Card/SubCard";
import { ClassCard } from './subComponents/ClassCard';
import { ClassDetails } from './subComponents/ClassDetails';

export const PreviousClasses = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedClassDetails, setSelectedClassDetails] = useState(null);

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

    const handleViewDetails = (classItem) => {
        setSelectedClassDetails(classItem);
    }

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
                    <ClassCard
                        key={index}
                        classItem={classItem}
                        onViewDetails={handleViewDetails}
                    />
                ))}
            </div>

            <ClassDetails
                isOpen={!!selectedClassDetails}
                onClose={() => setSelectedClassDetails(null)}
                classData={selectedClassDetails}
            />
        </div>
    );
};