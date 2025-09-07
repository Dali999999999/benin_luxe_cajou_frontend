"use client";
import { CartProvider } from "../_context/CartContext";
import { CategoryProvider } from "../_context/CategoryContext";
import { AuthProvider } from "../_context/AuthContext";
import { SearchProvider } from "../_context/SearchContext";

export default function Providers({ children }) {
  return (
    <SearchProvider>
      <AuthProvider>
        <CartProvider>
          <CategoryProvider>
            {children}
          </CategoryProvider>
        </CartProvider>
      </AuthProvider>
    </SearchProvider>
  );
}