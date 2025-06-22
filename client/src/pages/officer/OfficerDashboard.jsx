import React, { useEffect, useState } from 'react';
import OfficerHeader from '../../components/OfficerHeader';
import ComplaintList from '../../components/ComplaintList';
import ComplaintDetail from '../../components/ComplaintDetails';

const OfficerDashboard = () => {
  const [officer, setOfficer] = useState({ name: '', department: '' });
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [error, setError] = useState('');

  const fetchAllComplaints = async (token, department) => {
  try {
    const res = await fetch('http://localhost:8080/complaints/department', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Fetched complaints:", data);
      console.log("Officer dept:", department);

      const filtered = data.filter(
        (c) =>
          c.Department?.toLowerCase().trim() ===
          department?.toLowerCase().trim()
      );

      console.log("Filtered complaints:", filtered);
      setComplaints(data);
      setFilteredComplaints(filtered);
    } else {
      const err = await res.json();
      setError(err.error || 'Failed to fetch complaints');
    }
  } catch (err) {
    setError(err.message);
  }
};

  const fetchOfficerProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:8080/officer/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setOfficer({ name: data.name, department: data.department });
        fetchAllComplaints(token, data.department);
      } else {
        const err = await res.json();
        setError(err.error || 'Failed to fetch officer profile');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchOfficerProfile();
  }, []);

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f3] to-[#F1EFEC]">
      <OfficerHeader name={officer.name} department={officer.department} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {selectedComplaint ? (
          <ComplaintDetail
            complaint={selectedComplaint}
            onBack={() => setSelectedComplaint(null)}
          />
        ) : (
          <ComplaintList
            complaints={filteredComplaints}
            onSelect={handleComplaintClick}
          />
        )}
      </div>
    </div>
  );
};

export default OfficerDashboard;
