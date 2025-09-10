"use client";

import { useState, useEffect } from 'react';
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import Image from 'next/image'
import Footer from "./_components/Footer";
import HomeClient from "./_components/HomeClient";

export default function Home() {
  const [catalogueStructure, setCatalogueStructure] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderList = [
    {
      id: 1,
      attributes: {
        image: {
          data: {
            attributes: {
              url: "/images/banner-fresh-groceries.png",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        image: {
          data: {
            attributes: {
              url: "/images/banner-organic-food.png",
            },
          },
        },
      },
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        // Délai court pour permettre le rendu initial
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Charger les données avec timeouts pour éviter les blocages
        const cataloguePromise = Promise.race([
          GlobalApi.getCatalogueStructure(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Catalogue timeout')), 8000)
          )
        ]);
        
        const productsPromise = Promise.race([
          GlobalApi.getProducts(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Products timeout')), 8000)
          )
        ]);

        const [catalogueResult, productsResult] = await Promise.allSettled([
          cataloguePromise,
          productsPromise
        ]);

        if (catalogueResult.status === 'fulfilled') {
          setCatalogueStructure(catalogueResult.value);
        } else {
          console.warn('Catalogue loading failed:', catalogueResult.reason);
          setCatalogueStructure([]);
        }

        if (productsResult.status === 'fulfilled') {
          console.log('Products API SUCCESS:', productsResult.value?.length || 0, 'products loaded');
          console.log('First product:', productsResult.value?.[0]?.nom || 'No products');
          setInitialProducts(productsResult.value);
        } else {
          console.error('Products loading failed:', productsResult.reason);
          console.error('Full error:', JSON.stringify(productsResult.reason, null, 2));
          setInitialProducts([]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setCatalogueStructure([]);
        setInitialProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <HomeClient 
      catalogueStructure={catalogueStructure} 
      initialProducts={initialProducts} 
      sliderList={sliderList}
      loading={loading}
    />
  );
}