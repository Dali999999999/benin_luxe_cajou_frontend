import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import Image from 'next/image'
import Footer from "./_components/Footer";
import HomeClient from "./_components/HomeClient";

// Metadata SEO pour la page d'accueil
export const metadata = {
  title: "Benin Luxe Cajou - Noix de Cajou Premium du Bénin | Commandez en Ligne",
  description: "Découvrez la meilleure qualité de noix de cajou du Bénin. Produits bio, artisanaux, livrés rapidement. Commandez vos cajous premium dès maintenant !",
  keywords: "cajou Bénin, noix cajou premium, cajou bio, cajou artisanal, livraison cajou, acheter cajou en ligne",
  alternates: {
    canonical: 'https://benin-luxe-cajou-frontend.vercel.app'
  },
  openGraph: {
    title: "Benin Luxe Cajou - Les Meilleurs Cajous du Bénin",
    description: "Noix de cajou premium, bio et artisanales du Bénin. Livraison rapide partout.",
    type: "website",
    url: "https://benin-luxe-cajou-frontend.vercel.app",
    images: ['/logo.png']
  }
};

export default async function Home() {
  const catalogueStructure = await GlobalApi.getCatalogueStructure();
  const initialProducts = await GlobalApi.getProducts();

  const sliderList = [
    {
      id: 1,
      attributes: {
        image: {
          data: {
            attributes: {
              url: "/images/banner-fresh-groceries.png",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        image: {
          data: {
            attributes: {
              url: "/images/banner-organic-food.png",
            },
          },
        },
      },
    },
  ];

  return (
    <HomeClient 
      catalogueStructure={catalogueStructure} 
      initialProducts={initialProducts} 
      sliderList={sliderList} 
    />
  );
}
