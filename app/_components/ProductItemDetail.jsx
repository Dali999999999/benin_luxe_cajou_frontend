"use client"
import { LoaderCircle, ShoppingBasket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { CartContext } from '../_context/CartContext'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"


function ProductItemDetail({ product }) {

    // On récupère la fonction pour rafraîchir le panier depuis le contexte
    const { getCartData } = useContext(CartContext);

    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    // Logique d'ajout au panier mise à jour
    const addToCart = () => {
        setLoading(true);
        // On appelle l'API, qui gère les utilisateurs connectés et invités
        GlobalApi.addToCart(product.id, quantity).then(resp => {
            toast.success('Produit ajouté au panier!');
            // Une fois l'API réussie, on rafraîchit les données du panier pour toute l'app
            getCartData(); 
            setLoading(false);
        }, (e) => {
            toast.error("Erreur lors de l'ajout au panier.");
            setLoading(false);
        })
    }


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-7 pb-20 md:pb-7 bg-white text-black'>
            {/* Image */}
            <Carousel
                opts={{
                    loop: true,
                }}
                className="w-full max-w-sm mx-auto"
            >
                <CarouselContent>
                    {product.images.map((image, index) => (
                        <CarouselItem key={index}>
                            <Image src={image.url_image}
                                alt={`image-${index}`}
                                width={300}
                                height={300}
                                className='bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg'
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-1rem] top-1/2 -translate-y-1/2" />
                <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
            </Carousel>

            {/* Information */}
            <div className='flex flex-col md:justify-between md:h-full'>
                {/* Contenu principal qui scrolle */}
                <div className="md:pb-0 pb-32"> {/* Espace pour la barre d'action mobile */}
                    <h2 className='text-2xl font-bold'>{product.nom}</h2>
                    <p className='text-sm text-gray-500 mt-2'>{product.description}</p>
                    <div className='flex gap-3 my-4'>
                        <h2 className='font-bold text-3xl'>{product.prix_unitaire} FCFA</h2>
                    </div>
                    <h3 className='font-medium text-lg'>Quantité <span className='text-sm text-gray-500'>(En stock : {product.stock_disponible})</span></h3>
                    <div className='flex items-center gap-2 md:gap-4 mt-2'>
                        <div className='p-2 border flex items-center gap-3 md:gap-6 px-2 md:px-4'>
                            <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} className="text-base md:text-lg font-bold">-</button>
                            <span className="text-base md:text-lg">{quantity}</span>
                            <button disabled={quantity >= product.stock_disponible} onClick={() => setQuantity(quantity + 1)} className="text-base md:text-lg font-bold">+</button>
                        </div>
                        <p className='text-base md:text-2xl font-bold'> = {(quantity * product.prix_unitaire).toFixed(2)} FCFA</p>
                    </div>
                </div>

                {/* Barre d'action fixe sur mobile, statique sur desktop */}
                <div className="md:static fixed bottom-0 left-0 w-full bg-white p-4 border-t md:border-0 md:p-0 z-10">
                    <Button disabled={loading || product.stock_disponible <= 0} className="w-full flex gap-3" onClick={() => addToCart()}>
                        <ShoppingBasket />
                        {loading ? <LoaderCircle className='animate-spin' /> : product.stock_disponible <= 0 ? 'En rupture de stock' : 'Ajouter au panier'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductItemDetail