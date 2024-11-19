import React from 'react';
import { GraduationCap, Plus } from 'lucide-react';
import { useGrades } from './hooks/useGrades';
import { ClassSelector } from './subComponents/ClassSelector';
import { Statistics } from './subComponents/Statistics';
import { NewEvaluation } from './subComponents/NewEvaluation';
import { StudentDetails } from './subComponents/StudentDetails';
import { GradeTable } from './subComponents/GradeTable';
import { Tabs, TabsContent } from '../Generic/Tabs';
import { EmptyState } from './subComponents/EmptyState';
import {  MOCK_SUBJECTS, MOCK_TEACHER_SUBJECTS, MOCK_CLASSES } from './utils/constants';

export const GradesSystem = () => {
    const {
        selectedTab,
        setSelectedTab,
        showNewEvalModal,
        setShowNewEvalModal,
        searchTerm,
        setSearchTerm,
        selectedStudent,
        setSelectedStudent,
        selectedClass,
        setSelectedClass,
        selectedSubject,
        setSelectedSubject,
        filteredStudents,
        handleNewEvaluation
    } = useGrades();

    const availableSubjects = selectedClass
        ? MOCK_TEACHER_SUBJECTS
            .filter(ts => ts.classId === selectedClass)
            .map(ts => MOCK_SUBJECTS.find(s => s.id === ts.subjectId))
        : [];

    return (
        <div className="space-y-6 m-6">
            <div className="flex justify-between items-center">
                <h1 className="dark:text-gray-300 text-2xl font-bold flex items-center gap-2">
                    <GraduationCap className="w-8 h-8" />
                    Avaliações e Notas
                </h1>
                <button
                    onClick={() => setShowNewEvalModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    disabled={!selectedClass || !selectedSubject}
                >
                    <Plus className="w-4 h-4" />
                    Nova Avaliação
                </button>
            </div>

            <ClassSelector
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                availableSubjects={availableSubjects}
                studentsCount={filteredStudents.length}
                classes={MOCK_CLASSES}
            />

            {selectedClass && selectedSubject ? (
                <Tabs defaultValue="grades">
                    <TabsContent value="grades">
                        <GradeTable
                            students={filteredStudents}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onStudentSelect={setSelectedStudent}
                        />
                    </TabsContent>
                    <TabsContent value="stats">
                        <Statistics students={filteredStudents} />
                    </TabsContent>
                </Tabs>
            ) : (
                <EmptyState />
            )}

            <NewEvaluation
                isOpen={showNewEvalModal}
                onClose={() => setShowNewEvalModal(false)}
                onSubmit={handleNewEvaluation}
            />

            <StudentDetails
                student={selectedStudent}
                onClose={() => setSelectedStudent(null)}
            />
        </div>
    );
};