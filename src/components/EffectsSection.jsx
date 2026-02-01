import useIntersectionObserver from "./store/useIntersectionObserver";


const EffectCard = ({ effect, index }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg text-center transition-all duration-1000 hover:scale-110 ${
                isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className="text-6xl mb-4">{effect.icon}</div>
            <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                {effect.stat}
            </div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">
                {effect.label}
            </div>
        </div>
    );
};

export default function EffectsSection() {
    const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.2 });

    const effects = [
        { icon: '🌡️', stat: '+1.1°C', label: 'Global Temperature Rise' },
        { icon: '🌊', stat: '20cm', label: 'Sea Level Rise Since 1880' },
        { icon: '🧊', stat: '-13%', label: 'Arctic Ice Decline Per Decade' },
        { icon: '🌪️', stat: '2x', label: 'Extreme Weather Events' }
    ];

    return (
        <section className="py-24 bg-linear-to-br from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <h2 
                    ref={titleRef}
                    className={`text-5xl md:text-6xl font-bold text-center mb-16 text-gray-800 dark:text-white transition-all duration-1000 ${
                        titleVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-12'
                    }`}
                >
                    ⚠️ The Impact
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {effects.map((effect, index) => (
                        <EffectCard key={index} effect={effect} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

