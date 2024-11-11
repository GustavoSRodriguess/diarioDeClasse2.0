import React from 'react';
import { BookOpen } from 'lucide-react';
import { SubCard, CardContent } from "../../Generic/Card/SubCard";

export const EmptyState = () => {
    return (
        <SubCard>
            <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">
                        Selecione uma turma e disciplina para gerenciar as avaliações
                    </p>
                </div>
            </CardContent>
        </SubCard>
    );
};