import React from "react";

const LoaderOverlay = ({ show, text = "Loading..." }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-white px-6 py-5 shadow-lg">
        
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

        {/* Text */}
        <p className="text-sm font-medium text-gray-700">
          {text}
        </p>
      </div>
    </div>
  );
};

export default LoaderOverlay;
