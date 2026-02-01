import heroImg from '../assets/images/weather/img2.jpg'
import React, { useEffect, useState } from 'react';
export default function HeroSection () {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    return (
        <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 via-blue-500 to-cyan-400 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 text-white relative overflow-hidden">
            <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${heroImg})` }}
                    >
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 
                    className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1200 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
                    }`}
                >
                    🌍 Climate Change
                </h1>
                <p 
                    className={`text-2xl md:text-3xl font-light max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    Understanding the Causes & Discovering Solutions
                </p>
            </div>
        </section>
    );
};