
export default function ErrorMessage ({ message, onRetry }) {
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
};