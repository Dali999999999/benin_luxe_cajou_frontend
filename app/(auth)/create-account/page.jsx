"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderIcon } from 'lucide-react'

function CreateAccount() {

    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loader, setLoader] = useState(false);


    const router = useRouter();

    const onCreateAccount = () => {
        setLoader(true)
        const userData = { nom, prenom, email, password };
        GlobalApi.register(userData).then(resp => {
            // On success, redirect to the verification page
            toast("Account created. Please check your email for the verification code.")
            router.push('/verify-account?email=' + email);
            setLoader(false)
        }, (e) => {
            setLoader(false)
            toast(e?.response?.data?.message || 'An error occurred')
        })
    }

    return (
        <div className='flex items-baseline justify-center my-10'>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
                <Image src='/logo.png' width={200} height={200} alt='logo' />
                <h2 className='font-bold text-3xl'>Create an Account</h2>
                <h2 className='text-gray-500'>Enter your details to create an account</h2>

                {/* Inputs */}
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input placeholder='First Name' onChange={(e) => setPrenom(e.target.value)} />
                    <Input placeholder='Last Name' onChange={(e) => setNom(e.target.value)} />
                    <Input placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)} />
                    <Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={() => onCreateAccount()}
                        disabled={!(prenom || nom || email || password)}
                    >
                        {loader ? <LoaderIcon className='animate-spin' /> : "Create an Account"}
                    </Button>
                    <p>
                        Already have an account?
                        <Link href={'/sign-in'} className='text-blue-500'>
                            Click here to Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount