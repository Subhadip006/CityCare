import React from 'react'

function Navbar() {
  return (
    <div className='w-full bg-transparent flex justify-between items-center p-4'>
        <div className='text-5xl font-semibold pl-10 text-[#0FA3B1]'>Citycare</div>
        <div>
            <ul className='hidden md:flex gap-4 pr-20 text-[#13737c] text-xl font-semibold'>
                <li>Contacts</li>
                <li>Contacts</li>
                <li>Contacts</li>
                <li>Contacts</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar