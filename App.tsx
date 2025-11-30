import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
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
        <ProjectLog />
      </main>

      <ContactFooter />
    </div>
  );
}

export default App;