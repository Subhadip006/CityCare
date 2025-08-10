import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Button from './Button'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleComplaintClick = () => {
    if (isLoggedIn) {
      navigate('/complaint');
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false); 
  };

  return (
    <nav className="w-full fixed top-0 left-0 py-4 z-50 backdrop-blur-md shadow-sm bg-white">
      <div className="flex items-center justify-between mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-96">
        <div>
          <Link to="/" className='text-2xl font-semibold text-text'>
            CityCare
          </Link>
        </div>

        <div className='hidden md:flex items-center justify-between space-x-4'>
          <div className='flex'>
            <ul className='flex space-x-4'>
              <li>
                <Link to="/" className='text-text font-light hover:text-primary transition-colors'>
                  Home
                </Link>
              </li>
              <li>
                {isLoggedIn ? <LogoutButton /> : <LoginButton />}
              </li>
            </ul>
          </div>
          <Button
            text="Raise Complaint"
            color="bg-primary"
            onClick={handleComplaintClick}
            className="ml-4 rounded-md cursor-pointer"
          />
        </div>

        <div className='md:hidden -mr-2'>
          <button
            onClick={toggleMobileMenu}
            className="text-text hover:text-primary transition-colors focus:outline-none p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className='block text-text font-light hover:text-primary transition-colors'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="flex flex-col space-y-3">
              <div onClick={() => setIsMobileMenuOpen(false)}>
                {isLoggedIn ? <LogoutButton /> : <LoginButton />}
              </div>
              
              <Button
                text="Raise Complaint"
                color="bg-primary"
                onClick={handleComplaintClick}
                className="rounded-md cursor-pointer w-full"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar