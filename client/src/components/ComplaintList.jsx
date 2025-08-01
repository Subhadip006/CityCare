import React from 'react';
import ComplaintCard from './ComplaintCard';

const ComplaintList = ({ complaints, onComplaintClick }) => {
  if (!complaints || complaints.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 text-lg">No complaints available for this department.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 animate-fadeIn">
      {complaints.map((complaint) => (
        <ComplaintCard
          key={complaint.ID}
          complaint={complaint}
          onClick={() => onComplaintClick(complaint)}
        />
      ))}
    </div>
  );
};

export default ComplaintList;
