import React, { useState } from 'react';

export default function SearchBar ({ onSearch, isLoading }) {
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
            id='inputCity'
            className="text-white dark:text-black flex-1 px-4 py-3 border-2 dark:border-blue-300 border-gray-600 dark:bg-white bg-gray-800 rounded-lg focus:outline-none placeholder:text-white focus:border-blue-500 transition"
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