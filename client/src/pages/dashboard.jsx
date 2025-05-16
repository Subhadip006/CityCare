import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatusBox from '../components/statusBox';
import Footer from '../components/Footer'

function Dashboard() {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [Complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const fetchComplaints = async () =>{
    const token = localStorage.getItem("token")
    try{
      const complaints  = await fetch('http://localhost:8080/fetch-complaints',{
        method: 'GET',
        headers: {
          "Authorization" : `Bearer ${token}`,
        }
      });

      if(complaints.ok){
        const complaintsData = await complaints.json();
        setComplaints(complaintsData);
        console.log(complaintsData);
      }else{
        const complaintsData = await complaints.json();
        setError(complaintsData.error)
      }
    }catch(error){
      setError(error)
    }
  }

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

      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
        setUserId(data.User_id);
        console.log(data.User_id);

        fetchComplaints();
      } else {
        const data = await res.json();
        setError(data.error || 'Unauthorized');
        navigate('/login');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  useEffect(() => {


    fetchDashboard();
  }, []);

  const handleUpdateClick = () => {
      navigate('/profile/update')
  }

  return (
    
    <div className='min-h-screen w-full bg-[#F9F7F3] text-[#cfb961]'>
        <Navbar />

        <div className='text-4xl text-[#F7A072] border-[#cfb961] font-bold font-sans text-center mt-4 border-3 p-2 m-4 rounded-2xl shadow-md'>Dashboard</div>
        <div className='grid grid-cols-3 min-h-screen gap-3 mx-6 mb-4'>
          <div className='col-span-2 border-3 rounded-3xl shadow-xl'>
              <div className='text-center text-3xl font-semibold text-[#F7A072]'>Complaint Status</div>
                  <div>
                  {(
                    Complaints.map((c) => (
                      <StatusBox
                        key={c.ID}
                        title={c.Title}
                        description={c.Description}
                        status={c.Status}
                      />
                    ))
                  )}
                  </div>
          </div>
          <div className='col-span-1 w-full border-3 rounded-3xl '>
            <div className='text-3xl my-3 text-[#F7A072] font-bold text-center'>Profile</div>
            <div className='border-1 mx-6 border-amber-800'></div>
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 mx-auto my-4 border-gray-300">
            <img
                src="https://placehold.co/400"
                alt="Profile"
                className="w-full h-full object-cover"
            />
            </div>

            <div className='text-2xl font-semibold text-center'>{userId}</div>
            <div className="flex justify-center mt-4">
            <button
              onClick={handleUpdateClick}
              className="bg-[#F7A072] text-white px-6 py-2 rounded-full hover:bg-[#e58e60] transition-all"
            >
              Update
            </button>
          </div>
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default Dashboard;
