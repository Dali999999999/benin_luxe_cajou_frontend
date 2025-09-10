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

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catalogue, products] = await Promise.all([
          GlobalApi.getCatalogueStructure(),
          GlobalApi.getProducts()
        ]);
        setCatalogueStructure(catalogue);
        setInitialProducts(products);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  return (
    <HomeClient 
      catalogueStructure={catalogueStructure} 
      initialProducts={initialProducts} 
      sliderList={sliderList} 
    />
  );
}