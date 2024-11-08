import React, { useState } from 'react';

export const NewEventForm = ({ eventType, onClose, onSubmit, selectedDates = [] }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dates: selectedDates
    });

    const [newDate, setNewDate] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddDate = () => {
        if (newDate && !formData.dates.includes(newDate)) {
            setFormData(prev => ({
                ...prev,
                dates: [...prev.dates, newDate]
            }));
            setNewDate('');
        }
    };

    const handleRemoveDate = (dateToRemove) => {
        setFormData(prev => ({
            ...prev,
            dates: prev.dates.filter(date => date !== dateToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.dates.length) {
            return;
        }
        onSubmit({
            ...formData,
            type: eventType.type
        });
    };

    return (
        <div className="space-y-6">

            {/* Cabeçalho do tipo de evento */}
            <div className={`p-4 rounded-lg ${eventType.color}`}>
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{eventType.icon}</span>
                    <div>
                        <h3 className="font-semibold">{eventType.title}</h3>
                        <p className="text-sm">{eventType.description}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Título */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Título <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>

                {/* Descrição */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Descrição <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>

                {/* Datas */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Datas <span className="text-red-500">*</span>
                    </label>

                    {/* Input para adicionar nova data */}
                    <div className="flex gap-2 mb-2">
                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            type="button"
                            onClick={handleAddDate}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Adicionar
                        </button>
                    </div>

                    {/* Lista de datas selecionadas */}
                    <div className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 min-h-[42px]">
                        <div className="flex flex-wrap gap-2">
                            {formData.dates.map((date) => (
                                <span
                                    key={date}
                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                >
                                    {new Date(date).toLocaleDateString('pt-BR')}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveDate(date)}
                                        className="ml-1 hover:text-purple-600"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            {formData.dates.length === 0 && (
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Nenhuma data selecionada
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Botões */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Criar Evento
                    </button>
                </div>
            </form>
        </div>
    );
};