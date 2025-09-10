"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Hourglass, LoaderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/app/_context/AuthContext';
import { CartContext } from '@/app/_context/CartContext';

function PaymentSuccess() {
    const { isLogin } = useContext(AuthContext);
    const { getCartData } = useContext(CartContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState('checking'); // checking, paid, pending, failed
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLogin === false) {
            router.push('/sign-in');
            return;
        }

        if (isLogin === true) {
            setLoading(true);
            const id = searchParams.get('order_id');
            if (!id) {
                toast.error("ID de commande introuvable dans l'URL.");
                router.push('/'); // Redirect home if no order_id
                setLoading(false);
                return;
            }
            setOrderId(id);

            const checkStatus = async () => {
                try {
                    const resp = await GlobalApi.getPaymentStatus(id);
                    setPaymentStatus(resp.payment_status);
                    
                    if (resp.payment_status === 'paye') {
                        // Vider le panier après paiement confirmé
                        const cartItems = await GlobalApi.getCart();
                        if (cartItems && cartItems.length > 0) {
                            // Attendre que tous les articles soient supprimés
                            await Promise.all(
                                cartItems.map(item => GlobalApi.removeFromCart(item.produit.id))
                            );
                        }
                        // Toujours rafraîchir le contexte du panier pour mettre à jour l'interface
                        getCartData();
                    }

                } catch (error) {
                    console.error("Erreur lors de la vérification du statut de paiement:", error);
                    setPaymentStatus('failed');
                    toast.error("Échec de la vérification du statut de paiement.");
                } finally {
                    setLoading(false);
                }
            };

            checkStatus();
        }
    }, [isLogin, searchParams, router]);

    const renderContent = () => {
        switch (paymentStatus) {
            case 'checking':
                return (
                    <div className="flex flex-col items-center justify-center p-10 bg-slate-100 rounded-lg shadow-md">
                        <Hourglass className="w-16 h-16 text-blue-500 mb-4 animate-spin" />
                        <h2 className="text-2xl font-bold mb-2">Vérification de votre paiement...</h2>
                        <p className="text-gray-600">Veuillez patienter, cela peut prendre un instant.</p>
                    </div>
                );
            case 'paye':
                return (
                    <div className="flex flex-col items-center justify-center p-10 bg-green-50 rounded-lg shadow-md border border-green-200">
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Paiement réussi !</h2>
                        <p className="text-gray-700 text-center">Merci pour votre commande. Votre commande n°{orderId} a été confirmée et est en cours de préparation.</p>
                        <Link href="/"><Button className="mt-6">Continuer mes achats</Button></Link>
                    </div>
                );
            case 'en_attente':
                return (
                    <div className="flex flex-col items-center justify-center p-10 bg-yellow-50 rounded-lg shadow-md border border-yellow-200">
                        <Hourglass className="w-16 h-16 text-yellow-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Paiement en attente</h2>
                        <p className="text-gray-700 text-center">Votre paiement pour la commande n°{orderId} est en cours de traitement. Vous recevrez un e-mail de confirmation sous peu.</p>
                        <Link href="/"><Button className="mt-6">Aller à la page d'accueil</Button></Link>
                    </div>
                );
            case 'failed':
            default:
                return (
                    <div className="flex flex-col items-center justify-center p-10 bg-red-50 rounded-lg shadow-md border border-red-200">
                        <XCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Paiement échoué</h2>
                        <p className="text-gray-700 text-center">Malheureusement, votre paiement pour la commande n°{orderId} n'a pas pu être traité. Veuillez réessayer ou contacter le support.</p>
                        <Link href="/checkout"><Button className="mt-6">Réessayer</Button></Link>
                    </div>
                );
        }
    };

    if (isLogin === null || (isLogin && loading)) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <LoaderIcon className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (isLogin === false) {
        return <div className="p-10 text-center">Redirection vers la page de connexion...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] p-4">
            {renderContent()}
        </div>
    );
}

export default PaymentSuccess;
