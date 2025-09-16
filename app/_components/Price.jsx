"use client";

import React from 'react';
import { useCurrency } from '../_context/CurrencyContext';

const Price = ({ price, className = "", showOriginal = false }) => {
  const { formatPrice, currentCurrency } = useCurrency();

  if (!price) return null;

  const convertedPrice = formatPrice(price);

  return (
    <span className={className}>
      {convertedPrice}
      {showOriginal && currentCurrency.code !== 'XOF' && (
        <span className="text-sm text-gray-500 ml-2">
          ({price.toLocaleString()} FCFA)
        </span>
      )}
    </span>
  );
};

export default Price;