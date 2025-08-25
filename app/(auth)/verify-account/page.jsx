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

function VerifyAccount() {

    const [code, setCode] = useState();
    const [loader, setLoader] = useState(false);
    const { updateAuthStatus } = useContext(AuthContext);
    const [resendCooldown, setResendCooldown] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get('email');

    useEffect(() => {
        if (!email) {
            router.push('/create-account');
        }
    }, [email, router]);

    useEffect(() => {
        if (resendCooldown === 0) return;
        const timer = setTimeout(() => {
            setResendCooldown(resendCooldown - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [resendCooldown]);


    const onVerifyAccount = () => {
        setLoader(true)
        GlobalApi.verifyAccount(email, code).then(resp => {
            const token = resp.access_token;
            localStorage.setItem('jwt', token);
            localStorage.removeItem('session_id'); // Clean up session_id
            updateAuthStatus(true, token); // Update auth status

            toast("Account Verified Successfully!")
            router.push('/');
            setLoader(false)
        }, (e) => {
            setLoader(false)
            toast(e?.response?.data?.message || 'An error occurred')
        })
    }

    const handleResendCode = () => {
        if (resendCooldown > 0 || isResending) return;

        setIsResending(true);
        GlobalApi.resendVerificationCode(email).then(resp => {
            toast("A new code has been sent to your email.");
            setResendCooldown(60); // Reset cooldown
        }).catch(error => {
            toast(error?.response?.data?.message || "An error occurred while resending the code.");
        }).finally(() => {
            setIsResending(false);
        });
    };

    const isResendButtonDisabled = resendCooldown > 0 || isResending;

    return (
        <div className='flex items-baseline justify-center my-10'>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
                <Image src='/logo.png' width={200} height={200} alt='logo' />
                <h2 className='font-bold text-3xl'>Verify Your Account</h2>
                <h2 className='text-gray-500'>Enter the 6-digit code sent to <strong>{email}</strong></h2>

                {/* Inputs */}
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input placeholder='123456' maxLength={6} onChange={(e) => setCode(e.target.value)} />
                    <Button onClick={() => onVerifyAccount()}
                        disabled={!code || code.length < 6}
                    >
                        {loader ? <LoaderIcon className='animate-spin' /> : "Verify and Sign In"}
                    </Button>
                    <div className='text-sm text-gray-500 text-center'>
                        Didn't receive a code?
                        <button 
                            onClick={handleResendCode} 
                            disabled={isResendButtonDisabled}
                            className='text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed ml-1'
                        >
                            {isResending 
                                ? "Sending..." 
                                : (resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount
