import React from 'react';
import { Page } from '../../Components/Generic/Page';

import { CalendarDays, Users, ClipboardCheck } from "lucide-react";
import { Card } from '../../Components/Generic/Card';
import { useNavigate } from 'react-router-dom';

export const Presence = () => {

    const navigate = useNavigate();

    const cardData = [
        {
            title: "Turma A",
            description: "Registre a presença dos alunos na aula atual",
            icon: <ClipboardCheck className="h-8 w-8 text-purple-500" />,
            metrics: [
                { label: "01/11/2024", value: ":)" },
                { label: "Alunos Total", value: "150" }
            ],
            action: "Fazer Chamada",
            onClick: () => {
                navigate('check')
            }
        },
        {
            title: "Turma B",
            description: "Visualize o histórico de presenças das turmas",
            icon: <CalendarDays className="h-8 w-8 text-purple-500" />,
            metrics: [
                { label: "Teste", value: "45" },
                { label: "Último Registro", value: "Hoje" }
            ],
            action: "Ver Histórico",
            onClick: () => {
                console.log("Ir para histórico");
            }
        }
    ];

    return (
        <Page>
            <div className="grid gap-6 md:grid-cols-2 p-6">
                {cardData.map((card, index) => (
                    <Card
                        key={index}
                        {...card}
                    />
                ))}
            </div>
        </Page>
    );
};

export default Presence;