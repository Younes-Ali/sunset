import useIntersectionObserver from "./store/useIntersectionObserver";

const SolutionCard = ({ solution, index }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`bg-linear-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-1000 hover:scale-105 ${
                isVisible 
                    ? 'opacity-100 translate-y-0 rotate-0' 
                    : `opacity-0 translate-y-24 ${index % 2 === 0 ? 'rotate-12' : '-rotate-12'}`
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="text-6xl mb-4">{solution.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                {solution.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {solution.description}
            </p>
            <div className="space-y-2">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                    What You Can Do:
                </h4>
                {solution.actions.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{action}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};



export default function SolutionsSection() {
    const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.2 });

    const solutions = [
        {
            icon: '☀️',
            title: 'Renewable Energy',
            description: 'Transition to solar, wind, and hydroelectric power to eliminate fossil fuel dependency.',
            actions: ['Install solar panels', 'Support clean energy policies', 'Choose green energy providers']
        },
        {
            icon: '🌱',
            title: 'Reforestation',
            description: 'Plant trees and restore forests to absorb CO2 and protect biodiversity.',
            actions: ['Join tree planting initiatives', 'Support conservation projects', 'Reduce paper consumption']
        },
        {
            icon: '🚗',
            title: 'Sustainable Transport',
            description: 'Use electric vehicles, public transport, cycling, and walking to reduce emissions.',
            actions: ['Use public transportation', 'Consider electric vehicles', 'Bike or walk when possible']
        },
        {
            icon: '♻️',
            title: 'Circular Economy',
            description: 'Reduce, reuse, and recycle to minimize waste and conserve resources.',
            actions: ['Reduce single-use plastics', 'Buy sustainable products', 'Recycle properly']
        },
        {
            icon: '🥗',
            title: 'Sustainable Diet',
            description: 'Reduce meat consumption and choose locally-sourced, organic foods.',
            actions: ['Eat more plant-based meals', 'Buy local produce', 'Reduce food waste']
        },
        {
            icon: '💡',
            title: 'Energy Efficiency',
            description: 'Use energy-efficient appliances and reduce overall energy consumption.',
            actions: ['Switch to LED bulbs', 'Insulate your home', 'Unplug unused devices']
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <h2 
                    ref={titleRef}
                    className={`text-5xl md:text-6xl font-bold text-center mb-16 text-gray-800 dark:text-white transition-all duration-1000 ${
                        titleVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
                    }`}
                >
                    ✅ Solutions We Can Implement
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {solutions.map((solution, index) => (
                        <SolutionCard key={index} solution={solution} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

