


export default function UnitToggle  ({ unit, onToggle })  {
    <div className="flex items-center gap-3 justify-center">
        <span className={`text-sm font-medium ${unit === 'celsius' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>°C</span>
        <button
        onClick={onToggle}
        className={`relative w-14 h-7 rounded-full transition ${unit === 'celsius' ? 'bg-gray-300 dark:bg-gray-600' : 'bg-blue-500'}`}
        >
        <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${unit === 'fahrenheit' ? 'translate-x-7' : ''}`}></span>
        </button>
        <span className={`text-sm font-medium ${unit === 'fahrenheit' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>°F</span>
    </div>
};