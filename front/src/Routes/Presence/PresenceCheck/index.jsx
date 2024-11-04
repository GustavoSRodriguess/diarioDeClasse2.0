import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge,Checkbox } from '../../../Components/Generic/Table';
import { Page } from '../../../Components/Generic/Page';

const MAX_ABSENCES = 15;

export const PresenceCheck = ({ initialData = [] }) => {
    const [students, setStudents] = useState(initialData.length ? initialData : [
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
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        },
        {
            id: 3,
            number: "03",
            name: "Palio",
            absences: 16,
            present: false
        }
    ]);

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

    const isAtRisk = (absences) => absences >= MAX_ABSENCES * 0.8;
    const hasFailed = (absences) => absences >= MAX_ABSENCES;

    // tem que verificar qual jeito fica melhor, assim ou sem as divs
    return (
        <Page>
            <div className="flex flex-col h-[80vh]">
                <div className="flex-1 overflow-auto">
                    <Table>
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
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.number}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell align="center">
                                        <span className={`font-bold ${hasFailed(student.absences)
                                                ? 'text-red-500'
                                                : isAtRisk(student.absences)
                                                    ? 'text-yellow-500'
                                                    : 'text-purple-500'
                                            }`}>
                                            {student.absences}
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        {hasFailed(student.absences) ? (
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
                                                onChange={(e) => handleAttendance(student.id, e.target.checked)}
                                                disabled={hasFailed(student.absences)}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-5">
                    <button className='w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'>
                        Teste
                    </button>
                </div>
            </div>
        </Page>
    );
};