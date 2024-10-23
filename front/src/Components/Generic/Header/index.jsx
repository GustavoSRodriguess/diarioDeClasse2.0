import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-100 bg-opacity-90 shadow-md">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-purple-700 text-2xl font-semibold">Sistema de Presença</h1>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button className="text-purple-700 hover:text-purple-900 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
                  Marcar Presença
                </button>
              </li>
              <li>
                <button className="text-purple-700 hover:text-purple-900 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
                  Consultar Aulas Anteriores
                </button>
              </li>
              <li>
                <button className="text-purple-700 hover:text-purple-900 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
                  Verificar Presença
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}