import React, { useState, useEffect } from 'react';
import axios from 'axios';
import forecastImg from "../assets/images/forecast.jpg"

// API Configuration
const API_KEY = '46d7a1913e30a4866a5f97769e1600d1'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Utility Functions
const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);
const kelvinToFahrenheit = (kelvin) => Math.round((kelvin - 273.15) * 9/5 + 32);
const getWeatherIcon = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

// Loader Component
const Loader = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

// ErrorMessage Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto shadow-lg">
    <div className="flex items-center mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-semibold">{message}</span>
    </div>
    {onRetry && (
      <button className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
);

// SearchBar Component
const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Enter city name..."
        className="text-black flex-1 px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      <button 
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || !city.trim()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search
      </button>
    </div>
  );
};

// UnitToggle Component
const UnitToggle = ({ unit, onToggle }) => (
  <div className="flex items-center gap-3 justify-center">
    <span className={`text-sm font-medium ${unit === 'celsius' ? 'text-blue-600' : 'text-gray-400'}`}>°C</span>
    <button
      onClick={onToggle}
      className={`relative w-14 h-7 rounded-full transition ${unit === 'celsius' ? 'bg-gray-300' : 'bg-blue-500'}`}
    >
      <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${unit === 'fahrenheit' ? 'translate-x-7' : ''}`}></span>
    </button>
    <span className={`text-sm font-medium ${unit === 'fahrenheit' ? 'text-blue-600' : 'text-gray-400'}`}>°F</span>
  </div>
);

// CurrentWeather Component
const CurrentWeather = ({ data, unit }) => {
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

// ForecastCard Component
const ForecastCard = ({ forecast, unit }) => {
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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4">
      <div className="text-center">
        <h3 className="font-bold text-lg text-gray-800">{dayName}</h3>
        <p className="text-sm text-gray-500">{dateStr}</p>
        
        <img 
          src={getWeatherIcon(forecast.weather[0].icon)} 
          alt={forecast.weather[0].description}
          className="w-16 h-16 mx-auto my-2"
        />
        
        <p className="text-sm capitalize text-gray-600 mb-2">
          {forecast.weather[0].description}
        </p>
        
        <div className="flex gap-3 items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-gray-500">Min</p>
            <p className="text-lg font-bold text-blue-500">{minTemp}°</p>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Max</p>
            <p className="text-lg font-bold text-red-500">{maxTemp}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ForecastList Component
const ForecastList = ({ forecasts, unit }) => {
  if (!forecasts || forecasts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
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

// Main ForecastPage Component
const ForecastPage = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState('celsius');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather data for a city using axios
  const fetchWeatherData = async (city) => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch current weather using axios
      const currentResponse = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY
        }
      });

      const currentData = currentResponse.data;

      // Fetch 5-day forecast using axios
      const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY
        }
      });

      const forecastData = forecastResponse.data;

      setCurrentWeather(currentData);

      // Process forecast data - get one forecast per day (7 days)
      const dailyForecasts = forecastData.list.filter((item, index) => {
        return index % 8 === 0; // Every 8th item is approximately 24 hours later
      }).slice(0, 7);

      setForecast(dailyForecasts);
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        if (err.response.status === 404) {
          setError('City not found. Please check the spelling and try again.');
        } else if (err.response.status === 401) {
          setError('Invalid API key. Please check your configuration.');
        } else {
          setError('Failed to fetch weather data. Please try again later.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        setError('An unexpected error occurred. Please try again.');
      }
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle unit toggle
  const handleUnitToggle = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);
  };

  // Initial load - fetch weather for a default city
  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  return (
    <div className="min-h-screen bg-creamy">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black mb-3">
            🌍 Climate Forecast
          </h1>
          <p className="text-lg text-gray-600">
            Real-time weather data for climate awareness
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={fetchWeatherData} isLoading={isLoading} />
        </div>

        {/* Unit Toggle */}
        <div className="mb-8">
          <UnitToggle unit={unit} onToggle={handleUnitToggle} />
        </div>

        {/* Loading State */}
        {isLoading && <Loader />}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorMessage 
            message={error} 
            onRetry={() => fetchWeatherData('London')}
          />
        )}

        {/* Weather Data */}
        {!isLoading && !error && currentWeather && (
          <div className="space-y-8">
            <CurrentWeather data={currentWeather} unit={unit} />
            <ForecastList forecasts={forecast} unit={unit} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500">
          <p>Data provided by OpenWeatherMap API</p>
          <p className="mt-2">Stay informed, stay climate-aware 🌱</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastPage;