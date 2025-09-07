"use client"
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '@/app/_context/AuthContext'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import ProfileInfoSkeleton from '@/app/_components/ProfileInfoSkeleton';
import OrderListSkeleton from '@/app/_components/OrderListSkeleton';
import OrderDetailSkeleton from '@/app/_components/OrderDetailSkeleton';
import { authCookies } from '@/app/_utils/cookieManager';

function Profile() {
    const { isLogin, updateAuthStatus } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ nom: '', prenom: '', telephone: '' });
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
    const [orderDetailsLoading, setOrderDetailsLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // Redirect if user is not logged in (status is definitively false)
        if (isLogin === false) {
            router.push('/sign-in');
        }
    }, [isLogin, router]);

    useEffect(() => {
        // Fetch data only if user is logged in
        if (isLogin) {
            setLoading(true);
            setOrdersLoading(true);

            const profilePromise = GlobalApi.getProfile().then(resp => {
                if (resp) {
                    setUser(resp);
                    setFormData({ nom: resp.nom || '', prenom: resp.prenom || '', telephone: resp.telephone || '' });
                }
            }).catch(error => {
                toast.error('Erreur lors de la récupération du profil.');
                console.error(error);
            });

            const ordersPromise = GlobalApi.getOrders().then(resp => {
                setOrders(resp);
            }).catch(error => {
                toast.error('Erreur lors de la récupération des commandes.');
                console.error(error);
            });

            Promise.all([profilePromise, ordersPromise]).finally(() => {
                setLoading(false);
                setOrdersLoading(false);
            });
        }
    }, [isLogin]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOrderClick = (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
            setSelectedOrderDetails(null);
        } else {
            setExpandedOrderId(orderId);
            setOrderDetailsLoading(true);
            GlobalApi.getOrderById(orderId).then(resp => {
                setSelectedOrderDetails(resp);
            }).catch(error => {
                toast.error('Erreur lors de la récupération des détails de la commande.');
                console.error(error);
            }).finally(() => {
                setOrderDetailsLoading(false);
            });
        }
    };

    const handleUpdateProfile = () => {
        setIsProfileLoading(true);
        const changedData = Object.keys(formData).reduce((acc, key) => {
            if (formData[key] !== user[key]) {
                acc[key] = formData[key];
            }
            return acc;
        }, {});

        if (Object.keys(changedData).length === 0) {
            toast.info("Aucune modification à enregistrer.");
            setIsProfileLoading(false);
            setIsEditing(false);
            return;
        }

        GlobalApi.updateProfile(changedData).then(resp => {
            toast.success("Profil mis à jour avec succès !");
            setUser(resp);
            setIsEditing(false);
            setIsProfileLoading(false);
        }).catch(err => {
            toast.error("La mise à jour du profil a échoué.");
            setIsProfileLoading(false);
        });
    };

    

    const onSignOut = () => {
        authCookies.clearAll();
        updateAuthStatus(false); // Update auth status
        router.push('/');
    }

    if (isLogin === null || (isLogin && loading)) {
        return (
            <div className="p-10 px-4 md:px-16 space-y-8">
                <div className="flex justify-between items-center">
                    <div className="h-8 w-1/4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-10 w-24 bg-slate-200 rounded animate-pulse"></div>
                </div>
                <ProfileInfoSkeleton />
                <OrderListSkeleton />
            </div>
        );
    }

    // Display a message while redirecting
    if (isLogin === false) {
        return <div className="p-10 text-center">Redirecting to sign-in...</div>;
    }

    // Handle the case where the user is logged in but data fetching failed
    if (!user) {
        return <div className="p-10 text-center">Impossible de charger les données du profil. Veuillez rafraîchir la page.</div>;
    }

    return (
        <div className="p-10 px-4 md:px-16 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Mon Profil</h1>
                <Button variant="outline" onClick={onSignOut}>Se déconnecter</Button>
            </div>

            {/* -- Profile Information Form -- */}
            <div className="bg-slate-100 border border-gray-200 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Informations personnelles</h2>
                    {!isEditing && <Button onClick={() => setIsEditing(true)}>Modifier le profil</Button>}
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
                        {isEditing ? (
                            <Input name="prenom" value={formData.prenom || ''} onChange={handleInputChange} />
                        ) : (
                            <p className="text-lg">{user?.prenom}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
                        {isEditing ? (
                            <Input name="nom" value={formData.nom || ''} onChange={handleInputChange} />
                        ) : (
                            <p className="text-lg">{user?.nom}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <p className="text-lg text-gray-500">{user?.email} (ne peut pas être modifié)</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Téléphone</label>
                        {isEditing ? (
                            <Input name="telephone" value={formData.telephone || ''} onChange={handleInputChange} />
                        ) : (
                            <p className="text-lg">{user?.telephone || 'Non fourni'}</p>
                        )}
                    </div>
                    {isEditing && (
                        <div className="flex gap-4">
                            <Button onClick={handleUpdateProfile} disabled={isProfileLoading}>
                                {isProfileLoading ? <LoaderIcon className='animate-spin' /> : "Enregistrer les modifications"}
                            </Button>
                            <Button variant="ghost" onClick={() => setIsEditing(false)}>Annuler</Button>
                        </div>
                    )}
                </div>
            </div>

            {/* -- My Orders Section -- */}
            <div className="bg-slate-100 border border-gray-200 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Mes Commandes</h2>
                {ordersLoading ? (
                    <OrderListSkeleton />
                ) : orders.length === 0 ? (
                    <div className="text-center">Aucune commande trouvée.</div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <> {/* Added React.Fragment */}
                                <div key={order.id} className="border p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-slate-50"
                                    onClick={() => handleOrderClick(order.id)}>
                                    <div>
                                        <h3 className="font-bold">Commande #{order.numero_commande}</h3>
                                        <p className="text-sm text-gray-600">Date : {new Date(order.date_commande).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">Total : {order.total} FCFA</p>
                                        <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                                            order.statut === 'livree' ? 'bg-green-100 text-green-800' :
                                            order.statut === 'en_preparation' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {order.statut.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                                {expandedOrderId === order.id && (
                                    <div className="mt-4 p-4 border-t border-gray-200 bg-white">
                                        {orderDetailsLoading ? (
                                            <OrderDetailSkeleton />
                                        ) : selectedOrderDetails && (
                                            <div className="space-y-4">
                                                {/* Order Tracking Timeline */}
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">Suivi de commande</h3>
                                                    <div className="relative pl-2">
                                                        {selectedOrderDetails.suivi.map((track, idx) => (
                                                            <div key={idx} className="mb-4 flex items-start">
                                                                <div className="w-4 h-4 bg-primary rounded-full absolute -left-2 top-1/2 -translate-y-1/2"></div>
                                                                <div className="ml-6">
                                                                    <p className="font-medium capitalize">{track.statut.replace('_', ' ')}</p>
                                                                    <p className="text-sm text-gray-500">{new Date(track.date_changement).toLocaleString()}</p>
                                                                </div>
                                                                {idx < selectedOrderDetails.suivi.length - 1 && (
                                                                    <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-300"></div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Ordered Items */}
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">Articles commandés</h3>
                                                    <div className="space-y-3">
                                                        {selectedOrderDetails.details.map((item, idx) => (
                                                            <div key={idx} className="flex items-center gap-4">
                                                                <Image src={item?.produit?.images?.[0]?.url_image || '/logo.png'}
                                                                    alt={item.produit.nom}
                                                                    width={60}
                                                                    height={60}
                                                                    className="rounded-md object-contain bg-slate-100 p-1"
                                                                />
                                                                <div>
                                                                    <p className="font-medium">{item.produit.nom}</p>
                                                                    <p className="text-sm text-gray-600">Qté : {item.quantite} x {item.prix_unitaire} FCFA</p>
                                                                    <p className="font-semibold">Sous-total : {item.sous_total} FCFA</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Delivery Address */}
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">Adresse de livraison</h3>
                                                    <p>{selectedOrderDetails.adresse_livraison.nom_destinataire}</p>
                                                    <p>{selectedOrderDetails.adresse_livraison.telephone_destinataire}</p>
                                                    <p>{selectedOrderDetails.adresse_livraison.description_adresse}, {selectedOrderDetails.adresse_livraison.ville}</p>
                                                </div>

                                                {/* Payment Summary */}
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">Résumé du paiement</h3>
                                                    <div className="flex justify-between text-sm">
                                                        <span>Sous-total :</span>
                                                        <span>{selectedOrderDetails.sous_total} FCFA</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span>Frais de livraison :</span>
                                                        <span>{selectedOrderDetails.frais_livraison} FCFA</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span>Réduction :</span>
                                                        <span>-{selectedOrderDetails.montant_reduction} FCFA</span>
                                                    </div>
                                                    <div className="flex justify-between font-bold text-lg mt-2">
                                                        <span>Total :</span>
                                                        <span>{selectedOrderDetails.total} FCFA</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                )}
            </div>

            
        </div>
    )
}

export default Profile
