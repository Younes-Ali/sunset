
import { Link } from 'react-router-dom';
import useIntersectionObserver from './store/useIntersectionObserver'

export default function CallToAction () {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });

    return (
        <section className="py-24 bg-linear-to-br from-blue-600 to-purple-600 dark:from-gray-900 dark:to-blue-900 text-white transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div 
                    ref={ref}
                    className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
                        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-12'
                    }`}
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        The Time to Act is NOW
                    </h2>
                    <p className="text-xl md:text-2xl mb-10 leading-relaxed">
                        Every small action counts. Together, we can make a difference and create a sustainable future for generations to come.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to={'/about'} className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300 shadow-lg">
                            Learn More
                        </Link>
                        <Link to={'/causes&solutions'} className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 shadow-lg">
                            Take Action Today
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};