import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/dashboard.jsx'
import ComplaintForm from './pages/Complaints.jsx'
import Officerslogin from './pages/officer/login.jsx'
import Officerrequest from './pages/officer/Register.jsx'
import AdminDashboard from './pages/adminDasboard.jsx'
import OfficerDashboard from './pages/officer/OfficerDashboard.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'
import OfficerOnboarding from './pages/officer/onboarding.jsx'
import AdminLogin from './pages/officer/adminLogin.jsx'


const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/login', element: <Login />},
  {path: '*', element: <NotFound />},
  {path: '/register', element: <Register />},
  {path: '/dashboard', element: <Dashboard />},
  {path: '/complaint', element:<ComplaintForm />},
  {path: 'officer/login', element: <Officerslogin />},
  {path: 'officer/register', element: <Officerrequest />},
  {path: '/admin', element: <AdminDashboard />},
  {path: '/admin/login', element: <AdminLogin />},
  {path: '/officer/dashboard', element: <OfficerDashboard />},
  {path: '/officer/onboarding', element: <OfficerOnboarding />}
])

if (import.meta.env.VITE_GOOGLE_CLIENT_ID) {
  console.log('Google Client ID is set:');
} else {
  console.error('Google Client ID is not set. Please check your environment variables.');
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
