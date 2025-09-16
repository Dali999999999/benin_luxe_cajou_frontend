"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

const currencies = [
  { code: 'XOF', name: 'Franc CFA', symbol: 'FCFA', flag: '🇧🇯' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'USD', name: 'Dollar US', symbol: '$', flag: '🇺🇸' },
  { code: 'GBP', name: 'Livre Sterling', symbol: '£', flag: '🇬🇧' },
  { code: 'CAD', name: 'Dollar Canadien', symbol: 'C$', flag: '🇨🇦' },
  { code: 'CHF', name: 'Franc Suisse', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'JPY', name: 'Yen Japonais', symbol: '¥', flag: '🇯🇵' },
  { code: 'AUD', name: 'Dollar Australien', symbol: 'A$', flag: '🇦🇺' },
];

export const CurrencyProvider = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState(currencies[0]); // XOF par défaut
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(false);

  // Charger les taux de change
  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/XOF');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Erreur lors du chargement des taux de change:', error);
      // Taux de change par défaut en cas d'échec de l'API
      setExchangeRates({
        XOF: 1,
        EUR: 0.00152,
        USD: 0.00164,
        GBP: 0.00132,
        CAD: 0.00222,
        CHF: 0.00147,
        JPY: 0.244,
        AUD: 0.00251,
      });
    } finally {
      setLoading(false);
    }
  };

  // Charger la devise sauvegardée et les taux de change
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      const currency = currencies.find(c => c.code === savedCurrency);
      if (currency) {
        setCurrentCurrency(currency);
      }
    }
    fetchExchangeRates();
  }, []);

  // Sauvegarder la devise sélectionnée
  const changeCurrency = (currencyCode) => {
    const currency = currencies.find(c => c.code === currencyCode);
    if (currency) {
      setCurrentCurrency(currency);
      localStorage.setItem('selectedCurrency', currencyCode);
    }
  };

  // Convertir un prix de FCFA vers la devise sélectionnée
  const convertPrice = (priceInXOF) => {
    if (!priceInXOF || !exchangeRates[currentCurrency.code]) {
      return priceInXOF;
    }

    if (currentCurrency.code === 'XOF') {
      return priceInXOF;
    }

    return Math.round(priceInXOF * exchangeRates[currentCurrency.code] * 100) / 100;
  };

  // Formater un prix avec la devise
  const formatPrice = (priceInXOF) => {
    const convertedPrice = convertPrice(priceInXOF);

    if (currentCurrency.code === 'XOF') {
      return `${convertedPrice.toLocaleString()} ${currentCurrency.symbol}`;
    }

    return `${currentCurrency.symbol}${convertedPrice.toLocaleString()}`;
  };

  const value = {
    currentCurrency,
    currencies,
    exchangeRates,
    loading,
    changeCurrency,
    convertPrice,
    formatPrice,
    refreshRates: fetchExchangeRates,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};