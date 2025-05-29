import React from 'react'
import LogoutButton from './LogoutButton';
import LoginButton from './loginButton';

function Navbar() {
  let isLoggedIn = false; 

  const token = localStorage.getItem("token");

  if(token != null){
      isLoggedIn = true;
  }

  return (
    <div className='w-full bg-transparent flex justify-between items-center p-4'>
        <div className='text-5xl font-semibold pl-10 text-[#0FA3B1]'>
          Citycare
        </div>
        <div>
            <ul className='hidden md:flex items-center gap-4 pr-20 text-[#13737c] text-xl font-semibold'>
                <li>Home</li>
                <li>Services</li>
                <li>Contact</li>
                <li className="mt-2">
                       {isLoggedIn ? <LogoutButton /> : <LoginButton />}
                </li>

            </ul>
        </div>
    </div>
  )
}

export default Navbar