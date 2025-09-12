"use client";

import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import Slider from "./Slider";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import Image from "next/image";
import { CategoryContext } from "../_context/CategoryContext";
import { SearchContext } from "../_context/SearchContext";
import { CartContext } from "../_context/CartContext";
import GlobalApi from "../_utils/GlobalApi";

// Les imports pour le Carousel et Autoplay ne sont plus nécessaires et ont été supprimés.

function HomeClient({ catalogueStructure, initialProducts, sliderList, loading }) {
  // --- Votre logique de filtrage (MISE À JOUR) ---
  const [currentProducts, setCurrentProducts] = useState(initialProducts);
  const [displayedProducts, setDisplayedProducts] = useState(initialProducts);

  // Synchroniser currentProducts avec initialProducts quand ils changent
  useEffect(() => {
    setCurrentProducts(initialProducts);
  }, [initialProducts]);
  const { selectedCategory } = useContext(CategoryContext);
  const { searchQuery } = useContext(SearchContext);
  const { cartData } = useContext(CartContext);

  // Fonction pour recharger les produits
  const refreshProducts = useCallback(async () => {
    try {
      const fetchedProducts = await GlobalApi.getProducts();
      setCurrentProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to refresh products:", error);
    }
  }, []);

  // Actualiser les produits quand le panier change
  useEffect(() => {
    if (cartData && currentProducts.length > 0) {
      const timeoutId = setTimeout(refreshProducts, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [cartData, refreshProducts, currentProducts.length]);

  const typeToCategoryMap = useMemo(() => {
    const map = new Map();
    catalogueStructure.forEach((category) => {
      category.types_produits.forEach((type) => {
        map.set(type.id, category.id);
      });
    });
    return map;
  }, [catalogueStructure]);

  useEffect(() => {
    if (selectedCategory) {
      const productsForCategory = currentProducts.filter((p) => {
        const categoryId = typeToCategoryMap.get(p.type_produit?.id);
        return categoryId === selectedCategory.id;
      });
      setDisplayedProducts(productsForCategory);
    } else {
      setDisplayedProducts(currentProducts);
    }
  }, [selectedCategory, currentProducts, typeToCategoryMap]);

  const applySearchFilter = (products) => {
    if (!searchQuery) {
      return products;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.nom.toLowerCase().includes(lowerCaseQuery) ||
        p.description.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const filterByType = (typeId) => {
    const productsForType = currentProducts.filter(
      (p) => p.type_produit?.id === typeId
    );
    setDisplayedProducts(applySearchFilter(productsForType));
  };

  const filterByCategory = (categoryId) => {
    const productsForCategory = currentProducts.filter((p) => {
      const catId = typeToCategoryMap.get(p.type_produit?.id);
      return catId === categoryId;
    });
    setDisplayedProducts(applySearchFilter(productsForCategory));
  };
  // --- Fin de la logique ---

  return (
    <div className="bg-slate-50 px-4 sm:px-8 md:px-16 py-12">
      {/* 1. Le Slider principal est CONSERVÉ */}
      <Slider sliderList={sliderList} />

      <div className="mt-12">
        <CategoryList
          onFilterByType={filterByType}
          onFilterByCategory={filterByCategory}
        />
      </div>

      {/* 2. L'ancre pour le bouton */}
      <div id="liste-produits">
        <ProductList productList={displayedProducts} loading={loading} />
      </div>

      {/* 3. Le carrousel est REMPLACÉ par une seule bannière statique */}
      <div className="my-16">
        <div className="relative w-full aspect-[8/3] overflow-hidden rounded-xl">
          <Image
            src="/images/banner-cartoonn.png" // Utilisation de votre image unique
            alt="Livraison rapide de produits Bénin Luxe Cajou"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start p-6 sm:p-8 md:p-12 lg:p-16">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
              Livraison rapide
              <br />
              <span className="text-[#953329]">partout au Bénin !</span>
            </h2>
            <a
              href="#liste-produits"
              className="mt-4 md:mt-6 px-4 py-2 md:px-8 md:py-3 bg-white text-green-700 font-bold rounded-full text-sm md:text-lg shadow-lg transition-transform hover:scale-105"
            >
              Commander maintenant
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeClient;
