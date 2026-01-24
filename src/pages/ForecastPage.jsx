import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import UnitToggle from '../components/UnitToggle';
import ErrorMessage from '../components/ErrorMessage';
import CurrentWeather from '../components/CurrentWeather';
import ForecastList from '../components/ForecastList';

// API Configuration
const API_KEY = '46d7a1913e30a4866a5f97769e1600d1'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Loader Component
const Loader = () => (
  <div className="flex justify-center items-center min-h-100">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

// Main ForecastPage Component
const ForecastPage = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState('celsius');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

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
    <div className="min-h-screen bg-creamy dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-full shadow-lg bg-gray-800 dark:bg-yellow-400 hover:bg-gray-700 dark:hover:bg-yellow-300 text-yellow-300 dark:text-gray-900 transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black dark:text-gray-300 mb-3">
            🌍 Climate Forecast
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
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
        <div className="text-center mt-16 text-sm text-gray-500 dark:text-gray-300">
          <p>Data provided by OpenWeatherMap API</p>
          <p className="mt-2">Stay informed, stay climate-aware 🌱</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastPage;