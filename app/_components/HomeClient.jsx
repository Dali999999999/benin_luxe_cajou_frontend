"use client"

import React, { useState, useEffect, useContext, useMemo } from 'react';
import Slider from "./Slider";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import Image from 'next/image';
import { CategoryContext } from '../_context/CategoryContext';
import { SearchContext } from '../_context/SearchContext';

function HomeClient({ catalogueStructure, initialProducts, sliderList }) {
    const [displayedProducts, setDisplayedProducts] = useState(initialProducts);
    const { selectedCategory } = useContext(CategoryContext);
    const { searchQuery } = useContext(SearchContext);

    // Toute votre logique existante reste inchangée...
    const typeToCategoryMap = useMemo(() => {
        const map = new Map();
        catalogueStructure.forEach(category => {
            category.types_produits.forEach(type => {
                map.set(type.id, category.id);
            });
        });
        return map;
    }, [catalogueStructure]);

    useEffect(() => {
        if (selectedCategory) {
            const productsForCategory = initialProducts.filter(p => {
                const categoryId = typeToCategoryMap.get(p.type_produit?.id);
                return categoryId === selectedCategory.id;
            });
            setDisplayedProducts(productsForCategory);
        } else {
            setDisplayedProducts(initialProducts);
        }
    }, [selectedCategory, initialProducts, typeToCategoryMap]);

    const applySearchFilter = (products) => {
        if (!searchQuery) {
            return products;
        }
        const lowerCaseQuery = searchQuery.toLowerCase();
        return products.filter(p =>
            p.nom.toLowerCase().includes(lowerCaseQuery) ||
            p.description.toLowerCase().includes(lowerCaseQuery)
        );
    };

    const filterByType = (typeId) => {
        const productsForType = initialProducts.filter(p => p.type_produit?.id === typeId);
        setDisplayedProducts(applySearchFilter(productsForType));
    };

    const filterByCategory = (categoryId) => {
        const productsForCategory = initialProducts.filter(p => {
            const catId = typeToCategoryMap.get(p.type_produit?.id);
            return catId === categoryId;
        });
        setDisplayedProducts(applySearchFilter(productsForCategory));
    };
    // ...fin de la logique

    return (
        // La div principale est modifiée ici
        <div className="bg-slate-50 px-4 sm:px-8 md:px-16 py-12">
            
            <Slider sliderList={sliderList} />

            {/* Ajout d'un espacement vertical pour aérer les sections */}
            <div className="mt-12">
                <CategoryList 
                    onFilterByType={filterByType}
                    onFilterByCategory={filterByCategory}
                />
            </div>
            
            {/* ProductList a déjà son propre espacement, pas besoin de l'encapsuler */}
            <ProductList productList={displayedProducts} />

            {/* Section Bannière avec espacement et style amélioré */}
            <div className="my-16">
                <Image src="/banner.png" width={1200} height={400}
                alt="banner" 
                className="w-full h-auto object-contain rounded-xl" />
            </div>

        </div>
    );
}

export default HomeClient;