import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterImage from '../assets/signup.jpg';

function Register() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [success, setsuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror('');
    setsuccess('');

    try {
      const res = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Username: name,
          Email: email,
          Password: password,
          Role: 'citizen',
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setsuccess(data.message);
        setname('');
        setemail('');
        setpassword('');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        seterror(data.error);
      }
    } catch (err) {
      seterror('Registration failed. Please try again.');
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = 'http://localhost:8080/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9f7f3] via-[#F1EFEC] to-[#f9f7f3] px-4">
      <div className="bg-white w-full max-w-5xl p-10 rounded-2xl shadow-2xl flex flex-col md:flex-row">
        
        <div className="md:w-1/2">
          <div className="text-center mb-6">
            <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
              CityCare Register
            </span>
            <h1 className="mt-4 text-4xl font-bold text-text">Create Your Account</h1>
          </div>

          {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center mb-4">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block text-sm font-medium text-text">Name</label>
              <input
                type="text"
                id="name"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-text">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block text-sm font-medium text-text">Password</label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-[#c73f2e] transition font-semibold"
            >
              Register
            </button>
          </form>

          <div className="text-center my-5 text-gray-500 text-sm">or</div>

          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-2 border py-3 rounded-md hover:bg-gray-100 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-text">Continue with Google</span>
          </button>

          <div className="text-center mt-5 text-sm text-text">
            <span>Already have an account?</span>
            <Link to="/login" className="text-primary ml-1 hover:underline font-medium">Login here</Link>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 ml-10 md:mt-0 flex items-center justify-center">
          <img
            src={RegisterImage}
            alt="CityCare Register Illustration"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
