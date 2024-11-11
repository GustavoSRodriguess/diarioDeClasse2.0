// Components/Grades/utils/calculations.js
import { EVALUATION_TYPES } from './constants';

export const calculateAverage = (evaluations) => {
    if (!evaluations) return '-';
    
    let totalWeight = 0;
    let totalScore = 0;

    EVALUATION_TYPES.forEach(evalType => {
        if (evaluations[evalType.id]) {
            totalWeight += evalType.weight;
            totalScore += evaluations[evalType.id] * evalType.weight;
        }
    });

    return totalWeight > 0 ? (totalScore / totalWeight).toFixed(1) : '-';
};

export const getStatusBadge = (average) => {
    if (average === '-') return "default";
    const numAverage = parseFloat(average);
    if (numAverage >= 7) return "success";
    if (numAverage >= 5) return "warning";
    return "danger";
};

export const filterStudentsBySearch = (students, searchTerm) => {
    return students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export const getAvailableSubjects = (selectedClass, teacherSubjects, subjects) => {
    if (!selectedClass) return [];
    return teacherSubjects
        .filter(ts => ts.classId === selectedClass)
        .map(ts => subjects.find(s => s.id === ts.subjectId));
};