"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ShoppingCart, Globe, MessageCircle } from 'lucide-react';
import GlobalApi from '../../_utils/GlobalApi';
import Price from '../../_components/Price';
import Image from 'next/image';
import countries from 'i18n-iso-countries';
import frLocale from 'i18n-iso-countries/langs/fr.json';

countries.registerLocale(frLocale);

const getCountriesList = () => {
  const countryList = countries.getNames('fr', { select: 'official' });

  return Object.entries(countryList)
    .map(([code, name]) => ({
      code,
      name,
      flag: String.fromCodePoint(...code.toUpperCase().split('').map(char => 127397 + char.charCodeAt()))
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
};

const InternationalOrderPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    specialNotes: ''
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Initialiser la liste des pays
  useEffect(() => {
    const countries = getCountriesList();
    setCountriesList(countries);
    setFilteredCountries(countries);
  }, []);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.country-dropdown')) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Charger les produits disponibles
    GlobalApi.getProducts().then(resp => {
      setAvailableProducts(resp || []);
      setLoadingProducts(false);
    }).catch(err => {
      console.error('Erreur lors du chargement des produits:', err);
      setAvailableProducts([]);
      setLoadingProducts(false);
    });
  }, []);

  // Filtrer les pays selon la recherche
  useEffect(() => {
    if (countrySearch) {
      const filtered = countriesList.filter(country =>
        country.name.toLowerCase().includes(countrySearch.toLowerCase())
      );
      setFilteredCountries(filtered);

      // Auto-sélection si correspondance exacte
      const exactMatch = filtered.find(country =>
        country.name.toLowerCase() === countrySearch.toLowerCase()
      );
      if (exactMatch && !formData.country) {
        setFormData(prev => ({ ...prev, country: exactMatch.code }));
      }
    } else {
      setFilteredCountries(countriesList);
    }
  }, [countrySearch, countriesList, formData.country]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductChange = (productId, quantity) => {
    if (quantity === 0) {
      setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    } else {
      const product = availableProducts.find(p => p.id === productId);
      if (product) {
        setSelectedProducts(prev => {
          const existing = prev.find(p => p.id === productId);
          if (existing) {
            return prev.map(p => p.id === productId ? { ...p, quantity } : p);
          } else {
            return [...prev, { ...product, quantity }];
          }
        });
      }
    }
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      return total + (product.prix_unitaire * product.quantity);
    }, 0);
  };

  const generateWhatsAppMessage = () => {
    const selectedCountry = countriesList.find(c => c.code === formData.country);
    const currentHour = new Date().getHours();
    const greeting = currentHour < 18 ? 'Bonjour' : 'Bonsoir';

    let message = `${greeting} ! 😊\n\n`;
    message += `Je m'appelle ${formData.firstName} ${formData.lastName} et je vis à ${formData.address}`;
    if (selectedCountry) {
      message += ` en ${selectedCountry.name} ${selectedCountry.flag}`;
    }
    message += `.\n\n`;
    message += `J'aimerais passer une commande chez Bénin Luxe Cajou pour vos délicieuses noix de cajou ! 🥜\n\n`;

    message += `📞 Mes coordonnées:\n`;
    message += `• Email: ${formData.email}\n`;
    message += `• Téléphone: ${formData.phone}\n\n`;

    if (selectedProducts.length > 0) {
      message += `Voici ce qui m'intéresse:\n\n`;
      selectedProducts.forEach((product, index) => {
        message += `${index + 1}. ${product.nom} (${product.quantite_contenant}g)\n`;
        message += `   → ${product.quantity} unité${product.quantity > 1 ? 's' : ''} à ${product.prix_unitaire} FCFA chacune\n`;
        message += `   → Sous-total: ${product.prix_unitaire * product.quantity} FCFA\n\n`;
      });
      message += `💰 *Total pour les produits: ${calculateTotal()} FCFA*\n\n`;
    }

    if (formData.specialNotes.trim()) {
      message += `J'ai aussi une demande particulière:\n\"${formData.specialNotes}\"\n\n`;
    }

    message += `Pourriez-vous me dire comment procéder pour la livraison internationale et me donner les frais de transport ? 🚚\n\n`;
    message += `Merci beaucoup et j'attends votre retour ! 🙏\n\n`;
    message += `Bien cordialement,\n${formData.firstName} ${formData.lastName}`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Debug
    console.log('Form data:', formData);
    console.log('Country search:', countrySearch);

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.country) {
      toast.error('Veuillez remplir tous les champs obligatoires et sélectionner un pays');
      return;
    }

    if (selectedProducts.length === 0 && !formData.specialNotes.trim()) {
      toast.error('Veuillez sélectionner au moins un produit ou ajouter une note spéciale');
      return;
    }

    setLoading(true);

    try {
      const whatsappMessage = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/22997501515?text=${whatsappMessage}`;

      // Ouvrir WhatsApp
      window.open(whatsappUrl, '_blank');

      toast.success('Commande envoyée avec succès! Vous allez être redirigé vers WhatsApp.');

      // Reset le formulaire
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        specialNotes: ''
      });
      setSelectedProducts([]);
      setCountrySearch('');

    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la commande');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Globe className="w-8 h-8 text-green-600" />
          Commande Internationale
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Commandez nos délicieuses noix de cajou depuis l'étranger. Remplissez le formulaire ci-dessous
          et votre commande sera envoyée directement à notre équipe via WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations personnelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              👤 Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prénom *</label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Votre prénom"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nom *</label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Votre nom"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="votre@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone *</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+33 1 23 45 67 89"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Adresse complète *</label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Votre adresse complète"
                required
              />
            </div>
            <div className="relative country-dropdown">
              <label className="block text-sm font-medium mb-2">Pays *</label>
              <div className="relative">
                <Input
                  name="countrySearch"
                  value={countrySearch}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    setShowCountryDropdown(true);
                  }}
                  onFocus={() => setShowCountryDropdown(true)}
                  placeholder="Tapez votre pays..."
                  className="pr-10"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🌍</span>
                </div>

                {showCountryDropdown && filteredCountries.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredCountries.slice(0, 10).map(country => (
                      <button
                        key={country.code}
                        type="button"
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, country: country.code }));
                          setCountrySearch(`${country.flag} ${country.name}`);
                          setShowCountryDropdown(false);
                        }}
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="flex-1">{country.name}</span>
                      </button>
                    ))}
                    {filteredCountries.length > 10 && (
                      <div className="px-3 py-2 text-sm text-gray-500 bg-gray-50">
                        {filteredCountries.length - 10} autres pays... Continuez à taper pour affiner
                      </div>
                    )}
                  </div>
                )}
              </div>
              <input type="hidden" name="country" value={formData.country} />
              {formData.country && (
                <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  ✓ Pays sélectionné: {countriesList.find(c => c.code === formData.country)?.flag} {countriesList.find(c => c.code === formData.country)?.name}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sélection de produits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Sélection de produits
            </CardTitle>
            <p className="text-sm text-gray-600">
              Sélectionnez les produits que vous souhaitez commander (optionnel si vous avez une demande spéciale)
            </p>
          </CardHeader>
          <CardContent>
            {loadingProducts ? (
              <p className="text-center text-gray-500">Chargement des produits...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableProducts.map(product => {
                  const selectedProduct = selectedProducts.find(p => p.id === product.id);
                  const quantity = selectedProduct?.quantity || 0;

                  return (
                    <div key={product.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={product?.images?.[0]?.url_image || '/logo.png'}
                            alt={product.nom}
                            fill
                            className="object-contain rounded-md"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{product.nom}</h3>
                          <p className="text-sm text-gray-600">{product.quantite_contenant}g</p>
                          <p className="text-sm font-semibold text-green-600">
                            <Price price={product.prix_unitaire} />
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleProductChange(product.id, Math.max(0, quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                          disabled={quantity === 0}
                        >
                          -
                        </button>
                        <span className="min-w-[2rem] text-center font-medium">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleProductChange(product.id, Math.min(product.stock_disponible, quantity + 1))}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                          disabled={quantity >= product.stock_disponible}
                        >
                          +
                        </button>
                      </div>
                      {quantity > 0 && (
                        <p className="text-sm font-medium text-gray-700">
                          Sous-total: <Price price={product.prix_unitaire * quantity} />
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {selectedProducts.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Résumé de votre sélection:</h3>
                <div className="space-y-1 text-sm">
                  {selectedProducts.map(product => (
                    <div key={product.id} className="flex justify-between">
                      <span>{product.nom} x{product.quantity}</span>
                      <span><Price price={product.prix_unitaire * product.quantity} /></span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span><Price price={calculateTotal()} /></span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes spéciales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Demande spéciale ou notes
            </CardTitle>
            <p className="text-sm text-gray-600">
              Décrivez votre demande particulière ou ajoutez des informations supplémentaires
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              name="specialNotes"
              value={formData.specialNotes}
              onChange={handleInputChange}
              placeholder="Exemple: Je souhaiterais 2kg de cajou grillé salé et 1kg de cajou nature..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Bouton d'envoi */}
        <div className="text-center">
          <Button
            type="submit"
            disabled={loading}
            className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer ma commande via WhatsApp'}
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            Votre commande sera envoyée à notre équipe qui vous contactera rapidement
          </p>
        </div>
      </form>
    </div>
  );
};

export default InternationalOrderPage;