// Utility Functions
const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);
const kelvinToFahrenheit = (kelvin) => Math.round((kelvin - 273.15) * 9/5 + 32);
const getWeatherIcon = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;



export default function ForecastCard ({ forecast, unit }) {
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const minTemp = unit === 'celsius'
        ? kelvinToCelsius(forecast.main.temp_min)
        : kelvinToFahrenheit(forecast.main.temp_min);
    
    const maxTemp = unit === 'celsius'
        ? kelvinToCelsius(forecast.main.temp_max)
        : kelvinToFahrenheit(forecast.main.temp_max);

    return (
        <div className="dark:bg-gray-300 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4">
        <div className="text-center">
            <h3 className="font-bold text-lg dark:text-gray-800 text-white">{dayName}</h3>
            <p className="text-sm dark:text-gray-500 text-gray-300">{dateStr}</p>
            
            <img 
            src={getWeatherIcon(forecast.weather[0].icon)} 
            alt={forecast.weather[0].description}
            className="w-16 h-16 mx-auto my-2"
            />
            
            <p className="text-sm capitalize dark:text-gray-600 text-gray-300 mb-2">
            {forecast.weather[0].description}
            </p>
            
            <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <p className="text-xs dark:text-gray-500 text-gray-300">Min</p>
                <p className="text-lg font-bold text-blue-500">{minTemp}°</p>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:text-gray-600"></div>
            <div className="text-center">
                <p className="text-xs dark:text-gray-500 text-gray-300">Max</p>
                <p className="text-lg font-bold text-red-500">{maxTemp}°</p>
            </div>
            </div>
        </div>
        </div>
    );
};