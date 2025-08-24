"use client";
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from './ProductItemDetail';
import { ShoppingBasket, Eye, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import GlobalApi from '../_utils/GlobalApi';
import { CartContext } from '../_context/CartContext';

function ProductItem({ product }) {
  const [loading, setLoading] = useState(false);
  const { getCartData } = useContext(CartContext);

  // Logique pour l'ajout rapide au panier
  const quickAddToCart = (event) => {
    event.stopPropagation(); // Empêche l'ouverture du dialogue si on clique sur ce bouton
    setLoading(true);
    GlobalApi.addToCart(product.id, 1) // Ajoute toujours une quantité de 1
      .then(resp => {
        toast.success('Produit ajouté au panier!');
        getCartData(); // Met à jour le panier globalement
        setLoading(false);
      })
      .catch(err => {
        toast.error("Erreur lors de l'ajout au panier.");
        setLoading(false);
      });
  };

  const imageUrl = product?.images?.[0]?.url_image || '/placeholder.png';

  return (
    <Dialog>
      <div className="group h-full flex flex-col border border-slate-200 rounded-xl p-4 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        
        <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4">
          <Image
            src={imageUrl}
            alt={product.nom}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Superposition et boutons qui apparaissent au survol (Desktop) */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 rounded-lg lg:flex items-center justify-center gap-4 transition-opacity duration-300 hidden">
            
            {product.stock_disponible > 0 && (
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white text-primary rounded-full shadow-lg transform transition-transform hover:scale-110 disabled:opacity-50"
                onClick={quickAddToCart}
                disabled={loading}
                aria-label="Ajout rapide au panier"
              >
                {loading ? <LoaderCircle className="animate-spin" /> : <ShoppingBasket />}
              </Button>
            )}

            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white text-slate-800 rounded-full shadow-lg transform transition-transform hover:scale-110"
                aria-label="Aperçu rapide"
              >
                <Eye />
              </Button>
            </DialogTrigger>

          </div>
        </div>

        <div className="flex-grow flex flex-col items-start text-left mb-4">
          <h2 className='font-semibold text-lg text-slate-800 truncate w-full'>{product.nom}</h2>
          <p className='font-bold text-xl text-green-600 mt-1'>{product.prix_unitaire} FCFA</p>
        </div>

        {/* Mobile buttons */}
        <div className="flex lg:hidden items-center justify-center gap-4 mb-4">
            {product.stock_disponible > 0 && (
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white text-primary rounded-full shadow-lg transform transition-transform hover:scale-110 disabled:opacity-50"
                    onClick={quickAddToCart}
                    disabled={loading}
                    aria-label="Ajout rapide au panier"
                >
                    {loading ? <LoaderCircle className="animate-spin" /> : <ShoppingBasket />}
                </Button>
            )}

            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white text-slate-800 rounded-full shadow-lg transform transition-transform hover:scale-110"
                    aria-label="Aperçu rapide"
                >
                    <Eye />
                </Button>
            </DialogTrigger>
        </div>

        {/* Le bouton visible en permanence est maintenant supprimé */}
        <div className="h-[40px]">
          {product.stock_disponible <= 0 && (
             <div className="w-full text-center p-2 text-red-600 bg-red-100 border-red-200 border rounded-md">
               <p className="font-medium text-sm">Indisponible</p>
             </div>
          )}
        </div>

      </div>
      
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ProductItemDetail product={product} />
      </DialogContent>
    </Dialog>
  );
}

export default ProductItem;