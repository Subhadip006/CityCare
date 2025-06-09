import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from './Button'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Navbar() {
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <nav className="w-full fixed top-0 left-0 py-4 z-50 backdrop-blur-md shadow-sm bg-white flex items-center justify-between mx-auto md:px-96">
      <div>
        <Link to = "/" className='text-2xl font-semibold text-text'>CityCare</Link>
      </div>

      <div className='flex items-center justify-between space-x-4'>
        <div className='flex'>
          <ul className='flex space-x-4'>
            <li>
              <Link to="/" className='text-text font-light'>Home</Link>
            </li>
            <li>
              {isLoggedIn ? <LogoutButton /> : <LoginButton />}
            </li>
          </ul>
        </div>

        <Button
          text= "Raise Complaint"
          color="bg-primary"
          onClick={() => {
            if (isLoggedIn) {
              navigate('/complaint');
            } else {
              navigate('/login');
            }
          }}
          className="ml-4 rounded-md cursor-pointer"
        />
      </div>
    </nav>
  )
}

export default Navbar
