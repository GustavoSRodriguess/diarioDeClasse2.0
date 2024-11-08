import React, { useState } from 'react';
import { SubCard, CardContent, CardHeader, CardTitle } from "../Generic/Card/SubCard";
import {
    Calendar as CalendarIcon,
    Clock,
    Plus,
    Tag,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { NewEventModal } from '../Generic/Modal/NewEventModal';

// Esse vai ficar comentado pq é bem complexo

const MONTHS = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Mock de eventos como estado inicial
const initialEvents = [
    {
        id: 1,
        title: "Prova de Matemática - 7º Ano",
        date: "2024-03-15",
        type: "avaliacao",
        description: "Conteúdo: Equações do 1º grau"
    },
    {
        id: 2,
        title: "Feriado - Páscoa",
        date: "2024-03-29",
        type: "feriado",
        description: "Feriado Nacional"
    },
    {
        id: 3,
        title: "Conselho de Classe",
        date: "2024-03-20",
        type: "reuniao",
        description: "Avaliação do primeiro bimestre"
    }
];

const EventTypeTag = ({ type }) => {
    const types = {
        avaliacao: { bg: "bg-purple-100 dark:bg-purple-900", text: "text-purple-800 dark:text-purple-200", label: "Avaliação" },
        feriado: { bg: "bg-red-100 dark:bg-red-900", text: "text-red-800 dark:text-red-200", label: "Feriado" },
        reuniao: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-800 dark:text-blue-200", label: "Reunião" },
        aula: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-800 dark:text-green-200", label: "Aula Especial" },
        evento: { bg: "bg-yellow-100 dark:bg-yellow-900", text: "text-yellow-800 dark:text-yellow-200", label: "Evento" }
    };

    const style = types[type] || types.evento;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
            {style.label}
        </span>
    );
};

export const AcademicCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [events, setEvents] = useState(initialEvents);

    // Funções auxiliares para manipulação de datas
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    // Navegação entre meses
    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    // Função para criar novos eventos
    const handleEventCreate = (eventData) => {
        const baseId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;

        // Criar um evento para cada data selecionada
        const newEvents = eventData.dates.map((date, index) => ({
            id: baseId + index,
            title: eventData.title,
            description: eventData.description,
            type: eventData.type,
            date: date
        }));

        setEvents(prevEvents => [...prevEvents, ...newEvents]);
        setShowEventModal(false);
    };

    // Função para deletar evento
    const handleDeleteEvent = (eventId) => {
        setEvents(events.filter(event => event.id !== eventId));
    };

    // Renderiza os dias do calendário
    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Dias do mês anterior
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div key={`empty-${i}`} className="h-24 bg-gray-50 dark:bg-gray-800/50" />
            );
        }

        // Dias do mês atual
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateString = date.toISOString().split('T')[0];
            const dayEvents = events.filter(event => event.date === dateString);

            days.push(
                <div
                    key={day}
                    onClick={() => setSelectedDate(dateString)}
                    className={`h-24 border border-gray-200 dark:border-gray-700 p-2 cursor-pointer
                        hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors
                        ${selectedDate === dateString ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-white dark:bg-gray-800'}
                    `}
                >
                    <div className="flex justify-between items-start dark:text-gray-400">
                        <span className="text-sm font-medium">{day}</span>
                        {dayEvents.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {dayEvents.map(event => (
                                    <div
                                        key={event.id}
                                        className="w-2 h-2 rounded-full"
                                        style={{
                                            backgroundColor: {
                                                avaliacao: '#9333EA',
                                                feriado: '#DC2626',
                                                reuniao: '#2563EB',
                                                aula: '#16A34A',
                                                evento: '#CA8A04'
                                            }[event.type] || '#9333EA'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mt-1 space-y-1">
                        {dayEvents.map(event => (
                            <div key={event.id} className="text-xs truncate text-gray-600 dark:text-gray-400">
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Calendário Acadêmico
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Gerencie eventos e atividades escolares
                    </p>
                </div>
                <button
                    onClick={() => setShowEventModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Novo Evento
                </button>
            </div>

            <NewEventModal
                isOpen={showEventModal}
                onClose={() => setShowEventModal(false)}
                onEventCreate={handleEventCreate}
                selectedDates={selectedDate ? [selectedDate] : []}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <SubCard>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="dark:text-gray-400 flex items-center gap-4">
                                    <button
                                        onClick={previousMonth}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <h2 className="text-lg font-semibold">
                                        {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                                    </h2>
                                    <button
                                        onClick={nextMonth}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="dark:text-gray-400 grid grid-cols-7 gap-px mb-px">
                                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                                    <div
                                        key={day}
                                        className="h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 font-medium"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
                                {renderCalendar()}
                            </div>
                        </CardContent>
                    </SubCard>
                </div>

                <div className="lg:col-span-1">
                    <SubCard>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5" />
                                {selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : 'Eventos'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='p-0'>
                            {selectedDate ? (
                                <div className="space-y-4">
                                    {events
                                        .filter(event => event.date === selectedDate)
                                        .map(event => (
                                            <div
                                                key={event.id}
                                                className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <EventTypeTag type={event.type} />
                                                    <button
                                                        onClick={() => handleDeleteEvent(event.id)}
                                                        className="text-gray-400 hover:text-gray-500"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <h3 className="mt-2 font-medium dark:text-gray-400">{event.title}</h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    {event.description}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                    Selecione uma data para ver os eventos
                                </p>
                            )}
                        </CardContent>
                    </SubCard>
                </div>
            </div>
        </div>
    );
};