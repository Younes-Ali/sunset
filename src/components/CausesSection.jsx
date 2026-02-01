import useIntersectionObserver from "./store/useIntersectionObserver";
import img1 from '../assets/images/weather/img3.jpg';
import img2 from '../assets/images/weather/img4.jpg';
import img3 from '../assets/images/weather/img5.jpg';
import img4 from '../assets/images/weather/img6.jpg';

const CauseCard = ({ cause, index }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`relative bg-linear-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 ${
                isVisible 
                    ? 'opacity-100 translate-x-0 rotate-0' 
                    : `opacity-0 ${index % 2 === 0 ? '-translate-x-24 -rotate-6' : 'translate-x-24 rotate-6'}`
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-1"
            style={{ backgroundImage: `url(${cause.img})` }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
        </div>
            <div className="text-6xl mb-4 animate-bounce-slow">{cause.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-white ">
                {cause.title}
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
                {cause.description}
            </p>
            <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {cause.impact}
            </div>
        </div>
    );
};



export default function CausesSection () {
    const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.2 });

    const causes = [
        {
            icon: '🏭',
            title: 'Fossil Fuels',
            description: 'Burning coal, oil, and gas releases massive amounts of CO2 into the atmosphere, trapping heat and warming the planet.',
            impact: 'Responsible for 75% of global emissions',
            img: img1,
        },
        {
            icon: '🌳',
            title: 'Deforestation',
            description: 'Cutting down forests removes trees that absorb CO2, while also releasing stored carbon back into the atmosphere.',
            impact: 'Destroys 10 million hectares annually',
            img: img2,
        },
        {
            icon: '🌍',
            title: 'Agriculture',
            description: 'Livestock farming produces methane, a greenhouse gas 28 times more potent than CO2 over a 100-year period.',
            impact: 'Accounts for 18% of emissions',
            img: img3,
        },
        {
            icon: '🏭',
            title: 'Industrial Processes',
            description: 'Manufacturing, mining, and chemical production release various greenhouse gases and pollutants.',
            impact: 'Growing source of emissions',
            img: img4,
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
                    🔥 Main Causes
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {causes.map((cause, index) => (
                        <CauseCard key={index} cause={cause} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

