import React from 'react';
import ComplaintCard from './ComplaintCard';

const ComplaintList = ({ complaints, onComplaintClick }) => {
  if (!complaints || complaints.length === 0) {
    return <p className="text-gray-600 text-center mt-6">No complaints for this department.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
