import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Icônes pour les réseaux sociaux
const FacebookIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

function Footer() {
  return (
    // On change la couleur de la bordure supérieure pour être cohérente
    <footer className="relative text-white mt-16 border-t-4 border-primary overflow-hidden">
      {/* On remplace bg-black par bg-primary */}
      <div className="absolute inset-0 bg-primary"></div>

      {/* Contenu du footer */}
      <div className="relative z-10 container mx-auto px-4 py-12">

        {/* Section 1: Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif font-bold text-white">Restez informé</h2>
            {/* On ajuste la couleur du texte pour une meilleure lisibilité */}
            <p className="text-white/80 mt-1">Recevez nos actualités et offres spéciales.</p>
          </div>
          <form className="flex w-full max-w-sm gap-2">
            <Input
              type="email"
              placeholder="Votre adresse e-mail"
              className="bg-white/10 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-white/80"
            />
            {/* On change le bouton pour un meilleur contraste */}
            <Button type="submit" className="bg-white text-primary hover:bg-gray-200 transition-colors font-bold">S'inscrire</Button>
          </form>
        </div>

        <hr className="border-white/20" />

        {/* Section 2: Liens de navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">

          {/* Colonne 1: Informations */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Informations</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/80 hover:text-white transition-colors">À propos de nous</Link></li>
              <li><Link href="/terms" className="text-white/80 hover:text-white transition-colors">Conditions générales</Link></li>
              <li><Link href="/privacy" className="text-white/80 hover:text-white transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>

          {/* Colonne 2: Support */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-white/80 hover:text-white transition-colors">Nous Contacter</Link></li>
              <li><Link href="/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-white/80 hover:text-white transition-colors">Livraison & Retours</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Produits</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/80 hover:text-white transition-colors">Boutique</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <Image src="/logo.png" width={150} height={100} alt="logo" className="h-auto" />
            <h5>Bénin Luxe Cajou</h5>
            <p className="mt-4 text-white/70 text-sm">Des noix de cajou de qualité premium, de nos plantations à votre table.</p>
          </div>
        </div>

        <hr className="border-white/20" />

        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Bénin Luxe Cajou. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-white/80 hover:text-white transition-transform hover:scale-110"><FacebookIcon /></Link>
            <Link href="#" className="text-white/80 hover:text-white transition-transform hover:scale-110"><InstagramIcon /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;