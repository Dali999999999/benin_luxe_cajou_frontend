"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft, ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/app/_context/AuthContext';

function PaymentCancelled() {
    const { isLogin } = useContext(AuthContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        if (isLogin === false) {
            router.push('/sign-in');
            return;
        }

        if (isLogin === true) {
            const id = searchParams.get('order_id');
            setOrderId(id);
        }
    }, [isLogin, searchParams, router]);

    if (isLogin === null) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isLogin === false) {
        return <div className="p-10 text-center">Redirection vers la page de connexion...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] p-4">
            <div className="flex flex-col items-center justify-center p-10 bg-orange-50 rounded-lg shadow-md border border-orange-200 max-w-md text-center">
                <XCircle className="w-16 h-16 text-orange-500 mb-4" />

                <h2 className="text-2xl font-bold mb-2 text-gray-800">Paiement annulé</h2>

                <p className="text-gray-600 mb-4">
                    {orderId
                        ? `Votre paiement pour la commande n°${orderId} a été annulé.`
                        : "Votre paiement a été annulé."
                    }
                </p>

                <p className="text-sm text-gray-500 mb-6">
                    Aucun montant n'a été débité de votre compte. Vous pouvez réessayer le paiement ou contacter notre support si vous rencontrez des difficultés.
                </p>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Link href="/checkout" className="flex-1">
                        <Button variant="default" className="w-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Réessayer le paiement
                        </Button>
                    </Link>

                    <Link href="/" className="flex-1">
                        <Button variant="outline" className="w-full">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Continuer mes achats
                        </Button>
                    </Link>
                </div>

                {/* Lien de contact */}
                <div className="mt-6 pt-4 border-t border-orange-200 w-full">
                    <p className="text-xs text-gray-500 mb-2">Besoin d'aide ?</p>
                    <Link
                        href="tel:+229XXXXXXXX"
                        className="flex items-center justify-center text-sm text-orange-600 hover:text-orange-800 transition-colors"
                    >
                        <Phone className="w-4 h-4 mr-1" />
                        Contacter le support
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentCancelled;