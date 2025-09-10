// app/_components/SEOSchema.jsx
export default function SEOSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Benin Luxe Cajou",
    "description": "Spécialiste en noix de cajou premium du Bénin",
    "url": "https://dzbeninluxecajou.com",
    "logo": "https://dzbeninluxecajou.com/logo.png",
    "sameAs": [
      // Ajouter les réseaux sociaux ici si besoin
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "French"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Benin"
    },
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Noix de Cajou Premium",
        "description": "Noix de cajou de qualité supérieure du Bénin"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}