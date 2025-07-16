import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-5 rounded-md shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-700 mb-4">
          Thank you for your order. Your items will be delivered soon.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
