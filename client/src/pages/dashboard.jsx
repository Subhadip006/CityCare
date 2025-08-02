import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConfirmModal from '../components/ConfirmModal';
import VerifiedBadge from '../components/VerifiedBadge';
import NotVerifiedBadge from '../components/NotVerifiedBadge';


function Dashboard() {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [Verified, setVerified] = useState(false)

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';

  const [statusCount, setStatusCount] = useState({
    Total: 0,
    inProgress: 0,
    resolved: 0,
  });

  const navigate = useNavigate();

  const countStatus = (complaintsList) => {
    const counts = { Total: 0, inProgress: 0, resolved: 0 };
    complaintsList.forEach((c) => {
      if (c.Status === 'pending' || c.Status === 'Solved') counts.Total++;
      if (c.Status === 'pending') counts.inProgress++;
      if (c.Status === 'Solved') counts.resolved++;
    });
    setStatusCount(counts);
  };

  const fetchComplaints = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}complaints`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setComplaints(data);
        countStatus(data);
      } else {
        const err = await res.json();
        setError(err.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteComplaint = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}complaints/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        fetchComplaints();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDashboard = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const res = await fetch(`${BASE_URL}dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setName(data.Name);
        setMessage(data.Message);
        setUserId(data.User_id);
        setRole(data.Role);
        setVerified(data.verified);
        fetchComplaints();
      } else {
        navigate('/login');
      }
    } catch {
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen  bg-[#faf8f4] text-text">
      <Navbar />

      <div className="flex-grow max-w-6xl mx-auto p-6 pt-28">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-semibold flex items-center">
                    Welcome back, {name}
                    {Verified ? <VerifiedBadge /> : <NotVerifiedBadge />}
           </h1>

            <p className="text-sm text-gray-500">Here's an overview of your complaints.</p>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {['Total', 'inProgress', 'resolved'].map((key) => (
            <div
              key={key}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-500">
                  {key === 'Total' ? 'Total Complaints' : key === 'inProgress' ? 'In Progress' : 'Resolved'}
                </p>
                <p className="text-2xl font-bold">{statusCount[key]}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-semibold ${
                  key === 'Total'
                    ? 'bg-orange-200 text-orange-700'
                    : key === 'inProgress'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-green-200 text-green-800'
                }`}
              >
                {statusCount[key]}
              </span>
            </div>
          ))}
        </div>

        <button
          className="mb-6 px-6 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90"
          onClick={() => navigate('/complaint')}
        >
          Raise New Complaint
        </button>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Your Complaints</h2>
          {complaints.length === 0 ? (
            <p className="text-sm text-gray-500">No complaints found.</p>
          ) : (
            complaints.map((c, idx) => (
              <div
                key={idx}
                className="border-t py-3 first:border-t-0 flex justify-between items-start"
              >
                <div>
                  <p className="text-sm text-gray-500"> Complaint Code #{c.ID}</p>
                  <p className="font-semibold">{c.Title}</p>
                  <p className="text-sm text-gray-500">Department: {c.Department}</p>
                  <button
                    onClick={() => {
                      setToDeleteId(c.ID);
                      setShowConfirm(true);
                    }}
                    className="text-sm font-mono text-red-600 mt-1 hover:underline"
                  >
                    Delete
                  </button>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      c.Status === 'Open'
                        ? 'bg-orange-100 text-orange-700'
                        : c.Status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {c.Status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(c.CreatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <ConfirmModal
          show={showConfirm}
          onCancel={() => setShowConfirm(false)}
          onConfirm={async () => {
            setShowConfirm(false);
            await handleDeleteComplaint(toDeleteId);
            setToDeleteId(null);
          }}
        />

      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
