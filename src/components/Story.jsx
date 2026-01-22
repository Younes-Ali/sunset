import { useEffect } from "react";

export default function Story() {
    useEffect(() => {
        import("wowjs").then((module) => {
        const WOW = module.default || module.WOW;
        new WOW.WOW({ live: false }).init();
        });
    }, []);

    return (
        <section className="py-24 px-5 bg-white">
        <div
            className="max-w-4xl mx-auto wow animate__animated animate__fadeInUp"
            data-wow-duration="1s"
            data-wow-delay="0.2s"
        >
            <h2 className="text-4xl md:text-5xl font-light tracking-wider mb-8 text-center uppercase">
            Our Story
            </h2>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-600 font-light">
            <p>
                Founded in 2023, our journey began with a simple goal: to make
                weather information clear, reliable, and human-centered. What
                started as a small digital project has grown into a trusted weather
                platform, while our core values of accuracy and usability remain
                unchanged.
            </p>
            <p>
                Every forecast we deliver reflects our commitment to excellence.
                From raw atmospheric data to refined visual insights, we carefully
                design every detail to ensure clarity, accuracy, and ease of use.
                Our platform is built for those who value precision and refuse to
                rely on guesswork.
            </p>
            <p>
                We believe weather information should be accurate, accessible, and
                responsible. That’s why we rely on trusted meteorological data
                sources and efficient technologies to deliver forecasts with minimal
                environmental impact. Our mission is to help people make informed
                decisions while respecting the world we all share.
            </p>
            </div>
        </div>
        </section>
    );
}
