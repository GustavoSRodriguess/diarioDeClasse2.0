import { useState } from 'react';
import { calculateAverage, filterStudentsBySearch } from '../utils/calculations';
import { MOCK_STUDENTS, EVALUATION_TYPES } from '../utils/constants';

export const useGrades = () => {
    const [selectedTab, setSelectedTab] = useState('grades');
    const [showNewEvalModal, setShowNewEvalModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const filteredStudents = filterStudentsBySearch(MOCK_STUDENTS, searchTerm);

    const handleNewEvaluation = (evaluationData) => {
        // temrinar logica
    };

    return {
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
    };
};