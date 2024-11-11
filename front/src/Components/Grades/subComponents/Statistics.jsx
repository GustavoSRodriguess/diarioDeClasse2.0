import React from 'react';
import { SubCard, CardContent, CardHeader, CardTitle } from "../../Generic/Card/SubCard";
import { Calculator, Users, BarChart2 } from 'lucide-react';
import { calculateAverage } from '../utils/calculations';
import { EVALUATION_TYPES } from '../utils/constants';
import PropTypes from 'prop-types';

export const Statistics = ({ students }) => {
    const getClassAverage = () => {
        if (students.length === 0) return '0.0';
        return (students.reduce((acc, student) =>
            acc + parseFloat(calculateAverage(student.evaluations)), 0) /
            students.length).toFixed(1);
    };

    const getApprovedCount = () => {
        return students.filter(student =>
            parseFloat(calculateAverage(student.evaluations)) >= 7
        ).length;
    };

    const getBestEvaluationAverage = () => {
        if (students.length === 0) return '0.0';
        const evaluationAverages = EVALUATION_TYPES.map(evalType =>
            students.reduce((acc, student) =>
                acc + (student.evaluations[evalType.id] || 0), 0) /
            students.length
        );
        return Math.max(...evaluationAverages).toFixed(1);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SubCard>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-32">
                        <Calculator className="w-8 h-8 text-purple-600 mb-2" />
                        <p className="text-2xl font-bold">{getClassAverage()}</p>
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
                        <p className="text-2xl font-bold">{getApprovedCount()}</p>
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
                        <p className="text-2xl font-bold">{getBestEvaluationAverage()}</p>
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
    );
};

Statistics.propTypes = {
    students: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            evaluations: PropTypes.object.isRequired
        })
    ).isRequired
};