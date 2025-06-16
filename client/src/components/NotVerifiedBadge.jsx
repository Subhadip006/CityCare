import React from 'react';
import { AlertCircle } from 'lucide-react';

const NotVerifiedBadge = () => {
  return (
    <div className="relative group inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 ml-2 cursor-">
      <AlertCircle className="w-4 h-4 mr-1" />
      Not Verified

      <div className="absolute z-100 left-1/2 -translate-x-1/2 -top-14 w-max max-w-xs border-2 border-gray-300 bg-white text-gray-700 text-xs px-4 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
        Please verify your email to access all features
        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-md"></div>
      </div>
    </div>
  );
};

export default NotVerifiedBadge;
