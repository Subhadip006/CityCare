// src/components/ComplaintList.jsx
import React, { useEffect, useState } from 'react';
import ComplaintCard from './ComplaintCard';

const ComplaintList = ({ officerDepartment, onComplaintClick }) => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/complaints', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }

        const data = await response.json();
        const filtered = data.filter(
          (c) => c.Department.toLowerCase() === officerDepartment.toLowerCase()
        );
        setComplaints(filtered);
      } catch (err) {
        console.error(err);
        setError('Unable to load complaints');
      }
    };

    fetchComplaints();
  }, [officerDepartment]);

  if (error) {
    return <p className="text-red-600 text-center mt-6">{error}</p>;
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
