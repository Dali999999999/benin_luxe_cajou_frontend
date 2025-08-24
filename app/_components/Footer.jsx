import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Icônes pour les réseaux sociaux
const FacebookIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const TikTokIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4H12a4 4 0 0 0-4 4v12a4 4 0 0 0 8 0V12h4V8h-4V4z" />
    <circle cx="8" cy="12" r="4" />
  </svg>
);

function Footer() {
  return (
    <footer className="relative text-white mt-16 border-t-4 border-primary overflow-hidden">
      <div className="absolute inset-0 bg-primary"></div>
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif font-bold text-white">
              Restez informé
            </h2>
            <p className="text-white/80 mt-1">
              Recevez nos actualités et offres spéciales.
            </p>
          </div>
          <form className="flex w-full max-w-sm gap-2">
            <Input
              type="email"
              placeholder="Votre adresse e-mail"
              className="bg-white/10 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-white/80"
            />
            <Button
              type="submit"
              className="bg-white text-primary hover:bg-gray-200 transition-colors font-bold"
            >
              S'inscrire
            </Button>
          </form>
        </div>

        <hr className="border-white/20" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-white">Informations</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Nous Contacter
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Livraison & Retours
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-white">Produits</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Boutique
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <Image
              src="/logo.png"
              width={150}
              height={100}
              alt="logo"
              className="h-auto"
            />
            <p className="mt-4 text-white/70 text-sm">
              Des noix de cajou de qualité premium, de nos plantations à votre
              table.
            </p>
          </div>
        </div>

        <hr className="border-white/20" />

        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Bénin Luxe Cajou. Tous droits réservés.
          </p>
          {/* --- CORRECTION FUSIONNÉE ICI --- */}
          <div className="flex gap-6 flex-nowrap flex-shrink-0">
            <Link
              href="https://www.facebook.com/profile.php?id=61579712160130"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-transform hover:scale-110"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="https://www.instagram.com/benin.luxecajou?igsh=MWFnam9hN2d5eDVuMg=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-transform hover:scale-110"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="https://wa.me/22997501515"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-transform hover:scale-110"
            >
              <WhatsAppIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
