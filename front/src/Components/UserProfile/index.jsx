import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Settings,
  Book,
  GraduationCap
} from 'lucide-react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Generic/Tabs';
import { Card } from '../Generic/Card';

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('general');

  const generalCards = [
    {
      title: "Informações Pessoais",
      description: "Gerencie suas informações básicas e preferências de conta",
      icon: <User className="h-6 w-6 text-purple-600" />,
      metrics: [
        { label: "E-mail", value: "professor@escola.com" },
        { label: "Cargo", value: "Professor" }
      ],
      action: "Editar Perfil",
      onClick: () => console.log("Editar perfil")
    },
    {
      title: "Personalização",
      description: "Ajuste o tema e outras configurações visuais do sistema",
      icon: <Settings className="h-6 w-6 text-purple-600" />,
      metrics: [
        { label: "Tema", value: "Escuro" },
        { label: "Idioma", value: "PT-BR" }
      ],
      action: "Personalizar",
      onClick: () => console.log("Personalizar")
    }
  ];

  const academicCards = [
    {
      title: "Preferências Acadêmicas",
      description: "Configure suas preferências de ensino e avaliação",
      icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
      metrics: [
        { label: "Sistema de Notas", value: "0-10" },
        { label: "Turmas Ativas", value: "6" }
      ],
      action: "Configurar",
      onClick: () => console.log("Configurar acadêmico")
    },
    {
      title: "Material Didático",
      description: "Gerencie seus recursos e materiais de ensino",
      icon: <Book className="h-6 w-6 text-purple-600" />,
      metrics: [
        { label: "Recursos", value: "45" },
        { label: "Templates", value: "8" }
      ],
      action: "Gerenciar",
      onClick: () => console.log("Gerenciar materiais")
    }
  ];

  const notificationCards = [
    {
      title: "Notificações",
      description: "Configure suas preferências de notificações do sistema",
      icon: <Bell className="h-6 w-6 text-purple-600" />,
      metrics: [
        { label: "Não lidas", value: "3" },
        { label: "Tipos Ativos", value: "5" }
      ],
      action: "Configurar Alertas",
      onClick: () => console.log("Configurar notificações")
    }
  ];

  const securityCards = [
    {
      title: "Segurança",
      description: "Gerencie suas configurações de segurança e privacidade",
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      metrics: [
        { label: "Última alteração", value: "7 dias" },
        { label: "Nível", value: "Alto" }
      ],
      action: "Gerenciar Segurança",
      onClick: () => console.log("Gerenciar segurança")
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Meu Perfil</h1>
        <p className="text-gray-600 dark:text-gray-400">Gerencie suas configurações e preferências</p>
      </div>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general" selected={activeTab === 'general'} onClick={setActiveTab}>
            Geral
          </TabsTrigger>
          <TabsTrigger value="academic" selected={activeTab === 'academic'} onClick={setActiveTab}>
            Acadêmico
          </TabsTrigger>
          <TabsTrigger value="notifications" selected={activeTab === 'notifications'} onClick={setActiveTab}>
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" selected={activeTab === 'security'} onClick={setActiveTab}>
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" selected={activeTab === 'general'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generalCards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="academic" selected={activeTab === 'academic'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicCards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" selected={activeTab === 'notifications'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notificationCards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" selected={activeTab === 'security'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityCards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};