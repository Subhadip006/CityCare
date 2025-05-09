import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <div className='w-[100%] h-screen bg-red-100'>
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