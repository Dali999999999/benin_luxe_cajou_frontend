// app/_components/SEOSchema.jsx
export default function SEOSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Benin Luxe Cajou",
    "description": "Producteur de noix de cajou grillées et naturelles du Bénin",
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
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Noix de Cajou Grillées Entières",
          "description": "Noix de cajou grillées entières de qualité premium du Bénin"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Noix de Cajou Grillées Brisées",
          "description": "Noix de cajou grillées brisées, idéales pour la cuisine"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Noix de Cajou Naturelles",
          "description": "Noix de cajou naturelles non grillées du Bénin"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}