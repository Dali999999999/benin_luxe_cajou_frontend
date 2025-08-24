"use client"
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer"; 
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./_context/CartContext";
import { CategoryProvider } from "./_context/CategoryContext";
import { AuthProvider } from "./_context/AuthContext";
import { SearchProvider } from "./_context/SearchContext";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <SearchProvider>
          <AuthProvider>
            <CartProvider>
              <CategoryProvider>
                <Header />
                <main>{children}</main>
                <Footer />
                <Toaster />
              </CategoryProvider>
            </CartProvider>
          </AuthProvider>
        </SearchProvider>
      </body>
    </html>
  );
}