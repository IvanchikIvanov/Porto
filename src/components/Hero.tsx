import React from 'react';
import DecodingText from './ui/DecodingText';
import MatrixRain from './ui/MatrixRain';
import { ArrowRight, Code, Database, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Hero: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyber-green/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-8">
            <div className="space-y-2 font-mono">
              <p className="text-cyber-green text-sm typing-effect overflow-hidden whitespace-nowrap border-r-2 border-cyber-green w-fit pr-1 animate-pulse">
                root@siteberry:~$ {t('hero.cmd')}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                <DecodingText text={t('hero.digital')} startDelay={500} /><br />
                <span className="text-neutral-500">{t('hero.reality')}</span><br />
                {/* We use text-white for scramble here to contrast against the primary text in dark mode. 
                    In light mode 'text-white' maps to dark text via tailwind config override. */}
                <DecodingText
                  text={t('hero.architects')}
                  className="text-cyber-green"
                  scrambleClassName="text-white"
                  startDelay={1500}
                />
              </h1>
            </div>

            <p className="text-neutral-400 max-w-lg text-lg leading-relaxed border-l-2 border-neutral-800 pl-4">
              {t('hero.desc')}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-8 py-3 bg-cyber-green text-white font-bold font-mono tracking-wider overflow-hidden hover:bg-white hover:text-black hover:border-transparent border border-transparent transition-all"
              >
                <span>{t('hero.btn_start')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-3 px-8 py-3 border border-neutral-700 text-white font-mono tracking-wider hover:border-cyber-green hover:text-cyber-green transition-all bg-cyber-black/50"
              >
                <span>{t('hero.btn_docs')}</span>
              </a>
            </div>

            <div className="pt-8 flex items-center gap-8 text-neutral-600">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span className="text-xs">{t('hero.clean_code')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span className="text-xs">{t('hero.scalable')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-xs">{t('hero.global')}</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute right-0 top-0 w-[60%] h-full">
            <MatrixRain className="absolute inset-0" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;