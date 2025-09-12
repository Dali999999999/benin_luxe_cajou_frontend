"use client"

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutGrid, ShoppingBag, Menu, X, Home, CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import GlobalApi from '../_utils/GlobalApi';
import Cart from './Cart';
import { CartContext } from '../_context/CartContext';
import { CategoryContext } from '../_context/CategoryContext';
import { AuthContext } from '../_context/AuthContext';
import { authCookies } from '../_utils/cookieManager';

function Header() {
    const [catalogueStructure, setCatalogueStructure] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cart, getCartData } = useContext(CartContext);
    const { setSelectedCategory } = useContext(CategoryContext);
    const { isLogin, updateAuthStatus } = useContext(AuthContext);
    const [isCartAnimating, setIsCartAnimating] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        GlobalApi.getCatalogueStructure().then(resp => setCatalogueStructure(resp));
    }, []);

    useEffect(() => {
        if (cart?.length > 0) {
            setIsCartAnimating(true);
            setTimeout(() => setIsCartAnimating(false), 500);
        }
    }, [cart]);

    const handleCategoryClick = (category) => {
        if (pathname !== '/') router.push('/');
        setSelectedCategory(category);
    };

    const OnSignOut = () => {
        authCookies.clearAll();
        updateAuthStatus(false);
        router.push("/sign-in");
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto flex justify-between items-center p-4">
                
                {/* Logo + Nom */}
                <div className="flex items-center gap-3">
                    <Link href="/">
                        <Image src="/logo.png" alt="Bénin Luxe Cajou" width={100} height={80} className="cursor-pointer h-auto" />
                    </Link>
                    <Link href="/">
                    <span className="text-2xl font-bold text-primary font-sans">Bénin Luxe Cajou</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6">
                    {/* Categories */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 font-medium text-slate-700 hover:text-primary transition-colors">
                                <LayoutGrid className="w-5 h-5" /> Catégories
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64">
                            <DropdownMenuLabel>Parcourir les catégories</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleCategoryClick(null)}>Tout</DropdownMenuItem>
                            {catalogueStructure.map((cat, idx) => (
                                <DropdownMenuItem key={idx} onClick={() => handleCategoryClick(cat)} className="flex items-center gap-3">
                                    <Image src={cat.image_url || '/logo.png'} alt={cat.nom} width={25} height={25} unoptimized />
                                    <span>{cat.nom}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/about" className="font-medium text-slate-700 hover:text-primary transition-colors">Qui sommes-nous</Link>
                    <Link href="/contact" className="font-medium text-slate-700 hover:text-primary transition-colors">Contact</Link>
                </nav>

                {/* Right Icons Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Home */}
                    <Link href="/" className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                        <Home className="w-6 h-6 text-slate-600" />
                    </Link>

                    {/* Cart */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className={`relative p-2 rounded-full hover:bg-slate-100 transition-colors ${isCartAnimating ? 'cart-bounce' : ''}`}>
                                <ShoppingBag className="w-6 h-6 text-slate-600" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white text-xs">{cart?.length}</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent className="p-0">
                            <Cart cart={cart} onUpdateCart={getCartData} />
                        </SheetContent>
                    </Sheet>

                    {/* Login / Profile */}
                    {!isLogin ? (
                        <Link href="/sign-in">
                            <Button className="bg-primary hover:bg-primary-dark">Se connecter</Button>
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded-full p-1 hover:bg-slate-100 transition-colors">
                                    <CircleUserRound className="h-9 w-9 bg-green-100 text-primary rounded-full p-1" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-4">
                                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href="/profile"><DropdownMenuItem>Profil</DropdownMenuItem></Link>
                                <DropdownMenuItem onClick={OnSignOut} className="text-red-500">Se déconnecter</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {/* --- MODIFICATION START --- */}
                {/* Mobile Icons (Cart + Burger) */}
                <div className="flex items-center gap-2 lg:hidden">
                     {/* Cart */}
                     <Sheet>
                        <SheetTrigger asChild>
                            <button className={`relative p-2 rounded-full hover:bg-slate-100 transition-colors ${isCartAnimating ? 'cart-bounce' : ''}`}>
                                <ShoppingBag className="w-6 h-6 text-slate-600" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white text-xs">{cart?.length}</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent className="p-0">
                            <Cart cart={cart} onUpdateCart={getCartData} />
                        </SheetContent>
                    </Sheet>

                    {/* Mobile burger */}
                    <button
                        className="p-2 rounded-md hover:bg-slate-100 transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6 text-slate-600" />
                    </button>
                </div>
                {/* --- MODIFICATION END --- */}
            </div>

            {/* Mobile Slide-in Menu */}
            <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 z-50 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b border-slate-200">
                    <span className="text-xl font-bold text-primary">Menu</span>
                    <button onClick={() => setMobileMenuOpen(false)}>
                        <X className="w-6 h-6 text-slate-600" />
                    </button>
                </div>

                <div className="flex flex-col mt-4 p-4 gap-4">
                    {/* Categories */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 font-medium text-slate-700 hover:text-primary transition-colors">
                                <LayoutGrid className="w-5 h-5" /> Catégories
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                            <DropdownMenuLabel>Parcourir les catégories</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleCategoryClick(null)}>Tout</DropdownMenuItem>
                            {catalogueStructure.map((cat, idx) => (
                                <DropdownMenuItem key={idx} onClick={() => handleCategoryClick(cat)} className="flex items-center gap-3">
                                    <Image src={cat.image_url || '/logo.png'} alt={cat.nom} width={25} height={25} unoptimized />
                                    <span>{cat.nom}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* About / Contact */}
                    <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-700 hover:text-primary transition-colors">Qui sommes-nous</Link>
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-700 hover:text-primary transition-colors">Contact</Link>

                    {/* Home */}
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 font-medium text-slate-700 hover:text-primary transition-colors">
                        <Home className="w-5 h-5" /> Accueil
                    </Link>

                    {/* Cart in mobile menu - can be kept or removed depending on preference */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="relative p-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors w-full text-left flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" /> Panier
                                <span className="ml-auto w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white text-xs">{cart?.length}</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent className="p-0">
                            <Cart cart={cart} onUpdateCart={getCartData} />
                        </SheetContent>
                    </Sheet>

                    {/* Login / Profile */}
                    {!isLogin ? (
                        <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="bg-primary hover:bg-primary-dark w-full">Se connecter</Button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 font-medium text-slate-700 hover:text-primary transition-colors">
                                <CircleUserRound className="w-5 h-5" /> Profil
                            </Link>
                            <button onClick={() => { OnSignOut(); setMobileMenuOpen(false) }} className="text-red-500 font-medium text-left">Se déconnecter</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;