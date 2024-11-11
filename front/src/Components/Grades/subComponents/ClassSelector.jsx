import React from 'react';
import { School, BookOpen, Users } from 'lucide-react';
import PropTypes from 'prop-types';

export const ClassSelector = ({
    selectedClass,
    setSelectedClass,
    selectedSubject,
    setSelectedSubject,
    availableSubjects,
    studentsCount,
    classes
}) => {
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
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    >
                        <option value="">Selecione uma turma</option>
                        {classes.map(classItem => (
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
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50 dark:text-gray-300"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 dark:text-gray-300">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <School className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium ">
                                {classes.find(c => c.id === selectedClass)?.name}
                            </span>
                        </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium">
                                {availableSubjects.find(s => s.id === selectedSubject)?.name}
                            </span>
                        </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium">{studentsCount} alunos</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

ClassSelector.propTypes = {
    selectedClass: PropTypes.number,
    setSelectedClass: PropTypes.func.isRequired,
    selectedSubject: PropTypes.number,
    setSelectedSubject: PropTypes.func.isRequired,
    availableSubjects: PropTypes.array.isRequired,
    studentsCount: PropTypes.number.isRequired,
    classes: PropTypes.array.isRequired
};

ClassSelector.defaultProps = {
    availableSubjects: [],
    classes: []
};