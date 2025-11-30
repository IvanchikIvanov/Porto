import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Works from './components/Works';
import ProjectLog from './components/ProjectLog';
import ContactFooter from './components/ContactFooter';

function App() {
  return (
    <div className="min-h-screen bg-cyber-black text-white selection:bg-cyber-green selection:text-black">
      {/* Scanline overlay */}
      <div className="scanlines"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <Works />
        <ProjectLog />
      </main>

      <ContactFooter />
    </div>
  );
}

export default App;

