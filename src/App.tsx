import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Works from './components/Works';
import ProjectLog from './components/ProjectLog';
import ContactFooter from './components/ContactFooter';
import Playground from './components/Playground';
import DynamicShowcase from './components/DynamicShowcase';
import InteractiveCursor from './components/ui/InteractiveCursor';

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
        <DynamicShowcase />
        <Playground />
        <ProjectLog />
      </main>

      <ContactFooter />
    </div>
  );
}

export default App;

