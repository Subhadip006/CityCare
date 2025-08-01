import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginImage from '../assets/login.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${BASE_URL}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem('token', data.token);
        setSuccess(data.message);
        setEmail('');
        setPassword('');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  const handleGoogleCallback = async (response) => {
    setError('');
    setSuccess('');
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
        setSuccess('Logged in successfully with Google!');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setError(data.error || 'Google login failed');
      }
    } catch {
      setError('Google login failed. Please try again.');
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
        client_id: "802392548098-rojudnh96bvrgm42fpp05k2jm8ugrl90.apps.googleusercontent.com",
        callback: handleGoogleCallback,
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
              CityCare Login
            </span>
            <h1 className="mt-4 text-4xl font-bold text-text">Welcome to CityCare!</h1>
          </div>

          {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center mb-4">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-text">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block text-sm font-medium text-text">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center mb-5">
              <label className="flex items-center text-sm text-text">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-[#c73f2e] transition font-semibold"
            >
              Login
            </button>
          </form>

          <div className="text-center my-5 text-gray-500 text-sm">or</div>

          <div id="googleSignInDiv" className="w-full flex justify-center"></div>

          <div className="text-center mt-5 text-sm text-text">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-primary ml-1 hover:underline font-medium">
              Create an Account
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 ml-10 md:mt-0 flex items-center justify-center">
          <img
            src={LoginImage}
            alt="CityCare Illustration"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
