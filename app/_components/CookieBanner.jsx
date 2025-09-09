"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Cookie, Shield, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà accepté
    const cookiesAccepted = localStorage.getItem('cookies-accepted');
    if (!cookiesAccepted) {
      // Petit délai pour que ça apparaisse après le chargement de la page
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    // On fait semblant de rejeter, mais en vrai on garde nos cookies techniques 😏
    localStorage.setItem('cookies-accepted', 'rejected');
    setIsVisible(false);
  };

  const acceptOnlyNecessary = () => {
    localStorage.setItem('cookies-accepted', 'necessary-only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 bg-black/20 backdrop-blur-sm"
      >
        <Card className="mx-auto max-w-4xl bg-white/95 backdrop-blur border-green-200 shadow-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-2 sm:gap-4">
              {/* Icône Cookie */}
              <div className="flex-shrink-0 p-2 bg-green-100 rounded-full">
                <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>

              <div className="flex-1 min-w-0">
                {/* En-tête */}
                <div className="flex items-start justify-between mb-3 gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-1 sm:gap-2 min-w-0">
                    <span className="hidden xs:inline">🍪</span>
                    <span className="truncate">Nous utilisons des cookies</span>
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVisible(false)}
                    className="text-gray-500 hover:text-gray-700 flex-shrink-0 p-1 sm:p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Message principal */}
                <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience sur <strong>Benin Luxe Cajou</strong>. 
                  Ces cookies nous permettent de mémoriser vos préférences, sécuriser votre connexion et analyser l'utilisation de notre site.
                </p>

                {/* Détails (si affiché) */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-4 bg-gray-50 rounded-lg overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-600" />
                            Cookies Nécessaires (Toujours actifs)
                          </h4>
                          <p className="text-gray-600">
                            Ces cookies sont essentiels au fonctionnement du site : authentification, 
                            panier d'achat, et sécurité des sessions.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <Settings className="w-4 h-4 text-blue-600" />
                            Cookies d'Amélioration
                          </h4>
                          <p className="text-gray-600">
                            Nous utilisons ces données pour améliorer nos services et 
                            personnaliser votre expérience d'achat.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
                  <Button 
                    onClick={acceptCookies}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 text-sm sm:text-base"
                  >
                    <span className="sm:hidden">Accepter tous</span>
                    <span className="hidden sm:inline">Accepter tous les cookies</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={acceptOnlyNecessary}
                    className="border-gray-300 px-4 sm:px-6 text-sm sm:text-base"
                  >
                    <span className="sm:hidden">Nécessaires seulement</span>
                    <span className="hidden sm:inline">Cookies nécessaires uniquement</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-gray-600 hover:text-gray-800 px-4 sm:px-6 text-sm sm:text-base"
                  >
                    {showDetails ? 'Masquer' : 'Plus d\'infos'}
                  </Button>
                </div>

                {/* Lien politique de confidentialité */}
                <p className="text-xs text-gray-500 mt-3">
                  En continuant à naviguer, vous acceptez notre utilisation des cookies. 
                  Consultez notre{' '}
                  <a href="/privacy" className="text-green-600 hover:underline">
                    politique de confidentialité
                  </a>{' '}
                  pour plus d'informations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;