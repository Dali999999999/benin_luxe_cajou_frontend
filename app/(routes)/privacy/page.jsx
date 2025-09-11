import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
    BookUser,
    UserCheck,
    ClipboardCheck,
    Share2,
    Cookie,
    Lock,
    GanttChartSquare,
    RefreshCcw,
    Mail,
    List
} from 'lucide-react';

function PrivacyPage() {
    const sections = [
        { id: 'introduction', title: 'Introduction', icon: BookUser },
        { id: 'collecte', title: 'Données que nous collectons', icon: UserCheck },
        { id: 'utilisation', title: 'Comment nous utilisons vos données', icon: ClipboardCheck },
        { id: 'partage', title: 'Partage de vos données', icon: Share2 },
        { id: 'cookies', title: 'Cookies et technologies similaires', icon: Cookie },
        { id: 'securite', title: 'Sécurité de vos données', icon: Lock },
        { id: 'droits', title: 'Vos droits', icon: GanttChartSquare },
        { id: 'mises-a-jour', title: 'Mises à jour de cette politique', icon: RefreshCcw },
        { id: 'contact', title: 'Nous contacter', icon: Mail },
    ];

    return (
        <main className="bg-slate-50">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                        Politique de Confidentialité
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Dernière mise à jour : 20 août 2025
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="lg:grid lg:grid-cols-4 lg:gap-12">
                    
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 p-6 bg-white rounded-xl shadow-sm border">
                            <h3 className="font-bold text-lg text-slate-800 mb-4">Navigation Rapide</h3>
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

                    <div className="lg:col-span-3">
                        <div className="lg:hidden mb-8">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full flex justify-between items-center text-slate-600 font-bold">
                                        <List className="h-5 w-5 mr-2" />
                                        Navigation Rapide
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

function renderSectionContent(id) {
    switch (id) {
        case 'introduction':
            return <p>La présente Politique de Confidentialité décrit comment Bénin Luxe Cajou collecte, utilise et partage vos informations personnelles lorsque vous visitez ou effectuez un achat sur notre site Bénin Luxe Cajou</p>;
        case 'collecte':
            return <>
                <p>Nous collectons plusieurs types d'informations :</p>
                <ul>
                    <li><strong>Informations que vous nous fournissez :</strong> Nom, adresse de facturation, adresse de livraison, informations de paiement, adresse e-mail et numéro de téléphone.</li>
                    <li><strong>Informations collectées automatiquement :</strong> Lorsque vous visitez le Site, nous collectons automatiquement certaines informations sur votre appareil, y compris des informations sur votre navigateur web, votre adresse IP, et certains des cookies installés sur votre appareil.</li>
                </ul>
            </>;
        case 'utilisation':
            return <p>Nous utilisons les informations que nous collectons pour traiter vos commandes, communiquer avec vous, optimiser notre site, et (si vous y consentez) vous envoyer des informations sur nos produits et promotions.</p>;
        case 'partage':
            return <p>Nous partageons vos informations personnelles avec des tiers pour nous aider à utiliser vos informations, comme décrit ci-dessus. Par exemple, nous utilisons Fedapay pour traiter les paiements.</p>;
        case 'cookies':
            return <p>Nous utilisons des cookies pour améliorer votre expérience de navigation. Les cookies sont des fichiers de données qui sont placés sur votre appareil et incluent souvent un identifiant unique anonyme. Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines parties de notre site pourraient ne pas fonctionner correctement.</p>;
        case 'securite':
            return <p>Nous prenons des précautions raisonnables pour protéger vos informations personnelles et suivons les meilleures pratiques de l'industrie pour nous assurer qu'elles ne soient pas perdues, détournées, consultées, divulguées, modifiées ou détruites de manière inappropriée.</p>;
        case 'droits':
            return <p>Si vous êtes un résident européen, vous disposez d'un droit d'accès aux informations personnelles que nous détenons à votre sujet et de demander que vos informations personnelles soient corrigées, mises à jour ou supprimées. Pour exercer ce droit, veuillez nous contacter.</p>;
        case 'mises-a-jour':
            return <p>Nous pouvons mettre à jour cette politique de confidentialité de temps à autre afin de refléter, par exemple, des changements dans nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires.</p>;
        case 'contact':
            return <p>Pour plus d'informations sur nos pratiques de confidentialité, si vous avez des questions, ou si vous souhaitez déposer une plainte, veuillez nous contacter par e-mail à <a href="mailto:beninluxecajou229@gmail.com" className="text-green-600 hover:text-green-700 underline font-medium">beninluxecajou229@gmail.com</a>.</p>;
        default:
            return null;
    }
}

export default PrivacyPage;