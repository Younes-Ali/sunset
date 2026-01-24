import ForecastCard from "./ForecastCard";

export default function ForecastList ({ forecasts, unit }) {
    if (!forecasts || forecasts.length === 0) return null;

    return (
        <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            5-Day Forecast
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {forecasts.map((forecast) => (
            <ForecastCard 
                key={forecast.dt} 
                forecast={forecast} 
                unit={unit}
            />
            ))}
        </div>
        </div>
    );
};