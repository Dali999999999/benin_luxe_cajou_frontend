"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import Autoplay from "embla-carousel-autoplay";

function Slider({ sliderList }) {
    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    if (!sliderList || sliderList.length === 0) {
        return null;
    }

    return (
        <div className="relative group">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.play}
            >
                <CarouselContent>
                    {sliderList.map((slider) => {
                        const imageUrl = slider.attributes?.image?.data?.attributes?.url;
                        
                        // --- NOUVEAUX TEXTES PAR DÉFAUT PERCUTANTS ---
                        const title = slider.attributes?.title || "L'Excellence du Cajou Béninois";
                        const description = slider.attributes?.description || "Récoltées à la main et préparées avec soin pour une saveur authentique et inoubliable.";
                        const buttonText = slider.attributes?.buttonText || 'Découvrir nos produits';
                        
                        // --- MISE À JOUR DU LIEN DU BOUTON ---
                        // Le bouton pointe maintenant vers l'ancre #products si aucun lien n'est fourni
                        const buttonLink = slider.attributes?.buttonLink || '#products'; 

                        if (!imageUrl) return null;

                        return (
                            <CarouselItem key={slider.id}>
                                <div className="relative w-full h-[250px] md:h-[450px]">
                                    <Image 
                                        src={imageUrl}
                                        alt={title}
                                        sizes="100vw"
                                        fill
                                        className='object-cover rounded-2xl'
                                        priority={true}
                                    />
                                    
                                    <div className="absolute inset-0 bg-black/40 rounded-2xl" />

                                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                                        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                                            {title}
                                        </h1>
                                        <p className="mt-2 md:mt-4 max-w-lg text-sm md:text-lg drop-shadow-md">
                                            {description}
                                        </p>
                                        <Link href={buttonLink} className="mt-6">
                                            <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 rounded-full">
                                                {buttonText}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white text-slate-900" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white text-slate-900" />
            </Carousel>
        </div>
    );
}

export default Slider;