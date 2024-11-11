import { UserRound, LogOut, Settings, User, Moon, Sun, BadgeJapaneseYen, Cannabis } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from '../../Dropdown';
import { useAuth } from '../../../Contexts/AuthContext';
import { useTheme } from '../../../Contexts/ThemeContext';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const { logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

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
    {
      label: isDarkMode ? 'Modo Claro' : 'Modo Escuro',
      icon:  isDarkMode ? <Sun className='h-4 w-4'/> : <Moon className="h-4 w-4" />,
      onClick: toggleDarkMode
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
        bg-gray-100 dark:bg-gray-800 
        bg-opacity-90 
        shadow-md 
        transition-transform duration-300
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        z-50
      `}
    >
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between text-purple-700">
          <div onClick={() => navigate('/')} className='cursor-pointer flex inline-block items-center'>
            <div className="text-purple-700 dark:text-purple-400 p-2 rounded-lg transition-colors">
              <Cannabis className="h-6 w-6" />
            </div>
            <h1 className="text-purple-700 dark:text-purple-400 text-2xl font-semibold">
            Sistema de Presença
          </h1>
          </div>


          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <button
                  onClick={() => navigate('/presence')}
                  className="text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 
                           px-4 py-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                >
                  Marcar Presença
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/grades')}
                  className="text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 
                           px-4 py-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                >
                  Consultar Notas
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/presence/history')}
                  className="text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 
                           px-4 py-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                >
                  Verificar Presença
                </button>
              </li>
              <li>
                <Dropdown
                  trigger={
                    <div className="text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 
                                  p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors">
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