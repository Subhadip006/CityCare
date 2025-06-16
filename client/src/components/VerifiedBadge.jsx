import React from 'react';
import { CheckCircle } from 'lucide-react';

const VerifiedBadge = () => {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 ml-2 text-green-800">
      <CheckCircle className="w-4 h-4 mr-1" />
      Verified
    </div>
  );
};

export default VerifiedBadge;
