"use client";
import React from 'react';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

import SkeletonProductItem from './SkeletonProductItem';

// 1. Définition des variantes d'animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Délai en secondes entre chaque enfant
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

function ProductList({ productList }) {
  // Loading state: productList is not yet defined
  if (!productList) {
    return (
      <div id="products" className='mt-12 md:mt-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10'>
          Découvrez Nos Produits Phares
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'>
          {[...Array(8)].map((_, index) => (
            <SkeletonProductItem key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Empty state: productList is an empty array
  if (productList.length === 0) {
    return (
      <div id="products" className="mt-10 py-16 text-center">
        <p className="text-slate-500">Aucun produit trouvé pour cette sélection.</p>
      </div>
    );
  }

  return (
    <div id="products" className='mt-12 md:mt-16'>
      
      <h2 className='text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10'>
       Découvrez Nos Produits Phares
      </h2>

      {/* 2. Application des animations au conteneur de la grille */}
      <motion.div 
        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {productList.slice(0, 8).map(product => (
          // 3. Application des animations à chaque élément de la liste
          <motion.div key={product.id} variants={itemVariants}>
            <ProductItem product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ProductList;