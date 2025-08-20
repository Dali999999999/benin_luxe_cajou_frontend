import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ productList }) {
  if (!productList || productList.length === 0) {
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

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'>
        
        {productList.slice(0, 8).map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;