import { UserRound, LogOut, Settings, User } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from '../../Dropdown';
import { useAuth } from '../../../Contexts/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 70) {
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    try {
      logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const userMenuItems = [
    {
      label: 'Perfil',
      icon: <User className="h-4 w-4" />,
      onClick: () => navigate('/profile')
    },
    {
      label: 'Configurações',
      icon: <Settings className="h-4 w-4" />,
      onClick: () => navigate('/settings')
    },
    { type: 'separator' },
    {
      label: 'Sair',
      icon: <LogOut className="h-4 w-4" />,
      onClick: handleLogout,
      danger: true
    }
  ];

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
          <h1 onClick={() => navigate('/')} className="cursor-pointer text-purple-700 text-2xl font-semibold">
            Sistema de Presença
          </h1>

          <nav>
            <ul className="flex space-x-6 items-center">
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
              <li>
                <Dropdown
                  trigger={
                    <div className="text-purple-700 hover:text-purple-900 p-2 rounded-lg hover:bg-purple-100 transition-colors">
                      <UserRound className="h-6 w-6" />
                    </div>
                  }
                  header="Minha Conta"
                  items={userMenuItems}
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}