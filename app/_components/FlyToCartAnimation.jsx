"use client";

import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlyToCartContext } from '../_context/FlyToCartContext';

const FlyToCartAnimation = () => {
  const { animationTrigger, resetFlyAnimation, cartIconRef } = useContext(FlyToCartContext); 
  const animationRef = useRef(null); // Ref for the animating element

  useEffect(() => {
    if (animationTrigger) {
      const { imageUrl, startRect } = animationTrigger;
      const endRect = cartIconRef.current ? cartIconRef.current.getBoundingClientRect() : null; // Get endRect here

      if (!endRect) {
        console.error("Cart icon ref not found for animation.");
        resetFlyAnimation();
        return;
      }

      // Create the animating element
      const flyEl = document.createElement('div');
      flyEl.style.position = 'fixed';
      flyEl.style.top = `${startRect.top}px`;
      flyEl.style.left = `${startRect.left}px`;
      flyEl.style.width = `${startRect.width}px`;
      flyEl.style.height = `${startRect.height}px`;
      flyEl.style.backgroundImage = `url(${imageUrl})`;
      flyEl.style.backgroundSize = 'cover';
      flyEl.style.backgroundPosition = 'center';
      flyEl.style.borderRadius = '50%'; // Make it round
      flyEl.style.zIndex = '9999'; // Ensure it's on top
      flyEl.style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out'; // Smooth transition
      flyEl.style.opacity = '1';
      flyEl.style.pointerEvents = 'none'; // Don't block clicks

      document.body.appendChild(flyEl);
      animationRef.current = flyEl;

      // Trigger the animation after a small delay to allow DOM to render
      requestAnimationFrame(() => {
        if (animationRef.current) {
          animationRef.current.style.transform = `translate(${endRect.left - startRect.left}px, ${endRect.top - startRect.top}px) scale(0.1)`;
          animationRef.current.style.opacity = '0';
        }
      });

      // Clean up after animation
      const animationDuration = 800; // Match transition duration
      const timeoutId = setTimeout(() => {
        if (animationRef.current) {
          animationRef.current.remove();
          animationRef.current = null;
        }
        resetFlyAnimation(); // Reset context trigger
      }, animationDuration);

      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    }
  }, [animationTrigger, resetFlyAnimation, cartIconRef]); 

  return null; // This component doesn't render anything visible itself
};

export default FlyToCartAnimation;