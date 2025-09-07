"use client";
import { Outfit } from "next/font/google";
import "./globals.css";

// Metadata SEO (même en client component, c'est mieux que rien)
export const metadata = {
  title: "Benin Luxe Cajou - Noix de Cajou Premium du Bénin",
  description: "Découvrez nos noix de cajou premium directement du Bénin. Qualité exceptionnelle, livraison rapide. Commandez en ligne vos cajous bio et artisanaux.",
  keywords: "cajou, noix de cajou, Bénin, premium, bio, artisanal, livraison",
  author: "Benin Luxe Cajou",
  robots: "index, follow",
  openGraph: {
    title: "Benin Luxe Cajou - Noix de Cajou Premium",
    description: "Les meilleures noix de cajou du Bénin livrées chez vous",
    url: "https://benin-luxe-cajou-frontend.vercel.app",
    siteName: "Benin Luxe Cajou",
    type: "website",
    locale: "fr_FR"
  }
};
import Header from "./_components/Header";
import Footer from "./_components/Footer"; 
import CookieBanner from "./_components/CookieBanner";
import SEOSchema from "./_components/SEOSchema";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./_context/CartContext";
import { CategoryProvider } from "./_context/CategoryContext";
import { AuthProvider } from "./_context/AuthContext";
import { SearchProvider } from "./_context/SearchContext";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={outfit.className}>
        <SEOSchema />
        <SearchProvider>
          <AuthProvider>
            <CartProvider>
              <CategoryProvider>
                <Header />
                <main>{children}</main>
                <Footer />
                <CookieBanner />
                <Toaster />
              </CategoryProvider>
            </CartProvider>
          </AuthProvider>
        </SearchProvider>
      </body>
    </html>
  );
}