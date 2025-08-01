import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterImage from '../assets/signup.jpg';

function Register() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [success, setsuccess] = useState('');
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';

  const handleSubmit = async (e) => {
  e.preventDefault();
  seterror('');
  setsuccess('');

  try {
    const res = await fetch(`${BASE_URL}register`, {
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

    const emailFail = data.error && data.error.toLowerCase().includes('failed to send email');

    if (res.status === 200 || emailFail) {
      localStorage.setItem('token', data.token);
      if (emailFail) {
        setsuccess('Registered successfully, but verification email failed to send.');  
      } else {
        setsuccess(data.message);
      }
      setname('');
      setemail('');
      setpassword('');
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      seterror(data.error || 'Registration failed');
    }
  } catch (err) {
    seterror('Registration failed. Please try again.');
  }
};


  const handleGoogleLogin = async (response) => {
    seterror('');
    setsuccess('');
    try {
      const id_token = response.credential;
      const res = await fetch(`${BASE_URL}auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: id_token }),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem('token', data.token);
        setsuccess('Logged in successfully with Google!');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        seterror(data.error || 'Google login failed');
      }
    } catch {
      seterror('Google login failed. Please try again.');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id:
          '802392548098-rojudnh96bvrgm42fpp05k2jm8ugrl90.apps.googleusercontent.com',
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        {
          theme: 'outline',
          size: 'large',
          width: '300',
          type: 'standard', 
          shape: 'pill', 
        }
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-md font-normal text-center mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text"
              >
                Name
              </label>
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text"
              >
                Email Address
              </label>
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text"
              >
                Password
              </label>
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

          <div
            id="googleSignInDiv"
            className="w-full flex justify-center"
          ></div>

          <div className="text-center mt-5 text-sm text-text">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="text-primary ml-1 hover:underline font-medium"
            >
              Login here
            </Link>
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
