import React, { useState } from 'react';
import {
  SubCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Generic/Card/SubCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../Generic/Tabs";
import {
  User,
  Book,
  GraduationCap,
  Bell,
  Shield,
  Palette,
  Languages,
  CalendarDays
} from 'lucide-react';
import { Toggle } from '../Generic/ToggleBtn';
import { useTheme } from '../../Contexts/ThemeContext';
import { ImageUpload } from '../Generic/ImageUpload';

export const UserProfile = () => {
  const [twoFacotorAuth, setTwoFactorAuth] = useState(false);
  const [notifyAbsence, setNotifyAbsence] = useState(false);
  const [notifyClass, setNotifyClass] = useState(false);
  const [notifyPendency, setNotifyPendency] = useState(false);

  const { isDarkMode, toggleDarkMode } = useTheme();

  const mockUser = {
    name: "Maria Silva",
    email: "maria.silva@escola.edu",
    role: "Professor(a)",
    department: "Matemática",
    avatar: "/api/placeholder/100/100"
  };

  const handleImageUpload = async (file) => {
    if (!file) {
      console.log('imagem removida');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      // const response = await fetch('/api/upload-avatar', {
      //   method: 'POST',
      //   body: formData
      // });

      console.log('imagem enviada:', file);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Cabeçalho do Perfil */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <ImageUpload
            currentImage={mockUser.avatar}
            onImageUpload={handleImageUpload}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {mockUser.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {mockUser.email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200">
                {mockUser.role}
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200">
                {mockUser.department}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Abas de Configuração */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-800 p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Geral
          </TabsTrigger>
          <TabsTrigger value="academic" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Acadêmico
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Configurações Gerais */}
        <TabsContent value="general">
          <div className="grid gap-4">
            <SubCard>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Personalização
                </CardTitle>
              </CardHeader>
              <CardContent className="dark:text-gray-300 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{ isDarkMode ? 'Tema Escuro' : 'Tema Claro' }</span>
                  <button onClick={toggleDarkMode} className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                    <Palette className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Idioma</span>
                  <button className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                    <Languages className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </SubCard>
          </div>
        </TabsContent>

        {/* Configurações Acadêmicas */}
        <TabsContent value="academic">
          <div className="grid gap-4">
            <SubCard>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Preferências de Ensino
                </CardTitle>
              </CardHeader>
              <CardContent className="dark:text-gray-300 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Formato de Notas</span>
                  <select className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg text-sm">
                    <option>0-10</option>
                    <option>0-100</option>
                    <option>A-F</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Calendário Acadêmico</span>
                  <button className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                    <CalendarDays className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </SubCard>

            <SubCard>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  Material Didático
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="dark:text-gray-300 grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Template de Plano de Aula</span>
                    <button className="text-purple-600 hover:text-purple-700 text-sm">
                      Personalizar
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Biblioteca de Recursos</span>
                    <button className="text-purple-600 hover:text-purple-700 text-sm">
                      Gerenciar
                    </button>
                  </div>
                </div>
              </CardContent>
            </SubCard>
          </div>
        </TabsContent>

        {/* Configurações de Notificações */}
        <TabsContent value="notifications">
          <SubCard>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="dark:text-gray-300 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Faltas Excessivas</p>
                    <p className="text-sm text-gray-500">Notificar quando alunos atingirem limite de faltas</p>
                  </div>
                  <Toggle
                    enabled={notifyAbsence}
                    onChange={setNotifyAbsence}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Lembretes de Aula</p>
                    <p className="text-sm text-gray-500">Receber lembretes 15 min antes das aulas</p>
                  </div>
                  <Toggle
                    enabled={notifyClass}
                    onChange={setNotifyClass}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Atividades Pendentes</p>
                    <p className="text-sm text-gray-500">Notificar sobre atividades não corrigidas</p>
                  </div>
                  <Toggle
                    enabled={notifyPendency}
                    onChange={setNotifyPendency}
                  />
                </div>
              </div>
            </CardContent>
          </SubCard>
        </TabsContent>

        {/* Configurações de Segurança */}
        <TabsContent value="security">
          <SubCard>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança e Privacidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="dark:text-gray-300 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticação em Duas Etapas</p>
                    <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                  </div>
                  <Toggle
                    enabled={twoFacotorAuth}
                    onChange={setTwoFactorAuth}
                  />
                </div>
                <button className="w-full py-2 text-left text-sm text-purple-600 hover:text-purple-700">
                  Alterar Senha
                </button>
                <button className="w-full py-2 text-left text-sm text-purple-600 hover:text-purple-700">
                  Gerenciar Dispositivos Conectados
                </button>
                <button className="w-full py-2 text-left text-sm text-purple-600 hover:text-purple-700">
                  Histórico de Atividades
                </button>
              </div>
            </CardContent>
          </SubCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};