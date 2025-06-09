import React from 'react'
import { Link } from 'react-router-dom'

function LoginButton() {
    return (
        <Link to = '/login'>
            <button className='underline text-text decoration-secondary decoration-2 underline-offset-6 cursor-pointer'>
               Login
            </button>
        </Link>

    )
}

export default LoginButton