import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSectionC&S';
import CausesSection from '../components/CausesSection';
import EffectsSection from '../components/EffectsSection';
import SolutionsSection from '../components/SolutionsSection';
import CallToAction from '../components/CallToAction';

const ClimateChange = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <button
                onClick={() => setIsDark(!isDark)}
                className="fixed top-3 right-3 z-50 p-3 rounded-full shadow-lg bg-gray-800 dark:bg-yellow-400 hover:bg-gray-700 dark:hover:bg-yellow-300 text-yellow-300 dark:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="Toggle Dark Mode"
            >
                {isDark ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </button>

            <HeroSection />
            <CausesSection />
            <EffectsSection />
            <SolutionsSection />
            <CallToAction />

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
                .duration-1200 {
                    transition-duration: 1200ms;
                }
                .delay-400 {
                    transition-delay: 400ms;
                }
            `}</style>
        </div>
    );
};

export default ClimateChange;