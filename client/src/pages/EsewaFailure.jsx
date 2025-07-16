import React from 'react';
import { useContextProvider } from '../context/AppContext';

const EsewaFailure = () => {
  const {navigate} = useContextProvider();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Payment Failed</h2>
      <p className="text-gray-600 mb-6">
        Unfortunately, your payment could not be completed. This may have happened due to cancellation or a network error.
      </p>
      <button
        onClick={() => navigate('/cart')}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition"
      >
        Return to Cart
      </button>
    </div>
  );
};

export default EsewaFailure;
