"use client"
// On importe notre nouveau client API
import apiClient from '@/app/_utils/apiClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/app/_context/AuthContext';
import { toast } from 'sonner';
// GlobalApi n'est plus nécessaire pour le login, mais peut l'être pour d'autres fonctions
import GlobalApi from '@/app/_utils/GlobalApi';
import { authCookies } from '@/app/_utils/cookieManager';

function SignIn() {

    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const { updateAuthStatus } = useContext(AuthContext);
    const searchParams = useSearchParams();

    // State for Forgot Password
    const [forgotStep, setForgotStep] = useState(1);
    const [forgotEmail, setForgotEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isForgotLoading, setIsForgotLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // On vérifie le nouveau token
    useEffect(() => {
        const accessToken = authCookies.getAccessToken();
        if (accessToken) {
            router.push("/")
        }
    }, [])


    const onSignIn = () => {
        setLoader(true);
        const credentials = { email: email, password: password };
        
        // On utilise le nouveau apiClient
        apiClient.post('/auth/login', credentials).then(resp => {
            
            // Le backend nous renvoie access_token et refresh_token
            const tokens = {
                access_token: resp.data.access_token,
                refresh_token: resp.data.refresh_token
            };

            // On met à jour le contexte d'authentification avec les deux tokens
            updateAuthStatus(true, tokens);

            toast("Connexion réussie");

            const redirectUrl = searchParams.get('redirect');
            // SECURITY FIX: Validate that the redirect URL is a local path
            if (redirectUrl && redirectUrl.startsWith('/')) {
                router.push(redirectUrl);
            } else {
                router.push('/');
            }
            
            setLoader(false);

        }).catch(e => {
            console.log(e);
            toast(e?.response?.data?.message || "Identifiants invalides");
            setLoader(false);
        });
    }

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setIsForgotLoading(true);
        try {
            // On peut garder GlobalApi pour les fonctions non encore migrées
            await GlobalApi.forgotPassword(forgotEmail);
            toast.success("Un code de réinitialisation a été envoyé à votre e-mail.");
            setForgotStep(2);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Une erreur est survenue.");
        } finally {
            setIsForgotLoading(false);
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsForgotLoading(true);
        try {
            await GlobalApi.resetPassword(forgotEmail, code, newPassword);
            toast.success("Mot de passe mis à jour avec succès ! Vous pouvez maintenant vous connecter.");
            setIsDialogOpen(false);
            setForgotStep(1);
            setForgotEmail('');
            setCode('');
            setNewPassword('');
        } catch (error) {
            toast.error(error?.response?.data?.message || "Le code est incorrect ou a expiré.");
        } finally {
            setIsForgotLoading(false);
        }
    }


    return (
        <div className='flex items-baseline justify-center my-10'>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
                <Image src='/logo.png' width={200} height={200} alt='logo' />
                <h2 className='font-bold text-3xl'>Se connecter</h2>
                <h2 className='text-gray-500'>Entrez votre e-mail et mot de passe pour vous connecter</h2>

                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input type="email" placeholder='nom@exemple.com' onChange={(e) => setEmail(e.target.value)} />
                    <Input type='password' placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={() => onSignIn()}
                        disabled={!(email || password)}
                    >
                        {loader ? <LoaderIcon className='animate-spin' /> : "Se connecter"}
                    </Button>
                    <div className='text-sm text-center'>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <button className='text-blue-500 hover:underline'>Mot de passe oublié ?</button>
                            </DialogTrigger>
                            <DialogContent>
                                {forgotStep === 1 && (
                                    <form onSubmit={handleRequestCode}>
                                        <DialogHeader>
                                            <DialogTitle>Réinitialiser votre mot de passe</DialogTitle>
                                            <DialogDescription>
                                                Entrez votre adresse e-mail et nous vous enverrons un code pour réinitialiser votre mot de passe.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <Input 
                                                type="email" 
                                                placeholder="nom@exemple.com" 
                                                value={forgotEmail}
                                                onChange={(e) => setForgotEmail(e.target.value)} 
                                                required
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={isForgotLoading}>
                                                {isForgotLoading ? <LoaderIcon className='animate-spin' /> : "Envoyer le code"}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                )}
                                {forgotStep === 2 && (
                                    <form onSubmit={handleResetPassword}>
                                        <DialogHeader>
                                            <DialogTitle>Vérifiez vos e-mails</DialogTitle>
                                            <DialogDescription>
                                                Entrez le code que vous avez reçu et votre nouveau mot de passe.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4 space-y-4">
                                            <Input 
                                                placeholder="Code de vérification" 
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)} 
                                                required
                                            />
                                            <Input 
                                                type="password"
                                                placeholder="Nouveau mot de passe"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={isForgotLoading}>
                                                {isForgotLoading ? <LoaderIcon className='animate-spin' /> : "Mettre à jour le mot de passe"}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                    <p className='text-center'>
                        Vous n'avez pas de compte ?
                        <Link href={'/create-account'} className='text-blue-500 ml-1'>
                            Créer un nouveau compte
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
