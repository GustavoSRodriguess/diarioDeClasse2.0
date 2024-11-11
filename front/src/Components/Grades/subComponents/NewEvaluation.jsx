import React, { useState } from 'react';
import { Modal } from '../../Generic/Modal';

export const NewEvaluation = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [newEvaluation, setNewEvaluation] = useState({
        title: '',
        type: '',
        weight: '',
        maxScore: ''
    });

    const handleSubmit = () => {
        onSubmit(newEvaluation);
        setNewEvaluation({
            title: '',
            type: '',
            weight: '',
            maxScore: ''
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nova Avaliação"
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Título</label>
                    <input
                        type="text"
                        value={newEvaluation.title}
                        onChange={(e) => setNewEvaluation(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Ex: Prova 1, Trabalho em Grupo..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select
                        value={newEvaluation.type}
                        onChange={(e) => setNewEvaluation(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value="">Selecione o tipo</option>
                        <option value="prova">Prova</option>
                        <option value="trabalho">Trabalho</option>
                        <option value="participacao">Participação</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Peso</label>
                    <input
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        value={newEvaluation.weight}
                        onChange={(e) => setNewEvaluation(prev => ({ ...prev, weight: e.target.value }))}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Ex: 0.3 (30%)"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Nota Máxima</label>
                    <input
                        type="number"
                        min="0"
                        value={newEvaluation.maxScore}
                        onChange={(e) => setNewEvaluation(prev => ({ ...prev, maxScore: e.target.value }))}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Ex: 10"
                    />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        disabled={!newEvaluation.title || !newEvaluation.type || !newEvaluation.weight || !newEvaluation.maxScore}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </Modal>
    );
};