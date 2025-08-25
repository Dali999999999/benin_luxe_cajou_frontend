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
        <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
            {/* Image */}
            <Carousel
                opts={{
                    loop: true,
                }}
                className="w-full max-w-sm"
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
            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>{product.nom}</h2>
                <h2 className='text-sm text-gray-500'>{product.description}</h2>
                <div className='flex gap-3'>
                    <h2 className='font-bold text-3xl'>{product.prix_unitaire} FCFA</h2>
                </div>
                <h2 className='font-medium text-lg'>Quantité <span className='text-sm text-gray-500'>(En stock : {product.stock_disponible})</span></h2>
                <div className='flex flex-col items-baseline gap-3'>
                    <div className='flex gap-3 items-center'>
                        <div className='p-2 border flex gap-10 items-center px-5'>
                            <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button disabled={quantity >= product.stock_disponible} onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <h2 className='text-2xl font-bold'> = {(quantity * product.prix_unitaire).toFixed(2)} FCFA</h2>
                    </div>
                    <Button disabled={loading || product.stock_disponible === 0} className="flex gap-3" onClick={() => addToCart()}>
                        <ShoppingBasket />
                        {loading? <LoaderCircle className='animate-spin' /> : product.stock_disponible === 0 ? 'En rupture de stock' : 'Ajouter au panier'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductItemDetail
