"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Hourglass, LoaderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function PaymentSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState('checking'); // checking, paid, pending, failed
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = searchParams.get('order_id');
        if (!id) {
            toast.error("Order ID not found in URL.");
            router.push('/'); // Redirect home if no order_id
            return;
        }
        setOrderId(id);

        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            toast.error("You must be logged in to view this page.");
            router.push('/sign-in');
            return;
        }

        const checkStatus = async () => {
            try {
                const resp = await GlobalApi.getPaymentStatus(id);
                setPaymentStatus(resp.payment_status);
                // Clear local cart after successful payment check
                // This assumes the API has already cleared the server-side cart
                // For robustness, we might need a dedicated API call to clear cart
                // or manage cart state more globally.
                // For now, we'll simulate clearing the cart by calling manageCart with 0 quantity for all items.
                // A more robust solution would be to have a clearCart API endpoint.
                const cartItems = await GlobalApi.getCart();
                if (cartItems && cartItems.length > 0) {
                    for (const item of cartItems) {
                        await GlobalApi.removeFromCart(item.produit.id);
                    }
                }

            } catch (error) {
                console.error("Error checking payment status:", error);
                setPaymentStatus('failed');
                toast.error("Failed to verify payment status.");
            }
            setLoading(false);
        };

        checkStatus();
    }, [searchParams, router]);

    const renderContent = () => {
        switch (paymentStatus) {
            case 'checking':
                return (
                    <div className="flex flex-col items-center justify-center p-10 bg-slate-100 rounded-lg shadow-md">
                        <Hourglass className="w-16 h-16 text-blue-500 mb-4 animate-spin" />
                        <h2 className="text-2xl font-bold mb-2">Verifying your payment...</h2>
                        <p className="text-gray-600">Please wait, this may take a moment.</p>
                    </div>
                );
            case 'paye':
                return (
                    <div className="flex flex-col items-center justify-center p-10 bg-green-50 rounded-lg shadow-md border border-green-200">
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                        <p className="text-gray-700 text-center">Thank you for your order. Your order #{orderId} has been confirmed and is being prepared.</p>
                        <Link href="/"><Button className="mt-6">Continue Shopping</Button></Link>
                    </div>
                );
            case 'en_attente':
                return (
                    <div className="flex flex-col items-center justify-center p-10 bg-yellow-50 rounded-lg shadow-md border border-yellow-200">
                        <Hourglass className="w-16 h-16 text-yellow-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Payment Pending</h2>
                        <p className="text-gray-700 text-center">Your payment for order #{orderId} is being processed. You will receive a confirmation email shortly.</p>
                        <Link href="/"><Button className="mt-6">Go to Homepage</Button></Link>
                    </div>
                );
            case 'failed':
            default:
                return (
                    <div className="flex flex-col items-center justify-center p-10 bg-red-50 rounded-lg shadow-md border border-red-200">
                        <XCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Payment Failed</h2>
                        <p className="text-gray-700 text-center">Unfortunately, your payment for order #{orderId} could not be processed. Please try again or contact support.</p>
                        <Link href="/checkout"><Button className="mt-6">Try Again</Button></Link>
                    </div>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <LoaderIcon className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] p-4">
            {renderContent()}
        </div>
    );
}

export default PaymentSuccess;
