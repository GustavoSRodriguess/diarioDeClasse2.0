import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Checkbox } from '../../../Components/Generic/Table';
import { Page } from '../../../Components/Generic/Page';

const MAX_ABSENCES = 15;

//mock só pra testar enquanto n tem o bd
const mockStudentsByClass = {
    'A': [
        {
            id: 1,
            number: "01",
            name: "Shaolin Matador de porco",
            absences: 3,
            present: false
        },
        {
            id: 2,
            number: "02",
            name: "Favin do pneu",
            absences: 12,
            present: false
        }
    ],
    'B': [
        {
            id: 3,
            number: "01",
            name: "João Silva",
            absences: 5,
            present: false
        },
        {
            id: 4,
            number: "02",
            name: "Maria Santos",
            absences: 8,
            present: false
        }
    ],
    'C': [
        {
            id: 5,
            number: "01",
            name: "Pedro Costa",
            absences: 2,
            present: false
        },
        {
            id: 6,
            number: "02",
            name: "Ana Oliveira",
            absences: 14,
            present: false
        }
    ]
};

export const PresenceCheck = ({ classId = 'A' }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudentsData = async (classId) => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const data = mockStudentsByClass[classId] || [];
            setStudents(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar dados dos alunos. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentsData(classId);
    }, [classId]);

    const handleAttendance = (studentId, isPresent) => {
        setStudents(students.map(student => {
            if (student.id === studentId) {
                return {
                    ...student,
                    present: isPresent,
                    absences: isPresent ? student.absences : student.absences + 1
                };
            }
            return student;
        }));
    };

    const handleSaveAttendance = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Presenças salvas com sucesso!');
        } catch (err) {
            alert('Erro ao salvar presenças. Tente novamente.');
        }
    };

    const isAtRisk = (absences) => absences >= MAX_ABSENCES * 0.8;
    const hasFailed = (absences) => absences >= MAX_ABSENCES;

    if (loading) {
        return (
            <Page>
                <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
                    <div className="text-purple-700">Carregando dados da turma {classId}...</div>
                </div>
            </Page>
        );
    }

    if (error) {
        return (
            <Page>
                <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
                    <div className="text-red-600">{error}</div>
                </div>
            </Page>
        );
    }

    return (
        <Page>
            <div className="flex flex-col min-h-[calc(100vh-72px)]">
                <div className="mt-5 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-purple-700">Turma {classId}</h2>
                    <div className="text-sm text-gray-600">
                        Total de alunos: {students.length}
                    </div>
                </div>

                <div className="flex-grow flex flex-col">
                    <div className="flex-grow overflow-auto">
                        <Table className="h-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Nº</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead className="w-[150px]" align="center">Faltas</TableHead>
                                    <TableHead className="w-[150px]" align="center">Status</TableHead>
                                    <TableHead className="w-[100px]" align="center">Presente</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((student) => {
                                    const failed = hasFailed(student.absences);
                                    return (
                                        <TableRow
                                            key={student.id}
                                            onClick={() => !failed && handleAttendance(student.id, !student.present)}
                                            className={`${!failed ? 'cursor-pointer hover:bg-purple-50' : 'cursor-not-allowed bg-gray-50'} 
                                                      transition-colors duration-150 ease-in-out`}
                                        >
                                            <TableCell>{student.number}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell align="center">
                                                <div className='flex justify-center'>
                                                    <span className={`font-bold justify-center ${failed
                                                        ? 'text-red-500'
                                                        : isAtRisk(student.absences)
                                                            ? 'text-yellow-500'
                                                            : 'text-purple-500'
                                                        }`}>
                                                        {student.absences}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className='flex justify-center'>
                                                {failed ? (
                                                    <Badge variant="danger" className="gap-1">
                                                        <AlertCircle className="h-4 w-4 mr-1" />
                                                        Reprovado por Falta
                                                    </Badge>
                                                ) : isAtRisk(student.absences) ? (
                                                    <Badge variant="warning" className="gap-1">
                                                        <AlertCircle className="h-4 w-4 mr-1" />
                                                        Em Risco
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="success">
                                                        Regular
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                <div className="flex justify-center">
                                                    <Checkbox
                                                        checked={student.present}
                                                        readOnly
                                                        disabled={failed}
                                                        className={!failed ? 'cursor-pointer' : 'cursor-not-allowed'}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-8 mb-8">
                        <button
                            onClick={handleSaveAttendance}
                            className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Salvar Presenças
                        </button>
                    </div>
                </div>
            </div>
        </Page>
    );
};