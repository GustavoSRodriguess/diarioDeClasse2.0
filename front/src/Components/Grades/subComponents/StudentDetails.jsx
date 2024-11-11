// Components/Grades/subComponents/StudentDetails.jsx
import React from 'react';
import { Modal } from '../../Generic/Modal';
import { Users } from 'lucide-react';
import { Badge } from '../../Generic/Table';
import { EVALUATION_TYPES } from '../utils/constants';
import { calculateAverage } from '../utils/calculations';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export const StudentDetails = ({
    student,
    onClose
}) => {
    // Função para preparar os dados do gráfico
    const prepareChartData = () => {
        if (!student) return [];

        return EVALUATION_TYPES.map(evalType => ({
            name: evalType.name,
            nota: student.evaluations[evalType.id] || 0,
            media: 7,
            mediaTurma: 7.5, // Média da turma para comparação
            melhorNota: 9.5  // Melhor nota da turma
        }));
    };

    const getStatusBadge = (average) => {
        if (average === '-') return <Badge variant="default">Sem notas</Badge>;
        const numAverage = parseFloat(average);
        if (numAverage >= 7) return <Badge variant="success">Aprovado</Badge>;
        if (numAverage >= 5) return <Badge variant="warning">Recuperação</Badge>;
        return <Badge variant="danger">Reprovado</Badge>;
    };

    // Customização do Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-2 border dark:border-gray-700 rounded-lg shadow">
                    <p className="font-medium">{label}</p>
                    {payload.map((entry, index) => (
                        <p
                            key={index}
                            className={`text-sm ${entry.name === 'nota' ? 'text-purple-600' : 'text-gray-500'}`}
                        >
                            {entry.name === 'nota' ? 'Nota: ' : 'Média: '}
                            {entry.value.toFixed(1)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <Modal
            isOpen={!!student}
            onClose={onClose}
            title="Detalhes do Aluno"
            size="lg"
        >
            {student && (
                <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-4 border-b dark:border-gray-700">
                        <Users className="w-6 h-6" />
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {EVALUATION_TYPES.map(evalType => (
                            <div
                                key={evalType.id}
                                className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {evalType.name}
                                        </p>
                                        <p className="text-lg font-semibold">
                                            {student.evaluations[evalType.id]?.toFixed(1) || '-'}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Peso: {evalType.weight}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Média Final
                                </p>
                                <p className="text-2xl font-bold">
                                    {calculateAverage(student.evaluations)}
                                </p>
                            </div>
                            {getStatusBadge(calculateAverage(student.evaluations))}
                        </div>
                    </div>

                    {/* Gráfico de Evolução */}
                    <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium mb-4">Evolução das Notas</h4>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={prepareChartData()}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        fontSize={12}
                                        tickMargin={10}
                                    />
                                    <YAxis
                                        domain={[0, 10]}
                                        ticks={[0, 2, 4, 6, 8, 10]}
                                        fontSize={12}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="nota"
                                        name="Nota"
                                        stroke="#9333EA"
                                        strokeWidth={2}
                                        dot={{
                                            fill: '#9333EA',
                                            strokeWidth: 2,
                                            r: 4
                                        }}
                                        activeDot={{
                                            r: 6,
                                            fill: '#9333EA',
                                            stroke: '#fff',
                                            strokeWidth: 2
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="nota"
                                        name="Nota"
                                        stroke="#9333EA"
                                        strokeWidth={2}
                                        animationDuration={1000}
                                        animationBegin={0}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};