import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('auth_user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // simula uma resposta da api
            const mockApiResponse = {
                token: 'fake-token-123',
                user: {
                    id: 1,
                    name: 'Usuário Teste',
                    email: email,
                    role: 'professor'
                }
            };

            localStorage.setItem('auth_token', mockApiResponse.token);
            localStorage.setItem('auth_user', JSON.stringify(mockApiResponse.user));

            setUser(mockApiResponse.user);
            return true;
        } catch (error) {
            console.error('Erro no login:', error);
            throw new Error('Email ou senha inválidos');
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
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