import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow">
          <Hero />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
}

export default App
