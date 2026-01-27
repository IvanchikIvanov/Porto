import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Menu, X, Sun, Moon, Globe, Github, Instagram, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { t, theme, toggleTheme, language, setLanguage } = useApp();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-[var(--bg-panel-transparent)] border-b border-neutral-800 backdrop-blur-md font-mono transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-white font-bold tracking-tight">
              SITEBERRY<span className="text-cyber-primary">.PRO</span>
            </span>
          </div>

          {/* Desktop Monitor Info */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3" />
              <span>{t('nav.status')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3" />
              <span>{t('nav.core')}</span>
            </div>
            <div className="w-[1px] h-4 bg-neutral-800"></div>
            <span className="text-cyber-primary">{time}</span>
          </div>

          {/* Desktop Navigation & Controls */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-baseline space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-400 hover:text-cyber-primary transition-colors text-sm uppercase tracking-wider hover:underline decoration-cyber-primary decoration-2 underline-offset-4"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 border-l border-neutral-800 pl-6">
              {/* Social Links */}
              <a href="https://github.com/IvanchikIvanov" target="_blank" rel="noopener noreferrer" className="p-2 rounded hover:bg-[var(--btn-hover)] text-neutral-400 hover:text-cyber-primary transition-all" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://t.me/We7drr" target="_blank" rel="noopener noreferrer" className="p-2 rounded hover:bg-[var(--btn-hover)] text-neutral-400 hover:text-cyber-primary transition-all" title="Telegram">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/aleksandr77698/" target="_blank" rel="noopener noreferrer" className="p-2 rounded hover:bg-[var(--btn-hover)] text-neutral-400 hover:text-cyber-primary transition-all" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>

              <div className="w-[1px] h-4 bg-neutral-800"></div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded hover:bg-[var(--btn-hover)] text-neutral-400 hover:text-cyber-primary transition-all"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
                className="flex items-center gap-2 p-1.5 px-3 rounded hover:bg-[var(--btn-hover)] text-neutral-400 hover:text-cyber-primary transition-all font-bold text-sm"
                title="Switch Language"
              >
                <Globe className="w-4 h-4" />
                <span>{language.toUpperCase()}</span>
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-[var(--btn-hover)] text-neutral-400 hover:text-cyber-primary transition-all"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
              className="flex items-center gap-1.5 p-1.5 px-2 rounded hover:bg-[var(--btn-hover)] text-neutral-400 hover:text-cyber-primary transition-all font-bold text-sm"
              title="Switch Language"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </button>

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
                className="text-neutral-300 hover:text-cyber-primary hover:bg-neutral-900 block px-3 py-2 text-base font-medium font-mono"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 py-4 text-xs text-neutral-600 border-t border-neutral-900 mt-4">
              {t('nav.mobile_status')}<br />
              TIME: {time}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;