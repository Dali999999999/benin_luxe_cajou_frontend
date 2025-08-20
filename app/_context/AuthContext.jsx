"use client"

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    // On ne stocke plus le token dans l'état, car le client API s'en occupe.
    // L'état sert juste à savoir si l'utilisateur est considéré comme connecté ou non.

    // Au chargement, on vérifie si un token existe pour définir l'état initial.
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            setIsLogin(true);
        }
    }, []);

    /**
     * Met à jour le statut d'authentification et sauvegarde les tokens.
     * @param {boolean} loggedIn - L'utilisateur est-il connecté ?
     * @param {object} tokens - Un objet contenant access_token et refresh_token.
     */
    const updateAuthStatus = (loggedIn, tokens) => {
        setIsLogin(loggedIn);
        if (loggedIn && tokens) {
            localStorage.setItem('access_token', tokens.access_token);
            localStorage.setItem('refresh_token', tokens.refresh_token);
        } else {
            // Si déconnecté, on nettoie tout.
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    };

    /**
     * Fonction de déconnexion centralisée.
     */
    const logout = () => {
        updateAuthStatus(false, null);
        // La redirection peut être gérée ici ou dans le composant qui appelle logout.
        window.location.href = '/sign-in';
    };

    return (
        <AuthContext.Provider value={{ isLogin, updateAuthStatus, logout }}>
            {children}
        </AuthContext.Provider>
    );
};