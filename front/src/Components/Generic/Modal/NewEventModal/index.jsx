import { useState } from "react";
import { Modal } from "..";
import { NewEventForm } from "../../Form/NewEventForm";

export const NewEventModal = ({ isOpen, onClose, onEventCreate, selectedDates = [] }) => {
    const [selectedEventType, setSelectedEventType] = useState(null)

    const eventTypes = [
        {
            type: 'avaliacao',
            title: 'Avaliação',
            description: 'Provas, trabalhos e outras atividades avaliativas',
            icon: '📝',
            color: 'bg-purple-900/50 text-purple-100'
        },
        {
            type: 'feriado',
            title: 'Feriado',
            description: 'Feriados e dias sem atividade',
            icon: '📅',
            color: 'bg-red-900/50 text-red-100'
        },
        {
            type: 'reuniao',
            title: 'Reunião',
            description: 'Reuniões pedagógicas e conselhos de classe',
            icon: '👥',
            color: 'bg-blue-900/50 text-blue-100'
        },
        {
            type: 'aula',
            title: 'Aula Especial',
            description: 'Aulas diferenciadas ou eventos especiais',
            icon: '📚',
            color: 'bg-green-900/50 text-green-100'
        },
        {
            type: 'evento',
            title: 'Evento',
            description: 'Outros eventos escolares',
            icon: '🎯',
            color: 'bg-yellow-900/50 text-yellow-100'
        }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedEventType ? "Criar Evento" : "Novo Evento"}
            size="lg"
        >
            {!selectedEventType ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventTypes.map((eventType) => (
                        <button
                            key={eventType.type}
                            onClick={() => setSelectedEventType(eventType)}
                            className={`
                p-4 rounded-lg text-left
                border border-transparent
                hover:border-purple-500
                transition-all duration-200
                ${eventType.color}
              `}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{eventType.icon}</span>
                                <div>
                                    <h3 className="font-semibold">{eventType.title}</h3>
                                    <p className="text-sm opacity-90">{eventType.description}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <NewEventForm
                    eventType={selectedEventType}
                    onClose={() => setSelectedEventType(null)}
                    onSubmit={(eventData) => {
                        onEventCreate({ ...eventData, type: selectedEventType.type });
                        onClose();
                    }}
                    selectedDates={selectedDates}
                />
            )}
        </Modal>
    );
};