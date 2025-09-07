import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer"; 
import CookieBanner from "./_components/CookieBanner";
import SEOSchema from "./_components/SEOSchema";
import Providers from "./_components/Providers";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

// Metadata SEO - maintenant que c'est un server component
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

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={outfit.className}>
        <SEOSchema />
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}