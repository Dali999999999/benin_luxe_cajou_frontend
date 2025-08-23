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
            toast("Compte créé. Veuillez vérifier vos e-mails pour le code de vérification.")
            router.push('/verify-account?email=' + email);
            setLoader(false)
        }, (e) => {
            setLoader(false)
            toast(e?.response?.data?.message || 'Une erreur est survenue')
        })
    }

    return (
        <div className='flex items-baseline justify-center my-10'>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
                <Image src='/logo.png' width={200} height={200} alt='logo' />
                <h2 className='font-bold text-3xl'>Créer un compte</h2>
                <h2 className='text-gray-500'>Entrez vos informations pour créer un compte</h2>

                {/* Inputs */}
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input placeholder='Prénom' onChange={(e) => setPrenom(e.target.value)} />
                    <Input placeholder='Nom' onChange={(e) => setNom(e.target.value)} />
                    <Input placeholder='nom@exemple.com' onChange={(e) => setEmail(e.target.value)} />
                    <Input type='password' placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={() => onCreateAccount()}
                        disabled={!(prenom || nom || email || password)}
                    >
                        {loader ? <LoaderIcon className='animate-spin' /> : "Créer un compte"}
                    </Button>
                    <p>
                        Vous avez déjà un compte ?
                        <Link href={'/sign-in'} className='text-blue-500'>
                            Cliquez ici pour vous connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount