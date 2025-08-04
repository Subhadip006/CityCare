import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { Analytics } from "@vercel/analytics/react"

function App() {



  console.log(import.meta.env.VITE_API_BASE_URL)
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
      {import.meta.env.VITE_API_BASE_URL !== 'http://localhost:8000/' ? <Analytics /> : null}
    </>
  )
}

export default App
