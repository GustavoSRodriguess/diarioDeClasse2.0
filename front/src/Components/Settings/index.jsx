import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../Generic/Tabs";
import { Settings as SettingsIcon, BookOpen, School } from 'lucide-react';
import { ClassSettings } from './subComponents/ClassSettings';
import { SubjectsSettings } from './subComponents/SubjectsSettings';

export const Settings = () => {
    const [selectedTab, setSelectedTab] = useState('classes');

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <SettingsIcon className="w-6 h-6" />
                    Configurações
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Gerencie turmas, disciplinas e outras configurações do sistema
                </p>
            </div>

            <Tabs defaultValue="classes">
                <TabsList>
                    <TabsTrigger 
                        value="classes" 
                        active={selectedTab === 'classes'}
                        onClick={() => setSelectedTab('classes')}
                    >
                        <School className="w-4 h-4 mr-2" />
                        Turmas
                    </TabsTrigger>
                    <TabsTrigger 
                        value="subjects" 
                        active={selectedTab === 'subjects'}
                        onClick={() => setSelectedTab('subjects')}
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Disciplinas
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="classes" active={selectedTab === 'classes'}>
                    <ClassSettings />
                </TabsContent>

                <TabsContent value="subjects" active={selectedTab === 'subjects'}>
                    <SubjectsSettings />
                </TabsContent>
            </Tabs>
        </div>
    );
};