"use client"
import Image from 'next/image'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '@/app/_context/AuthContext'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderIcon } from 'lucide-react'
import { removeCookie } from '@/app/_utils/cookieManager'

function VerifyAccount() {

    const [code, setCode] = useState();
    const [loader, setLoader] = useState(false);
    const { updateAuthStatus } = useContext(AuthContext);
    const [resendCooldown, setResendCooldown] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const router = useRouter();
    const params = useSearchParams();
    const verificationToken = params.get('token');

    useEffect(() => {
        if (!verificationToken) {
            router.push('/create-account'); // Redirect if no token is present
        }
    }, [verificationToken, router]);

    useEffect(() => {
        if (resendCooldown === 0) return;
        const timer = setTimeout(() => {
            setResendCooldown(resendCooldown - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [resendCooldown]);


    const onVerifyAccount = () => {
        setLoader(true)
        GlobalApi.verifyAccount(verificationToken, code).then(resp => {
            const tokens = {
                access_token: resp.access_token,
                refresh_token: resp.refresh_token
            };
            updateAuthStatus(true, tokens); // Met à jour le contexte et les cookies
            removeCookie('session_id'); // Nettoie l'ID de session invité
            sessionStorage.removeItem('verification_email'); // Clean up email from sessionStorage

            toast("Compte vérifié avec succès !")
            router.push('/');
            setLoader(false)
        }, (e) => {
            setLoader(false)
            toast(e?.response?.data?.message || 'Une erreur est survenue')
        })
    }

    const handleResendCode = () => {
        if (resendCooldown > 0 || isResending) return;

        const email = sessionStorage.getItem('verification_email');
        if (!email) {
            toast.error("Email non trouvé. Veuillez vous réinscrire.");
            return;
        }

        setIsResending(true);
        GlobalApi.resendVerificationCode({ email: email }).then(resp => {
            toast("Un nouveau code a été envoyé à votre e-mail.");
            setResendCooldown(60); // Reset cooldown
        }).catch(error => {
            toast(error?.response?.data?.message || "Une erreur est survenue lors du renvoi du code.");
        }).finally(() => {
            setIsResending(false);
        });
    };

    const isResendButtonDisabled = resendCooldown > 0 || isResending;

    return (
        <div className='flex items-baseline justify-center my-10'>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
                <Image src='/logo.png' width={200} height={200} alt='logo' />
                <h2 className='font-bold text-3xl'>Vérifiez votre compte</h2>
                <h2 className='text-gray-500'>Entrez le code à 6 chiffres envoyé à votre adresse e-mail</h2>

                {/* Inputs */}
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input placeholder='123456' maxLength={6} onChange={(e) => setCode(e.target.value)} />
                    <Button onClick={() => onVerifyAccount()}
                        disabled={!code || code.length < 6}
                    >
                        {loader ? <LoaderIcon className='animate-spin' /> : "Vérifier et se connecter"}
                    </Button>
                    <div className='text-sm text-gray-500 text-center'>
                        Vous n'avez pas reçu de code ?
                        <button 
                            onClick={handleResendCode} 
                            disabled={isResendButtonDisabled}
                            className='text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed ml-1'
                        >
                            {isResending 
                                ? "Envoi en cours..." 
                                : (resendCooldown > 0 ? `Renvoyer dans ${resendCooldown}s` : "Renvoyer")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount
