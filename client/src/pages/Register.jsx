import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#F9F7F3] text-[#cfb961] font-bold font-sans'>
        <div className='w-[90%] md:w-[50%] lg:w-[30%] bg-white p-8 rounded-lg shadow-lg'>
            <h1 className='text-3xl text-center font-extrabold mb-4'>Register</h1>
            <form>
                <div className='mb-4'>
                    <label htmlFor='name' className='block text-md font-medium mb-2'>Name</label>
                    <input type='text' id='name' className='w-full border-2 border-gray-300 rounded-md p-2' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-md font-medium mb-2'>Email</label>
                    <input type='email' id='email' className='w-full border-2 border-gray-300 rounded-md p-2' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-md font-medium mb-2'>Password</label>
                    <input type='password' id='password' className='w-full border-2 border-gray-300 rounded-md p-2' required />
                </div>
                <button type='submit' className='w-full bg-[#F7A072] text-white py-2 rounded-md hover:bg-[#63493b]'>Register</button>
            </form>
        <div className='mt-4 text-center'>
            <p className='text-sm'>Already have an account?
              <Link to={'/login'} className='text-[#F7A072] pl-1 hover:underline'> Login</Link>
            </p>
        </div>
    </div>  

    </div>
  )
}

export default Register