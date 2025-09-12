"use client";
import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SkeletonProductItem from './SkeletonProductItem';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

// Animation for the grid sliding
const gridVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

function ProductList({ productList, loading = false }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const productsPerPage = 8;
  const totalPages = productList ? Math.ceil(productList.length / productsPerPage) : 0;

  // Reset to page 0 when the product list changes (e.g., due to filtering)
  useEffect(() => {
    setCurrentPage(0);
  }, [productList]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentPage(prev => prev + newDirection);
  };

  // Loading state
  if (loading || !productList) {
    return (
      <div id="products" className='mt-12 md:mt-16'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'>
          {[...Array(8)].map((_, index) => (
            <SkeletonProductItem key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Empty state - seulement quand on n'est plus en loading
  if (productList.length === 0 && !loading) {
    return (
      <div id="products" className="mt-10 py-16 text-center">
        <p className="text-slate-500">Aucun produit trouvé pour cette sélection.</p>
      </div>
    );
  }

  const currentProducts = productList.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <div id="products" className='mt-12 md:mt-16'>
      <div className="relative overflow-hidden min-h-[750px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={gridVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'
          >
            {currentProducts.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(-1)}
            disabled={currentPage === 0}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium">
            Page {currentPage + 1} sur {totalPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(1)}
            disabled={currentPage >= totalPages - 1}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
