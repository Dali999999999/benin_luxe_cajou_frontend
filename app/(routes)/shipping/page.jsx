"use client";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      {/* Titre */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-green-700 mb-12">
        Informations de Livraison
      </h1>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Zones de livraison */}
        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Zones de Livraison
          </h2>
          <p className="text-lg leading-relaxed">
            Nous livrons nos amandes de cajou à travers tout le Bénin et à
            l’international. Les délais et frais de livraison varient en
            fonction de la destination.
          </p>
        </section>

        {/* Délais */}
        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Délais de Livraison
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li><span className="font-semibold">Bénin :</span> 2 à 3 jours ouvrables.</li>
            <li><span className="font-semibold">Afrique de l’Ouest :</span> 5 à 7 jours ouvrables.</li>
            <li><span className="font-semibold">International :</span> 7 à 15 jours ouvrables selon la destination.</li>
          </ul>
        </section>

        {/* Frais */}
        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Frais de Livraison
          </h2>
          <p className="text-lg leading-relaxed">
            Les frais de livraison sont calculés automatiquement en fonction du
            poids de votre commande et de l’adresse de livraison. Pour les
            commandes importantes, des réductions spéciales peuvent être
            appliquées.
          </p>
        </section>

        {/* Suivi */}
        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Suivi de Commande
          </h2>
          <p className="text-lg leading-relaxed">
            Une fois votre commande expédiée, vous recevrez un e-mail avec un
            numéro de suivi pour suivre l’acheminement de votre colis en temps
            réel.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-green-50 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Besoin d’aide ?
          </h2>
          <p className="text-lg leading-relaxed">
            Si vous avez des questions concernant la livraison, contactez notre
            service client à l’adresse suivante :{" "}
            <a
              href="mailto:support@beninluxecajou.com"
              className="text-green-700 font-semibold underline"
            >
              support@beninluxecajou.com
            </a>{" "}
            ou appelez-nous au <span className="font-semibold">+229 90 00 00 00</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
