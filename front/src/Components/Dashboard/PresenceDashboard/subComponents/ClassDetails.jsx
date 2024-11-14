// components/Grades/subComponents/ClassDetails.jsx
import React from 'react';
import { Modal } from '../../../Generic/Modal';
import { Users, Book, Clock, Calendar } from 'lucide-react';

export const ClassDetails = ({ isOpen, onClose, classData }) => {
    if (!classData) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Detalhes da Aula"
            size="lg"
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>Data</span>
                        </div>
                        <p className="font-medium">{new Date(classData.date).toLocaleDateString('pt-BR')}</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>Horário</span>
                        </div>
                        <p className="font-medium">{classData.time}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Book className="w-4 h-4" />
                        <span>Conteúdo</span>
                    </div>
                    <p className="font-medium">{classData.content}</p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-b border-gray-600">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <Users className="w-4 h-4" />
                                <span>Frequência</span>
                            </div>
                            <p className="text-2xl font-bold">
                                {Math.round((classData.presentStudents / classData.totalStudents) * 100)}%
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Presentes</p>
                            <p className="font-medium">{classData.presentStudents}/{classData.totalStudents}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-medium">Observações</h3>
                    <p className="text-gray-600 dark:text-gray-400">{classData.observations}</p>
                </div>
            </div>
        </Modal>
    );
};