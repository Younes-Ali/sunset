import { useEffect } from "react";
export default function Values() {
    const values = [
        {
        title: "Accuracy",
        description:
            "We prioritize precise, data-driven forecasts you can trust every day.",
        },
        {
        title: "Reliability",
        description:
            "Consistent updates and dependable information, no matter the conditions.",
        },
        {
        title: "Innovation",
        description:
            "We leverage modern technology to transform complex weather data into clear insights.",
        },
        {
        title: "Transparency",
        description:
            "Clear sources, honest data, and forecasts explained without confusion.",
        },
    ];

    useEffect(() => {
        import("wowjs").then((module) => {
        const WOW = module.default || module.WOW;
        new WOW.WOW({ live: false }).init();
        });
    }, []);

    return (
        <section className="py-24 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
            <h2
            className="text-4xl md:text-5xl font-light tracking-wider mb-16 text-center uppercase wow animate__animated animate__fadeInDown"
            data-wow-duration="1s"
            >
            Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
                <div
                key={index}
                className="p-8 bg-white border border-gray-200 hover:border-gray-400 transition-colors duration-300 wow animate__animated animate__fadeInUp"
                data-wow-delay={`${index * 0.2}s`}
                data-wow-duration="0.8s"
                >
                <h3 className="text-2xl font-semibold mb-4 uppercase tracking-wider">
                    {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    {value.description}
                </p>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
