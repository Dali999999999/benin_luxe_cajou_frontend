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
        const accessToken = localStorage.getItem('access_token');
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

            toast("Login Successfully");

            const redirectUrl = searchParams.get('redirect');
            if (redirectUrl) {
                router.push(redirectUrl);
            } else {
                router.push('/');
            }
            
            setLoader(false);

        }).catch(e => {
            console.log(e);
            toast(e?.response?.data?.message || "Invalid credentials");
            setLoader(false);
        });
    }

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setIsForgotLoading(true);
        try {
            // On peut garder GlobalApi pour les fonctions non encore migrées
            await GlobalApi.forgotPassword(forgotEmail);
            toast.success("A reset code has been sent to your email.");
            setForgotStep(2);
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred.");
        } finally {
            setIsForgotLoading(false);
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsForgotLoading(true);
        try {
            await GlobalApi.resetPassword(forgotEmail, code, newPassword);
            toast.success("Password updated successfully! You can now log in.");
            setIsDialogOpen(false);
            setForgotStep(1);
            setForgotEmail('');
            setCode('');
            setNewPassword('');
        } catch (error) {
            toast.error(error?.response?.data?.message || "The code is incorrect or has expired.");
        } finally {
            setIsForgotLoading(false);
        }
    }


    return (
        <div className='flex items-baseline justify-center my-10'>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
                <Image src='/logo.png' width={200} height={200} alt='logo' />
                <h2 className='font-bold text-3xl'>Sign In</h2>
                <h2 className='text-gray-500'>Enter your Email and Password to Sign In</h2>

                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input type="email" placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)} />
                    <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={() => onSignIn()}
                        disabled={!(email || password)}
                    >
                        {loader ? <LoaderIcon className='animate-spin' /> : "Sign In"}
                    </Button>
                    <div className='text-sm text-center'>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <button className='text-blue-500 hover:underline'>Forgot Password?</button>
                            </DialogTrigger>
                            <DialogContent>
                                {forgotStep === 1 && (
                                    <form onSubmit={handleRequestCode}>
                                        <DialogHeader>
                                            <DialogTitle>Reset your password</DialogTitle>
                                            <DialogDescription>
                                                Enter your email address and we'll send you a code to reset your password.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <Input 
                                                type="email" 
                                                placeholder="name@example.com" 
                                                value={forgotEmail}
                                                onChange={(e) => setForgotEmail(e.target.value)} 
                                                required
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={isForgotLoading}>
                                                {isForgotLoading ? <LoaderIcon className='animate-spin' /> : "Send Reset Code"}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                )}
                                {forgotStep === 2 && (
                                    <form onSubmit={handleResetPassword}>
                                        <DialogHeader>
                                            <DialogTitle>Check your email</DialogTitle>
                                            <DialogDescription>
                                                Enter the code you received and your new password.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4 space-y-4">
                                            <Input 
                                                placeholder="Verification Code" 
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)} 
                                                required
                                            />
                                            <Input 
                                                type="password"
                                                placeholder="New Password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={isForgotLoading}>
                                                {isForgotLoading ? <LoaderIcon className='animate-spin' /> : "Update Password"}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                    <p className='text-center'>
                        Don't have an account?
                        <Link href={'/create-account'} className='text-blue-500 ml-1'>
                            Create new account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
