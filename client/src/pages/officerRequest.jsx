import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OfficerRequest() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState('');
  const [success, setsuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
        e.preventDefault();
    
        seterror('');
        setsuccess('');
    
        try {
          const res = await fetch('http://localhost:8080/officerRegister', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Username: name,
              Email: email,
              Password: password,
              Department : department
            }),
          });
    
          const data = await res.json();
    
          if (res.status === 200) {
            setsuccess(data.message);
            setName('');
            setEmail('');
            setPassword('');
          } else {
            seterror(data.error);
          }
        } catch (err) {
          console.log(err);
          seterror('An error occurred. Please try again later.');
        }
      };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-[#F9F7F3]">
      <div className="border-4 border-[#cfb961] p-8 rounded-xl w-[60%] bg-white shadow-lg">
        <h1 className="text-[#F7A072] text-4xl font-bold text-center mb-6">
          Request for Officer Access
        </h1>

        {error && <p className='text-red-600 mb-4'>{error}</p>}
        {success && <p className='text-green-600 mb-4'>{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7A072]"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7A072]"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="department" className="mb-1 text-gray-700 font-medium">Department</label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7A072]"
              required
            >
              <option value="" disabled>Select Department</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Power">Power</option>
              <option value="Roads">Roads</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7A072]"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#F7A072] text-white py-3 rounded-md hover:bg-[#e67a52] transition-all font-semibold"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default OfficerRequest;
