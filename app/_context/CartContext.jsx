"use client"
import React, { createContext, useState, useEffect } from 'react';
import GlobalApi from '../_utils/GlobalApi';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // On charge le panier au démarrage de l'application.
    useEffect(() => {
        getCartData();
    }, []);

    /**
     * C'est la seule source de vérité pour obtenir le panier.
     * GlobalApi.getCart() envoie automatiquement le session_id pour les invités
     * ou le token JWT pour les utilisateurs connectés.
     */
    const getCartData = () => {
        GlobalApi.getCart().then(resp => {
            setCart(resp);
        }).catch(error => {
            console.error("Erreur en chargeant le panier:", error);
            setCart([]); 
        });
    };

    return (
        // On expose le panier et la fonction pour le rafraîchir.
        <CartContext.Provider value={{ cart, setCart, getCartData }}>
            {children}
        </CartContext.Provider>
    );
};
