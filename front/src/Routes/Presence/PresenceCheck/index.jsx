import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Checkbox } from '../../../Components/Generic/Table';
import { Page } from '../../../Components/Generic/Page';

const MAX_ABSENCES = 15;

export const PresenceCheck = ({id = 1}) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudentsData = async (id) => {
        setLoading(true); // Ativa o estado de carregamento
        try {
            // Fazendo a requisição para o endpoint com a URL relativa (utilizando proxy em package.json)
            const response = await fetch(`/turmas/${id}`);
    
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Falha ao buscar dados da turma');
            }
    
            // Converte a resposta para JSON
            const data = await response.json();
    
            // Acessa a lista de alunos do objeto retornado
            const studentsData = data.alunos || []; // Garante que seja um array
    
            setStudents(studentsData); // Atualiza o estado dos alunos
            setError(null); // Remove qualquer mensagem de erro
        } catch (err) {
            console.error('Erro ao buscar os dados dos alunos:', err); // Log para depuração
            setError('Erro ao carregar dados dos alunos. Tente novamente mais tarde.');
            setStudents([]); // Define como array vazio em caso de erro para evitar problemas com .map()
        } finally {
            setLoading(false); // Desativa o estado de carregamento
        }
    };

    useEffect(() => {
        fetchStudentsData(id);
    }, [id]);

    const handleAttendance = (studentId, isPresent) => {
        setStudents(students.map(student => {
            if (student.id === studentId) {
                return {
                    ...student,
                    present: isPresent,
                    numFaltas: isPresent ? student.numFaltas : student.numFaltas + 1 // Ajustando para numFaltas
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
                    <div className="text-purple-700">Carregando dados da turma {id}...</div>
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
                    <h2 className="text-2xl font-bold text-purple-700">Turma {id}</h2>
                    <div className="dark:text-gray-300 text-sm text-gray-600">
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
                                    const failed = hasFailed(student.numFaltas); // Ajuste para numFaltas
                                    return (
                                        <TableRow
                                            key={student.id}
                                            onClick={() => !failed && handleAttendance(student.id, !student.present)}
                                            className={`${!failed ? 'cursor-pointer hover:bg-purple-50' : 'cursor-not-allowed hover:bg-gray-50'} 
                                                      transition-colors duration-150 ease-in-out`}
                                        >
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell>{student.nome}</TableCell>
                                            <TableCell align="center">
                                                <div className='flex justify-center'>
                                                    <span className={`font-bold justify-center ${failed
                                                        ? 'text-red-500'
                                                        : isAtRisk(student.numFaltas)
                                                            ? 'text-yellow-500'
                                                            : 'text-purple-500'
                                                        }`}>
                                                        {student.numFaltas} {/* Ajuste para numFaltas */}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className='flex justify-center'>
                                                {failed ? (
                                                    <Badge variant="danger" className="gap-1">
                                                        <AlertCircle className="h-4 w-4 mr-1" />
                                                        Reprovado por Falta
                                                    </Badge>
                                                ) : isAtRisk(student.numFaltas) ? (
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