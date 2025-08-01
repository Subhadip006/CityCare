import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

function Officerslogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';

  const isDisabled = password.length < 6 || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}officerLogin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setSuccess('Login successful!');
        setTimeout(() => {
          navigate('/officer/dashboard'); 
        }, 1000);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl bg-secondaryBackground p-8 rounded-2xl shadow-lg border border-primary animate-fadeIn">
        <div className="flex items-center justify-center mb-6">
          <ShieldCheck className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold text-primary ml-2">Officer Login</h1>
        </div>

        {error && <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-center font-semibold">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-md font-medium text-text mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary text-text bg-white"
              required
              value={email}
              placeholder='Enter your registered office mail'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-md font-medium text-text mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder='Enter Your password'
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text bg-white"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition duration-200 ${
             isDisabled ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >

            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-text">
          Don't have an account?
          <Link to="/officer/register" className="text-primary font-medium hover:underline pl-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Officerslogin;
