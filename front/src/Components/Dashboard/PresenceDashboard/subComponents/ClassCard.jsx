import React from 'react';
import { Calendar, Clock, FileText, Users, Eye } from 'lucide-react';
import { SubCard, CardContent } from "../../../Generic/Card/SubCard";

export const ClassCard = ({ classItem, onViewDetails }) => {
    return (
        <SubCard>
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 flex-grow">
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-purple-600 mt-1" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                    {new Date(classItem.date).toLocaleDateString('pt-BR')}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Clock className="w-4 h-4" />
                                    {classItem.time}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-purple-600 mt-1" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                    {classItem.class} - {classItem.subject}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {classItem.content}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-purple-600 mt-1" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                    Presenças: {classItem.presentStudents}/{classItem.totalStudents}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {classItem.observations}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => onViewDetails(classItem)}
                        className="mt-6 md:mt-0 ml-0 md:ml-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        Ver Detalhes
                    </button>
                </div>
            </CardContent>
        </SubCard>
    );
};