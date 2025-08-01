import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldPlus } from 'lucide-react';

function OfficerRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';

  const isDisabled = loading || !email || password.length < 6 || password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}officerRegister`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role : "officer" }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Registration successful!');
        localStorage.setItem("token", data.token);
        console.log
        setTimeout(() => {
          navigate('/officer/onboarding');
        }, 1000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl bg-secondaryBackground p-10 rounded-2xl shadow-lg border border-primary animate-fadeIn">
        <div className="flex items-center justify-center mb-6">
          <ShieldPlus className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold text-primary ml-2">Officer Register</h1>
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
              placeholder="Enter your official email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-md font-medium text-text mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary text-text bg-white"
              required
              value={password}
              placeholder="Minimum 6 characters"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-md font-medium text-text mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border border-gray-300 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary text-text bg-white"
              required
              value={confirmPassword}
              placeholder="Re-enter password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition duration-200 ${
              isDisabled ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-text">
          Already have an account?
          <Link to="/officer/Login" className="text-primary font-medium hover:underline pl-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default OfficerRegister;
