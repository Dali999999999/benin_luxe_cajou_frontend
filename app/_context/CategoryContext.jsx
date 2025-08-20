"use client"
import React, { createContext, useState } from 'react';

export const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};
