import React from 'react'
import Button from './Button'

function Hero() {

  return (
    <div className='container mx-auto h-screen flex flex-col gap-y-6 justify-center items-center'>
        <div className='text-5xl font-stretch-200% font-semibold font-serif'>Citycare</div>
        <div className='text-2xl font-sans text-[#07474d]'>A public Complaint Management System</div>
        <div className='flex gap-x-4'>
            <Button text='Raise Complaint' color='bg-[#cfb961]' textColor='text-black' hoverColor='bg-[#F7A072]' className='px-6 py-2 rounded font-semibold transition duration-300' />
            <Button text='Check status' color='bg-[#F7A072]' textColor='text-black' hoverColor='bg-[#F7A072]' className='px-6 py-2 rounded font-semibold transition duration-300' />
        </div>
    </div>
    
  )
}

export default Hero