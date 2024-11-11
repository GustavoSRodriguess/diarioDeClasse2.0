import React from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { SubCard, CardContent, CardHeader, CardTitle } from "../../Generic/Card/SubCard";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from '../../Generic/Table';
import { calculateAverage } from '../utils/calculations';
import { EVALUATION_TYPES } from '../utils/constants';
import PropTypes from 'prop-types';

export const GradeTable = ({
    students,
    searchTerm,
    setSearchTerm,
    onStudentSelect
}) => {
    const getStatusBadge = (average) => {
        if (average === '-') return <Badge variant="default">Sem notas</Badge>;
        const numAverage = parseFloat(average);
        if (numAverage >= 7) return <Badge variant="success">Aprovado</Badge>;
        if (numAverage >= 5) return <Badge variant="warning">Recuperação</Badge>;
        return <Badge variant="danger">Reprovado</Badge>;
    };

    return (
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
                {students.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Aluno</TableHead>
                                {EVALUATION_TYPES.map(evalType => (
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
                            {students.map((student) => {
                                const average = calculateAverage(student.evaluations);
                                return (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.name}</TableCell>
                                        {EVALUATION_TYPES.map(evalType => (
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
                                                onClick={() => onStudentSelect(student)}
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
    );
};

GradeTable.propTypes = {
    students: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            evaluations: PropTypes.object.isRequired
        })
    ).isRequired,
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    onStudentSelect: PropTypes.func.isRequired
};