import React from 'react'

function Navbar() {
  return (
    <div className='w-full bg-amber-300 flex justify-between items-center p-4'>
        <div>Citycare</div>
        <div>
            <ul className='hidden md:flex gap-4 pr-20'>
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