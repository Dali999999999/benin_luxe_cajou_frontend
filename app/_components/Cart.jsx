"use client"
import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { CartContext } from '../_context/CartContext';
import GlobalApi from '../_utils/GlobalApi';

function Cart() {

    // On récupère le panier et la fonction de rafraîchissement depuis le contexte
    const { cart, getCartData } = useContext(CartContext);

    const calculateCartSubtotal = () => {
        if (!cart) return '0';
        let total = 0;
        cart.forEach(item => {
            total += item.quantite * item.produit.prix_unitaire;
        });
        return Math.round(total);
    };

    // Logique de suppression mise à jour pour utiliser l'API et le contexte
    const removeItemFromCart = (productId) => {
        // On passe l'ID du produit à l'API. La quantité 0 signifie "supprimer".
        GlobalApi.removeFromCart(productId).then(resp => {
            toast.success('Produit retiré du panier!');
            // On rafraîchit les données du panier pour toute l'application
            getCartData();
        }).catch(err => {
            toast.error('Erreur lors de la suppression.');
        });
    }

    return (
        <div className="p-4 flex flex-col h-full">
            <h2 className="text-lg font-bold mb-4 shrink-0">Mon Panier</h2>
            {!cart || cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <>
                    {/* ITEM LIST */}
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <Image 
                                    src={item?.produit?.images?.[0]?.url_image || '/logo.png'}
                                    width={60}
                                    height={60}
                                    alt={item.produit.nom}
                                    className="border rounded-md object-contain"
                                />
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold">{item.produit.nom}</h3>
                                    <p className="text-xs text-gray-500">Quantité: {item.quantite}</p>
                                    <p className="text-sm font-bold">{Math.round(item.quantite * item.produit.prix_unitaire)} FCFA</p>
                                </div>
                                <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => removeItemFromCart(item.produit.id)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* SUBTOTAL & CHECKOUT BUTTON */}
                    <div className="mt-6 border-t pt-4 shrink-0">
                        <div className="flex justify-between items-center font-bold text-lg mb-4">
                            <span>Total</span>
                            <span>{calculateCartSubtotal()} FCFA</span>
                        </div>
                        <SheetClose asChild>
                            <Link href="/checkout" className="block">
                                <Button className="w-full">Procédez au paiement</Button>
                            </Link>
                        </SheetClose>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart;
