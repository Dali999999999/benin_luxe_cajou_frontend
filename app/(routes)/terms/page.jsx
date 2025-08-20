import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
    BookOpen, 
    Package, 
    CircleDollarSign, 
    ShoppingCart, 
    CreditCard, 
    Truck, 
    Undo2, 
    ShieldAlert, 
    Gavel,
    List 
} from 'lucide-react';

function TermsPage() {
    const sections = [
        { id: 'objet', title: 'Article 1 : Objet', icon: BookOpen },
        { id: 'produits', title: 'Article 2 : Produits', icon: Package },
        { id: 'prix', title: 'Article 3 : Prix', icon: CircleDollarSign },
        { id: 'commande', title: 'Article 4 : Commande', icon: ShoppingCart },
        { id: 'paiement', title: 'Article 5 : Paiement', icon: CreditCard },
        { id: 'livraison', title: 'Article 6 : Livraison', icon: Truck },
        { id: 'retractation', title: 'Article 7 : Droit de Rétractation', icon: Undo2 },
        { id: 'responsabilite', title: 'Article 8 : Responsabilité', icon: ShieldAlert },
        { id: 'droit', title: 'Article 9 : Droit applicable', icon: Gavel },
    ];

    return (
        <main className="bg-slate-50">
            {/* Section d'en-tête */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                        Conditions Générales de Vente
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Dernière mise à jour : 20 août 2025
                    </p>
                </div>
            </div>

            {/* Contenu principal de la page */}
            <div className="container mx-auto px-4 py-16">
                <div className="lg:grid lg:grid-cols-4 lg:gap-12">
                    
                    {/* Colonne de Navigation (visible sur ordinateur) */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 p-6 bg-white rounded-xl shadow-sm border">
                            <h3 className="font-bold text-lg text-slate-800 mb-4">Table des matières</h3>
                            <ul className="space-y-3">
                                {sections.map(section => (
                                    <li key={section.id}>
                                        <a href={`#${section.id}`} className="text-slate-600 hover:text-green-600 transition-colors font-medium">
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Colonne de Contenu */}
                    <div className="lg:col-span-3">
                        
                        {/* Menu déroulant pour mobile/tablette */}
                        <div className="lg:hidden mb-8">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full flex justify-between items-center text-slate-600 font-bold">
                                        <List className="h-5 w-5 mr-2" />
                                        Table des matières
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                                    {sections.map(section => (
                                        <DropdownMenuItem key={section.id} asChild>
                                            <a href={`#${section.id}`}>{section.title}</a>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border space-y-8">
                            <p className="text-slate-600 leading-relaxed">
                                Les présentes conditions générales de vente (ci-après "CGV") régissent les relations contractuelles entre la société Bénin Luxe Cajou et toute personne effectuant un achat sur notre site. La validation de votre commande vaut acceptation pleine et entière de ces CGV.
                            </p>
                            {sections.map(section => (
                                <section key={section.id} id={section.id} className="pt-4 border-t first:border-t-0 first:pt-0">
                                    <div className="flex items-center gap-4 mb-4">
                                        <section.icon className="h-8 w-8 text-green-600 shrink-0" />
                                        <h2 className="text-2xl font-bold text-slate-800">{section.title}</h2>
                                    </div>
                                    <div className="prose prose-slate max-w-none">
                                        {renderSectionContent(section.id)}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

// Fonction helper pour afficher le contenu de chaque article
function renderSectionContent(id) {
    const content = {
        objet: "Les présentes CGV visent à définir les modalités de vente entre le Vendeur et le Client, de la commande aux services, en passant par le paiement et la livraison.",
        produits: "Les produits proposés à la vente sont ceux qui figurent sur le Site, dans la limite des stocks disponibles. Nous apportons le plus grand soin dans la présentation et la description des produits. Les photographies ne sont pas contractuelles.",
        prix: "Les prix sont indiqués en [Votre Devise, ex: XOF] toutes taxes comprises (TTC), hors frais de livraison. Le Vendeur se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.",
        commande: "Le Client peut passer commande sur le Site 24h/24 et 7j/7. Le processus de commande se compose de plusieurs étapes successives. Une fois sa sélection de produits effectuée, et son panier validé, le Client devra s'identifier, choisir l'adresse de livraison, et enfin valider le mode de paiement.",
        paiement: "Le paiement est exigible immédiatement à la commande. Le Client peut effectuer le règlement par [Lister vos moyens de paiement]. Les paiements sont sécurisés par notre prestataire [Nom du prestataire de paiement] via un protocole de cryptage.",
        livraison: "Les produits sont livrés à l'adresse de livraison indiquée au cours du processus de commande, dans les délais indiqués. Ces délais ne sont donnés qu'à titre indicatif.",
        retractation: "Conformément à la législation en vigueur, le Client dispose d'un délai de [ex: 14 jours] à compter de la réception de ses produits pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalité. Les produits doivent être retournés dans leur état d'origine.",
        responsabilite: "Le Vendeur, dans le processus de vente en ligne, n'est tenu que par une obligation de moyens. Sa responsabilité ne pourra être engagée pour un dommage résultant de l'utilisation du réseau Internet (virus, rupture de service, etc.).",
        droit: "Les présentes CGV sont soumises à la loi [Votre Pays, ex: béninoise]. En cas de litige, les tribunaux de [Votre Ville, ex: Cotonou] seront seuls compétents.",
    };
    return <p>{content[id]}</p>;
}

export default TermsPage;