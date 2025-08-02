import React, { useEffect, useState, useCallback } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  Upload,
  FileText,
  Building,
  MessageSquare,
} from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';

function Complaints() {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationError, setLocationError] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setTitle('');
    setDepartment('');
    setDescription('');
    setMedia([]);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Invalid token, redirecting to login...');
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported in your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocationError(
          'Could not get location. Please allow location access.'
        );
      },
      { timeout: 10000 }
    );
  }, [navigate]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!title || !department || !description || description.length < 20 || location.lat === null || location.lng === null) {
        setError('Please fill all required fields with valid data.');
        return;
      }
      if (location.lat === null || location.lng === null) {
        setError('Location not available. Please allow location access.');
        return;
      }

      setIsLoading(true);
      setError('');
      setSuccess('');

      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('Title', title);
      formData.append('Department', department);
      formData.append('Description', description);
      formData.append('Latitude', String(location.lat));
      formData.append('Longitude', String(location.lng));
      media.forEach((file) => formData.append('media', file));

      try {
        const controller = new AbortController();
        const response = await fetch(`${BASE_URL}complaint`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
          signal: controller.signal,
        });

        let data = {};
        try {
          data = await response.json();
        } catch {
          setError('Failed to parse server response.');
          return;
        }

        if (response.ok) {
          setSuccess(data.message || 'Complaint submitted successfully.');
          resetForm();
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          setError(data.error || 'Failed to submit complaint.');
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Submission error:', err);
        setError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [title, department, description, media, location, navigate]
  );

  const handleFileChange = (e) => {
    setError('');
    const files = Array.from(e.target.files || []);
    const tooLarge = [];
    const dedupedToAdd = [];

    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        tooLarge.push(file.name);
      } else if (
        !media.some((m) => m.name === file.name && m.size === file.size && m.lastModified === file.lastModified)
      ) {
        dedupedToAdd.push(file);
      }
    });

    if (tooLarge.length) {
      setError(`These files exceed 10MB and were skipped: ${tooLarge.join(', ')}`);
    }

    if (dedupedToAdd.length) {
      setMedia((prev) => [...prev, ...dedupedToAdd]);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f3] to-[#F1EFEC]">
      <div className="mb-20">
        <Navbar />
      </div>

      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-text">Submit Complaint</h1>
          </div>
          <p className="text-gray-600 mt-2 text-center">
            Help us improve by reporting issues in your area
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
              <p className="text-green-700">{success}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-primary px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Complaint Details</h2>
            <p className="text-white/90 mt-1">
              Please provide detailed information about your complaint
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label
                  htmlFor="title"
                  className="flex items-center gap-2 text-lg font-semibold text-text"
                >
                  <FileText className="w-5 h-5 text-primary" />
                  Complaint Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleInputChange(setTitle)}
                  placeholder="Enter a clear, descriptive title"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-text bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="department"
                  className="flex items-center gap-2 text-lg font-semibold text-text"
                >
                  <Building className="w-5 h-5 text-[#00897B]" />
                  Department *
                </label>
                <div className="relative">
                  <select
                    id="department"
                    value={department}
                    onChange={handleInputChange(setDepartment)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00897B] focus:outline-none transition-colors text-text bg-white appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="road">Road & Infrastructure</option>
                    <option value="sanitation">Sanitation & Waste</option>
                    <option value="power">Power & Utilities</option>
                    <option value="water">Water Supply</option> 

                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="flex items-center gap-2 text-lg font-semibold text-text"
              >
                <MessageSquare className="w-5 h-5 text-primary" />
                Detailed Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={handleInputChange(setDescription)}
                placeholder="Please provide a detailed description of the issue, including location details, time of occurrence, and any other relevant information..."
                rows="6"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-text bg-white resize-none"
                required
              />
              <p className="text-sm text-gray-500">
                {description.length}/500 characters (
                {description.length < 20
                  ? 'Minimum 20 characters required'
                  : 'Good!'}
                )
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-lg font-semibold text-text">
                <Upload className="w-5 h-5 text-[#00897B]" />
                Supporting Media (Optional)
              </label>
              <div className="relative">
                <input
                  id="media"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="media"
                  className="flex items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#00897B] hover:bg-gray-50 transition-all group"
                >
                  <div className="text-center">
                    <Upload className="w-10 h-10 mx-auto text-gray-400 group-hover:text-[#00897B] transition-colors" />
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold text-[#00897B]">
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, MP4 up to 10MB
                    </p>
                  </div>
                </label>
                {media.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {media.map((file, index) => (
                      <div
                        key={index}
                        className="p-3 bg-green-50 rounded-lg border border-green-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-700 font-medium">
                            {file.name} (
                            {(file.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setMedia((prev) => {
                              const copy = [...prev];
                              copy.splice(index, 1);
                              return copy;
                            });
                          }}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {locationError && (
              <div className="p-3 bg-yellow-50 border border-yellow-400 rounded-md">
                <p className="text-yellow-700">
                  {locationError} please give location access. Please refresh the page to give access
                </p>
              </div>
            )}

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !title ||
                  !department ||
                  !description ||
                  description.length < 20
                }
                className="px-8 py-4 bg-primary text-white font-bold text-lg rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Complaint...
                  </div>
                ) : (
                  'Submit Complaint'
                )}
              </button>
            </div>

            {/* Form Status */}
            <div className="text-center text-sm text-gray-500">
              <p>* Required fields</p>
              {(!title ||
                !department ||
                !description ||
                description.length < 20) && (
                <p className="text-amber-600 mt-1">
                  Please fill all required fields to submit
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-text mb-3">
            How to write an effective complaint:
          </h3>
          <ul className="space-y-2 text-gray-600">
            {[
              'Be specific about the location and time of the issue',
              'Include photos or videos if possible to support your complaint',
              'Describe the impact this issue has on you and your community',
              'Use clear and professional language',
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Complaints;
