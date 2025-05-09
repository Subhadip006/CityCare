import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <div className='w-[100%] h-screen bg-[#F9F7F3] text-[#0FA3B1]'>
      <header>
           <Navbar />
      </header>
      <main>
           <Hero />
      </main>
    </div>
    <footer>
          <Footer />
      </footer>
    </>
  )
}

export default App