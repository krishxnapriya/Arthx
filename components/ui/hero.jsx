"use client";

import Link from "next/link";
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image'; 

const HeroSection = () => {
    const imageRef = useRef();

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if(scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled");
            } else {
                 imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="pb-20 px-4">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl md:text-8xl lg:text-[85px] pb-6 gradient-title">
                    Spend Smart <br /> Live Smart
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    An AI-powered personal finance app that helps you track your spending, set budgets, and achieve your financial goals.
                </p>
                <div className="flex justify-center mb-8">
                    <Link href="/dashboard">
                        <Button size="lg" className="px-8">
                            Get started
                        </Button>
                    </Link>
                </div>
                <div className="hero-image-wrapper max-w-full overflow-hidden">
                    <div ref={imageRef} className="hero-image">
                        <Image
                            src="/banner.jpg"
                            width={980}
                            height={220}
                            alt="Dashboard Preview"
                            className="rounded-lg shadow-2xl border mx-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
