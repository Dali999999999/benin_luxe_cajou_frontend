import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer"; 
import CookieBanner from "./_components/CookieBanner";
import SEOSchema from "./_components/SEOSchema";
import Providers from "./_components/Providers";
import { Toaster } from "@/components/ui/sonner";

// Metadata SEO - maintenant que c'est un server component
export const metadata = {
  title: "Benin Luxe Cajou - Noix de Cajou Premium du Bénin",
  description: "Découvrez nos noix de cajou grillées et naturelles directement du Bénin. Cajou premium, grillé et cru, livraison rapide. Commandez en ligne vos noix de cajou artisanales.",
  keywords: "cajou, noix de cajou, cajou grillé, cajou naturel, cajou brisé, Bénin, premium, anacarde, cashew, livraison",
  author: "Benin Luxe Cajou",
  robots: "index, follow",
  openGraph: {
    title: "Benin Luxe Cajou - Noix de Cajou Grillées & Naturelles",
    description: "Noix de cajou premium : grillées entières, brisées et naturelles. Direct du producteur béninois.",
    url: "https://dzbeninluxecajou.com",
    siteName: "Benin Luxe Cajou",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://dzbeninluxecajou.com/logo.png",
        width: 800,
        height: 600,
        alt: "Benin Luxe Cajou Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Benin Luxe Cajou - Noix de Cajou Grillées & Naturelles",
    description: "Noix de cajou premium : grillées entières, brisées et naturelles. Direct du producteur béninois.",
    images: ["https://dzbeninluxecajou.com/logo.png"]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="font-sans">
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