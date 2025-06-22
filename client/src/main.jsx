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
  {path: '/officer/dashboard', element: <OfficerDashboard />}
])

const clientId = import.meta.env.GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="802392548098-rojudnh96bvrgm42fpp05k2jm8ugrl90.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
