"use client";
import { CartProvider } from "../_context/CartContext";
import { CategoryProvider } from "../_context/CategoryContext";
import { AuthProvider } from "../_context/AuthContext";
import { SearchProvider } from "../_context/SearchContext";
import { CurrencyProvider } from "../_context/CurrencyContext";

export default function Providers({ children }) {
  return (
    <SearchProvider>
      <AuthProvider>
        <CurrencyProvider>
          <CartProvider>
            <CategoryProvider>
              {children}
            </CategoryProvider>
          </CartProvider>
        </CurrencyProvider>
      </AuthProvider>
    </SearchProvider>
  );
}