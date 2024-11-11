import React from 'react';
import { Modal } from '../../Generic/Modal';
import { Users } from 'lucide-react';
import { Badge } from '../../Generic/Table';
import { EVALUATION_TYPES } from '../utils/constants';
import { calculateAverage } from '../utils/calculations';

export const StudentDetails = ({
    student,
    onClose
}) => {
    const getStatusBadge = (average) => {
        if (average === '-') return <Badge variant="default">Sem notas</Badge>;
        const numAverage = parseFloat(average);
        if (numAverage >= 7) return <Badge variant="success">Aprovado</Badge>;
        if (numAverage >= 5) return <Badge variant="warning">Recuperação</Badge>;
        return <Badge variant="danger">Reprovado</Badge>;
    };

    return (
        <Modal
            isOpen={!!student}
            onClose={onClose}
            title="Detalhes do Aluno"
        >
            {student && (
                <div className="space-y-4 dark:text-gray-300">
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

                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Histórico de Evolução</h4>
                        <div className="h-32">
                            {/* Aqui você pode adicionar um gráfico de evolução usando recharts */}
                            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                                Gráfico de evolução do aluno
                            </div>
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