import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [officerRequests, setOfficerRequests] = useState([]);
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';

  const fetchData = async () => {
    try {
      const [complaintsRes, officerRes] = await Promise.all([
        fetch(`${BASE_URL}complaints/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BASE_URL}admin/officerRequest`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!complaintsRes.ok || !officerRes.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const complaintsData = await complaintsRes.json();
      const officerData = await officerRes.json();

      setOfficerRequests(officerData);

      console.log(complaintsData)

      const resolved = complaintsData.filter(c => c.Status === 'Solved').length;
      const pending = complaintsData.length - resolved;

      setStats({
        total: complaintsData.length,
        resolved,
        pending,
      });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleAccept = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}admin/officerAccept/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to accept officer');
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeny = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}admin/officerDeny/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to deny officer');
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#faf8f4] text-text p-6  min-w-full mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Total Complaints</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Resolved Complaints</p>
          <p className="text-2xl font-bold">{stats.resolved}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Pending Complaints</p>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
  <h2 className="text-xl font-semibold mb-4">Officer Requests</h2>
  {officerRequests.length === 0 ? (
    <p className="text-sm text-gray-500">No pending requests.</p>
  ) : (
    officerRequests.map(req => (
      <div
        key={req.ID}
        className="border-t first:border-t-0 py-4 flex justify-between items-center"
      >
        <div className="flex items-center space-x-4">
          {req.ImageURL && (
            <img
              src={req.ImageURL}
              alt={`${req.Username}'s ID`}
              className="w-32 h-32 object-contain rounded border"
            />
          )}
          <div>
            <p className="font-semibold">{req.Username}</p>
            <p className="text-sm text-gray-500">{req.Email}</p>
            <p className="text-sm text-gray-500">Department: {req.Department}</p>
            <p className="text-sm text-gray-500">Sector: {req.Sector}</p>
            <p className="text-sm text-gray-500">Phone: {req.Phone}</p>
          </div>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => handleAccept(req.ID)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
          >
            Accept
          </button>
          <button
            onClick={() => handleDeny(req.ID)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
          >
            Deny
          </button>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
}

export default AdminDashboard;
