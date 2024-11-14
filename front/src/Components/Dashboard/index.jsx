import React, { useState } from 'react';
import { Users, BookOpen, AlertCircle, Clock, BarChart3, FileText, CheckCircle2 } from 'lucide-react';
import { Card } from '../Generic/Card';
import { StartClassModal } from './subComponents/StartClassModal';

const Dashboard = () => {
    const [isStartClassModalOpen, setIsStartClassModalOpen] = useState(false);
    const cards = [
        {
            title: "Chamada",
            description: "Realize a chamada das suas turmas e acompanhe a frequência dos alunos",
            icon: <Users className="w-8 h-8 text-purple-600" />,
            metrics: [
                { label: "Presentes Hoje", value: "28/32" },
                { label: "Turmas", value: "6" }
            ],
            action: "Fazer Chamada",
            onClick: () => console.log("chamadas")
        },
        {
            title: "Aulas de Hoje",
            description: "Confira suas próximas aulas e o conteúdo programado",
            icon: <Clock className="w-8 h-8 text-purple-600" />,
            metrics: [
                { label: "Restantes", value: "4" },
                { label: "Concluídas", value: "2" }
            ],
            action: "Ver Agenda",
            onClick: () => console.log("agenda")
        },
        {
            title: "Avaliações",
            description: "Gerencie as notas e atividades avaliativas das suas turmas",
            icon: <FileText className="w-8 h-8 text-purple-600" />,
            metrics: [
                { label: "Pendentes", value: "3" },
                { label: "Corrigidas", value: "12" }
            ],
            action: "Lançar Notas",
            onClick: () => console.log("avaliacoes")
        },
        {
            title: "Alunos em Risco",
            description: "Acompanhe alunos com baixa frequência ou desempenho",
            icon: <AlertCircle className="w-8 h-8 text-purple-600" />,
            metrics: [
                { label: "Frequência", value: "5" },
                { label: "Notas", value: "8" }
            ],
            action: "Ver Detalhes",
            onClick: () => console.log("alunos em risco")
        },
        {
            title: "Conteúdos",
            description: "Gerencie o conteúdo programático e materiais de aula",
            icon: <BookOpen className="w-8 h-8 text-purple-600" />,
            metrics: [
                { label: "Planejados", value: "24" },
                { label: "Realizados", value: "18" }
            ],
            action: "Gerenciar Conteúdos",
            onClick: () => console.log("conteudos")
        },
        {
            title: "Relatórios",
            description: "Visualize relatórios e estatísticas das suas turmas",
            icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
            metrics: [
                { label: "Turmas", value: "6" },
                { label: "Alunos", value: "186" }
            ],
            action: "Ver Relatórios",
            onClick: () => console.log("relatorios")
        }
    ];

    return (
        <div className="dark:bg-gray-900 p-6 space-y-6 bg-gray-50">
            {/* header de boas vindas */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="dark:text-gray-200 text-2xl font-bold text-gray-800">
                        Bom dia, (nome do professor)!
                    </h1>
                    <p className="dark:text-gray-400 text-gray-600">
                        Terça-feira, 5 de Novembro
                    </p>
                </div>
                <button
                    onClick={() => setIsStartClassModalOpen(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                    <Clock className="w-4 h-4" />
                    Iniciar Aula
                </button>
            </div>

            {/* Modal de Iniciar Aula */}
            <StartClassModal
                isOpen={isStartClassModalOpen}
                onClose={() => setIsStartClassModalOpen(false)}
            />

            {/* cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        title={card.title}
                        description={card.description}
                        icon={card.icon}
                        metrics={card.metrics}
                        action={card.action}
                        onClick={card.onClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;