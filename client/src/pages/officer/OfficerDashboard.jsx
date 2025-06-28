import React, { useEffect, useState } from 'react';
import OfficerHeader from '../../components/OfficerHeader';
import ComplaintList from '../../components/ComplaintList';
import ComplaintDetail from '../../components/ComplaintDetails';

const OfficerDashboard = () => {
  const [officer, setOfficer] = useState({ id: '', name: '', department: '' });
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchComplaintsByDepartment = async (officerId) => {
    try {
      const res = await fetch(`http://localhost:8080/complaints/department/${officerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setComplaints(data);
      } else {
        setError(data.error || 'Failed to fetch complaints');
      }
    } catch (err) {
      console.error('Error fetching complaints by department:', err);
      setError('An error occurred while fetching complaints.');
    }
  };

  const fetchOfficerProfile = async () => {
    if (!token) {
      setError('Missing auth token');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/officer/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOfficer({ id: data.id, name: data.name, department: data.department });
        fetchComplaintsByDepartment(data.id);
      } else {
        setError(data.error || 'Failed to fetch officer profile');
      }
    } catch (err) {
      console.error('Error fetching officer profile:', err);
      setError('An error occurred while fetching officer profile.');
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
            onClose={() => setSelectedComplaint(null)}
          />
        ) : (
          <ComplaintList
            complaints={complaints}
            onComplaintClick={handleComplaintClick}
          />
        )}
      </div>
    </div>
  );
};

export default OfficerDashboard;
