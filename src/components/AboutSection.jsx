import { useEffect } from "react";

export default function AboutSection() {
  useEffect(() => {
    import("wowjs").then((module) => {
      const WOW = module.default || module.WOW;
      new WOW.WOW({ live: false }).init();
    });
  }, []);

  return (
    <section className="py-24 px-5 bg-gray-50">
      <div
        className="max-w-4xl mx-auto text-center wow animate__animated animate__fadeInUp"
        data-wow-duration="1s"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-8 uppercase">
          About Our App
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-600 font-light">
          We are a modern weather platform designed to deliver accurate,
          reliable forecasts that help people plan their day with confidence.
          Our app combines advanced meteorological data with a clean, intuitive
          experience, providing real-time updates, detailed insights, and clear
          visuals. Every forecast is crafted to keep you informed, prepared, and
          one step ahead of the weather.
        </p>
      </div>
    </section>
  );
}
