"use client"
import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
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
        if (!cart) return '0.00';
        let total = 0;
        cart.forEach(item => {
            total += item.quantite * item.produit.prix_unitaire;
        });
        return total.toFixed(2);
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
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">My Cart</h2>
            {!cart || cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {/* ITEM LIST */}
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <Image 
                                    src={item.produit.images[0]?.url_image || '/logo.png'}
                                    width={60}
                                    height={60}
                                    alt={item.produit.nom}
                                    className="border rounded-md object-contain"
                                />
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold">{item.produit.nom}</h3>
                                    <p className="text-xs text-gray-500">Quantité: {item.quantite}</p>
                                    <p className="text-sm font-bold">{(item.quantite * item.produit.prix_unitaire).toFixed(2)} FCFA</p>
                                </div>
                                <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => removeItemFromCart(item.produit.id)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* SUBTOTAL & CHECKOUT BUTTON */}
                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between items-center font-bold text-lg mb-4">
                            <span>Total</span>
                            <span>{calculateCartSubtotal()} FCFA</span>
                        </div>
                        <Link href="/checkout" className="block">
                            <Button className="w-full">Procédez au paiement</Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart;
