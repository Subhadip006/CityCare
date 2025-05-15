import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in.');
        return navigate('/login');
      }

      try {
        const res = await fetch('http://localhost:8080/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          setMessage(data.message);
          setUserId(data.User_id);
          console.log(data.User_id);
        } else {
          const data = await res.json();
          setError(data.error || 'Unauthorized');
          navigate('/login');
        }
      } catch (err) {
        setError('Something went wrong');
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className='flex items-center flex-col justify-center min-h-screen'>
        {error && <div>{error}</div>}
        <div>User id : {userId}</div>
        <div>{message}</div>
    </div>
  );
}

export default Dashboard;
