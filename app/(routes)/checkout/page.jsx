"use client"
import React, { useEffect, useState, useMemo, useContext } from 'react';
import dynamic from 'next/dynamic';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderIcon } from 'lucide-react';
import { AuthContext } from '@/app/_context/AuthContext';
import { CartContext } from '@/app/_context/CartContext';
import Price from '@/app/_components/Price';
import { useCurrency } from '@/app/_context/CurrencyContext';

function Checkout() {
    // On utilise les contextes pour l'authentification et le panier
    const { isLogin } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const { formatPrice } = useCurrency();

    const [deliveryZones, setDeliveryZones] = useState([]);
    const [formData, setFormData] = useState({
        nom_destinataire: '',
        telephone_destinataire: '',
        zone_livraison_id: '',
        type_adresse: 'manuelle',
        latitude: '',
        longitude: '',
        ville: '',
        quartier: '',
        description_adresse: '',
        point_repere: '',
        coupon_code: '',
        notes_client: ''
    });
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const router = useRouter();

    const MapPicker = useMemo(() => dynamic(
        () => import('@/app/_components/MapPicker'),
        { ssr: false }
    ), []);

    // Effet pour la redirection : plus robuste car basé sur le contexte
    useEffect(() => {
        // On attend que le statut de connexion soit definitivement connu (pas à l'état initial)
        if (isLogin === false) {
            router.push('/sign-in?redirect=/checkout');
        }
    }, [isLogin, router]);

    // Effet pour charger les données spécifiques à la page (zones de livraison)
    useEffect(() => {
        if (isLogin) { // On ne charge que si l'utilisateur est connecté
            GlobalApi.getDeliveryZones()
                .then(setDeliveryZones)
                .catch(error => toast.error("Échec du chargement des données de paiement."))
                .finally(() => setLoading(false));
        }
    }, [isLogin]);

    // Effet pour recalculer les totaux quand le panier ou la zone change
    useEffect(() => {
        calculateTotals(cart, formData.zone_livraison_id);
    }, [cart, formData.zone_livraison_id, deliveryZones]);

    const calculateTotals = (currentCart, zoneId) => {
        if (!currentCart) return;
        const sub = currentCart.reduce((acc, item) => acc + item.quantite * item.produit.prix_unitaire, 0);
        setSubtotal(sub);
        const selectedZone = deliveryZones.find(zone => zone.id == zoneId);
        const shipping = selectedZone ? parseFloat(selectedZone.tarif_livraison) : 0;
        setTotal(sub + shipping);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleZoneChange = (zoneId) => {
        setFormData(prev => ({ ...prev, zone_livraison_id: zoneId }));
    };

    const handleAddressTypeChange = (type) => {
        setFormData(prev => ({ ...prev, type_adresse: type, latitude: '', longitude: '', ville: '', quartier: '' }));
    };

    const handleLocationSelect = (latlng) => {
        setFormData(prev => ({ ...prev, latitude: latlng.lat, longitude: latlng.lng }));
        toast.success("Localisation sélectionnée sur la carte !");
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("La géolocalisation n'est pas supportée par votre navigateur.");
            return;
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            setFormData(prev => ({ ...prev, latitude: pos.coords.latitude, longitude: pos.coords.longitude, type_adresse: 'gps_actuelle' }));
            toast.success("Position actuelle capturée !");
        }, (err) => {
            toast.error("Impossible d'obtenir la position actuelle.");
        });
    };

    const handlePlaceOrder = () => {
        // --- VALIDATION AVANT ENVOI ---
        if (!formData.nom_destinataire || !formData.telephone_destinataire) {
            toast.error("Veuillez renseigner le nom et le téléphone du destinataire.");
            return;
        }
        if (!formData.zone_livraison_id) {
            toast.error("Veuillez sélectionner une zone de livraison.");
            return;
        }
        if (formData.type_adresse === 'manuelle' && (!formData.ville || !formData.quartier)) {
            toast.error("Pour une adresse manuelle, veuillez renseigner la ville et le quartier.");
            return;
        }
        if ((formData.type_adresse === 'gps_actuelle' || formData.type_adresse === 'gps_choisie') && (!formData.latitude || !formData.longitude)) {
            toast.error("Veuillez fournir ou sélectionner une localisation GPS valide.");
            return;
        }
        if (!cart || cart.length === 0) {
            toast.error("Votre panier est vide.");
            return;
        }

        // DEBUG: Vérifier les tokens avant d'envoyer la requête
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access_token='));
        const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refresh_token='));
        console.log('DEBUG - Access token présent:', !!accessToken, accessToken?.substring(0, 30));
        console.log('DEBUG - Refresh token présent:', !!refreshToken, refreshToken?.substring(0, 30));

        setIsPlacingOrder(true);
        GlobalApi.initializePayment(formData).then(resp => {
            toast.success("Paiement initié !");
            window.location.href = resp.payment_url;
        }).catch(err => {
            console.error('DEBUG - Erreur paiement:', err?.response?.status, err?.response?.data);
            toast.error(err?.response?.data?.msg || "Échec de l'initialisation du paiement.");
        }).finally(() => {
            setIsPlacingOrder(false);
        });
    };

    // On affiche un loader tant que le statut de connexion n'est pas certain ou que les données chargent
    if (loading && isLogin) {
        return <div className="p-10 text-center"><LoaderIcon className='animate-spin' /> Chargement du paiement...</div>;
    }
    
    // Si l'utilisateur n'est pas connecté, on peut afficher un message ou un loader pendant la redirection
    if (!isLogin) {
        return <div className="p-10 text-center">Redirection vers la connexion...</div>;
    }

    return (
        <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-slate-100 p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-6">Informations de livraison</h1>
                <div className="space-y-4">
                    <Input name="nom_destinataire" placeholder="Nom complet du destinataire" onChange={handleInputChange} />
                    <Input name="telephone_destinataire" placeholder="Numéro de téléphone du destinataire" onChange={handleInputChange} />
                    <select name="zone_livraison_id" onChange={(e) => handleZoneChange(e.target.value)} className="w-full p-2 border rounded-md bg-white" defaultValue="">
                        <option value="" disabled>Sélectionner une zone de livraison</option>
                        {deliveryZones.map(zone => (
                            <option key={zone.id} value={zone.id}>{zone.nom_zone} (+{formatPrice(zone.tarif_livraison)})</option>
                        ))}
                    </select>
                    
                    <div className="flex gap-4 pt-4">
                        <label><input type="radio" name="addressType" value="manuelle" checked={formData.type_adresse === 'manuelle'} onChange={() => handleAddressTypeChange('manuelle')} /> Adresse manuelle</label>
                        <label><input type="radio" name="addressType" value="gps_actuelle" checked={formData.type_adresse === 'gps_actuelle'} onChange={() => handleAddressTypeChange('gps_actuelle')} /> Localisation actuelle</label>
                        <label><input type="radio" name="addressType" value="gps_choisie" checked={formData.type_adresse === 'gps_choisie'} onChange={() => handleAddressTypeChange('gps_choisie')} /> Choisir sur la carte</label>
                    </div>

                    {formData.type_adresse === 'manuelle' && (
                        <div className="space-y-4 border-t pt-4">
                            <Input name="ville" placeholder="Ville" onChange={handleInputChange} />
                            <Input name="quartier" placeholder="Quartier / Zone" onChange={handleInputChange} />
                        </div>
                    )}

                    {formData.type_adresse === 'gps_actuelle' && (
                        <div className="border-t pt-4">
                            <Button onClick={getCurrentLocation}>Obtenir ma position actuelle</Button>
                            {formData.latitude && <p className="text-sm text-green-700">Position capturée: {formData.latitude}, {formData.longitude}</p>}
                        </div>
                    )}

                    {formData.type_adresse === 'gps_choisie' && (
                        <div className="border-t pt-4">
                           <MapPicker onLocationSelect={handleLocationSelect} />
                        </div>
                    )}

                    <Input name="description_adresse" placeholder="Adresse détaillée (ex: couleur de la maison, porte...)" onChange={handleInputChange} />
                    <Input name="point_repere" placeholder="Point de repère à proximité" onChange={handleInputChange} />
                    <Input name="notes_client" placeholder="Instructions spéciales pour votre commande" onChange={handleInputChange} />
                </div>
            </div>

            <div className="bg-slate-100 p-6 rounded-lg h-fit">
                <h2 className="text-2xl font-bold mb-6">Résumé de la commande</h2>
                <div className="space-y-2 border-b pb-4 mb-4">
                    {cart && cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.produit.nom} x {item.quantite}</span>
                            <Price price={Math.round(item.quantite * item.produit.prix_unitaire)} />
                        </div>
                    ))}
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between"><span>Sous-total</span><Price price={Math.round(subtotal)} /></div>
                    <div className="flex justify-between"><span>Livraison</span><Price price={Math.round(total - subtotal)} /></div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total</span><Price price={Math.round(total)} /></div>
                </div>
                <Button className="w-full mt-6" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
                    {isPlacingOrder ? <LoaderIcon className='animate-spin' /> : "Passer la commande"}
                </Button>
            </div>
        </div>
    );
}

export default Checkout;