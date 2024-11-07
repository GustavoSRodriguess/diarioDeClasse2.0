// Components/Generic/Modal/index.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    className = "",
    showClose = true,
    size = "md" // sm, md, lg, xl
}) => {
    // Previne o scroll do body quando a modal está aberta
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Configurações de tamanho da modal
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-4xl'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div
                className={`
          w-full ${sizeClasses[size]} 
          bg-white dark:bg-gray-800 
          rounded-lg shadow-lg 
          relative 
          ${className}
        `}
            >
                {/* Cabeçalho da Modal */}
                {title && (
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {title}
                        </h2>
                        {showClose && (
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        )}
                    </div>
                )}

                {/* Conteúdo da Modal */}
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Modal de Novo Evento
export const NewEventModal = ({ isOpen, onClose }) => {
    const eventTypes = [
        {
            type: 'avaliacao',
            title: 'Avaliação',
            description: 'Provas, trabalhos e outras atividades avaliativas',
            icon: '📝',
            color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
        },
        {
            type: 'feriado',
            title: 'Feriado',
            description: 'Feriados e dias sem atividade',
            icon: '📅',
            color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        },
        {
            type: 'reuniao',
            title: 'Reunião',
            description: 'Reuniões pedagógicas e conselhos de classe',
            icon: '👥',
            color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
        },
        {
            type: 'aula',
            title: 'Aula Especial',
            description: 'Aulas diferenciadas ou eventos especiais',
            icon: '📚',
            color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
        },
        {
            type: 'evento',
            title: 'Evento',
            description: 'Outros eventos escolares',
            icon: '🎯',
            color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
        }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Novo Evento"
            size="lg"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventTypes.map((eventType) => (
                    <button
                        key={eventType.type}
                        onClick={() => {
                            // Aqui você pode navegar para um formulário específico
                            // ou abrir outra modal com o formulário do tipo selecionado
                            console.log(`Criar evento do tipo: ${eventType.type}`);
                        }}
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
                                <p className="text-sm opacity-90">
                                    {eventType.description}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </Modal>
    );
};