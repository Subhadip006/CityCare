import React from 'react'
import { Link } from 'react-router-dom'

function LoginButton() {
    return (
        <Link to = '/login'>
            <button className='bg-[#0FA3B1] py-1 px-2 cursor-pointer rounded-3xl text-gray-100 mb-2'>
            Login/Signup
            </button>
        </Link>

    )
}

export default LoginButton