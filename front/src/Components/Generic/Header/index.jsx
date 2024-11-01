import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Se rolou mais de 70px, compara com última posição
      if (currentScrollY > 70) {
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 
        bg-gray-100 bg-opacity-90 
        shadow-md 
        transition-transform duration-300
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        z-50
      `}
    >
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-purple-700 text-2xl font-semibold">Sistema de Presença</h1>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <button
                  onClick={() => navigate('/presence')}
                  className="text-purple-700 hover:text-purple-900 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  Marcar Presença
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/consultar')}
                  className="text-purple-700 hover:text-purple-900 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  Consultar Aulas Anteriores
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/verificar')}
                  className="text-purple-700 hover:text-purple-900 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                >
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