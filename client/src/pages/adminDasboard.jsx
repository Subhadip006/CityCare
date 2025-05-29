import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [officerRequests, setOfficerRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOfficerRequests();
  }, []);

  const fetchOfficerRequests = async () => {
    try {
      const res = await fetch('http://localhost:8080/officerRequest');
      const data = await res.json();

      if (res.ok) {
        setOfficerRequests(data);
      } else {
        setError(data.error || 'Failed to fetch officer requests');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching requests.');
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      const res = await fetch('http://localhost:8080/admin/accept-officer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if required
        },
        body: JSON.stringify({ request_id: requestId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Officer accepted!');
        // Remove accepted officer from list
        setOfficerRequests(prev =>
          prev.filter(officer => officer.ID !== requestId)
        );
      } else {
        alert(data.error || 'Failed to accept officer');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-[#F7A072] mb-6">Admin Dashboard</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="overflow-x-auto bg-white rounded-lg shadow p-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-[#F7A072] text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Requested At</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {officerRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-600">
                  No officer requests found.
                </td>
              </tr>
            ) : (
              officerRequests.map((officer) => (
                <tr key={officer.ID} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{officer.ID}</td>
                  <td className="px-4 py-2">{officer.Username}</td>
                  <td className="px-4 py-2">{officer.Email}</td>
                  <td className="px-4 py-2">{officer.Department}</td>
                  <td className="px-4 py-2">{new Date(officer.CreatedAt).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => acceptRequest(officer.ID)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
