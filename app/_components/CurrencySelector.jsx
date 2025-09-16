"use client";

import React, { useState } from 'react';
import { useCurrency } from '../_context/CurrencyContext';
import { ChevronDown, RefreshCw } from 'lucide-react';

const CurrencySelector = () => {
  const {
    currentCurrency,
    currencies,
    changeCurrency,
    loading,
    refreshRates
  } = useCurrency();

  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (currencyCode) => {
    changeCurrency(currencyCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
      >
        <span className="text-lg">{currentCurrency.flag}</span>
        <span className="hidden sm:inline">{currentCurrency.symbol}</span>
        <span className="text-xs text-gray-500">{currentCurrency.code}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
            <div className="p-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Choisir une devise</h3>
              <button
                onClick={refreshRates}
                className={`p-1 hover:bg-gray-100 rounded ${loading ? 'animate-spin' : ''}`}
                title="Actualiser les taux"
              >
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 ${
                    currentCurrency.code === currency.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{currency.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{currency.name}</div>
                      <div className="text-sm text-gray-500">{currency.code} - {currency.symbol}</div>
                    </div>
                    {currentCurrency.code === currency.code && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-3 border-t border-gray-100 text-xs text-gray-500 bg-gray-50">
              Les prix sont convertis en temps réel. Les paiements se font uniquement en FCFA.
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencySelector;