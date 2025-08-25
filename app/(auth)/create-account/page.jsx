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
        console.log('=== FONCTION onCreateAccount APPELÉE ==='); // Debug principal
        console.log('Valeurs des champs:', { nom, prenom, email, password }); // Debug valeurs
        
        // Vérification des champs requis
        if (!prenom || !nom || !email || !password) {
            console.log('Champs manquants détectés');
            toast.error('Veuillez remplir tous les champs');
            return;
        }
        
        setLoader(true)
        const userData = { nom, prenom, email, password };
        
        console.log('Envoi des données:', userData); // Debug
        
        GlobalApi.register(userData).then(data => {
            // DÉBOGAGE : Afficher toute la réponse
            console.log('Données reçues:', data);

            // Vérification de l'existence des données
            if (!data) {
                console.error('Les données sont undefined');
                toast.error('Erreur de réponse du serveur');
                setLoader(false);
                return;
            }

            // Vérification de l'existence de verification_token
            if (!data.verification_token) {
                console.error('verification_token manquant dans les données:', data);
                toast.error('Token de vérification manquant');
                setLoader(false);
                return;
            }

            // --- NOUVELLE LOGIQUE ---
            // 1. Récupérer le token depuis la réponse
            const { verification_token } = data;
            
            // Save email to sessionStorage for resend verification
            sessionStorage.setItem('verification_email', email);

            console.log('Token reçu:', verification_token); // Debug

            // 2. Naviguer vers la page de vérification en passant le token
            router.push(`/verify-account?token=${verification_token}`); 
            
            toast("Compte créé. Veuillez vérifier vos e-mails pour le code de vérification.")
            setLoader(false)
            
        }).catch((error) => {
            // DÉBOGAGE : Afficher l'erreur complète
            console.error('Erreur complète:', error);
            console.error('Erreur response:', error.response);
            console.error('Erreur request:', error.request);
            console.error('Erreur message:', error.message);

            setLoader(false);

            if (error.response) {
                // Le serveur a répondu avec un code d'erreur
                console.log('Status d\'erreur:', error.response.status);
                console.log('Data d\'erreur:', error.response.data);
                toast.error(error.response.data?.msg || error.response.data?.message || 'Erreur lors de la création du compte');
            } else if (error.request) {
                // La requête a été faite mais pas de réponse
                console.log('Pas de réponse du serveur');
                toast.error('Impossible de contacter le serveur');
            } else if (typeof error === 'string') {
                // Erreur retournée directement par GlobalApi
                console.log('Erreur GlobalApi:', error);
                toast.error(error);
            } else {
                // Erreur dans la configuration de la requête
                console.log('Erreur de configuration:', error.message);
                toast.error('Erreur de configuration');
            }
        });
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
                    <Button 
                        onClick={() => {
                            console.log('=== BOUTON CLIQUÉ ==='); // Debug du clic
                            onCreateAccount();
                        }}
                        disabled={!(prenom && nom && email && password)}
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