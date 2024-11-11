// Components/Grades/utils/constants.js
export const MOCK_STUDENTS = [
    {
        id: 1,
        name: "Ana Silva",
        evaluations: {
            prova1: 8.5,
            trabalho1: 9.0,
            participacao: 8.0,
            prova2: 7.5
        }
    },
    {
        id: 2,
        name: "João Pedro",
        evaluations: {
            prova1: 7.0,
            trabalho1: 8.5,
            participacao: 9.0,
            prova2: 8.0
        }
    }
];

export const MOCK_CLASSES = [
    { id: 1, name: "7º Ano A", period: "Manhã" },
    { id: 2, name: "7º Ano B", period: "Manhã" },
    { id: 3, name: "8º Ano A", period: "Tarde" },
];

export const MOCK_SUBJECTS = [
    { id: 1, name: "Matemática" },
    { id: 2, name: "Português" },
    { id: 3, name: "História" },
];

export const MOCK_TEACHER_SUBJECTS = [
    { classId: 1, subjectId: 1 }, // 7º A - Matemática
    { classId: 1, subjectId: 2 }, // 7º A - Português
    { classId: 2, subjectId: 1 }, // 7º B - Matemática
    { classId: 3, subjectId: 2 }, // 8º A - Português
];

export const EVALUATION_TYPES = [
    {
        id: 'prova1',
        name: 'Prova 1',
        weight: 0.3,
        type: 'prova',
        maxScore: 10
    },
    {
        id: 'trabalho1',
        name: 'Trabalho 1',
        weight: 0.2,
        type: 'trabalho',
        maxScore: 10
    },
    {
        id: 'participacao',
        name: 'Participação',
        weight: 0.2,
        type: 'participacao',
        maxScore: 10
    },
    {
        id: 'prova2',
        name: 'Prova 2',
        weight: 0.3,
        type: 'prova',
        maxScore: 10
    }
];