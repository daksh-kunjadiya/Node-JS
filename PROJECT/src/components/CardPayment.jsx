import React from "react";
import { useNavigate } from "react-router-dom";

const CardPayment = () => {
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    alert("💳 Payment Successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-white px-4 py-16">
      <form
        onSubmit={handlePayment}
        className="bg-white/60 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl px-8 py-10 w-full max-w-md transition-all duration-300 hover:shadow-blue-200 hover:scale-[1.02]"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3v1a4 4 0 004 4h4a4 4 0 004-4v-1c0-1.657-1.343-3-3-3s-3 1.343-3 3"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-blue-600 mb-8 tracking-tight">
          Card Payment
        </h2>

        {/* Card Number */}
        <div className="relative mb-6">
          <input
            type="text"
            required
            className="peer w-full bg-white/30 text-gray-800 border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all placeholder-gray-400"
            placeholder="1234 5678 9012 3456"
          />
          <label className="absolute left-4 -top-3.5 bg-white/60 px-1 text-sm text-blue-600 peer-focus:text-blue-600 transition-all">
            Card Number
          </label>
        </div>

        {/* Expiry Date */}
        <div className="relative mb-6">
          <input
            type="text"
            required
            className="peer w-full bg-white/30 text-gray-800 border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all placeholder-gray-400"
            placeholder="MM/YY"
          />
          <label className="absolute left-4 -top-3.5 bg-white/60 px-1 text-sm text-blue-600 peer-focus:text-blue-600 transition-all">
            Expiry Date
          </label>
        </div>

        {/* CVC Code */}
        <div className="relative mb-6">
          <input
            type="text"
            required
            className="peer w-full bg-white/30 text-gray-800 border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all placeholder-gray-400"
            placeholder="3-digit code"
          />
          <label className="absolute left-4 -top-3.5 bg-white/60 px-1 text-sm text-blue-600 peer-focus:text-blue-600 transition-all">
            CVC Code
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-blue-400 transition-all duration-300 active:scale-95"
        >
          💳 Pay Securely
        </button>

        <p className="text-xs text-center text-gray-500 mt-6">
          🔒 Your payment is SSL secured and encrypted.
        </p>
      </form>
    </div>
  );
};

export default CardPayment;
