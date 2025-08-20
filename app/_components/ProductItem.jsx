import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from './ProductItemDetail';

function ProductItem({ product }) {
  // Accès plus sûr et propre à l'URL de l'image avec un fallback
  const imageUrl = product?.images?.[0]?.url_image || '/placeholder.png';

  return (
    <div className="group h-full flex flex-col border border-slate-200 rounded-xl p-4 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* SECTION IMAGE : Conteneur à ratio carré pour un alignement parfait */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4">
        <Image
          src={imageUrl}
          alt={product.nom}
          fill // Remplit le conteneur parent
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimisation pour Next.js
        />
      </div>

      {/* SECTION DÉTAILS : Le texte s'aligne en haut, le bouton en bas */}
      <div className="flex-grow flex flex-col items-start text-left mb-4">
        <h2 className='font-semibold text-lg text-slate-800 truncate w-full'>{product.nom}</h2>
        <p className='font-bold text-xl text-green-600 mt-1'>{product.prix_unitaire} FCFA</p>
      </div>

      {/* SECTION BOUTON / INDISPONIBLE */}
      {product.stock_disponible > 0 ? (
        <Dialog>
          <DialogTrigger asChild>
            {/* Un bouton plus visible et attractif */}
            <Button className="w-full bg-green-600 text-white font-bold hover:bg-green-700">
              Ajouter au panier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <ProductItemDetail product={product} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="w-full text-center p-2 text-red-600 bg-red-100 border-red-200 border rounded-md">
          <p className="font-medium">Indisponible</p>
        </div>
      )}
    </div>
  );
}

export default ProductItem;