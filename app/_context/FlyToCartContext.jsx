"use client";

import React, { createContext, useState, useCallback, useRef } from 'react';

export const FlyToCartContext = createContext(null);

export const FlyToCartProvider = ({ children }) => {
  const [animationTrigger, setAnimationTrigger] = useState(null);
  const cartIconRef = useRef(null); // Nouvelle référence pour l'icône du panier

  // Function to trigger the animation
  // It expects an object with { imageUrl, startRect }
  const triggerFlyAnimation = useCallback((data) => {
    setAnimationTrigger(data);
  }, []);

  // Function to reset the trigger after animation is done
  const resetFlyAnimation = useCallback(() => {
    setAnimationTrigger(null);
  }
  , []);

  return (
    <FlyToCartContext.Provider value={{ animationTrigger, triggerFlyAnimation, resetFlyAnimation, cartIconRef }}>
      {children}
    </FlyToCartContext.Provider>
  );
};

// Custom hook for easier access
export const useFlyToCart = () => {
  const context = React.useContext(FlyToCartContext);
  if (!context) {
    throw new Error('useFlyToCart must be used within a FlyToCartProvider');
  }
  return context;
};