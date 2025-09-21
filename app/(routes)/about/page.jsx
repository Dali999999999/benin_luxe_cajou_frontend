import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          À propos de Bénin Luxe Cajou
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          L’excellence de la noix de cajou béninoise, portée par une passion
          familiale et un engagement pour la qualité et le développement local.
        </p>
      </section>

      {/* Vision & Valeurs */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Notre Vision</h2>
          <p>
            Être la référence de la noix de cajou transformée. Nous aspirons à
            être reconnus comme la marque de choix pour les amandes de cajou
            transformées, tant au niveau local qu’international.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Nos Valeurs</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sécurité & Authenticité</li>
            <li>Professionnalisme</li>
            <li>Production durable</li>
            <li>Santé & Honnêteté</li>
          </ul>
        </div>
      </section>

      {/* Histoire */}
      <section className="bg-white py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Notre Histoire
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <p className="text-lg leading-relaxed text-justify">
              DZ est née d'une histoire familiale et entrepreneuriale. Depuis 2003,
              la fondatrice <span className="font-semibold">Zoé Alia</span> et son
              mari Dominique ont uni leur passion et leur vision pour transformer
              les richesses du Bénin en produits d'exception. Aujourd'hui, DZ est le
              symbole d'un savoir-faire béninois reconnu, alliant tradition et
              innovation.
            </p>
          </div>
          <div className="relative h-64 md:h-80 w-full">
            <Image
              src="/images/image.jpeg"
              alt="Paysage béninois - Terroir des noix de cajou"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Témoignage vidéo de Dominique */}
        <div className="bg-green-50 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
            Dominique nous raconte leur parcours
          </h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video w-full bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <video
                controls
                className="w-full h-full object-cover"
                poster="/images/video-thumbnail.jpg"
              >
                <source src="/video.mp4" type="video/mp4" />
                <p className="absolute inset-0 flex items-center justify-center text-gray-600">
                  Votre navigateur ne supporte pas la lecture vidéo.
                </p>
              </video>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-justify text-gray-700 mb-4">
                "Cette aventure que nous avons commencée avec Zoé, c'est plus qu'une
                entreprise, c'est un héritage que nous construisons pour nos enfants
                et pour le Bénin."
              </p>
              <p className="text-base text-gray-600 italic">
                — Dominique, co-fondateur de DZ Bénin Luxe Cajou
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Produits */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Nos Produits
          </h2>
          <ul className="space-y-4 text-lg">
            <li>
              <span className="font-semibold">Amandes Blanches :</span> Des
              amandes de cajou naturelles, prêtes à être dégustées ou intégrées
              à vos recettes.
            </li>
            <li>
              <span className="font-semibold">Amandes Torréfiées :</span> Des
              amandes grillées à la perfection, croquantes et savoureuses.
            </li>
            <li>
              <span className="font-semibold">Amandes Beurrées :</span> Des
              amandes enrobées d’une fine couche de beurre, pour une texture
              riche et fondante.
            </li>
          </ul>
        </div>
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src="/images/cashew-bowl.jpg"
            alt="Amandes de cajou"
            fill
            className="object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Engagement */}
      <section className="bg-green-50 py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Notre Engagement
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Qualité & Santé</h3>
            <p>
              Sélection rigoureuse des meilleures noix, respect des normes
              d’hygiène HACCP, et engagement pour des produits sains.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Alimentation Saine</h3>
            <p>
              Offrir une alternative nutritive et gourmande, contribuant à la
              lutte contre la malnutrition.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Valorisation du Terroir
            </h3>
            <p>
              Mettre en avant l’origine et l’authenticité béninoise, pour
              soutenir le développement de l’économie locale.
            </p>
          </div>
        </div>
      </section>

      {/* Portrait de la fondatrice */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Zoé Alia, l'Âme de DZ
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative h-80 w-full">
            <Image
              src="/images/zoe-alia.jpg"
              alt="Zoé Alia, fondatrice de DZ Bénin Luxe Cajou"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
          <div>
            <p className="text-lg leading-relaxed text-justify mb-4">
              Femme entrepreneure béninoise, Zoé incarne la passion, la
              détermination et l'amour du terroir. Héritière des savoirs de sa
              mère, elle a su transformer cet héritage en une marque emblématique,
              symbole de qualité et de résilience.
            </p>
            <p className="text-lg leading-relaxed text-justify">
              Depuis plus de 20 ans, elle développe avec son mari Dominique 
              cette entreprise familiale qui honore les richesses du Bénin
              et porte haut les couleurs de l'excellence béninoise.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
