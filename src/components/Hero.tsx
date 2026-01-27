import React from 'react';
import DecodingText from './ui/DecodingText';
import MatrixRain from './ui/MatrixRain';
import GlowingButton from './ui/GlowingButton';
import { ArrowRight, Code, Database, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Hero: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Matrix Rain Background - Full Screen */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <MatrixRain className="absolute inset-0" />
      </div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-8">
            <div className="space-y-2 font-mono">
              <p className="text-cyber-primary text-sm typing-effect overflow-hidden whitespace-nowrap border-r-2 border-cyber-primary w-fit pr-1 animate-pulse">
                root@siteberry:~$ {t('hero.cmd')}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  <DecodingText
                    text={t('hero.architects')}
                    scrambleClassName="text-white"
                    startDelay={500}
                  />
                </span><br />
                <span className="text-neutral-500">{t('hero.digital_reality')}</span>
              </h1>
            </div>

            <p className="text-neutral-400 max-w-lg text-lg leading-relaxed border-l-2 border-neutral-800 pl-4">
              {t('hero.desc')}
            </p>

            <div className="flex flex-wrap gap-4">
              <GlowingButton href="#contact" className="w-fit">
                <span className="flex items-center gap-3 font-bold font-mono tracking-wider">
                  {t('hero.btn_start')}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </GlowingButton>

              <a
                href="#services"
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-neutral-800 text-neutral-400 font-mono tracking-wider hover:border-cyber-primary hover:text-cyber-primary transition-all bg-black/50 hover:bg-black/80"
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
        </div>
      </div>
    </div>

  );
};

export default Hero;