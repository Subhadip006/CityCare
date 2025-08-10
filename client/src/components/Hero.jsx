import React, {useEffect} from 'react'
import Button from './Button'
import Card from './Card'
import {FileText, CheckCircle, MessageSquare} from 'lucide-react'
import { Link } from 'react-router-dom'

function Hero() {

  const  BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';

  const token = localStorage.getItem('token');

  useEffect(() => {
    const wake = async () => {
      try {
        const res = await fetch(`${BASE_URL}health`, {
          method: 'GET',
        })
        const text = await res.text()
        console.log('Health endpoint response:', text)
      } catch (err) {
        console.error('Error fetching health endpoint:', err)
      }
    }
    wake()
  }, [BASE_URL])
  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-background text-center px-6 pt-44 pb-12">
      <div className='gap-y-3 flex flex-col pt-4'>
        <h1 className="text-6xl font-extrabold font-serif text-text drop-shadow-sm">Your Voice Matters.</h1>
      <h1 className="text-6xl font-extrabold font-serif drop-shadow-sm text-center pb-16">
           <span className="text-primary mb-">Raise your complaint</span>{' '}
           <span className="text-text">Be heard.</span>
      </h1>
      </div>

      <div className="mt-8 flex gap-4">
        <Link to="/complaint">
          <Button
            text="Raise Complaint"
            color="bg-primary"
            textColor="text-white"
            hoverColor="bg-[#f9a03f]"
            className="px-6 py-3 rounded-lg cursor-pointer font-semibold shadow-md transition"
          />
        </Link>
        <Link to="/dashboard">
          <button className='bg-transparent cursor-pointer border-2 border-secondary px-6 py-3  rounded-lg font-semibold shadow-md  text-secondary hover:bg-secondary hover:text-background transition'>
            Check Status</button>
        </Link>
      </div>
    </div>

    
    <div className='flex flex-col items-center justify-center bg-white text-text px-6 py-16'>
          <h1 className='text-3xl md:text-4xl font-semibold text-text font-sans pb-4'>How It Works</h1>
          <p className='text-xl text-gray-600 font-sans'>Simple step to make your voice heard and improve your community</p>

          <div className='pt-12 flex flex-col sm:flex-row items-center justify-center gap-8'>
            <Card
                 icon={<FileText className="w-8 h-8 text-secondary" />}
                 title="Submit Complaint"
                 description="Report issues in your community with detailed descriptions and photos."
          />

          <Card
                 icon={ <MessageSquare className="w-8 h-8 text-primary" />}
                 title="Track Progress"
                 description="Monitor your complaint status and receive updates from officers."
          />

          <Card
                 icon={<CheckCircle className="w-8 h-8 text-orange-300" />}
                 title="See Results"
                 description="Watch as your community improves through collective action."
          />
          </div>
          

    </div>

    <div className='flex flex-col items-center justify-center bg-primary text-white px-6 py-16'>
      <h1 className='text-4xl font-semibold text-white font-sans pb-4'>Join the Movement</h1>
      <p className='text-xl text-white font-sans'>Together, we can make our cities better places to live.</p>
      {token ? (
        <Link to="/dashboard">
          <Button
            text="Go to Dashboard"
            color="bg-white"
            textColor="text-primary"
            className="px-6 py-3 rounded-lg cursor-pointer font-semibold shadow-md transition mt-8 hover:shadow-2xl hover:bg-gray-100 hover:text-primary"
          />
        </Link>
      ) : (
        <Link to="/register">
          <Button
            text="Get Started"
            color="bg-white"
            textColor="text-primary"
            className="px-6 py-3 rounded-lg cursor-pointer font-semibold shadow-md transition mt-8 hover:shadow-2xl hover:bg-gray-100 hover:text-primary"
          />
        </Link>
      )}

    </div>


    </div>
  )
}

export default Hero
