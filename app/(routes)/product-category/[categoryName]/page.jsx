"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import TopCategoryList from './_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList';
import { SearchContext } from '@/app/_context/SearchContext';
import { CartContext } from '@/app/_context/CartContext';
import { toast } from 'sonner'

function ProductCategory({ params }) {
  const { searchQuery } = useContext(SearchContext);
  const { cartData } = useContext(CartContext); // Observer les changements du panier
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Fonction pour recharger les produits
  const refreshProducts = useCallback(async () => {
    try {
      const fetchedProducts = await GlobalApi.getProducts();
      setAllProducts(fetchedProducts);
      setLastUpdate(Date.now());
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await GlobalApi.getProducts();
        setAllProducts(fetchedProducts);

        const fetchedCategories = await GlobalApi.getCatalogueStructure();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load products or categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Actualiser les produits quand le panier change (indique une transaction)
  useEffect(() => {
    if (cartData && allProducts.length > 0) {
      // Délai pour laisser le temps au backend de mettre à jour le stock
      const timeoutId = setTimeout(refreshProducts, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [cartData, refreshProducts, allProducts.length]);

  const typeToCategoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach(category => {
      category.types_produits.forEach(type => {
        map.set(type.id, category.id);
      });
    });
    return map;
  }, [categories]);

  useEffect(() => {
    let filtered = allProducts;

    if (params.categoryName && categories.length > 0) {
      const selectedCat = categories.find(cat => cat.nom === params.categoryName);
      if (selectedCat) {
        filtered = filtered.filter(p => {
          const categoryId = typeToCategoryMap.get(p.type_produit?.id);
          return categoryId === selectedCat.id;
        });
      }
    }

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.nom.toLowerCase().includes(lowerCaseQuery) ||
        p.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
    setDisplayedProducts(filtered);
  }, [allProducts, params.categoryName, categories, searchQuery, typeToCategoryMap]);

  return (
    <div>
      <h2 className='bg-primary text-white p-4 font-bold text-3xl text-center'>{params.categoryName}</h2>
      <TopCategoryList categoryList={categories} selectedCategory={params.categoryName} />

      <div className='p-5 md:p-10'>
        <ProductList productList={displayedProducts} />
      </div>

    </div>
  )
}

export default ProductCategory