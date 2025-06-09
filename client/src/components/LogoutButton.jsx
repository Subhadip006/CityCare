import React from 'react'
import { useNavigate } from 'react-router-dom';

function LogoutButton() {

  const navigate = useNavigate();
  function handleLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
            <button className='text-primary underline underline-offset-6 decoration-2 cursor-pointer'
                    onClick={handleLogout}
            >
                Log out
            </button>
  )
}

export default LogoutButton