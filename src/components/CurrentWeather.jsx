import forecastImg from "../assets/images/forecast.jpg"


// Utility Functions
const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);
const kelvinToFahrenheit = (kelvin) => Math.round((kelvin - 273.15) * 9/5 + 32);
const getWeatherIcon = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;



export default function CurrentWeather ({ data, unit }) {
    if (!data) return null;

    const temp = unit === 'celsius' 
        ? kelvinToCelsius(data.main.temp)
        : kelvinToFahrenheit(data.main.temp);

    return (
        <div 
        className="text-white rounded-2xl shadow-2xl bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${forecastImg})` }}
        >
        <div className="text-center bg-black/80 p-8 rounded-2xl">
            <h2 className="text-4xl font-bold mb-2">
            {data.name}, {data.sys.country}
            </h2>
            
            <div className="flex items-center justify-center my-4 rounded-full">
            <img 
                src={getWeatherIcon(data.weather[0].icon)} 
                alt={data.weather[0].description}
                className="w-32 h-32"
            />
            </div>

            <div className="text-6xl font-bold mb-2">
            {temp}°{unit === 'celsius' ? 'C' : 'F'}
            </div>

            <p className="text-2xl capitalize mb-4">{data.weather[0].description}</p>

            <div className="grid grid-cols-2 gap-6 w-full max-w-md mx-auto mt-4">
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-white/80 text-sm">Humidity</div>
                <div className="text-2xl font-bold">{data.main.humidity}%</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-white/80 text-sm">Wind Speed</div>
                <div className="text-2xl font-bold">{data.wind.speed} m/s</div>
            </div>
            </div>
        </div>
        </div>
    );
};