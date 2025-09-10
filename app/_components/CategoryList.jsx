import React from 'react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { CategoryContext } from '../_context/CategoryContext';

function CategoryList({ onFilterByType, onFilterByCategory }) {
    const [selectedCategoryTypes, setSelectedCategoryTypes] = useState([]);
    const [activeTypeId, setActiveTypeId] = useState(null);
    const { selectedCategory } = useContext(CategoryContext);

    useEffect(() => {
        if (selectedCategory) {
            setSelectedCategoryTypes(selectedCategory.types_produits);
            setActiveTypeId(null); 
        }
    }, [selectedCategory]);

    const handleTypeClick = (typeId) => {
        setActiveTypeId(typeId);
        onFilterByType(typeId);
    };

    const handleAllTypesClick = () => {
        setActiveTypeId(null);
        onFilterByCategory(selectedCategory.id);
    }

    if (!selectedCategory) {
        return null;
    }

    return (
        <div className='mt-12'>
            <h2 className='text-3xl font-bold text-slate-800 text-center mb-10'>
                Acheter par Type dans "{selectedCategory.nom}"
            </h2>
            
            <div className='flex flex-wrap gap-4 sm:gap-6 justify-center'>
                {/* Bouton "All" pour la catégorie actuelle */}
                <button 
                    onClick={handleAllTypesClick}
                    className={`
                        flex flex-col items-center justify-center gap-2 p-4 border rounded-xl 
                        transition-all duration-200 group w-36 h-36
                        ${activeTypeId === null 
                            ? 'border-green-600 bg-green-50 text-green-700 shadow-md' 
                            : 'border-slate-300 bg-white text-slate-700 hover:border-green-500 hover:bg-slate-50'
                        }
                    `}
                >
                    <span className="text-lg font-semibold">Tous les types</span>
                </button>

                {/* Boutons pour les types spécifiques */}
                {selectedCategoryTypes.map((type) => {
                    const isActive = activeTypeId === type.id;
                    return (
                        <button 
                            key={type.id} 
                            onClick={() => handleTypeClick(type.id)}
                            className={`
                                flex flex-col items-center justify-center gap-2 p-4 border rounded-xl
                                transition-all duration-200 group w-36 h-36
                                ${isActive 
                                    ? 'border-green-600 bg-green-50 text-green-700 shadow-md' 
                                    : 'border-slate-300 bg-white text-slate-700 hover:border-green-500 hover:bg-slate-50'
                                }
                            `}
                        >
                            <div className="relative w-[60px] h-[60px]">
                                {type.image_url ? (
                                    <Image 
                                        src={type.image_url}
                                        fill
                                        alt={type.nom}
                                        className='object-contain group-hover:scale-110 transition-transform ease-in-out'
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-md">
                                        <span className="text-slate-400 text-xs text-center">Pas d'image</span>
                                    </div>
                                )}
                            </div>
                            <span className="text-center text-base font-semibold">{type.nom}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default CategoryList;