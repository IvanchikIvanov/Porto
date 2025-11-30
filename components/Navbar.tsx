import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [time,ZFTime] = useState(new Date().toLocaleTimeString());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      ZFTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: './services', href: '#services' },
    { name: './portfolio', href: '#portfolio' },
    { name: './contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-cyber-black/90 border-b border-neutral-800 backdrop-blur-md font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="p-1 border border-cyber-green rounded-sm group-hover:bg-cyber-green/10 transition-colors">
              <Terminal className="w-5 h-5 text-cyber-green" />
            </div>
            <span className="text-white font-bold tracking-tight">
              SITEBERRY<span className="text-cyber-green">.PRO</span>
            </span>
          </div>

          {/* Desktop Monitor Info */}
          <div className="hidden md:flex items-center gap-6 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3" />
              <span>SYSTEM: SECURE</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3" />
              <span>CORE: ACTIVE</span>
            </div>
            <div className="w-[1px] h-4 bg-neutral-800"></div>
            <span className="text-cyber-green">{time}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-400 hover:text-cyber-green transition-colors text-sm uppercase tracking-wider hover:underline decoration-cyber-green decoration-2 underline-offset-4"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-400 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-cyber-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-neutral-300 hover:text-cyber-green hover:bg-neutral-900 block px-3 py-2 text-base font-medium font-mono"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 py-4 text-xs text-neutral-600 border-t border-neutral-900 mt-4">
              STATUS: ONLINE<br/>
              TIME: {time}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;