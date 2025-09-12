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
        <div className='grid grid-cols-1 md:grid-cols-2 p-4 md:p-7 bg-white text-black'>
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
            <div className='flex flex-col space-y-4'>
                <div>
                    <h2 className='text-2xl font-bold'>{product.nom}</h2>
                    <p className='text-lg text-gray-600 font-medium mt-2'>{product.quantite_contenant}g</p>
                    <p className='text-sm text-gray-500 mt-2'>{product.description}</p>
                    <div className='flex gap-3 my-4'>
                        <h2 className='font-bold text-3xl'>{product.prix_unitaire} FCFA</h2>
                    </div>
                    <div className='space-y-2 mb-4'>
                        <p className='text-sm text-gray-600'><span className='font-medium'>Stock disponible:</span> {product.stock_disponible} unités</p>
                    </div>
                </div>
                
                <div>
                    <h3 className='font-medium text-lg mb-3'>Nombre d'unités à commander</h3>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6'>
                        <div className='p-3 border flex items-center gap-4 px-4 rounded-md min-w-[140px]'>
                            <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} className="text-lg font-bold w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">-</button>
                            <span className="text-lg font-medium min-w-[2ch] text-center">{quantity}</span>
                            <button disabled={quantity >= product.stock_disponible} onClick={() => setQuantity(quantity + 1)} className="text-lg font-bold w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">+</button>
                        </div>
                        <p className='text-lg md:text-xl font-bold text-green-600'> = {Math.round(quantity * product.prix_unitaire)} FCFA</p>
                    </div>
                </div>

                {/* Bouton intégré dans le flux normal */}
                <div className="mt-4">
                    <Button disabled={loading || product.stock_disponible <= 0} className="w-full flex gap-3 h-12 text-base font-medium" onClick={() => addToCart()}>
                        <ShoppingBasket size={20} />
                        {loading ? <LoaderCircle className='animate-spin' size={20} /> : product.stock_disponible <= 0 ? 'En rupture de stock' : 'Ajouter au panier'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductItemDetail