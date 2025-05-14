import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Register from './pages/Register.jsx'


const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/login', element: <Login />},
  {path: '*', element: <NotFound />},
  {path: '/register', element: <Register />}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
