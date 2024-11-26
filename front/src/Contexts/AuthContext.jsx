import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = '/professores';;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email) => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                mode: 'cors',  // Explicitamente definindo o modo
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro ao conectar com o servidor');
            }
    
            const professors = await response.json();
            const professor = professors.find(prof => prof.email === email);
    
            if (!professor) {
                throw new Error('Email não encontrado');
            }
    
            const userData = {
                id: professor.id,
                name: professor.nome,
                email: professor.email,
                role: 'professor'
            };
    
            localStorage.setItem('auth_user', JSON.stringify(userData));
            setUser(userData);
            return true;
        } catch (error) {
            console.error('Erro no login:', error);
            throw new Error(error.message || 'Erro ao realizar login');
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export default AuthContext;